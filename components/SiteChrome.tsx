"use client";

import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import type { SiteSettings } from "@/lib/sanity/siteSettings";

export default function SiteChrome({
  settings,
  slot = "body",
}: {
  settings: SiteSettings;
  /**
   * "header" renders the sticky Navigation, which must sit before the page
   * content so it can stick to the top of the viewport. "body" renders the
   * footer and floating widgets, which sit after the content.
   */
  slot?: "header" | "body";
}) {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  if (slot === "header") {
    return <Navigation />;
  }

  return (
    <>
      <Footer settings={settings} />
      <FloatingWhatsApp phoneNumber={settings.whatsapp} />
      <AccessibilityWidget />
      <CookieConsentBanner />
    </>
  );
}
