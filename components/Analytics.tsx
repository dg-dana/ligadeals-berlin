'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCookieConsent } from '@/lib/consent';

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set' | 'consent',
      targetId: string | Date | Record<string, unknown>,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

/**
 * Google Analytics 4 Component
 *
 * Nothing is loaded until the visitor accepts analytics in the cookie banner
 * (GDPR Art. 6(1)(a) / TDDDG §25(1)), so a visitor who declines or ignores the
 * banner never receives a Google Analytics cookie. Accepting takes effect
 * immediately — no page reload needed — via the consent-change event.
 */
export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // 'pending' during SSR and hydration, so nothing loads until the visitor's
  // stored choice is actually readable.
  const consent = useCookieConsent();

  // Track page views on route changes
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || consent !== 'accepted') return;

    // Build full URL
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    // Send pageview event to GA4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
        page_title: document.title,
        page_location: window.location.href,
      });

      // Log for debugging (only in development)
      if (process.env.NODE_ENV === 'development') {
        console.log('GA4 Pageview:', { url, title: document.title });
      }
    }
  }, [pathname, searchParams, consent]);

  // No analytics consent (declined, or banner not answered yet) — load nothing.
  if (consent !== 'accepted') {
    return null;
  }

  // Don't render if GA_MEASUREMENT_ID is not set
  if (!GA_MEASUREMENT_ID) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        'Google Analytics is not configured. Add NEXT_PUBLIC_GA_MEASUREMENT_ID to your environment variables.'
      );
    }
    return null;
  }

  // Only load analytics in production or if explicitly enabled
  const shouldLoadAnalytics =
    process.env.NODE_ENV === 'production' ||
    process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true';

  if (!shouldLoadAnalytics) {
    return null;
  }

  return (
    <>
      {/* Google Tag Manager / Google Analytics 4 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
        onLoad={() => {
          if (process.env.NODE_ENV === 'development') {
            console.log('Google Analytics loaded:', GA_MEASUREMENT_ID);
          }
        }}
      />

      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // This script only runs once analytics consent was given. No
            // advertising storage is ever used — the site runs no ad products.
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'granted'
            });

            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              cookie_flags: 'SameSite=Lax;Secure',
              allow_google_signals: false,
              allow_ad_personalization_signals: false,
              send_page_view: true
            });
          `,
        }}
      />
    </>
  );
}

/**
 * Consent Mode Configuration (GDPR Compliant)
 * Call this function before loading Analytics if you need explicit consent
 */
export function initializeConsent(
  config: {
    analytics: boolean;
    marketing: boolean;
  } = { analytics: true, marketing: true }
) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('consent', 'default', {
    ad_storage: config.marketing ? 'granted' : 'denied',
    analytics_storage: config.analytics ? 'granted' : 'denied',
    ad_user_data: config.marketing ? 'granted' : 'denied',
    ad_personalization: config.marketing ? 'granted' : 'denied',
    wait_for_update: 500,
  });
}

/**
 * Update consent settings
 */
export function updateConsent(
  config: {
    analytics: boolean;
    marketing: boolean;
  }
) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('consent', 'update', {
    ad_storage: config.marketing ? 'granted' : 'denied',
    analytics_storage: config.analytics ? 'granted' : 'denied',
    ad_user_data: config.marketing ? 'granted' : 'denied',
    ad_personalization: config.marketing ? 'granted' : 'denied',
  });
}
