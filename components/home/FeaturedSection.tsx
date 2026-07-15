import { client, urlFor } from '@/sanity/sanity.client';
import { getRecentArticlesQuery } from '@/lib/sanity/queries';
import BlogCard from '@/components/BlogCard';
import Button from '@/components/Button';
import type { SanityImage } from '@/lib/sanity/types';

const FALLBACK_THUMBNAIL = '/ligadeals-logo.png';

interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage?: SanityImage;
  publishedAt: string;
  category?: { title: string };
}

async function getFeaturedArticles() {
  try {
    return await client.fetch<Article[]>(
      getRecentArticlesQuery,
      { limit: 3 },
      { cache: 'no-store' }
    );
  } catch (error) {
    console.error('Error fetching featured articles:', error);
    return [];
  }
}

export default async function FeaturedSection() {
  const articles = await getFeaturedArticles();

  if (articles.length === 0) {
    return null;
  }

  return (
    <section id="featured" className="py-16 px-4 bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-navy-700 dark:text-white mb-4 text-center">
          מאמרים מומלצים
        </h2>
        <p className="text-navy-400 dark:text-gray-300 text-center mb-12">
          הכי חדש והכי מעניין מהבלוג שלנו
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <BlogCard
              key={article._id}
              slug={article.slug.current}
              title={article.title}
              excerpt={article.excerpt || ''}
              thumbnail={article.mainImage ? urlFor(article.mainImage).width(600).height(400).url() : FALLBACK_THUMBNAIL}
              date={article.publishedAt}
              category={article.category?.title || 'בלוג'}
            />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button href="/blog" variant="navy">
            לכל המאמרים
          </Button>
        </div>
      </div>
    </section>
  )
}
