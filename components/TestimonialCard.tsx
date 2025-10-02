'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export interface TestimonialProps {
  id: string
  customerName: string
  tripType: string
  review: string
  rating: number
  date: string
  customerPhoto?: string
}

export default function TestimonialCard({
  customerName,
  tripType,
  review,
  rating,
  date,
  customerPhoto
}: TestimonialProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative h-full rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-xl"
      dir="rtl"
    >
      {/* Quote Icon */}
      <div className="absolute top-6 right-6 text-blue-100 dark:text-blue-900/30">
        <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Rating Stars */}
      <div className="mb-4 flex gap-1">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`h-5 w-5 ${
              index < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Review Text */}
      <blockquote className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
        <p className="text-lg italic">"{review}"</p>
      </blockquote>

      {/* Customer Info */}
      <div className="flex items-center gap-4 border-t border-gray-200 dark:border-gray-700 pt-6">
        {/* Customer Photo */}
        {customerPhoto ? (
          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
            <Image
              src={customerPhoto}
              alt={customerName}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
            <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        )}

        {/* Name and Details */}
        <div className="flex-grow">
          <h4 className="font-bold text-gray-900 dark:text-white">{customerName}</h4>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span>{tripType}</span>
            <span>•</span>
            <time>
              {new Date(date).toLocaleDateString('he-IL', {
                month: 'long',
                year: 'numeric'
              })}
            </time>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
