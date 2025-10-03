'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#1e3a8a] to-[#3b82f6]">
      {/* Berlin Skyline */}
      <div className="absolute inset-0">
        <svg
          className="absolute bottom-0 w-full h-80"
          viewBox="0 0 1200 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMax slice"
        >
          {/* Berlin TV Tower (Fernsehturm) - Pink */}
          <path d="M580 100 L585 100 L585 250 L595 250 L595 265 L575 265 L575 250 L580 250 Z" fill="#ec4899" opacity="0.7"/>
          <circle cx="582.5" cy="85" r="12" fill="#ec4899" opacity="0.7"/>
          <circle cx="582.5" cy="85" r="6" fill="#fbbf24" opacity="0.9"/>

          {/* Brandenburg Gate - Yellow */}
          <rect x="450" y="220" width="100" height="80" fill="#fbbf24" opacity="0.7"/>
          <rect x="455" y="205" width="90" height="15" fill="#fbbf24" opacity="0.8"/>
          <rect x="465" y="230" width="10" height="70" fill="#1e3a8a" opacity="0.3"/>
          <rect x="485" y="230" width="10" height="70" fill="#1e3a8a" opacity="0.3"/>
          <rect x="505" y="230" width="10" height="70" fill="#1e3a8a" opacity="0.3"/>
          <rect x="525" y="230" width="10" height="70" fill="#1e3a8a" opacity="0.3"/>

          {/* Building 1 - Purple */}
          <rect x="280" y="230" width="80" height="70" fill="#a855f7" opacity="0.7"/>
          <rect x="285" y="235" width="15" height="15" fill="#fbbf24" opacity="0.4"/>
          <rect x="305" y="235" width="15" height="15" fill="#fbbf24" opacity="0.4"/>
          <rect x="325" y="235" width="15" height="15" fill="#fbbf24" opacity="0.4"/>
          <rect x="345" y="235" width="15" height="15" fill="#fbbf24" opacity="0.4"/>

          {/* Building 2 - Pink */}
          <rect x="650" y="240" width="90" height="60" fill="#ec4899" opacity="0.7"/>
          <rect x="660" y="250" width="12" height="12" fill="#fbbf24" opacity="0.5"/>
          <rect x="678" y="250" width="12" height="12" fill="#fbbf24" opacity="0.5"/>
          <rect x="696" y="250" width="12" height="12" fill="#fbbf24" opacity="0.5"/>
          <rect x="714" y="250" width="12" height="12" fill="#fbbf24" opacity="0.5"/>

          {/* Building 3 - Yellow */}
          <rect x="760" y="250" width="70" height="50" fill="#fbbf24" opacity="0.7"/>
          <rect x="765" y="255" width="10" height="10" fill="#a855f7" opacity="0.4"/>
          <rect x="780" y="255" width="10" height="10" fill="#a855f7" opacity="0.4"/>
          <rect x="795" y="255" width="10" height="10" fill="#a855f7" opacity="0.4"/>
          <rect x="810" y="255" width="10" height="10" fill="#a855f7" opacity="0.4"/>

          {/* Building 4 - Purple */}
          <rect x="180" y="245" width="65" height="55" fill="#a855f7" opacity="0.7"/>
          <rect x="185" y="250" width="8" height="8" fill="#ec4899" opacity="0.5"/>
          <rect x="198" y="250" width="8" height="8" fill="#ec4899" opacity="0.5"/>
          <rect x="211" y="250" width="8" height="8" fill="#ec4899" opacity="0.5"/>
          <rect x="224" y="250" width="8" height="8" fill="#ec4899" opacity="0.5"/>

          {/* Building 5 - Pink */}
          <rect x="860" y="255" width="60" height="45" fill="#ec4899" opacity="0.7"/>

          {/* Building 6 - Yellow */}
          <rect x="100" y="260" width="55" height="40" fill="#fbbf24" opacity="0.7"/>

          {/* Building 7 - Purple */}
          <rect x="950" y="265" width="70" height="35" fill="#a855f7" opacity="0.7"/>
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
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
