import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limiting configuration
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10); // 1 minute default
const MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10); // 100 requests default

// In-memory rate limit store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, RATE_LIMIT_WINDOW);

// Check if request exceeds rate limit
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return false;
  }

  if (record.count >= MAX_REQUESTS) {
    return true;
  }

  record.count += 1;
  rateLimitStore.set(ip, record);
  return false;
}

// Get allowed origins from environment
function getAllowedOrigins(): string[] {
  const origins = process.env.ALLOWED_ORIGINS || '';
  return origins.split(',').filter(Boolean);
}

// Check if origin is allowed
function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return true; // Allow requests without origin (same-origin)

  const allowedOrigins = getAllowedOrigins();

  // If no specific origins configured, allow same origin only in production
  if (allowedOrigins.length === 0) {
    return process.env.NODE_ENV !== 'production';
  }

  return allowedOrigins.includes(origin);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const origin = request.headers.get('origin');

  // Get client IP
  const ip = request.headers.get('x-forwarded-for') ||
             request.headers.get('x-real-ip') ||
             'unknown';

  // Apply rate limiting only to API routes
  if (pathname.startsWith('/api/')) {
    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error: 'Too many requests',
          hebrewError: 'יותר מדי בקשות. אנא המתן מעט.'
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil(RATE_LIMIT_WINDOW / 1000)),
          }
        }
      );
    }

    // CORS handling for API routes
    if (origin && !isOriginAllowed(origin)) {
      return NextResponse.json(
        { error: 'CORS policy: Origin not allowed' },
        { status: 403 }
      );
    }
  }

  // Continue with the request
  const response = NextResponse.next();

  // Add CORS headers for allowed origins
  if (origin && isOriginAllowed(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  // Add security headers (these are also in next.config.ts, but adding here as fallback)
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  return response;
}

// Configure which routes use the middleware
export const config = {
  matcher: [
    // Match all API routes
    '/api/:path*',
    // Match all routes except static files and internal Next.js routes
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
