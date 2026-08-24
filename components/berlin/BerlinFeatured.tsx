'use client'

import BlogCard from '@/components/BlogCard'
import Button from '@/components/Button'
import { useLanguage } from './LanguageContext'

export interface BerlinArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  thumbnail: string
  date: string
  /** Category label, or empty when the article has none. */
  category: string
}

/**
 * Featured-articles section for the Berlin guide. Article content is authored
 * in Sanity (Hebrew) and passed in from the server; only the section chrome
 * (heading, subtitle, CTA and the category fallback) is translated here.
 */
export default function BerlinFeatured({ articles }: { articles: BerlinArticle[] }) {
  const { t, dir } = useLanguage()

  if (articles.length === 0) {
    return null
  }

  return (
    <section id="featured" className="py-16 px-4 bg-white dark:bg-gray-800" dir={dir}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-navy-700 dark:text-white mb-4 text-center">
          {t.featured.title}
        </h2>
        <p className="text-navy-400 dark:text-gray-300 text-center mb-12">
          {t.featured.subtitle}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <BlogCard
              key={article.id}
              slug={article.slug}
              title={article.title}
              excerpt={article.excerpt}
              thumbnail={article.thumbnail}
              date={article.date}
              category={article.category || t.featured.categoryFallback}
            />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button href="/blog" variant="navy">
            {t.featured.allButton}
          </Button>
        </div>
      </div>
    </section>
  )
}
