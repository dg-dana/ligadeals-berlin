import { MetadataRoute } from 'next';
import { sanityFetch } from '@/lib/sanity/client';
import { getAllArticlesQuery, getAllCategoriesQuery } from '@/lib/sanity/queries';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://traveliga.vercel.app';

// Article interface for sitemap
interface Article {
  slug: { current: string };
  publishedAt: string;
}

// Category interface for sitemap
interface Category {
  slug: { current: string };
}

/**
 * Generate dynamic sitemap for the entire site
 * This function is called automatically by Next.js
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Fetch all content from Sanity in parallel
    const [articles, categories] = await Promise.all([
      sanityFetch<Article[]>({
        query: getAllArticlesQuery,
        params: { start: 0, end: 1000 }, // Fetch up to 1000 articles
        revalidate: 3600, // Revalidate every hour
      }),
      sanityFetch<Category[]>({
        query: getAllCategoriesQuery,
        revalidate: 3600,
      }),
    ]);

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: SITE_URL,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${SITE_URL}/berlin`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${SITE_URL}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${SITE_URL}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${SITE_URL}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${SITE_URL}/gallery/photos`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      {
        url: `${SITE_URL}/gallery/videos`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      },
    ];

    // Article pages (skip any article missing a slug rather than crash the whole sitemap)
    const articlePages: MetadataRoute.Sitemap = articles
      .filter((article) => article.slug?.current)
      .map((article) => ({
        url: `${SITE_URL}/blog/${article.slug.current}`,
        lastModified: new Date(article.publishedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));

    // Category pages (skip any category missing a slug; de-duplicate slugs
    // since Sanity can contain more than one category document per slug)
    const seenCategorySlugs = new Set<string>();
    const categoryPages: MetadataRoute.Sitemap = categories
      .filter((category) => {
        const slug = category.slug?.current;
        if (!slug || seenCategorySlugs.has(slug)) return false;
        seenCategorySlugs.add(slug);
        return true;
      })
      .map((category) => ({
        url: `${SITE_URL}/blog/category/${category.slug.current}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.7,
      }));

    // Combine all pages
    // Note: individual gallery photo/video detail pages aren't real routes
    // (only /gallery/photos and /gallery/videos exist), so they're
    // intentionally excluded here.
    return [
      ...staticPages,
      ...articlePages,
      ...categoryPages,
    ];
  } catch (error) {
    console.error('Error generating sitemap:', error);

    // Return at least the static pages if Sanity fetch fails
    return [
      {
        url: SITE_URL,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${SITE_URL}/berlin`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${SITE_URL}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${SITE_URL}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${SITE_URL}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${SITE_URL}/gallery/photos`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      {
        url: `${SITE_URL}/gallery/videos`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      },
    ];
  }
}
