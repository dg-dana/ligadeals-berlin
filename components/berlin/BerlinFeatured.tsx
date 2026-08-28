'use client'

import BlogCard from '@/components/BlogCard'
import Button from '@/components/Button'
import { useLanguage } from './LanguageContext'
import type { Language } from '@/lib/i18n/berlin'

export interface BerlinArticle {
  id: string
  title: string
  /** English title, or empty when not translated (falls back to `title`). */
  titleEn: string
  slug: string
  excerpt: string
  /** English excerpt, or empty when not translated (falls back to `excerpt`). */
  excerptEn: string
  thumbnail: string
  date: string
  /** Category label, or empty when the article has none. */
  category: string
  /** English category label, or empty when not translated (falls back to `category`). */
  categoryEn: string
}

/**
 * Pick the field for the active language, falling back to the Hebrew original
 * when the English translation is missing (Sanity's English fields are optional).
 */
function forLang(lang: Language, he: string, en: string): string {
  return lang === 'en' && en ? en : he
}

/**
 * Featured-articles section for the Berlin guide. Article content is authored
 * in Sanity with optional English translations; the active language selects
 * which title/excerpt/category to show, falling back to Hebrew when a given
 * article has not been translated. The section chrome (heading, subtitle, CTA
 * and the category fallback) is translated from the guide's own dictionary.
 */
export default function BerlinFeatured({ articles }: { articles: BerlinArticle[] }) {
  const { t, dir, lang } = useLanguage()

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
          {articles.map((article) => {
            const category = forLang(lang, article.category, article.categoryEn)
            return (
              <BlogCard
                key={article.id}
                slug={article.slug}
                title={forLang(lang, article.title, article.titleEn)}
                excerpt={forLang(lang, article.excerpt, article.excerptEn)}
                thumbnail={article.thumbnail}
                date={article.date}
                category={category || t.featured.categoryFallback}
              />
            )
          })}
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
