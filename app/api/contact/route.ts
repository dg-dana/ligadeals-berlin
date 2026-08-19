import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { isSameOrigin } from '@/lib/api/security';

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  privacyConsent?: boolean;
}

// Upper bounds so an oversized payload cannot be relayed into an email.
const MAX_LENGTHS = { name: 100, email: 254, phone: 30, message: 5000 } as const;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  return /^[\d\s\-\+\(\)]+$/.test(phone) && phone.length >= 8;
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  rateLimitStore.set(ip, record);
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - record.count };
}

export async function POST(request: NextRequest) {
  try {
    if (!isSameOrigin(request)) {
      return NextResponse.json(
        { error: 'Forbidden', hebrewError: 'הבקשה נדחתה.' },
        { status: 403 }
      );
    }

    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    const { allowed, remaining } = checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests.', hebrewError: 'יותר מדי בקשות. אנא נסה שוב מאוחר יותר.' },
        { status: 429, headers: { 'X-RateLimit-Remaining': '0' } }
      );
    }

    const body: ContactFormData = await request.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields', hebrewError: 'חסרים שדות חובה' },
        { status: 400 }
      );
    }
    if (body.name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name too short', hebrewError: 'השם חייב להכיל לפחות 2 תווים' },
        { status: 400 }
      );
    }
    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email', hebrewError: 'כתובת אימייל לא תקינה' },
        { status: 400 }
      );
    }
    if (body.phone && !isValidPhone(body.phone)) {
      return NextResponse.json(
        { error: 'Invalid phone', hebrewError: 'מספר טלפון לא תקין' },
        { status: 400 }
      );
    }
    if (body.message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message too short', hebrewError: 'ההודעה חייבת להכיל לפחות 10 תווים' },
        { status: 400 }
      );
    }
    if (
      body.name.length > MAX_LENGTHS.name ||
      body.email.length > MAX_LENGTHS.email ||
      (body.phone && body.phone.length > MAX_LENGTHS.phone) ||
      body.message.length > MAX_LENGTHS.message
    ) {
      return NextResponse.json(
        { error: 'Field too long', hebrewError: 'אחד השדות ארוך מדי' },
        { status: 400 }
      );
    }
    // Consent is enforced here as well as in the UI: client-side validation
    // alone can be bypassed, and we must not process personal data without it.
    if (body.privacyConsent !== true) {
      return NextResponse.json(
        {
          error: 'Privacy policy consent required',
          hebrewError: 'יש לאשר את מדיניות הפרטיות כדי לשלוח את הטופס',
        },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const toEmail = process.env.CONTACT_TO_EMAIL || 'dgxcoding@gmail.com';

    const phoneLine = body.phone ? `\nטלפון: ${body.phone}` : '';
    const textBody = `הודעה חדשה מטופס יצירת קשר — Traveliga\n\nשם: ${body.name}\nאימייל: ${body.email}${phoneLine}\n\nהודעה:\n${body.message}`;

    const { data, error } = await resend.emails.send({
      from: 'Traveliga <onboarding@resend.dev>',
      to: [toEmail],
      replyTo: body.email,
      subject: `הודעה חדשה מ-${body.name} — Traveliga`,
      text: textBody,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send message', hebrewError: 'שליחת ההודעה נכשלה. אנא נסה שוב.' },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data?.id);

    return NextResponse.json(
      { success: true, message: 'Message sent successfully', hebrewMessage: 'ההודעה נשלחה בהצלחה' },
      { status: 200, headers: { 'X-RateLimit-Remaining': String(remaining) } }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error', hebrewError: 'שגיאת שרת. אנא נסה שוב מאוחר יותר.' },
      { status: 500 }
    );
  }
}

// The contact form posts from this site only, so no cross-origin access is
// granted here — a wildcard would let any site submit through this endpoint.
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: { Allow: 'POST, OPTIONS' },
  });
}
