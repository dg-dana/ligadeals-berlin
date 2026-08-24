'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  dirForLanguage,
  getBerlinDictionary,
  localeForLanguage,
  type BerlinDictionary,
  type Language,
} from '@/lib/i18n/berlin'

interface LanguageContextValue {
  lang: Language
  setLang: (lang: Language) => void
  toggle: () => void
  dir: 'rtl' | 'ltr'
  locale: string
  /** Dictionary of translated strings for the active language. */
  t: BerlinDictionary
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function isLanguage(value: unknown): value is Language {
  return value === 'he' || value === 'en'
}

/**
 * Provides the Berlin guide's active language to the client subtree. The choice
 * is persisted to localStorage so it survives navigation and repeat visits.
 *
 * The provider is intentionally scoped to the guide — the rest of the site
 * stays Hebrew/RTL — so it never touches the document `<html>` element.
 */
export function LanguageProvider({
  children,
  initialLanguage = DEFAULT_LANGUAGE,
}: {
  children: React.ReactNode
  initialLanguage?: Language
}) {
  const [lang, setLangState] = useState<Language>(initialLanguage)

  // Restore the saved preference after mount (localStorage is client-only, and
  // reading it during render would cause a hydration mismatch).
  useEffect(() => {
    const syncFromStorage = () => {
      try {
        const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY)
        if (isLanguage(stored)) {
          setLangState(stored)
        }
      } catch {
        // Private mode / storage disabled — fall back to the default language.
      }
    }
    syncFromStorage()
  }, [])

  const setLang = useCallback((next: Language) => {
    setLangState(next)
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, next)
    } catch {
      // Ignore persistence failures; the in-memory choice still applies.
    }
  }, [])

  const toggle = useCallback(() => {
    setLang(lang === 'he' ? 'en' : 'he')
  }, [lang, setLang])

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      toggle,
      dir: dirForLanguage(lang),
      locale: localeForLanguage(lang),
      t: getBerlinDictionary(lang),
    }),
    [lang, setLang, toggle],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return ctx
}
