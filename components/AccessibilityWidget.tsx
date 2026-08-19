'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { FaUniversalAccess, FaTimes, FaPlus, FaMinus, FaAdjust, FaWalking, FaUndo } from 'react-icons/fa'

/**
 * Accessibility controls (Israeli Standard 5568 practice).
 *
 * Native, code-level accessibility is the foundation of this site; this widget
 * augments it with user-adjustable preferences — text size, high contrast and
 * reduced motion — that are keyboard operable, expose ARIA state, persist
 * between visits and never interfere with browser zoom or OS assistive tools.
 *
 * Preferences are applied as data attributes on <html> and consumed by CSS in
 * globals.css. The no-flash inline script in app/layout.tsx restores them
 * before first paint; this component keeps them in sync at runtime.
 */

type FontScale = 'normal' | 'large' | 'xlarge'

const STORAGE = {
  font: 'a11y-font-scale',
  contrast: 'a11y-contrast',
  motion: 'a11y-reduce-motion',
} as const

const FONT_ORDER: FontScale[] = ['normal', 'large', 'xlarge']

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false)
  // Initial values mirror what the inline no-flash script in layout.tsx already
  // applied to <html>. The panel is closed on first render, so these never
  // affect server/client hydration output.
  const [fontScale, setFontScale] = useState<FontScale>(() =>
    typeof document === 'undefined'
      ? 'normal'
      : (document.documentElement.getAttribute('data-font-scale') as FontScale) || 'normal'
  )
  const [highContrast, setHighContrast] = useState(() =>
    typeof document !== 'undefined' &&
    document.documentElement.getAttribute('data-contrast') === 'high'
  )
  const [reduceMotion, setReduceMotion] = useState(() =>
    typeof document !== 'undefined' &&
    document.documentElement.getAttribute('data-reduce-motion') === 'true'
  )

  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const applyFont = useCallback((scale: FontScale) => {
    setFontScale(scale)
    const root = document.documentElement
    if (scale === 'normal') root.removeAttribute('data-font-scale')
    else root.setAttribute('data-font-scale', scale)
    try {
      localStorage.setItem(STORAGE.font, scale)
    } catch {}
  }, [])

  const applyContrast = useCallback((high: boolean) => {
    setHighContrast(high)
    const root = document.documentElement
    if (high) root.setAttribute('data-contrast', 'high')
    else root.removeAttribute('data-contrast')
    try {
      localStorage.setItem(STORAGE.contrast, high ? 'high' : 'normal')
    } catch {}
  }, [])

  const applyMotion = useCallback((reduce: boolean) => {
    setReduceMotion(reduce)
    const root = document.documentElement
    if (reduce) root.setAttribute('data-reduce-motion', 'true')
    else root.removeAttribute('data-reduce-motion')
    try {
      localStorage.setItem(STORAGE.motion, reduce ? 'true' : 'false')
    } catch {}
    // Notify JS-driven animations (see lib/a11y/useReducedMotion).
    window.dispatchEvent(new Event('a11y-motion-change'))
  }, [])

  const increaseFont = () => {
    const i = FONT_ORDER.indexOf(fontScale)
    if (i < FONT_ORDER.length - 1) applyFont(FONT_ORDER[i + 1])
  }
  const decreaseFont = () => {
    const i = FONT_ORDER.indexOf(fontScale)
    if (i > 0) applyFont(FONT_ORDER[i - 1])
  }

  const resetAll = () => {
    applyFont('normal')
    applyContrast(false)
    applyMotion(false)
  }

  // Close on Escape and return focus to the toggle button.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // Close when clicking outside the panel.
  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !toggleRef.current?.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  // Move focus into the panel when it opens.
  useEffect(() => {
    if (open) panelRef.current?.querySelector<HTMLElement>('button, a')?.focus()
  }, [open])

  const btnBase =
    'flex w-full items-center justify-between gap-3 rounded-lg border-2 px-4 py-3 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2'
  const btnOn = 'border-navy-600 bg-navy-600 text-white'
  const btnOff =
    'border-navy-200 bg-white text-navy-700 hover:bg-navy-50 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:hover:bg-navy-600'

  return (
    <div className="fixed bottom-6 right-6 z-[60]" dir="rtl">
      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          id="a11y-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="a11y-panel-title"
          className="absolute bottom-16 right-0 w-72 rounded-2xl border border-navy-100 bg-white p-5 shadow-2xl dark:border-navy-600 dark:bg-navy-800"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 id="a11y-panel-title" className="text-lg font-bold text-navy-700 dark:text-white">
              תפריט נגישות
            </h2>
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                toggleRef.current?.focus()
              }}
              aria-label="סגירת תפריט נגישות"
              className="rounded-lg p-1.5 text-navy-500 hover:bg-navy-50 dark:text-cream-200 dark:hover:bg-navy-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            >
              <FaTimes className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Text size */}
          <div className="mb-4">
            <p className="mb-2 text-sm font-semibold text-navy-600 dark:text-cream-200">
              גודל טקסט
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={decreaseFont}
                disabled={fontScale === 'normal'}
                aria-label="הקטנת גודל הטקסט"
                className={`${btnBase} ${btnOff} justify-center disabled:cursor-not-allowed disabled:opacity-40`}
              >
                <FaMinus className="h-3 w-3" aria-hidden="true" />
              </button>
              <span
                className="min-w-[3.5rem] text-center text-sm font-medium text-navy-700 dark:text-white"
                aria-live="polite"
              >
                {fontScale === 'normal' ? 'רגיל' : fontScale === 'large' ? 'גדול' : 'גדול מאוד'}
              </span>
              <button
                type="button"
                onClick={increaseFont}
                disabled={fontScale === 'xlarge'}
                aria-label="הגדלת גודל הטקסט"
                className={`${btnBase} ${btnOff} justify-center disabled:cursor-not-allowed disabled:opacity-40`}
              >
                <FaPlus className="h-3 w-3" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* High contrast */}
          <button
            type="button"
            onClick={() => applyContrast(!highContrast)}
            aria-pressed={highContrast}
            className={`${btnBase} mb-3 ${highContrast ? btnOn : btnOff}`}
          >
            <span className="flex items-center gap-2">
              <FaAdjust className="h-4 w-4" aria-hidden="true" />
              ניגודיות גבוהה
            </span>
            <span className="text-xs">{highContrast ? 'פעיל' : 'כבוי'}</span>
          </button>

          {/* Reduce motion */}
          <button
            type="button"
            onClick={() => applyMotion(!reduceMotion)}
            aria-pressed={reduceMotion}
            className={`${btnBase} mb-4 ${reduceMotion ? btnOn : btnOff}`}
          >
            <span className="flex items-center gap-2">
              <FaWalking className="h-4 w-4" aria-hidden="true" />
              הפחתת אנימציות
            </span>
            <span className="text-xs">{reduceMotion ? 'פעיל' : 'כבוי'}</span>
          </button>

          {/* Reset + statement link */}
          <button
            type="button"
            onClick={resetAll}
            className={`${btnBase} ${btnOff} mb-3 justify-center`}
          >
            <FaUndo className="h-3 w-3" aria-hidden="true" />
            איפוס הגדרות
          </button>
          <Link
            href="/accessibility"
            onClick={() => setOpen(false)}
            className="block text-center text-sm font-semibold text-gold-700 underline hover:text-gold-800 dark:text-gold-400 dark:hover:text-gold-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded"
          >
            להצהרת הנגישות המלאה
          </Link>
        </div>
      )}

      {/* Toggle button */}
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="תפריט נגישות"
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-haspopup="dialog"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-600 text-white shadow-2xl transition-colors hover:bg-navy-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-gold-400"
      >
        <FaUniversalAccess className="h-7 w-7" aria-hidden="true" />
      </button>
    </div>
  )
}
