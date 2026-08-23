import Image from "next/image";
import Link from "next/link";
import { Instrument_Serif, Manrope } from "next/font/google";

import LanguageToggle from "@/components/opening/LanguageToggle";

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

interface Destination {
  slug: string;
  title: string;
  href: string;
  image: string;
  imageAlt: string;
}

const destinations: Destination[] = [
  {
    slug: "berlin",
    title: "Traveliga Berlin",
    href: "/berlin",
    image: "/images/traveliga-berlin.jpg",
    imageAlt: "Berlin skyline with the Fernsehturm at dusk",
  },
];

const socials: { label: string; href: string }[] = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "TikTok", href: "#" },
];

export default function Home() {
  return (
    <div
      dir="ltr"
      className={`opening-page ${instrumentSerif.variable} ${manrope.variable}`}
    >
      <div className="opening-glow" aria-hidden="true" />
      <div className="opening-drift" aria-hidden="true" />
      <div className="opening-vignette" aria-hidden="true" />

      <LanguageToggle />

      <main className="opening-main">
        <div className="opening-brand">
          <div className="opening-logo u" style={{ animationDelay: "0.05s" }}>
            <Image
              src="/traveliga-badge.svg"
              alt="Traveliga"
              width={104}
              height={104}
              priority
            />
          </div>

          <div className="opening-headline u" style={{ animationDelay: "0.18s" }}>
            <h1 className="opening-wordmark">Traveliga</h1>
            <span className="opening-divider" aria-hidden="true" />
            <p className="opening-tagline">Every city has a story.</p>
            <p className="opening-sub">
              Discover the places that make it unforgettable.
            </p>
          </div>
        </div>

        <div className="opening-cards">
          {destinations.map((d) => (
            <Link
              key={d.slug}
              href={d.href}
              className="opening-card u"
              style={{ animationDelay: "0.34s" }}
            >
              <div className="opening-card-media">
                <Image
                  src={d.image}
                  alt={d.imageAlt}
                  fill
                  sizes="(max-width: 640px) calc(100vw - 40px), 440px"
                  className="opening-card-image"
                />
                <span className="opening-card-overlay" aria-hidden="true" />
                <span className="opening-card-content">
                  <h2 className="opening-card-title">{d.title}</h2>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="opening-outro u" style={{ animationDelay: "0.62s" }}>
          <div className="opening-socials">
            {socials.map((s) => (
              <a key={s.label} href={s.href} className="opening-social">
                {s.label}
              </a>
            ))}
          </div>
          <span className="opening-copy">© {new Date().getFullYear()} Traveliga</span>
        </div>
      </main>
    </div>
  );
}
