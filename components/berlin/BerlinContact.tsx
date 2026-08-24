'use client'

import Button from '@/components/Button'
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa'
import { useLanguage } from './LanguageContext'

/**
 * Contact preview for the Berlin guide. Contact details come from Sanity site
 * settings (passed in from the server); the surrounding copy is translated.
 */
export default function BerlinContact({ email, phone }: { email: string; phone: string }) {
  const { t, dir } = useLanguage()

  return (
    <section className="py-16 px-4 bg-cream-100 dark:bg-navy-800" dir={dir}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-navy-700 dark:text-white mb-4">
          {t.contact.title}
        </h2>
        <p className="text-navy-400 dark:text-cream-200 mb-8 text-lg">
          {t.contact.subtitle}
        </p>
        <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
          <div className="bg-white dark:bg-navy-700 p-6 rounded-2xl shadow-sm ring-1 ring-navy-100 dark:ring-navy-600">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-700 dark:bg-navy-600/50 dark:text-gold-400">
              <FaEnvelope className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-navy-700 dark:text-white mb-2">{t.contact.emailLabel}</h3>
            <p className="text-navy-400 dark:text-cream-200">{email}</p>
          </div>
          <div className="bg-white dark:bg-navy-700 p-6 rounded-2xl shadow-sm ring-1 ring-navy-100 dark:ring-navy-600">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-navy-100 text-navy-600 dark:bg-navy-600/50 dark:text-navy-200">
              <FaPhoneAlt className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-navy-700 dark:text-white mb-2">{t.contact.phoneLabel}</h3>
            <p className="text-navy-400 dark:text-cream-200" dir="ltr">{phone}</p>
          </div>
        </div>
        <Button href="/contact" variant="gold">
          {t.contact.button}
        </Button>
      </div>
    </section>
  )
}
