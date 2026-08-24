import type { Metadata } from "next";
import { Suspense } from "react";
import { Heebo, Assistant } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import SkipToContent from "@/components/SkipToContent";
import MotionProvider from "@/components/MotionProvider";
import { getDefaultMetadata } from "@/lib/seo/metadata";
import { generateWebsiteStructuredData, generateOrganizationStructuredData } from "@/lib/seo/metadata";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

// Use enhanced SEO metadata
export const metadata: Metadata = getDefaultMetadata();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate structured data for website and organization
  const websiteStructuredData = generateWebsiteStructuredData();
  const organizationStructuredData = generateOrganizationStructuredData();

  return (
    <html lang="he" dir="rtl">
      <head>
        {/* Favicon and icons */}
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#282f57" />
        <meta name="color-scheme" content="light" />

        {/* Restore saved accessibility preferences before first paint (no flash) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement;var f=localStorage.getItem('a11y-font-scale');if(f&&f!=='normal')d.setAttribute('data-font-scale',f);if(localStorage.getItem('a11y-contrast')==='high')d.setAttribute('data-contrast','high');if(localStorage.getItem('a11y-reduce-motion')==='true')d.setAttribute('data-reduce-motion','true');}catch(e){}})();`,
          }}
        />

        {/* Site verification tags - Add your verification codes here */}
        {/* <meta name="google-site-verification" content="your-verification-code" /> */}
        {/* <meta name="facebook-domain-verification" content="your-verification-code" /> */}

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
        />
      </head>
      <body
        className={`${heebo.variable} ${assistant.variable} antialiased font-[var(--font-heebo)] min-h-screen flex flex-col`}
      >
        {/* Google Analytics - Only loads in production */}
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>

        {/* Skip to content link for keyboard accessibility */}
        <SkipToContent />

        {/* MotionProvider makes all Framer Motion animations respect the user's
            reduced-motion preference (OS setting or accessibility widget).

            The site chrome (Navigation, footer, floating widgets) is rendered by
            the app/(site)/layout.tsx route-group layout, so it wraps every page
            except the home splash at app/page.tsx. Each of those layouts supplies
            its own <main id="main-content"> landmark. */}
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
