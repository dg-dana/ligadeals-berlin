import { formatDateForStructuredData } from './metadata';
import { urlForImage } from '../sanity/imageBuilder';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ligadeals-berlin.com';
const SITE_NAME = 'LigaDeals Berlin';

// Article structured data
export interface ArticleStructuredDataProps {
  title: string;
  description: string;
  image: any; // Sanity image
  publishedAt: string;
  updatedAt?: string;
  author: {
    name: string;
    image?: any;
  };
  category?: string;
  tags?: string[];
  url: string;
}

/**
 * Generate Article structured data (Schema.org)
 */
export function generateArticleStructuredData(props: ArticleStructuredDataProps) {
  const {
    title,
    description,
    image,
    publishedAt,
    updatedAt,
    author,
    category,
    tags = [],
    url,
  } = props;

  const imageUrl = image
    ? urlForImage(image, { width: 1200, height: 630, fit: 'crop', format: 'jpg', quality: 90 })
    : `${SITE_URL}/og-image.jpg`;

  const authorImageUrl = author.image
    ? urlForImage(author.image, { width: 400, height: 400, fit: 'crop', format: 'jpg' })
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    datePublished: formatDateForStructuredData(publishedAt),
    dateModified: updatedAt
      ? formatDateForStructuredData(updatedAt)
      : formatDateForStructuredData(publishedAt),
    author: {
      '@type': 'Person',
      name: author.name,
      ...(authorImageUrl && {
        image: {
          '@type': 'ImageObject',
          url: authorImageUrl,
        },
      }),
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}${url}`,
    },
    ...(category && { articleSection: category }),
    ...(tags.length > 0 && { keywords: tags.join(', ') }),
    inLanguage: 'he',
  };
}

/**
 * Generate BlogPosting structured data (more specific than Article)
 */
export function generateBlogPostingStructuredData(props: ArticleStructuredDataProps) {
  const articleData = generateArticleStructuredData(props);
  return {
    ...articleData,
    '@type': 'BlogPosting',
  };
}

// Image Gallery structured data
export interface ImageGalleryStructuredDataProps {
  title: string;
  description: string;
  images: Array<{
    url: string;
    caption?: string;
    width?: number;
    height?: number;
  }>;
  url: string;
}

/**
 * Generate ImageGallery structured data
 */
export function generateImageGalleryStructuredData(props: ImageGalleryStructuredDataProps) {
  const { title, description, images, url } = props;

  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: title,
    description,
    url: `${SITE_URL}${url}`,
    image: images.map(img => ({
      '@type': 'ImageObject',
      url: img.url,
      ...(img.caption && { caption: img.caption }),
      ...(img.width && { width: img.width }),
      ...(img.height && { height: img.height }),
    })),
  };
}

// Video structured data
export interface VideoStructuredDataProps {
  title: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string; // ISO 8601 duration format (e.g., "PT1M30S" for 1:30)
  contentUrl: string;
  embedUrl?: string;
  url: string;
}

/**
 * Generate VideoObject structured data
 */
export function generateVideoStructuredData(props: VideoStructuredDataProps) {
  const {
    title,
    description,
    thumbnailUrl,
    uploadDate,
    duration,
    contentUrl,
    embedUrl,
    url,
  } = props;

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: title,
    description,
    thumbnailUrl,
    uploadDate: formatDateForStructuredData(uploadDate),
    contentUrl,
    ...(embedUrl && { embedUrl }),
    ...(duration && { duration }),
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}${url}`,
    },
    inLanguage: 'he',
  };
}

// Review/Testimonial structured data
export interface ReviewStructuredDataProps {
  reviewBody: string;
  author: string;
  rating?: number; // 1-5
  datePublished: string;
}

/**
 * Generate Review structured data
 */
export function generateReviewStructuredData(props: ReviewStructuredDataProps) {
  const { reviewBody, author, rating, datePublished } = props;

  const review: any = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    reviewBody,
    author: {
      '@type': 'Person',
      name: author,
    },
    datePublished: formatDateForStructuredData(datePublished),
    reviewRating: rating
      ? {
          '@type': 'Rating',
          ratingValue: rating,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,
  };

  return review;
}

// FAQ structured data
export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Generate FAQPage structured data
 */
export function generateFAQStructuredData(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

// Breadcrumb structured data
export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generate BreadcrumbList structured data
 */
export function generateBreadcrumbStructuredData(items: BreadcrumbItem[]) {
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

// Contact page structured data
export interface ContactPageStructuredDataProps {
  email?: string;
  phone?: string;
  address?: string;
}

/**
 * Generate ContactPage structured data
 */
export function generateContactPageStructuredData(props: ContactPageStructuredDataProps = {}) {
  const { email, phone, address } = props;

  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `צור קשר - ${SITE_NAME}`,
    url: `${SITE_URL}/contact`,
    mainEntity: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      ...(email && { email }),
      ...(phone && { telephone: phone }),
      ...(address && { address }),
    },
  };
}

// About page structured data
export interface AboutPageStructuredDataProps {
  name: string;
  description: string;
  foundingDate?: string;
  founders?: string[];
}

/**
 * Generate AboutPage structured data
 */
export function generateAboutPageStructuredData(props: AboutPageStructuredDataProps) {
  const { name, description, foundingDate, founders = [] } = props;

  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `אודות - ${SITE_NAME}`,
    url: `${SITE_URL}/about`,
    mainEntity: {
      '@type': 'Organization',
      name,
      description,
      url: SITE_URL,
      ...(foundingDate && { foundingDate }),
      ...(founders.length > 0 && {
        founders: founders.map(founder => ({
          '@type': 'Person',
          name: founder,
        })),
      }),
    },
  };
}

// Local Business structured data (if applicable)
export interface LocalBusinessStructuredDataProps {
  name: string;
  description: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  telephone?: string;
  email?: string;
  openingHours?: string[]; // e.g., ["Mo-Fr 09:00-18:00"]
}

/**
 * Generate LocalBusiness structured data
 */
export function generateLocalBusinessStructuredData(props: LocalBusinessStructuredDataProps) {
  const { name, description, address, geo, telephone, email, openingHours } = props;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    description,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    ...(address && {
      address: {
        '@type': 'PostalAddress',
        ...address,
      },
    }),
    ...(geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: geo.latitude,
        longitude: geo.longitude,
      },
    }),
    ...(telephone && { telephone }),
    ...(email && { email }),
    ...(openingHours && { openingHours }),
  };
}

/**
 * Helper to render structured data as JSON-LD script
 */
export function renderStructuredData(data: any) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
