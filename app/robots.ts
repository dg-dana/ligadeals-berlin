import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ligadeals-berlin.com';

/**
 * Generate robots.txt configuration
 * This function is called automatically by Next.js
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',           // Disallow API routes
          '/admin/',         // Disallow admin pages (if any)
          '/_next/',         // Disallow Next.js internals
          '/private/',       // Disallow private pages (if any)
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',      // Disallow OpenAI's GPTBot (optional)
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',      // Disallow ChatGPT user agent (optional)
      },
      {
        userAgent: 'CCBot',
        disallow: '/',      // Disallow Common Crawl bot (optional)
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/',      // Disallow Anthropic's AI bot (optional)
      },
      {
        userAgent: 'claude-web',
        disallow: '/',      // Disallow Claude web scraper (optional)
      },
      {
        userAgent: 'Google-Extended',
        disallow: '/',      // Disallow Google's AI training bot (optional)
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
