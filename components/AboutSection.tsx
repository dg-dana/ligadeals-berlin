'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface AboutSectionProps {
  photoUrl?: string
  name?: string
  title?: string
  story?: string
  highlights?: string[]
  statistics?: {
    yearsInBerlin: number
    happyCustomers: number
    partnerships?: number
  }
}

export default function AboutSection({
  photoUrl = '/meital-photo.jpg',
  name = 'מייטל',
  title = 'מייסדת ומנהלת Liga Deals Berlin',
  story = 'ברלין היא לא רק עיר - היא הבית שלי. אחרי שנים של חיים כאן, גיליתי את כל הפינות הנסתרות, המסעדות הטובות ביותר, והמקומות שהופכים את ברלין למיוחדת כל כך. ייסדתי את Liga Deals כדי לחלוק את האהבה הזו ולעזור לכם ליהנות מברלין בדיוק כמו שמגיע לכם.',
  highlights = [
    'המלצות מותאמות אישית בהתאם לטעם והעדפות',
    'גישה להטבות בלעדיות במסעדות ואירועים מובילים',
    'ליווי צמוד לאורך כל הטיול',
    'ידע מקומי עמוק של ברלין'
  ],
  statistics = {
    yearsInBerlin: 8,
    happyCustomers: 500,
    partnerships: 50
  }
}: AboutSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 px-4" dir="rtl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            היכרות עם {name}
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Title */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{name}</h3>
              <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold">{title}</p>
            </div>

            {/* Story */}
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              {story}
            </p>

            {/* Highlights */}
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">למה לבחור בנו?</h4>
              <ul className="space-y-3">
                {highlights.map((highlight, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {statistics.yearsInBerlin}+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">שנים בברלין</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                  {statistics.happyCustomers}+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">לקוחות מרוצים</div>
              </motion.div>

              {statistics.partnerships && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-1">
                    {statistics.partnerships}+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">שותפויות</div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Image - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              {/* Decorative Background Blob */}
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl blur-2xl opacity-20" />

              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[3/4] max-w-md mx-auto">
                <Image
                  src={photoUrl}
                  alt={name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl" />
            </div>

            {/* Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-8 -right-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-xs hidden lg:block"
            >
              <div className="flex items-start gap-3">
                <svg className="h-8 w-8 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                  "אני אוהבת לעזור לאנשים לגלות את ברלין בצורה שמתאימה בדיוק להם"
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
