'use client'

import { useEffect, useState } from 'react'

/**
 * Returns true when non-essential motion should be suppressed — either because
 * the operating system requests it (prefers-reduced-motion) or because the user
 * enabled "reduce motion" in the site's accessibility widget
 * (html[data-reduce-motion="true"]).
 *
 * Use this to gate JS-driven animations (e.g. Framer Motion loops) that CSS
 * media queries cannot stop on their own.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')

    const compute = () =>
      media.matches ||
      document.documentElement.getAttribute('data-reduce-motion') === 'true'

    const update = () => setReduced(compute())
    update()

    media.addEventListener('change', update)
    // Dispatched by the accessibility widget when the toggle changes.
    window.addEventListener('a11y-motion-change', update)

    return () => {
      media.removeEventListener('change', update)
      window.removeEventListener('a11y-motion-change', update)
    }
  }, [])

  return reduced
}
