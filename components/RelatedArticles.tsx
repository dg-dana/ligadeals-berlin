'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export interface RelatedArticle {
  slug: string
  title: string
  excerpt: string
  image: string
  category: string
  readingTime: string
  date: string
}

interface RelatedArticlesProps {
  articles: RelatedArticle[]
  currentSlug: string
}

export default function RelatedArticles({ articles, currentSlug }: RelatedArticlesProps) {
  // Filter out the current article and limit to 3 related articles
  const relatedArticles = articles
    .filter(article => article.slug !== currentSlug)
    .slice(0, 3)

  if (relatedArticles.length === 0) {
    return null
  }

  return (
    <section className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-12" dir="rtl">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-right">
        מאמרים קשורים
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {relatedArticles.map((article, index) => (
          <motion.div
            key={article.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link
              href={`/blog/${article.slug}`}
              className="group block bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {article.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{article.readingTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{article.date}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-right">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 text-right">
                  {article.excerpt}
                </p>

                {/* Read More Link */}
                <div className="mt-4 flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm group-hover:gap-3 transition-all">
                  <span>קרא עוד</span>
                  <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* View All Articles Button */}
      <div className="mt-8 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <span>צפה בכל המאמרים</span>
          <svg className="w-5 h-5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
