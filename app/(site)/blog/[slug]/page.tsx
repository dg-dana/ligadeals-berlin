import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { client, urlFor } from '@/sanity/sanity.client';
import { getArticleBySlugQuery } from '@/lib/sanity/queries';
import { articlePortableTextComponents } from '@/lib/sanity/portableTextComponents';
import BlogCard from '@/components/BlogCard';
import type { SanityImage } from '@/lib/sanity/types';

const FALLBACK_THUMBNAIL = '/images/blog-fallback.png';

interface RelatedArticle {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage?: SanityImage;
  publishedAt: string;
  category?: { title: string; slug: { current: string } };
}

interface Article extends RelatedArticle {
  author?: { name: string; image?: SanityImage };
  body?: Parameters<typeof PortableText>[0]['value'];
  seo?: { metaTitle?: string; metaDescription?: string };
  relatedArticles?: RelatedArticle[];
}

async function getArticle(slug: string) {
  try {
    return await client.fetch<Article | null>(
      getArticleBySlugQuery,
      { slug },
      { cache: 'no-store' }
    );
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return { title: 'המאמר לא נמצא' };
  }

  const metaTitle = article.seo?.metaTitle;
  const title = metaTitle || article.title;
  const description = article.seo?.metaDescription || article.excerpt;
  const image = article.mainImage
    ? urlFor(article.mainImage).width(1200).height(630).url()
    : undefined;

  return {
    // seo.metaTitle is authored in Sanity as a complete title (already includes
    // "| Traveliga"), so it must bypass the root layout's `%s | Traveliga`
    // template — otherwise the site name gets appended twice.
    title: metaTitle ? { absolute: metaTitle } : article.title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [image] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
      creator: '@traveliga',
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen py-12 px-4" dir="rtl">
      <article className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          {article.category?.title && (
            <span className="bg-gold-400 text-navy-800 px-4 py-1 rounded-full text-sm font-semibold">
              {article.category.title}
            </span>
          )}
          <time className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(article.publishedAt).toLocaleDateString('he-IL', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-navy-700 dark:text-white mb-6">
          {article.title}
        </h1>

        {article.author?.name && (
          <div className="flex items-center gap-3 mb-8">
            {article.author.image && (
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={urlFor(article.author.image).width(80).height(80).url()}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <span className="font-medium text-navy-600 dark:text-gray-300">
              {article.author.name}
            </span>
          </div>
        )}

        {article.mainImage && (
          <div className="relative mb-8 h-64 w-full overflow-hidden rounded-xl md:h-96">
            <Image
              src={urlFor(article.mainImage).width(1200).height(800).url()}
              alt={article.mainImage.alt || article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {article.body ? (
          <PortableText value={article.body} components={articlePortableTextComponents} />
        ) : (
          article.excerpt && (
            <p className="text-lg leading-relaxed text-navy-700 dark:text-gray-300">
              {article.excerpt}
            </p>
          )
        )}

        <div className="mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-semibold text-navy-600 transition-colors hover:text-gold-700 dark:text-gold-400 dark:hover:text-gold-300"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span>חזרה לבלוג</span>
          </Link>
        </div>
      </article>

      {article.relatedArticles && article.relatedArticles.length > 0 && (
        <section className="max-w-7xl mx-auto mt-16">
          <h2 className="mb-6 text-2xl font-bold text-navy-700 dark:text-white">
            מאמרים נוספים
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {article.relatedArticles.map((related) => (
              <BlogCard
                key={related._id}
                slug={related.slug.current}
                title={related.title}
                excerpt={related.excerpt || ''}
                thumbnail={
                  related.mainImage
                    ? urlFor(related.mainImage).width(600).height(400).url()
                    : FALLBACK_THUMBNAIL
                }
                date={related.publishedAt}
                category={related.category?.title || 'בלוג'}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
