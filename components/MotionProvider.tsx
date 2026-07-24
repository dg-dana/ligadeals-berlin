'use client'

import { MotionConfig } from 'framer-motion'
import { useReducedMotion } from '@/lib/a11y/useReducedMotion'

/**
 * Applies the user's reduced-motion preference to every Framer Motion component
 * in the tree at once.
 *
 * - `reducedMotion="always"` when the user has asked to reduce motion (OS
 *   prefers-reduced-motion or the accessibility widget toggle) — Framer then
 *   skips transform/layout animations (movement) while still allowing opacity
 *   fades, which are not motion.
 * - `reducedMotion="user"` otherwise, so Framer still honours the OS setting on
 *   its own.
 *
 * This covers modal, gallery and card animations centrally, complementing the
 * per-component guards used for infinite looping animations.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion()
  return <MotionConfig reducedMotion={reduced ? 'always' : 'user'}>{children}</MotionConfig>
}
