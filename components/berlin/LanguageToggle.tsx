'use client'

import { LANGUAGES } from '@/lib/i18n/berlin'
import { useLanguage } from './LanguageContext'

const LABELS: Record<(typeof LANGUAGES)[number], string> = {
  he: 'עב',
  en: 'EN',
}

/**
 * Segmented Hebrew/English switch for the Berlin guide. Rendered as a group of
 * two toggle buttons so the active language is exposed to assistive tech via
 * `aria-pressed` and the whole control has an accessible group label.
 */
export default function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useLanguage()

  return (
    <div
      role="group"
      aria-label={t.toggleAriaLabel}
      dir="ltr"
      className={`inline-flex items-center gap-1 rounded-full border border-navy-200 bg-white/90 p-1 shadow-sm backdrop-blur dark:border-navy-600 dark:bg-navy-800/90 ${className}`}
    >
      {LANGUAGES.map((code) => {
        const active = code === lang
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            className={`rounded-full px-3 py-1 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
              active
                ? 'bg-navy-700 text-white dark:bg-gold-400 dark:text-navy-900'
                : 'text-navy-600 hover:bg-navy-100 dark:text-cream-200 dark:hover:bg-navy-700'
            }`}
          >
            {LABELS[code]}
          </button>
        )
      })}
    </div>
  )
}
