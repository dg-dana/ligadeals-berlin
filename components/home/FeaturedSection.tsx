import { client, urlFor } from '@/sanity/sanity.client';
import { getFeaturedArticlesQuery } from '@/lib/sanity/queries';
import BlogCard from '@/components/BlogCard';

interface FeaturedArticle {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage?: any;
  publishedAt: string;
  category?: {
    title: string;
  };
  featured: boolean;
}

async function getFeaturedArticles() {
  try {
    const articles = await client.fetch<FeaturedArticle[]>(
      getFeaturedArticlesQuery,
      { limit: 3 },
      { cache: 'no-store' }
    );
    return articles;
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
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          מאמרים מומלצים
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12">
          הכי חדש והכי מעניין מהבלוג שלנו
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <BlogCard
              key={article._id}
              slug={article.slug.current}
              title={article.title}
              excerpt={article.excerpt || ''}
              thumbnail={article.mainImage ? urlFor(article.mainImage).width(600).height(400).url() : '/placeholder-blog.jpg'}
              date={article.publishedAt}
              category={article.category?.title || 'כללי'}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
