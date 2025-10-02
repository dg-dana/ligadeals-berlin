import { Metadata } from 'next';
import { urlForImage } from '../sanity/imageBuilder';

// Site configuration
const SITE_NAME = 'LigaDeals Berlin';
const SITE_DESCRIPTION = 'המדריך המקיף לחיים בברלין - טיפים, מדריכים, ותוכן איכותי בעברית';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ligadeals-berlin.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

// Metadata configuration interface
export interface MetadataConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: any; // Sanity image object
  imageUrl?: string; // Direct URL
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noIndex?: boolean;
}

/**
 * Generate default metadata for the site
 */
export function getDefaultMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    keywords: [
      'ברלין',
      'גרמניה',
      'ישראלים בברלין',
      'חיים בחו"ל',
      'טיפים לברלין',
      'מדריך ברלין',
      'קהילה ישראלית',
      'עולים חדשים',
    ],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'he_IL',
      url: SITE_URL,
      siteName: SITE_NAME,
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      images: [DEFAULT_OG_IMAGE],
      creator: '@ligadeals',
    },
    alternates: {
      canonical: SITE_URL,
    },
  };
}

/**
 * Generate metadata for a page
 */
export function generatePageMetadata(config: MetadataConfig): Metadata {
  const {
    title,
    description = SITE_DESCRIPTION,
    keywords = [],
    image,
    imageUrl,
    url,
    type = 'website',
    noIndex = false,
  } = config;

  const pageUrl = url ? `${SITE_URL}${url}` : SITE_URL;

  // Generate image URL from Sanity image or use provided URL
  const ogImage = image
    ? urlForImage(image, { width: 1200, height: 630, fit: 'crop', format: 'jpg', quality: 90 })
    : imageUrl || DEFAULT_OG_IMAGE;

  const metadata: Metadata = {
    title,
    description,
    keywords: [...keywords],
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
    openGraph: {
      type,
      locale: 'he_IL',
      url: pageUrl,
      siteName: SITE_NAME,
      title: title || SITE_NAME,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || SITE_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title || SITE_NAME,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: pageUrl,
    },
  };

  return metadata;
}

/**
 * Generate metadata for a blog article
 */
export function generateArticleMetadata(config: MetadataConfig): Metadata {
  const {
    title,
    description = SITE_DESCRIPTION,
    keywords = [],
    image,
    imageUrl,
    url,
    publishedTime,
    modifiedTime,
    author,
    section,
    tags = [],
    noIndex = false,
  } = config;

  const pageUrl = url ? `${SITE_URL}${url}` : SITE_URL;

  // Generate image URL from Sanity image or use provided URL
  const ogImage = image
    ? urlForImage(image, { width: 1200, height: 630, fit: 'crop', format: 'jpg', quality: 90 })
    : imageUrl || DEFAULT_OG_IMAGE;

  const metadata: Metadata = {
    title,
    description,
    keywords: [...keywords, ...tags],
    authors: author ? [{ name: author }] : [{ name: SITE_NAME }],
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
    openGraph: {
      type: 'article',
      locale: 'he_IL',
      url: pageUrl,
      siteName: SITE_NAME,
      title: title || SITE_NAME,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || SITE_NAME,
        },
      ],
      publishedTime,
      modifiedTime,
      authors: author ? [author] : [SITE_NAME],
      section,
      tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: title || SITE_NAME,
      description,
      images: [ogImage],
      creator: '@ligadeals',
    },
    alternates: {
      canonical: pageUrl,
    },
  };

  return metadata;
}

/**
 * Generate breadcrumb list for structured data
 */
export function generateBreadcrumbList(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * Generate website structured data
 */
export function generateWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'he',
  };
}

/**
 * Generate organization structured data
 */
export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: SITE_DESCRIPTION,
    contactPoint: {
      '@type': 'ContactPoint',
      email: process.env.CONTACT_EMAIL || 'contact@ligadeals-berlin.com',
      contactType: 'Customer Service',
      availableLanguage: ['Hebrew', 'English', 'German'],
    },
    sameAs: [
      // Add your social media URLs here
      // 'https://www.facebook.com/ligadeals',
      // 'https://www.instagram.com/ligadeals',
      // 'https://www.twitter.com/ligadeals',
    ],
  };
}

/**
 * Format date for structured data
 */
export function formatDateForStructuredData(date: Date | string): string {
  return new Date(date).toISOString();
}

/**
 * Generate safe description (truncate if needed)
 */
export function generateSafeDescription(text: string, maxLength: number = 160): string {
  if (text.length <= maxLength) return text;

  // Truncate and add ellipsis
  const truncated = text.slice(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(' ');

  return lastSpace > 0
    ? `${truncated.slice(0, lastSpace)}...`
    : `${truncated}...`;
}

/**
 * Extract keywords from text
 */
export function extractKeywords(text: string, count: number = 10): string[] {
  // Remove common Hebrew stop words and extract meaningful words
  const stopWords = new Set([
    'של', 'את', 'זה', 'על', 'עם', 'אל', 'כל', 'לא', 'או', 'גם',
    'אני', 'אתה', 'הוא', 'היא', 'אנחנו', 'אתם', 'הם', 'כי',
  ]);

  const words = text
    .toLowerCase()
    .replace(/[^\u0590-\u05FF\w\s]/g, ' ') // Keep Hebrew and Latin characters
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word));

  // Count word frequency
  const frequency: Record<string, number> = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  // Sort by frequency and return top keywords
  return Object.entries(frequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, count)
    .map(([word]) => word);
}

// Export site constants
export const SITE_CONFIG = {
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  ogImage: DEFAULT_OG_IMAGE,
} as const;
