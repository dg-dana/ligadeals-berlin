import type { NextRequest } from 'next/server';

/**
 * Same-origin guard for the site's own form endpoints.
 *
 * Browsers always attach an Origin header to cross-site POSTs, so rejecting a
 * mismatch stops another site from driving these endpoints with a visitor's
 * browser. Requests with no Origin at all (server-to-server, curl) are left to
 * the per-route rate limiting rather than blocked outright.
 */
export function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  try {
    return new URL(origin).host === (request.headers.get('host') ?? request.nextUrl.host);
  } catch {
    return false;
  }
}
