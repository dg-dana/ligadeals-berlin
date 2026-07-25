'use client'

import { useSyncExternalStore } from 'react'

/**
 * Cookie / analytics consent state.
 *
 * The site sets no tracking cookies until the visitor actively accepts. The
 * choice is kept in localStorage (not a cookie) so that declining leaves no
 * client-side identifier behind at all, and so the banner never reappears for
 * a visitor who already answered.
 *
 * Strictly-necessary storage (accessibility preferences, this consent record)
 * is exempt from consent and is deliberately not covered by this module's gate.
 */

export type CookieConsent = 'accepted' | 'declined'

/**
 * The stored choice, plus the two states that are not a choice:
 * - 'none'    — the visitor has not answered the banner yet
 * - 'pending' — running on the server, or hydrating, so the browser value is
 *               not readable yet. Treat as "assume nothing, load nothing".
 */
export type ConsentValue = CookieConsent | 'none' | 'pending'

export const CONSENT_STORAGE_KEY = 'cookie-consent'

/** Fired on the window whenever the stored choice changes. */
export const CONSENT_CHANGE_EVENT = 'cookie-consent-change'

/** Fired on the window to re-open the banner (e.g. from the footer link). */
export const CONSENT_REOPEN_EVENT = 'cookie-consent-reopen'

function readConsent(): ConsentValue {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    return value === 'accepted' || value === 'declined' ? value : 'none'
  } catch {
    // Private browsing / storage disabled — treat as "not answered yet".
    return 'none'
  }
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange)
  // Keep other open tabs in sync when the choice changes in one of them.
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, onChange)
    window.removeEventListener('storage', onChange)
  }
}

/**
 * Current consent choice, kept in sync with localStorage and with other tabs.
 *
 * Returns 'pending' during SSR and hydration so that server and client render
 * the same markup — nothing consent-dependent appears until the real value is
 * known, which also stops the banner from flashing for returning visitors.
 */
export function useCookieConsent(): ConsentValue {
  return useSyncExternalStore(
    subscribe,
    readConsent,
    () => 'pending' as const
  )
}

export function storeConsent(value: CookieConsent): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value)
  } catch {
    // Storage unavailable: the choice still applies for this page view via the
    // event below, we just cannot remember it for next time.
  }
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT))
}

/** Ask the banner to show itself again so the visitor can change their choice. */
export function reopenConsentBanner(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(CONSENT_REOPEN_EVENT))
}
