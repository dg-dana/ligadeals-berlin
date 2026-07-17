'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Button from '@/components/Button'

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-navy-800">
      {/* Berlin skyline illustration */}
      <Image
        src="/images/berlin-skyline.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-bottom"
      />

      {/* Gradient overlay — darkens toward skyline for text readability */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(26,39,68,.06) 0%, rgba(26,39,68,.20) 38%, rgba(26,39,68,.55) 68%, rgba(7,13,24,.88) 100%)',
        }}
      />

      {/* Airplane Animation */}
      <motion.div
        className="absolute top-1/4 right-0"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: -1200, opacity: [0, 1, 1, 0] }}
        transition={{ duration: 15, repeat: Infinity, repeatDelay: 5 }}
      >
        <svg width="60" height="60" viewBox="0 0 24 24" fill="white" opacity="0.9">
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
        </svg>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        {/* Badge */}
        <motion.span
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-block rounded-full border border-gold-400/40 bg-gold-400/10 px-5 py-1.5 text-sm font-semibold tracking-wide text-gold-300"
          dir="rtl"
        >
          מדריך ברלין לישראלים
        </motion.span>

        {/* Main Headline */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 text-4xl font-bold text-white md:text-6xl lg:text-7xl"
          dir="rtl"
        >
          גלו את ברלין <span className="text-gold-400">בצורה אישית</span> ובלתי נשכחת
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-10 max-w-2xl text-lg text-navy-100 md:text-xl lg:text-2xl"
          dir="rtl"
        >
          מסעדות, אירועים, שכונות ועצות מקומיות — הכל במקום אחד, בעברית
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

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-24"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-sm text-navy-200" dir="rtl">גלול למטה</span>
            <svg
              className="h-6 w-6 text-navy-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
    </section>
  )
}
