'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

/**
 * Google Analytics 4 Component
 * Integrates GA4 and Google Tag Manager
 * GDPR compliant with privacy-friendly tracking
 */
export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views on route changes
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

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
  }, [pathname, searchParams]);

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

            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure',
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
