'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#1e3a8a] to-[#3b82f6]">
      {/* Background Berlin Skyline Illustration */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="absolute bottom-0 w-full h-64"
          viewBox="0 0 1200 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Berlin TV Tower (Fernsehturm) */}
          <path d="M580 50 L585 50 L585 150 L595 150 L595 160 L575 160 L575 150 L580 150 Z" fill="white" opacity="0.6"/>
          <circle cx="582.5" cy="40" r="8" fill="white" opacity="0.6"/>

          {/* Brandenburg Gate */}
          <rect x="450" y="140" width="80" height="60" fill="white" opacity="0.6"/>
          <rect x="455" y="130" width="70" height="10" fill="white" opacity="0.6"/>
          <rect x="460" y="145" width="8" height="55" fill="#1e3a8a"/>
          <rect x="473" y="145" width="8" height="55" fill="#1e3a8a"/>
          <rect x="486" y="145" width="8" height="55" fill="#1e3a8a"/>
          <rect x="499" y="145" width="8" height="55" fill="#1e3a8a"/>
          <rect x="512" y="145" width="8" height="55" fill="#1e3a8a"/>

          {/* Other Buildings */}
          <rect x="300" y="160" width="60" height="40" fill="white" opacity="0.5"/>
          <rect x="650" y="150" width="70" height="50" fill="white" opacity="0.5"/>
          <rect x="750" y="170" width="50" height="30" fill="white" opacity="0.4"/>
          <rect x="200" y="165" width="45" height="35" fill="white" opacity="0.4"/>
        </svg>
      </div>

      {/* Airplane Animation */}
      <motion.div
        className="absolute top-1/4 right-0"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: -1200, opacity: [0, 1, 1, 0] }}
        transition={{ duration: 15, repeat: Infinity, repeatDelay: 5 }}
      >
        <svg width="60" height="60" viewBox="0 0 24 24" fill="white" opacity="0.3">
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
        </svg>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-8"
        >
          <div className="relative w-40 h-40 md:w-48 md:h-48">
            <Image
              src="/ligadeals-logo.png"
              alt="LigaDeals Berlin Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6 text-4xl font-bold text-white md:text-6xl lg:text-7xl"
          dir="rtl"
        >
          גלו את ברלין בצורה אישית ובלתי נשכחת
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-10 max-w-2xl text-lg text-blue-100 md:text-xl lg:text-2xl"
          dir="rtl"
        >
          שירותי נסיעות אישיים מותאמים במיוחד עבורכם - גלו מסעדות מעולות, אירועים מיוחדים והטבות בלעדיות בברלין
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col gap-4 sm:flex-row sm:gap-6"
          dir="rtl"
        >
          <Link
            href="/contact"
            className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-lg font-semibold text-[#1e3a8a] shadow-lg transition-all hover:scale-105 hover:shadow-2xl"
          >
            <span className="relative z-10">צרו קשר עכשיו</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 transition-opacity group-hover:opacity-20"
              whileHover={{ scale: 1.5 }}
              transition={{ duration: 0.4 }}
            />
          </Link>

          <Link
            href="/blog"
            className="group rounded-full border-2 border-white bg-transparent px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-white hover:text-[#1e3a8a] hover:shadow-2xl"
          >
            קראו את הבלוג
          </Link>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-sm text-blue-200" dir="rtl">גלול למטה</span>
            <svg
              className="h-6 w-6 text-blue-200"
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

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </section>
  )
}
