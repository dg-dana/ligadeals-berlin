"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export interface OpeningSocial {
  label: string;
  href: string;
  icon: string;
}

interface OpeningPageProps {
  /** Combined next/font variable class names, applied to the splash root. */
  fontClassName: string;
  /** Destination card link target. */
  berlinHref: string;
  socials: OpeningSocial[];
}

type Lang = "en" | "he";

const COPY: Record<
  Lang,
  { dir: "ltr" | "rtl"; tagline: string; subtitle: string; berlin: string }
> = {
  en: {
    dir: "ltr",
    tagline: "Every city has a story.",
    subtitle: "Discover the places that make it unforgettable.",
    berlin: "Traveliga Berlin",
  },
  he: {
    dir: "rtl",
    tagline: "לכל עיר יש סיפור.",
    subtitle: "גלו את המקומות שהופכים אותה לבלתי נשכחת.",
    berlin: "Traveliga ברלין",
  },
};

const STORAGE_KEY = "traveliga-lang";

export default function OpeningPage({ fontClassName, berlinHref, socials }: OpeningPageProps) {
  const [lang, setLang] = useState<Lang>("en");

  // Restore the visitor's previous choice after mount. Reading localStorage
  // during render would break SSR and cause a hydration mismatch, so this is
  // deliberately an effect (best-effort; storage may be blocked).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydrate from persisted preference
      if (saved === "he" || saved === "en") setLang(saved);
    } catch {
      /* ignore */
    }
  }, []);

  const choose = (next: Lang) => {
    setLang(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  const copy = COPY[lang];

  return (
    <div
      dir={copy.dir}
      className={`opening-page ${fontClassName}${lang === "he" ? " is-he" : ""}`}
    >
      <div className="opening-glow" aria-hidden="true" />
      <div className="opening-drift" aria-hidden="true" />
      <div className="opening-vignette" aria-hidden="true" />

      <div className="opening-langswitch u" style={{ animationDelay: "0.1s" }} dir="ltr">
        <button
          type="button"
          className={`opening-langbtn${lang === "en" ? " is-active" : ""}`}
          aria-pressed={lang === "en"}
          onClick={() => choose("en")}
        >
          EN
        </button>
        <button
          type="button"
          className={`opening-langbtn${lang === "he" ? " is-active" : ""}`}
          aria-pressed={lang === "he"}
          onClick={() => choose("he")}
        >
          עב
        </button>
      </div>

      <main className="opening-main">
        <div className="opening-brand">
          <div className="opening-logo u" style={{ animationDelay: "0.05s" }}>
            <Image src="/traveliga-badge.svg" alt="Traveliga" width={104} height={104} priority />
          </div>

          <div className="opening-headline u" style={{ animationDelay: "0.18s" }}>
            <h1 className="opening-wordmark" dir="ltr">
              Traveliga
            </h1>
            <span className="opening-divider" aria-hidden="true" />
            <p className="opening-tagline">{copy.tagline}</p>
            <p className="opening-sub">{copy.subtitle}</p>
          </div>
        </div>

        <div className="opening-cards">
          <Link href={berlinHref} className="opening-card u" style={{ animationDelay: "0.34s" }}>
            <div className="opening-card-media">
              <Image
                src="/images/traveliga-berlin.jpg"
                alt={
                  lang === "he"
                    ? "קו הרקיע של ברלין עם מגדל הטלוויזיה בשעת בין הערביים"
                    : "Berlin skyline with the Fernsehturm at dusk"
                }
                fill
                sizes="(max-width: 640px) calc(100vw - 40px), 440px"
                className="opening-card-image"
              />
              <span className="opening-card-overlay" aria-hidden="true" />
              <span className="opening-card-content">
                <h2 className="opening-card-title">{copy.berlin}</h2>
              </span>
            </div>
          </Link>
        </div>

        <div className="opening-outro u" style={{ animationDelay: "0.62s" }}>
          {socials.length > 0 && (
            <div className="opening-socials" dir="ltr">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="opening-social"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={s.icon}
                    alt=""
                    width={14}
                    height={14}
                    className="opening-social-icon"
                    unoptimized
                  />
                  {s.label}
                </a>
              ))}
            </div>
          )}
          <span className="opening-copy" dir="ltr">
            © {new Date().getFullYear()} Traveliga
          </span>
        </div>
      </main>
    </div>
  );
}
