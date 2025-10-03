'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#1e3a8a] to-[#3b82f6]">
      {/* Berlin Skyline */}
      <div className="absolute inset-0 flex items-end justify-center opacity-15 pointer-events-none">
        <svg
          className="w-full h-auto max-h-[60%]"
          viewBox="0 0 1024 350"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMax meet"
        >
          <g stroke="white" strokeWidth="1.5" fill="none">
            {/* Left buildings */}
            <rect x="20" y="280" width="60" height="70" />
            <rect x="25" y="285" width="8" height="8" />
            <rect x="38" y="285" width="8" height="8" />
            <rect x="51" y="285" width="8" height="8" />
            <rect x="64" y="285" width="8" height="8" />

            {/* Berlin Cathedral (Berliner Dom) - Left */}
            <g transform="translate(120, 240)">
              <rect x="0" y="40" width="80" height="70" />
              <rect x="5" y="45" width="10" height="15" />
              <rect x="20" y="45" width="10" height="15" />
              <rect x="35" y="45" width="10" height="15" />
              <rect x="50" y="45" width="10" height="15" />
              <rect x="65" y="45" width="10" height="15" />
              <ellipse cx="40" cy="30" rx="35" ry="25" />
              <ellipse cx="40" cy="33" rx="28" ry="20" />
              <line x1="40" y1="5" x2="40" y2="12" />
              <line x1="35" y1="10" x2="45" y2="10" />
              <rect x="-10" y="70" width="15" height="40" />
              <rect x="75" y="70" width="15" height="40" />
              <circle cx="-2.5" cy="65" r="8" />
              <circle cx="82.5" cy="65" r="8" />
            </g>

            {/* More left buildings */}
            <rect x="230" y="270" width="50" height="80" />
            <rect x="235" y="275" width="6" height="6" />
            <rect x="245" y="275" width="6" height="6" />
            <rect x="255" y="275" width="6" height="6" />
            <rect x="265" y="275" width="6" height="6" />

            <rect x="295" y="290" width="45" height="60" />
            <rect x="350" y="285" width="40" height="65" />

            {/* TV Tower (Fernsehturm) - Center piece */}
            <g transform="translate(480, 80)">
              <line x1="0" y1="0" x2="0" y2="50" strokeWidth="2" />
              <circle cx="0" cy="55" r="3" strokeWidth="1" />
              <line x1="0" y1="58" x2="0" y2="70" strokeWidth="2" />
              <circle cx="0" cy="95" r="25" strokeWidth="2" />
              <circle cx="0" cy="95" r="20" strokeWidth="1.5" />
              <line x1="-15" y1="90" x2="15" y2="90" strokeWidth="1" />
              <line x1="-12" y1="100" x2="12" y2="100" strokeWidth="1" />
              <rect x="-8" y="120" width="16" height="15" strokeWidth="1.5" />
              <rect x="-5" y="135" width="10" height="8" strokeWidth="1" />
              <rect x="-12" y="143" width="24" height="40" strokeWidth="2" />
              <rect x="-20" y="183" width="40" height="87" strokeWidth="2" />
            </g>

            {/* Buildings around center */}
            <rect x="410" y="275" width="55" height="75" />
            <rect x="550" y="280" width="50" height="70" />

            {/* Brandenburg Gate */}
            <g transform="translate(620, 260)">
              <rect x="0" y="50" width="10" height="40" />
              <rect x="15" y="50" width="10" height="40" />
              <rect x="30" y="50" width="10" height="40" />
              <rect x="45" y="50" width="10" height="40" />
              <rect x="60" y="50" width="10" height="40" />
              <rect x="75" y="50" width="10" height="40" />
              <rect x="-5" y="43" width="95" height="7" />
              <g transform="translate(30, 20)">
                <path d="M0,0 L8,0 L8,5 L12,5 L12,15 L-4,15 L-4,5 L0,5 Z" />
                <circle cx="4" cy="3" r="2" />
                <line x1="0" y1="8" x2="8" y2="8" strokeWidth="0.5" />
              </g>
            </g>

            {/* Reichstag and dome */}
            <g transform="translate(780, 260)">
              <rect x="0" y="50" width="80" height="50" />
              <rect x="5" y="55" width="6" height="12" />
              <rect x="16" y="55" width="6" height="12" />
              <rect x="27" y="55" width="6" height="12" />
              <rect x="38" y="55" width="6" height="12" />
              <rect x="49" y="55" width="6" height="12" />
              <rect x="60" y="55" width="6" height="12" />
              <rect x="69" y="55" width="6" height="12" />
              <ellipse cx="40" cy="40" rx="30" ry="20" />
              <ellipse cx="40" cy="42" rx="24" ry="16" />
              <circle cx="40" cy="42" r="10" fill="white" fillOpacity="0.1" />
            </g>

            {/* Right side buildings */}
            <rect x="880" y="285" width="45" height="65" />
            <rect x="885" y="290" width="6" height="6" />
            <rect x="895" y="290" width="6" height="6" />
            <rect x="905" y="290" width="6" height="6" />
            <rect x="915" y="290" width="6" height="6" />

            <rect x="940" y="275" width="55" height="75" />
            <rect x="945" y="280" width="7" height="10" />
            <rect x="957" y="280" width="7" height="10" />
            <rect x="969" y="280" width="7" height="10" />
            <rect x="981" y="280" width="7" height="10" />
          </g>
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
