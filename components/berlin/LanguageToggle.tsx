'use client'

import { LANGUAGES } from '@/lib/i18n/berlin'
import { useLanguage } from './LanguageContext'

const LABELS: Record<(typeof LANGUAGES)[number], string> = {
  he: 'עב',
  en: 'EN',
}

/**
 * Segmented Hebrew/English switch for the Berlin guide, styled as a translucent
 * "glass" pill so it sits naturally on the hero's blue gradient alongside the
 * gold badge. Rendered as a group of two toggle buttons so the active language
 * is exposed to assistive tech via `aria-pressed`.
 */
export default function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useLanguage()

  return (
    <div
      role="group"
      aria-label={t.toggleAriaLabel}
      dir="ltr"
      className={`inline-flex items-center gap-0.5 rounded-full border border-white/30 bg-navy-900/30 p-1 shadow-lg backdrop-blur-md ${className}`}
    >
      {LANGUAGES.map((code) => {
        const active = code === lang
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            className={`rounded-full px-3.5 py-1 text-sm font-semibold tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
              active
                ? 'bg-gold-400 text-navy-900 shadow-sm'
                : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            {LABELS[code]}
          </button>
        )
      })}
    </div>
  )
}
