import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import { LanguageProvider } from "@/components/berlin/LanguageContext";
import { getSiteSettings } from "@/lib/sanity/siteSettings";

/**
 * Layout for every content page except the home splash. It renders the shared
 * site chrome (sticky Navigation, footer and floating widgets) around the page.
 *
 * The home splash lives at app/page.tsx, outside this route group, so it never
 * inherits this chrome — no client-side pathname check required. Gating the
 * chrome with usePathname() used to leak the header/footer into the statically
 * prerendered homepage HTML, which this structure avoids entirely.
 */
export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    // The Berlin guide's Hebrew/English switch lives in the header, so the
    // language provider wraps the shared chrome and the page content together.
    // Only the Berlin route surfaces the toggle and consumes the language.
    <LanguageProvider>
      <Navigation />
      <main id="main-content" className="flex-grow" tabIndex={-1}>
        {children}
      </main>
      <Footer settings={settings} />
      <FloatingWhatsApp phoneNumber={settings.whatsapp} />
      <AccessibilityWidget />
      <CookieConsentBanner />
    </LanguageProvider>
  );
}
