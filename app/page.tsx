import { Instrument_Serif, Manrope } from "next/font/google";

import OpeningPage, { type OpeningSocial } from "@/components/opening/OpeningPage";
import { getSiteSettings } from "@/lib/sanity/siteSettings";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
});

const manrope = Manrope({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

/**
 * Build the splash social links from the shared Sanity site settings — the
 * same source the site footer uses — so there is a single source of truth.
 * WhatsApp is always available (fallback number); Instagram and Facebook are
 * shown only when configured.
 */
function buildSocials(settings: Awaited<ReturnType<typeof getSiteSettings>>): OpeningSocial[] {
  const socials: OpeningSocial[] = [];

  if (settings.instagram) {
    socials.push({ label: "Instagram", href: settings.instagram, icon: "/icons/instagram.svg" });
  }
  if (settings.facebook) {
    socials.push({ label: "Facebook", href: settings.facebook, icon: "/icons/facebook.svg" });
  }
  if (settings.whatsapp) {
    socials.push({
      label: "WhatsApp",
      href: `https://wa.me/${settings.whatsapp}`,
      icon: "/icons/whatsapp.svg",
    });
  }

  return socials;
}

export default async function Home() {
  const settings = await getSiteSettings();
  const socials = buildSocials(settings);

  return (
    <OpeningPage
      fontClassName={`${instrumentSerif.variable} ${manrope.variable}`}
      berlinHref="/berlin"
      socials={socials}
    />
  );
}
