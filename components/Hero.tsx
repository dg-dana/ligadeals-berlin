'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Button from '@/components/Button'
import { useReducedMotion } from '@/lib/a11y/useReducedMotion'

export default function Hero() {
  const reduceMotion = useReducedMotion()
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #2a5a9a 0%, #4a7ab8 32%, #6898d0 60%, #90b8e0 74%, #4a6c98 88%, #3a5878 100%)',
      }}
    >
      {/* Gradient overlay — keeps sky visible at top, darkens toward skyline for text readability, but stays light enough at the bottom for the skyline silhouette to read against it */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(26,39,68,.06) 0%, rgba(26,39,68,.20) 38%, rgba(26,39,68,.45) 68%, rgba(15,23,42,.55) 100%)',
        }}
      />

      {/* Cloud wisps */}
      <div className="pointer-events-none absolute top-[7%] left-[6%] h-10 w-44 rounded-full bg-white/80 blur-2xl" />
      <div className="pointer-events-none absolute top-[11%] left-[18%] h-8 w-32 rounded-full bg-white/75 blur-2xl" />
      <div className="pointer-events-none absolute top-[6%] right-[9%] h-12 w-48 rounded-full bg-white/80 blur-2xl" />
      <div className="pointer-events-none absolute top-[15%] right-[25%] h-7 w-24 rounded-full bg-white/65 blur-xl" />
      <div className="pointer-events-none absolute top-[4%] left-[44%] h-7 w-20 rounded-full bg-white/70 blur-xl" />

      {/* Airplane Animation — decorative; suppressed when reduced motion is requested */}
      {!reduceMotion && (
        <motion.div
          className="absolute top-1/4 right-0"
          aria-hidden="true"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: -1200, opacity: [0, 1, 1, 0] }}
          transition={{ duration: 15, repeat: Infinity, repeatDelay: 5 }}
        >
          <svg width="60" height="60" viewBox="0 0 24 24" fill="white" opacity="0.9">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
          </svg>
        </motion.div>
      )}

      {/* Main Content.
          The copy is centred in the space left over after the scroll cue, which
          sits in normal flow underneath it. The cue used to be absolutely
          positioned at bottom-24, so on short (laptop) viewports the centred
          block grew down into it and the CTA buttons collided with it. */}
      <div className="relative z-10 flex min-h-screen flex-col items-center px-4 text-center">
        <div className="flex flex-1 flex-col items-center justify-center py-12">
          {/* Badge */}
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-block rounded-full border border-gold-300/60 bg-navy-800/60 px-5 py-1.5 text-sm font-semibold tracking-wide text-gold-200"
            dir="rtl"
          >
            מדריך ברלין לישראלים
          </motion.span>

          {/* Main Headline */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 text-center text-4xl font-bold text-white md:text-6xl lg:text-7xl"
            dir="rtl"
          >
            גלו את ברלין <span className="text-gold-400">בצורה אישית</span> ובלתי נשכחת
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-10 max-w-2xl text-center text-lg text-white md:text-xl lg:text-2xl"
            dir="rtl"
          >
            מדריכים, המלצות מקומיות וליווי אישי צמוד
            <br />
            מתכנון החופשה ועד החזרה הביתה
            <br />
            הכל בעברית ברוח ישראלית
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col gap-4 sm:flex-row sm:gap-6"
            dir="rtl"
          >
            <Button href="/contact" variant="gold" size="lg">
              צרו קשר עכשיו
            </Button>

            <Button href="/blog" variant="outline" size="lg">
              קראו את הבלוג
            </Button>
          </motion.div>
        </div>

        {/* Scroll Down Indicator — in flow, so it can never overlap the CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="shrink-0 pb-24"
        >
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
            transition={reduceMotion ? undefined : { duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-sm text-white" dir="rtl">גלול למטה</span>
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Berlin skyline silhouette — sized to its true aspect ratio, never stretched */}
      <Image
        src="/images/berlin-skyline.png"
        alt=""
        width={1024}
        height={284}
        priority
        className="pointer-events-none absolute bottom-0 left-0 h-auto w-full"
      />
    </section>
  )
}
