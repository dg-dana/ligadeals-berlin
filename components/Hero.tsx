'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-navy-700 via-navy-600 to-navy-800">
      {/* Soft glow accents for warmth */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gold-400/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-24 h-72 w-72 rounded-full bg-gold-300/10 blur-3xl" />

      {/* Airplane Animation */}
      <motion.div
        className="absolute top-1/4 right-0"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: -1200, opacity: [0, 1, 1, 0] }}
        transition={{ duration: 15, repeat: Infinity, repeatDelay: 5 }}
      >
        <svg width="60" height="60" viewBox="0 0 24 24" fill="#eccc6c" opacity="0.5">
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
          מועדון ההטבות של ברלין
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
          שירותי נסיעות אישיים מותאמים במיוחד עבורכם - גלו מסעדות מעולות, אירועים מיוחדים והטבות בלעדיות בברלין
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col gap-4 sm:flex-row sm:gap-6"
          dir="rtl"
        >
          <Link
            href="/contact"
            className="group relative overflow-hidden rounded-full bg-gold-400 px-8 py-4 text-lg font-semibold text-navy-800 shadow-lg transition-all hover:scale-105 hover:bg-gold-300 hover:shadow-2xl"
          >
            <span className="relative z-10">צרו קשר עכשיו</span>
          </Link>

          <Link
            href="/blog"
            className="group rounded-full border-2 border-white/70 bg-transparent px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-white hover:text-navy-700 hover:shadow-2xl"
          >
            קראו את הבלוג
          </Link>
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

      {/* Berlin skyline silhouette, echoing the logo motif */}
      <svg
        className="absolute bottom-0 left-0 right-0 h-24 w-full text-navy-900/60 md:h-32"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M0,120 L0,70 L20,70 L20,50 L35,50 L35,70 L55,70 L55,40 L70,40 L70,20 L75,10 L80,20 L80,40 L95,40 L95,60 L115,60 L115,45 L130,45 L130,60 L150,60 L150,30 L165,30 L165,15 L172,5 L179,15 L179,30 L195,30 L195,55 L215,55 L215,35 L230,35 L230,55 L250,55 L250,20 L265,20 L265,0 L275,0 L275,20 L290,20 L290,55 L310,55 L310,65 L330,65 L330,40 L345,40 L345,65 L365,65 L365,30 L380,30 L380,10 L390,2 L400,10 L400,30 L415,30 L415,65 L435,65 L435,45 L450,45 L450,65 L470,65 L470,25 L485,25 L485,5 L492,0 L499,5 L499,25 L515,25 L515,65 L535,65 L535,50 L550,50 L550,65 L570,65 L570,35 L585,35 L585,15 L595,7 L605,15 L605,35 L620,35 L620,65 L640,65 L640,45 L655,45 L655,65 L675,65 L675,20 L690,20 L690,0 L700,0 L700,20 L715,20 L715,65 L735,65 L735,50 L750,50 L750,65 L770,65 L770,30 L785,30 L785,10 L793,2 L801,10 L801,30 L815,30 L815,65 L835,65 L835,45 L850,45 L850,65 L870,65 L870,25 L885,25 L885,5 L892,0 L899,5 L899,25 L915,25 L915,65 L935,65 L935,50 L950,50 L950,65 L970,65 L970,35 L985,35 L985,15 L995,7 L1005,15 L1005,35 L1020,35 L1020,65 L1040,65 L1040,45 L1055,45 L1055,65 L1075,65 L1075,20 L1090,20 L1090,0 L1100,0 L1100,20 L1115,20 L1115,65 L1135,65 L1135,50 L1150,50 L1150,65 L1170,65 L1170,40 L1185,40 L1185,60 L1200,60 L1200,120 Z" />
      </svg>
    </section>
  )
}
