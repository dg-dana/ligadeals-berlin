'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#1e3a8a] to-[#3b82f6]">
      {/* Background Berlin Skyline Illustration */}
      <div className="absolute inset-0 opacity-20">
        <svg
          className="absolute bottom-0 w-full h-auto"
          viewBox="0 0 1440 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMax slice"
        >
          <defs>
            <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#fbbf24', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: '#f59e0b', stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>

          {/* Berlin TV Tower (Fernsehturm) - Most Iconic */}
          <g id="tvTower">
            {/* Base */}
            <rect x="680" y="320" width="80" height="80" fill="#ef4444" opacity="0.8"/>
            {/* Shaft */}
            <rect x="710" y="120" width="20" height="200" fill="#dc2626" opacity="0.9"/>
            {/* Sphere */}
            <circle cx="720" cy="110" r="35" fill="#fbbf24" opacity="0.9"/>
            <circle cx="720" cy="110" r="28" fill="#f59e0b" opacity="0.8"/>
            {/* Windows on sphere */}
            <circle cx="710" cy="105" r="3" fill="#fef3c7" opacity="0.9"/>
            <circle cx="730" cy="105" r="3" fill="#fef3c7" opacity="0.9"/>
            <circle cx="720" cy="120" r="3" fill="#fef3c7" opacity="0.9"/>
            {/* Antenna */}
            <rect x="718" y="30" width="4" height="45" fill="#dc2626" opacity="0.9"/>
            <circle cx="720" cy="28" r="4" fill="#ef4444" opacity="0.9"/>
          </g>

          {/* Brandenburg Gate */}
          <g id="brandenburgGate">
            {/* Columns */}
            <rect x="200" y="280" width="12" height="120" fill="#84cc16" opacity="0.7"/>
            <rect x="220" y="280" width="12" height="120" fill="#84cc16" opacity="0.7"/>
            <rect x="240" y="280" width="12" height="120" fill="#84cc16" opacity="0.7"/>
            <rect x="260" y="280" width="12" height="120" fill="#84cc16" opacity="0.7"/>
            <rect x="280" y="280" width="12" height="120" fill="#84cc16" opacity="0.7"/>
            <rect x="300" y="280" width="12" height="120" fill="#84cc16" opacity="0.7"/>
            {/* Top structure */}
            <rect x="195" y="270" width="122" height="15" fill="#65a30d" opacity="0.8"/>
            {/* Quadriga (chariot on top) */}
            <rect x="245" y="250" width="25" height="20" fill="#fbbf24" opacity="0.8"/>
          </g>

          {/* Reichstag Building */}
          <g id="reichstag">
            <rect x="380" y="290" width="120" height="110" fill="#3b82f6" opacity="0.7"/>
            {/* Dome */}
            <ellipse cx="440" cy="280" rx="40" ry="30" fill="#60a5fa" opacity="0.8"/>
            <ellipse cx="440" cy="285" rx="30" ry="20" fill="#93c5fd" opacity="0.6"/>
            {/* Windows */}
            <rect x="395" y="310" width="8" height="15" fill="#dbeafe" opacity="0.8"/>
            <rect x="415" y="310" width="8" height="15" fill="#dbeafe" opacity="0.8"/>
            <rect x="435" y="310" width="8" height="15" fill="#dbeafe" opacity="0.8"/>
            <rect x="455" y="310" width="8" height="15" fill="#dbeafe" opacity="0.8"/>
            <rect x="475" y="310" width="8" height="15" fill="#dbeafe" opacity="0.8"/>
          </g>

          {/* Berlin Cathedral (Berliner Dom) */}
          <g id="cathedral">
            <rect x="900" y="300" width="100" height="100" fill="#8b5cf6" opacity="0.7"/>
            {/* Main Dome */}
            <ellipse cx="950" cy="285" rx="50" ry="40" fill="#a78bfa" opacity="0.8"/>
            <ellipse cx="950" cy="290" rx="35" ry="25" fill="#c4b5fd" opacity="0.7"/>
            {/* Cross on top */}
            <rect x="948" y="240" width="4" height="25" fill="#fbbf24" opacity="0.9"/>
            <rect x="940" y="248" width="20" height="4" fill="#fbbf24" opacity="0.9"/>
            {/* Side towers */}
            <rect x="880" y="330" width="20" height="70" fill="#7c3aed" opacity="0.7"/>
            <rect x="1000" y="330" width="20" height="70" fill="#7c3aed" opacity="0.7"/>
            <circle cx="890" cy="325" r="12" fill="#a78bfa" opacity="0.8"/>
            <circle cx="1010" cy="325" r="12" fill="#a78bfa" opacity="0.8"/>
          </g>

          {/* Modern Office Buildings */}
          <g id="modernBuildings">
            {/* Building 1 */}
            <rect x="540" y="250" width="70" height="150" fill="#ec4899" opacity="0.6"/>
            <rect x="550" y="270" width="10" height="15" fill="#fce7f3" opacity="0.8"/>
            <rect x="570" y="270" width="10" height="15" fill="#fce7f3" opacity="0.8"/>
            <rect x="590" y="270" width="10" height="15" fill="#fce7f3" opacity="0.8"/>
            <rect x="550" y="310" width="10" height="15" fill="#fce7f3" opacity="0.8"/>
            <rect x="570" y="310" width="10" height="15" fill="#fce7f3" opacity="0.8"/>
            <rect x="590" y="310" width="10" height="15" fill="#fce7f3" opacity="0.8"/>

            {/* Building 2 */}
            <rect x="820" y="280" width="60" height="120" fill="#14b8a6" opacity="0.6"/>
            <rect x="830" y="295" width="8" height="12" fill="#ccfbf1" opacity="0.8"/>
            <rect x="845" y="295" width="8" height="12" fill="#ccfbf1" opacity="0.8"/>
            <rect x="860" y="295" width="8" height="12" fill="#ccfbf1" opacity="0.8"/>
            <rect x="830" y="330" width="8" height="12" fill="#ccfbf1" opacity="0.8"/>
            <rect x="845" y="330" width="8" height="12" fill="#ccfbf1" opacity="0.8"/>
            <rect x="860" y="330" width="8" height="12" fill="#ccfbf1" opacity="0.8"/>

            {/* Building 3 */}
            <rect x="1050" y="310" width="55" height="90" fill="#f97316" opacity="0.6"/>
            <rect x="1060" y="325" width="8" height="10" fill="#fed7aa" opacity="0.8"/>
            <rect x="1075" y="325" width="8" height="10" fill="#fed7aa" opacity="0.8"/>
            <rect x="1090" y="325" width="8" height="10" fill="#fed7aa" opacity="0.8"/>
          </g>

          {/* Smaller Buildings - Left Side */}
          <rect x="50" y="340" width="45" height="60" fill="#06b6d4" opacity="0.5"/>
          <rect x="110" y="330" width="40" height="70" fill="#0ea5e9" opacity="0.5"/>
          <rect x="330" y="320" width="35" height="80" fill="#10b981" opacity="0.5"/>

          {/* Smaller Buildings - Right Side */}
          <rect x="1120" y="335" width="50" height="65" fill="#8b5cf6" opacity="0.5"/>
          <rect x="1180" y="345" width="45" height="55" fill="#a855f7" opacity="0.5"/>
          <rect x="1240" y="350" width="50" height="50" fill="#d946ef" opacity="0.5"/>
          <rect x="1300" y="355" width="40" height="45" fill="#ec4899" opacity="0.5"/>
          <rect x="1350" y="360" width="35" height="40" fill="#f43f5e" opacity="0.5"/>
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
