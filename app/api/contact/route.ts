import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limit configuration
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 5; // 5 requests per hour per IP

// Contact form validation schema
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone format (international)
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.length >= 8;
}

// Check rate limit
function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    // Create new record
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0 };
  }

  // Increment count
  record.count += 1;
  rateLimitStore.set(ip, record);

  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - record.count };
}

// Create email HTML template with Hebrew support
function createEmailTemplate(data: ContactFormData): string {
  return `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      direction: rtl;
      text-align: right;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .content {
      padding: 30px;
    }
    .field {
      margin-bottom: 20px;
    }
    .label {
      font-weight: bold;
      color: #333;
      margin-bottom: 5px;
      display: block;
    }
    .value {
      color: #666;
      line-height: 1.6;
      padding: 10px;
      background-color: #f9f9f9;
      border-radius: 4px;
    }
    .footer {
      background-color: #f5f5f5;
      padding: 20px;
      text-align: center;
      color: #666;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>הודעה חדשה מאתר LigaDeals Berlin</h1>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">שם:</span>
        <div class="value">${data.name}</div>
      </div>
      <div class="field">
        <span class="label">אימייל:</span>
        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      ${data.phone ? `
      <div class="field">
        <span class="label">טלפון:</span>
        <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
      </div>
      ` : ''}
      <div class="field">
        <span class="label">הודעה:</span>
        <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
      </div>
    </div>
    <div class="footer">
      <p>הודעה זו נשלחה מטופס יצירת קשר באתר LigaDeals Berlin</p>
      <p>תאריך: ${new Date().toLocaleDateString('he-IL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') ||
                request.headers.get('x-real-ip') ||
                'unknown';

    // Check rate limit
    const { allowed, remaining } = checkRateLimit(ip);

    if (!allowed) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          hebrewError: 'יותר מדי בקשות. אנא נסה שוב מאוחר יותר.'
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(rateLimitStore.get(ip)?.resetTime || Date.now()),
          }
        }
      );
    }

    // Parse request body
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          hebrewError: 'חסרים שדות חובה'
        },
        { status: 400 }
      );
    }

    // Validate name (minimum 2 characters)
    if (body.name.trim().length < 2) {
      return NextResponse.json(
        {
          error: 'Name must be at least 2 characters',
          hebrewError: 'השם חייב להכיל לפחות 2 תווים'
        },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        {
          error: 'Invalid email address',
          hebrewError: 'כתובת אימייל לא תקינה'
        },
        { status: 400 }
      );
    }

    // Validate phone if provided
    if (body.phone && !isValidPhone(body.phone)) {
      return NextResponse.json(
        {
          error: 'Invalid phone number',
          hebrewError: 'מספר טלפון לא תקין'
        },
        { status: 400 }
      );
    }

    // Validate message (minimum 10 characters)
    if (body.message.trim().length < 10) {
      return NextResponse.json(
        {
          error: 'Message must be at least 10 characters',
          hebrewError: 'ההודעה חייבת להכיל לפחות 10 תווים'
        },
        { status: 400 }
      );
    }

    // Create email HTML
    const emailHtml = createEmailTemplate(body);

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'LigaDeals <noreply@ligadeals-berlin.com>',
      to: process.env.CONTACT_EMAIL || 'contact@ligadeals-berlin.com',
      replyTo: body.email,
      subject: `הודעה חדשה מ-${body.name} - LigaDeals Berlin`,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        {
          error: 'Failed to send email',
          hebrewError: 'שליחת האימייל נכשלה. אנא נסה שוב.'
        },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully',
        hebrewMessage: 'ההודעה נשלחה בהצלחה',
        emailId: data?.id,
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Remaining': String(remaining),
        }
      }
    );

  } catch (error) {
    console.error('Contact form error:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        hebrewError: 'שגיאת שרת. אנא נסה שוב מאוחר יותר.'
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_URL || '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}
