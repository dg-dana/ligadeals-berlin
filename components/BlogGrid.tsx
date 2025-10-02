'use client'

import { useState, useMemo } from 'react'
import BlogCard, { BlogCardProps } from './BlogCard'
import { motion } from 'framer-motion'

interface BlogGridProps {
  articles: BlogCardProps[]
  categories?: string[]
}

export default function BlogGrid({ articles, categories = [] }: BlogGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('הכל')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  // Filter articles based on category and search
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === 'הכל' || article.category === selectedCategory
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [articles, selectedCategory, searchQuery])

  const allCategories = ['הכל', ...categories]

  return (
    <div className="w-full" dir="rtl">
      {/* Search and Filter Section */}
      <div className="mb-8 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="חפש מאמרים..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border-2 border-gray-200 bg-white px-6 py-3 pr-12 text-right text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
            dir="rtl"
          />
          <svg
            className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Category Filter Buttons */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-6 py-2 font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700"
            >
              <div className="h-56 w-full bg-gray-300 dark:bg-gray-600" />
              <div className="p-6 space-y-3">
                <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded" />
                <div className="h-6 w-full bg-gray-300 dark:bg-gray-600 rounded" />
                <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded" />
                <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-600 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredArticles.length > 0 ? (
        /* Articles Grid */
        <motion.div
          layout
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              layout
            >
              <BlogCard {...article} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20">
          <svg
            className="mb-4 h-20 w-20 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
            לא נמצאו מאמרים
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            נסה לשנות את החיפוש או לבחור קטגוריה אחרת
          </p>
        </div>
      )}
    </div>
  )
}
