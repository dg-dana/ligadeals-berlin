"use client";

import { useState } from "react";

/**
 * Language switcher for the opening page.
 *
 * Mirrors the Claude Design mock: an EN / עב pill that highlights the active
 * choice. It currently only tracks the selection visually — wiring it to real
 * translations is a follow-up. Kept as a client component so the rest of the
 * splash can stay a server component.
 */
export default function LanguageToggle() {
  const [lang, setLang] = useState<"en" | "he">("en");

  return (
    <div className="opening-langswitch u" style={{ animationDelay: "0.1s" }}>
      <button
        type="button"
        className={`opening-langbtn${lang === "en" ? " is-active" : ""}`}
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
      >
        EN
      </button>
      <button
        type="button"
        className={`opening-langbtn${lang === "he" ? " is-active" : ""}`}
        aria-pressed={lang === "he"}
        onClick={() => setLang("he")}
      >
        עב
      </button>
    </div>
  );
}
