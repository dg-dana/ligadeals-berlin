import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

// Can be imported from a shared config
export const locales = ['he', 'en', 'de'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'he'

export const localeNames: Record<Locale, string> = {
  he: 'עברית',
  en: 'English',
  de: 'Deutsch'
}

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale

  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as Locale)) {
    notFound()
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  }
})
