'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export interface BlogCardProps {
  slug: string
  title: string
  excerpt: string
  thumbnail: string
  date: string
  category: string
}

export default function BlogCard({
  slug,
  title,
  excerpt,
  thumbnail,
  date,
  category
}: BlogCardProps) {
  return (
    <motion.article
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-shadow"
      dir="rtl"
    >
      <Link href={`/blog/${slug}`}>
        {/* Thumbnail */}
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Category Tag */}
          <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
            {category}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Date */}
          <time className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(date).toLocaleDateString('he-IL', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>

          {/* Title */}
          <h3 className="mt-2 text-xl font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="mt-3 text-gray-600 dark:text-gray-300 line-clamp-3">
            {excerpt}
          </p>

          {/* Read More Button */}
          <div className="mt-4 flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
            <span>קרא עוד</span>
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
