'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCookieBite } from 'react-icons/fa'
import {
  CONSENT_REOPEN_EVENT,
  storeConsent,
  useCookieConsent,
  type CookieConsent,
} from '@/lib/consent'

/**
 * Cookie / analytics consent banner.
 *
 * Shown once, until the visitor accepts or declines. Analytics stays unloaded
 * until "accept" is chosen (see components/Analytics.tsx), so declining — or
 * simply ignoring the banner — means no tracking cookies are ever set.
 *
 * The visitor can reopen this from the footer to change their mind.
 */
export default function CookieConsentBanner() {
  const consent = useCookieConsent()
  // Set only when the visitor reopens the banner from the footer to revisit a
  // choice they already made.
  const [reopened, setReopened] = useState(false)
  const bannerRef = useRef<HTMLDivElement>(null)

  // 'pending' covers SSR and hydration, so nothing renders until the stored
  // choice is actually readable — a returning visitor never sees a flash.
  const visible = reopened || consent === 'none'

  // Footer "cookie settings" link asks the banner to come back.
  useEffect(() => {
    const onReopen = () => setReopened(true)
    window.addEventListener(CONSENT_REOPEN_EVENT, onReopen)
    return () => window.removeEventListener(CONSENT_REOPEN_EVENT, onReopen)
  }, [])

  // Move focus to the banner when it appears so keyboard and screen reader
  // users reach the choice without hunting for it.
  useEffect(() => {
    if (visible) bannerRef.current?.focus()
  }, [visible])

  const decide = useCallback((choice: CookieConsent) => {
    storeConsent(choice)
    setReopened(false)
  }, [])

  const buttonBase =
    'rounded-full px-6 py-3 text-sm font-bold transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-gold-400 focus-visible:ring-offset-2'

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={bannerRef}
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-description"
          tabIndex={-1}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25 }}
          dir="rtl"
          className="fixed inset-x-0 bottom-0 z-[70] border-t-4 border-gold-500 bg-white p-4 shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-gold-400 sm:p-6 dark:bg-navy-800"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <FaCookieBite
                className="mt-1 hidden h-6 w-6 flex-shrink-0 text-gold-600 sm:block dark:text-gold-400"
                aria-hidden="true"
              />
              <div>
                <h2
                  id="cookie-banner-title"
                  className="mb-1 text-lg font-bold text-navy-700 dark:text-white"
                >
                  אנחנו מכבדים את הפרטיות שלכם
                </h2>
                <p
                  id="cookie-banner-description"
                  className="text-sm leading-relaxed text-navy-600 dark:text-gray-300"
                >
                  האתר משתמש בקובצי Cookie חיוניים בלבד כדי לתפקד. בנוסף, נשמח להשתמש בכלי
                  אנליטיקה (Google Analytics) כדי להבין איך משתמשים באתר ולשפר אותו - אבל רק
                  באישורכם. אפשר לשנות את הבחירה בכל רגע.{' '}
                  <Link
                    href="/privacy#cookies"
                    className="font-semibold text-gold-800 underline hover:text-gold-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 dark:text-gold-400 dark:hover:text-gold-300"
                  >
                    מידע נוסף במדיניות הפרטיות
                  </Link>
                </p>
              </div>
            </div>

            <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => decide('declined')}
                className={`${buttonBase} border-2 border-navy-300 bg-white text-navy-700 hover:bg-navy-50 dark:border-navy-500 dark:bg-navy-700 dark:text-white dark:hover:bg-navy-600`}
              >
                דחייה
              </button>
              <button
                type="button"
                onClick={() => decide('accepted')}
                className={`${buttonBase} bg-navy-600 text-white hover:bg-navy-700`}
              >
                אישור
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
