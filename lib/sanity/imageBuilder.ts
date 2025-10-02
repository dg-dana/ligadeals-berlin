import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from './client';

// Initialize image builder
const builder = imageUrlBuilder(client);

// Image size presets
export const IMAGE_SIZES = {
  thumbnail: { width: 300, height: 200 },
  card: { width: 600, height: 400 },
  medium: { width: 800, height: 600 },
  large: { width: 1200, height: 800 },
  hero: { width: 1920, height: 1080 },
  full: { width: 2400, height: 1600 },
} as const;

export type ImageSize = keyof typeof IMAGE_SIZES;

// Image format options
export type ImageFormat = 'jpg' | 'png' | 'webp' | 'avif';

// Image fit options
export type ImageFit = 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';

// Image builder options
export interface ImageBuilderOptions {
  width?: number;
  height?: number;
  size?: ImageSize;
  format?: ImageFormat;
  quality?: number; // 0-100
  fit?: ImageFit;
  blur?: number; // 0-100
  auto?: 'format';
}

/**
 * Build an image URL from a Sanity image source with optional transformations
 * @param source - Sanity image source (image object, asset reference, or asset ID)
 * @param options - Image transformation options
 * @returns Optimized image URL
 */
export function urlForImage(
  source: SanityImageSource,
  options: ImageBuilderOptions = {}
): string {
  if (!source) {
    console.warn('No image source provided to urlForImage');
    return '';
  }

  let imageBuilder = builder.image(source);

  // Apply size preset or custom dimensions
  if (options.size && IMAGE_SIZES[options.size]) {
    const { width, height } = IMAGE_SIZES[options.size];
    imageBuilder = imageBuilder.width(width).height(height);
  } else {
    if (options.width) {
      imageBuilder = imageBuilder.width(options.width);
    }
    if (options.height) {
      imageBuilder = imageBuilder.height(options.height);
    }
  }

  // Apply format
  if (options.format) {
    imageBuilder = imageBuilder.format(options.format);
  }

  // Apply quality
  if (options.quality !== undefined) {
    imageBuilder = imageBuilder.quality(options.quality);
  }

  // Apply fit
  if (options.fit) {
    imageBuilder = imageBuilder.fit(options.fit);
  }

  // Apply blur
  if (options.blur !== undefined) {
    imageBuilder = imageBuilder.blur(options.blur);
  }

  // Apply auto format
  if (options.auto === 'format') {
    imageBuilder = imageBuilder.auto('format');
  }

  return imageBuilder.url();
}

/**
 * Get a blurred placeholder image URL for lazy loading
 * @param source - Sanity image source
 * @returns Low-quality blurred image URL
 */
export function getBlurredPlaceholder(source: SanityImageSource): string {
  return urlForImage(source, {
    width: 20,
    quality: 20,
    blur: 50,
  });
}

/**
 * Get responsive image URLs for different screen sizes
 * @param source - Sanity image source
 * @param format - Image format (default: 'webp')
 * @returns Object with URLs for different breakpoints
 */
export function getResponsiveImages(
  source: SanityImageSource,
  format: ImageFormat = 'webp'
) {
  return {
    mobile: urlForImage(source, { width: 640, format, quality: 80 }),
    tablet: urlForImage(source, { width: 1024, format, quality: 85 }),
    desktop: urlForImage(source, { width: 1920, format, quality: 90 }),
  };
}

/**
 * Get srcset string for responsive images
 * @param source - Sanity image source
 * @param widths - Array of widths to generate
 * @param format - Image format (default: 'webp')
 * @returns srcset string
 */
export function getSrcSet(
  source: SanityImageSource,
  widths: number[] = [320, 640, 768, 1024, 1280, 1920],
  format: ImageFormat = 'webp'
): string {
  return widths
    .map(
      (width) =>
        `${urlForImage(source, { width, format, quality: 85 })} ${width}w`
    )
    .join(', ');
}

/**
 * Get optimized image for Open Graph / social sharing
 * @param source - Sanity image source
 * @returns Optimized OG image URL
 */
export function getOGImage(source: SanityImageSource): string {
  return urlForImage(source, {
    width: 1200,
    height: 630,
    fit: 'crop',
    format: 'jpg',
    quality: 90,
  });
}

/**
 * Extract image dimensions from Sanity image asset
 * @param source - Sanity image source
 * @returns Object with width and height, or null if not available
 */
export function getImageDimensions(source: any): {
  width: number;
  height: number;
  aspectRatio: number;
} | null {
  if (!source?.asset) return null;

  const dimensions = source.asset.metadata?.dimensions;
  if (!dimensions) return null;

  return {
    width: dimensions.width,
    height: dimensions.height,
    aspectRatio: dimensions.aspectRatio || dimensions.width / dimensions.height,
  };
}
