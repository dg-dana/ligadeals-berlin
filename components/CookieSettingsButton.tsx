'use client'

import { reopenConsentBanner } from '@/lib/consent'

/**
 * Footer control that brings the cookie banner back so a visitor can change
 * the analytics choice they made earlier.
 */
export default function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={reopenConsentBanner} className={className}>
      הגדרות Cookie
    </button>
  )
}
