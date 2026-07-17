import { NextRequest, NextResponse } from 'next/server';

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

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

    const payload: Record<string, string> = {
      access_key: process.env.WEB3FORMS_ACCESS_KEY || '',
      subject: `הודעה חדשה מ-${body.name} — Liga Deals Berlin`,
      name: body.name,
      email: body.email,
      message: body.message,
    };
    if (body.phone) payload.phone = body.phone;

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });

    const contentType = response.headers.get('content-type') || '';
    const rawBody = await response.text();

    if (!contentType.includes('application/json')) {
      console.error('Web3Forms returned non-JSON:', response.status, rawBody.slice(0, 300));
      return NextResponse.json(
        { error: 'Failed to send message', hebrewError: 'שליחת ההודעה נכשלה. אנא נסה שוב.' },
        { status: 500 }
      );
    }

    const result = JSON.parse(rawBody);

    if (!result.success) {
      console.error('Web3Forms error:', result);
      return NextResponse.json(
        { error: 'Failed to send message', hebrewError: 'שליחת ההודעה נכשלה. אנא נסה שוב.' },
        { status: 500 }
      );
    }

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

export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
