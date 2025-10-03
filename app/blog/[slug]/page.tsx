import { notFound } from 'next/navigation';
import { client, urlFor } from '@/sanity/sanity.client';
import { getArticleBySlugQuery } from '@/lib/sanity/queries';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

async function getArticle(slug: string) {
  try {
    const article = await client.fetch(
      getArticleBySlugQuery,
      { slug },
      { cache: 'no-store' }
    );
    return article;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="min-h-screen py-12 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          {/* Category */}
          {article.category && (
            <div className="mb-4">
              <span className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                {article.category.title}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
            {article.author && (
              <span>{article.author.name}</span>
            )}
            <span>•</span>
            <time>
              {new Date(article.publishedAt).toLocaleDateString('he-IL', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="mt-4 text-xl text-gray-700 dark:text-gray-300">
              {article.excerpt}
            </p>
          )}
        </header>

        {/* Main Image */}
        {article.mainImage && (
          <div className="relative w-full h-96 mb-8 rounded-xl overflow-hidden">
            <Image
              src={urlFor(article.mainImage).width(1200).height(600).url()}
              alt={article.mainImage.alt || article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        {article.body && (
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <PortableText value={article.body} />
          </div>
        )}

        {/* Related Articles */}
        {article.relatedArticles && article.relatedArticles.length > 0 && (
          <section className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              מאמרים קשורים
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {article.relatedArticles.map((related: any) => (
                <a
                  key={related._id}
                  href={`/blog/${related.slug.current}`}
                  className="group"
                >
                  {related.mainImage && (
                    <div className="relative w-full h-48 mb-3 rounded-lg overflow-hidden">
                      <Image
                        src={urlFor(related.mainImage).width(400).height(300).url()}
                        alt={related.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {related.title}
                  </h3>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
