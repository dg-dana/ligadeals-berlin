import { client, urlFor } from '@/sanity/sanity.client'
import { getRecentArticlesQuery } from '@/lib/sanity/queries'
import { getSiteSettings } from '@/lib/sanity/siteSettings'
import BerlinGuide from '@/components/berlin/BerlinGuide'
import type { BerlinArticle } from '@/components/berlin/BerlinFeatured'
import type { SanityImage } from '@/lib/sanity/types'

const FALLBACK_THUMBNAIL = '/images/blog-fallback.png'

interface Article {
  _id: string
  title: string
  titleEn?: string
  slug: { current: string }
  excerpt?: string
  excerptEn?: string
  mainImage?: SanityImage
  publishedAt: string
  category?: { title: string; titleEn?: string }
}

async function getFeaturedArticles(): Promise<BerlinArticle[]> {
  try {
    const articles = await client.fetch<Article[]>(
      getRecentArticlesQuery,
      { limit: 3 },
      { cache: 'no-store' },
    )

    return articles.map((article) => ({
      id: article._id,
      title: article.title,
      titleEn: article.titleEn || '',
      slug: article.slug.current,
      excerpt: article.excerpt || '',
      excerptEn: article.excerptEn || '',
      thumbnail: article.mainImage
        ? urlFor(article.mainImage).width(600).height(400).url()
        : FALLBACK_THUMBNAIL,
      date: article.publishedAt,
      category: article.category?.title || '',
      categoryEn: article.category?.titleEn || '',
    }))
  } catch (error) {
    console.error('Error fetching featured articles:', error)
    return []
  }
}

export default async function BerlinPage() {
  const [articles, settings] = await Promise.all([getFeaturedArticles(), getSiteSettings()])

  return (
    <BerlinGuide
      articles={articles}
      contact={{ email: settings.email, phone: settings.phone }}
    />
  )
}
