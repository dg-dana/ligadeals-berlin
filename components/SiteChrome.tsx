"use client";

import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import type { SiteSettings } from "@/lib/sanity/siteSettings";

export default function SiteChrome({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <>
      <Navigation />
      <Footer settings={settings} />
      <FloatingWhatsApp phoneNumber={settings.whatsapp} />
      <AccessibilityWidget />
      <CookieConsentBanner />
    </>
  );
}
