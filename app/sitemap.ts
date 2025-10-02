import { MetadataRoute } from 'next';
import { sanityFetch } from '@/lib/sanity/client';
import {
  getAllArticlesQuery,
  getAllCategoriesQuery,
  getAllPhotosQuery,
  getAllVideosQuery,
} from '@/lib/sanity/queries';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ligadeals-berlin.com';

// Article interface for sitemap
interface Article {
  slug: { current: string };
  publishedAt: string;
}

// Category interface for sitemap
interface Category {
  slug: { current: string };
}

// Photo interface for sitemap
interface Photo {
  _id: string;
  createdAt: string;
}

// Video interface for sitemap
interface Video {
  _id: string;
  createdAt: string;
}

/**
 * Generate dynamic sitemap for the entire site
 * This function is called automatically by Next.js
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Fetch all content from Sanity in parallel
    const [articles, categories, photos, videos] = await Promise.all([
      sanityFetch<Article[]>({
        query: getAllArticlesQuery,
        params: { start: 0, end: 1000 }, // Fetch up to 1000 articles
        revalidate: 3600, // Revalidate every hour
      }),
      sanityFetch<Category[]>({
        query: getAllCategoriesQuery,
        revalidate: 3600,
      }),
      sanityFetch<Photo[]>({
        query: getAllPhotosQuery,
        params: { start: 0, end: 1000 },
        revalidate: 3600,
      }),
      sanityFetch<Video[]>({
        query: getAllVideosQuery,
        params: { start: 0, end: 1000 },
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
        url: `${SITE_URL}/gallery`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
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

    // Article pages
    const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
      url: `${SITE_URL}/blog/${article.slug.current}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    // Category pages
    const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
      url: `${SITE_URL}/blog/category/${category.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }));

    // Photo pages (if individual photo pages exist)
    const photoPages: MetadataRoute.Sitemap = photos.map((photo) => ({
      url: `${SITE_URL}/gallery/photos/${photo._id}`,
      lastModified: new Date(photo.createdAt),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }));

    // Video pages (if individual video pages exist)
    const videoPages: MetadataRoute.Sitemap = videos.map((video) => ({
      url: `${SITE_URL}/gallery/videos/${video._id}`,
      lastModified: new Date(video.createdAt),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }));

    // Combine all pages
    return [
      ...staticPages,
      ...articlePages,
      ...categoryPages,
      ...photoPages,
      ...videoPages,
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
        url: `${SITE_URL}/gallery`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      },
    ];
  }
}
