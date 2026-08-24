'use client'

import { LANGUAGES } from '@/lib/i18n/berlin'
import { useLanguage } from './LanguageContext'

const LABELS: Record<(typeof LANGUAGES)[number], string> = {
  he: 'עב',
  en: 'EN',
}

// Explicit visual order (left → right): EN on the left, עב on the right.
// Fixed here rather than relying on `dir`, so inherited direction can't flip it.
const DISPLAY_ORDER = ['en', 'he'] as const

/**
 * Compact Hebrew/English switch that lives in the site header. Rendered as a
 * group of two toggle buttons so the active language is exposed to assistive
 * tech via `aria-pressed`. Sized to sit inline in the navigation bar.
 */
export default function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useLanguage()

  return (
    <div
      role="group"
      aria-label={t.toggleAriaLabel}
      dir="ltr"
      className={`inline-flex items-center rounded-full border border-navy-200 bg-white/70 p-0.5 dark:border-navy-600 dark:bg-navy-900/40 ${className}`}
    >
      {DISPLAY_ORDER.map((code) => {
        const active = code === lang
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            className={`rounded-full px-2 py-0.5 text-xs font-bold leading-none transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
              active
                ? 'bg-navy-700 text-white dark:bg-gold-400 dark:text-navy-900'
                : 'text-navy-500 hover:text-navy-700 dark:text-cream-200 dark:hover:text-white'
            }`}
          >
            {LABELS[code]}
          </button>
        )
      })}
    </div>
  )
}
