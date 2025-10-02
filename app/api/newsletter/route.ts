import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limit configuration
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 3; // 3 requests per hour per IP

// Newsletter subscription data
interface NewsletterData {
  email: string;
  name?: string;
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Check rate limit
function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  rateLimitStore.set(ip, record);

  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - record.count };
}

// Create welcome email template
function createWelcomeEmailTemplate(name?: string): string {
  const displayName = name || 'חבר/ה יקר/ה';

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
      padding: 40px 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
    }
    .content {
      padding: 40px 30px;
    }
    .content h2 {
      color: #333;
      margin-top: 0;
    }
    .content p {
      color: #666;
      line-height: 1.8;
      margin: 15px 0;
    }
    .button {
      display: inline-block;
      padding: 12px 30px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-decoration: none;
      border-radius: 6px;
      margin: 20px 0;
      font-weight: bold;
    }
    .footer {
      background-color: #f5f5f5;
      padding: 30px;
      text-align: center;
      color: #666;
      font-size: 14px;
    }
    .footer a {
      color: #667eea;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>ברוכים הבאים ל-LigaDeals Berlin!</h1>
    </div>
    <div class="content">
      <h2>שלום ${displayName},</h2>
      <p>תודה שהצטרפת לניוזלטר שלנו! 🎉</p>
      <p>
        אנחנו שמחים שהצטרפת אלינו. מעתה תקבל עדכונים שוטפים על:
      </p>
      <ul style="color: #666; line-height: 1.8;">
        <li>מאמרים חדשים ותוכן מעניין</li>
        <li>טיפים ומדריכים שימושיים</li>
        <li>חדשות ועדכונים מהעולם</li>
        <li>הצעות והטבות בלעדיות</li>
      </ul>
      <p style="text-align: center;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://ligadeals-berlin.com'}" class="button">
          בקרו באתר שלנו
        </a>
      </p>
      <p>
        אם יש לך שאלות או הערות, אל תהסס לפנות אלינו בכל עת.
      </p>
      <p>
        בברכה,<br>
        <strong>צוות LigaDeals Berlin</strong>
      </p>
    </div>
    <div class="footer">
      <p>
        קיבלת מייל זה כי נרשמת לניוזלטר שלנו באתר LigaDeals Berlin.
      </p>
      <p>
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe">ביטול הצטרפות</a>
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

// Create admin notification email
function createAdminNotificationTemplate(data: NewsletterData): string {
  return `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      direction: rtl;
      text-align: right;
    }
  </style>
</head>
<body>
  <h2>מנוי חדש לניוזלטר</h2>
  <p><strong>אימייל:</strong> ${data.email}</p>
  ${data.name ? `<p><strong>שם:</strong> ${data.name}</p>` : ''}
  <p><strong>תאריך:</strong> ${new Date().toLocaleString('he-IL')}</p>
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
    const body: NewsletterData = await request.json();

    // Validate required fields
    if (!body.email) {
      return NextResponse.json(
        {
          error: 'Email is required',
          hebrewError: 'נדרש אימייל'
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

    // Create welcome email
    const welcomeEmailHtml = createWelcomeEmailTemplate(body.name);

    // Send welcome email to subscriber
    const { data: welcomeData, error: welcomeError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'LigaDeals <noreply@ligadeals-berlin.com>',
      to: body.email,
      subject: 'ברוכים הבאים ל-LigaDeals Berlin! 🎉',
      html: welcomeEmailHtml,
    });

    if (welcomeError) {
      console.error('Failed to send welcome email:', welcomeError);
      return NextResponse.json(
        {
          error: 'Failed to send welcome email',
          hebrewError: 'שליחת אימייל נכשלה. אנא נסה שוב.'
        },
        { status: 500 }
      );
    }

    // Send notification to admin
    try {
      const adminNotificationHtml = createAdminNotificationTemplate(body);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'LigaDeals <noreply@ligadeals-berlin.com>',
        to: process.env.CONTACT_EMAIL || 'contact@ligadeals-berlin.com',
        subject: `מנוי חדש לניוזלטר: ${body.email}`,
        html: adminNotificationHtml,
      });
    } catch (adminError) {
      // Log but don't fail if admin notification fails
      console.error('Failed to send admin notification:', adminError);
    }

    // TODO: Add subscriber to email service (Resend Audiences, Mailchimp, etc.)
    // This is where you would integrate with your email marketing platform
    // Example:
    // await addToResendAudience(body.email, body.name);
    // await addToMailchimp(body.email, body.name);

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed to newsletter',
        hebrewMessage: 'נרשמת בהצלחה לניוזלטר',
        emailId: welcomeData?.id,
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Remaining': String(remaining),
        }
      }
    );

  } catch (error) {
    console.error('Newsletter subscription error:', error);

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
