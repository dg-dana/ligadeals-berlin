import { client } from '@/sanity/sanity.client';
import { getAllArticlesQuery } from '@/lib/sanity/queries';
import BlogCard from '@/components/BlogCard';

interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage?: any;
  publishedAt: string;
  author?: {
    name: string;
    image?: any;
  };
  category?: {
    title: string;
    slug: { current: string };
  };
}

async function getArticles() {
  try {
    const articles = await client.fetch<Article[]>(
      getAllArticlesQuery,
      { start: 0, end: 100 },
      { cache: 'no-store' }
    );
    return articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen py-12 px-4" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          בלוג
        </h1>

        {articles.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            אין מאמרים זמינים כרגע. הוסף מאמרים ב-Sanity Studio.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <BlogCard key={article._id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
