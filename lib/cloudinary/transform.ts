import { v2 as cloudinary } from 'cloudinary';

export interface TransformOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'limit' | 'scale' | 'thumb' | 'crop' | 'pad';
  gravity?: 'auto' | 'face' | 'center' | 'north' | 'south' | 'east' | 'west';
  quality?: 'auto' | number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  dpr?: number;
  aspectRatio?: string;
  zoom?: number;
}

/**
 * Generate a transformed image URL
 * @param publicId - Cloudinary public ID
 * @param options - Transformation options
 * @returns Transformed image URL
 */
export function transform(publicId: string, options: TransformOptions = {}): string {
  const {
    width,
    height,
    crop = 'fill',
    gravity = 'auto',
    quality = 'auto',
    format = 'auto',
    dpr,
    aspectRatio,
    zoom,
  } = options;

  return cloudinary.url(publicId, {
    transformation: [
      {
        width,
        height,
        crop,
        gravity,
        quality,
        fetch_format: format,
        dpr,
        aspect_ratio: aspectRatio,
        zoom,
      },
    ],
  });
}

/**
 * Resize an image while maintaining aspect ratio
 * @param publicId - Cloudinary public ID
 * @param width - Target width
 * @param height - Target height (optional)
 * @returns Resized image URL
 */
export function resize(
  publicId: string,
  width: number,
  height?: number
): string {
  return transform(publicId, {
    width,
    height,
    crop: 'limit',
    quality: 'auto',
    format: 'auto',
  });
}

/**
 * Crop an image to specific dimensions
 * @param publicId - Cloudinary public ID
 * @param width - Crop width
 * @param height - Crop height
 * @param gravity - Crop focus point
 * @returns Cropped image URL
 */
export function crop(
  publicId: string,
  width: number,
  height: number,
  gravity: TransformOptions['gravity'] = 'auto'
): string {
  return transform(publicId, {
    width,
    height,
    crop: 'fill',
    gravity,
    quality: 'auto',
    format: 'auto',
  });
}

/**
 * Generate a thumbnail with automatic face detection
 * @param publicId - Cloudinary public ID
 * @param size - Thumbnail size (width and height)
 * @returns Thumbnail URL
 */
export function thumbnail(publicId: string, size: number = 200): string {
  return transform(publicId, {
    width: size,
    height: size,
    crop: 'thumb',
    gravity: 'face',
    quality: 'auto',
    format: 'auto',
  });
}

/**
 * Generate a WebP format URL
 * @param publicId - Cloudinary public ID
 * @param width - Maximum width
 * @returns WebP image URL
 */
export function toWebP(publicId: string, width?: number): string {
  return transform(publicId, {
    width,
    crop: 'limit',
    quality: 'auto',
    format: 'webp',
  });
}

/**
 * Generate an AVIF format URL
 * @param publicId - Cloudinary public ID
 * @param width - Maximum width
 * @returns AVIF image URL
 */
export function toAVIF(publicId: string, width?: number): string {
  return transform(publicId, {
    width,
    crop: 'limit',
    quality: 'auto',
    format: 'avif',
  });
}

/**
 * Generate a lazy loading placeholder URL (low quality, small size)
 * @param publicId - Cloudinary public ID
 * @returns Placeholder URL
 */
export function lazyPlaceholder(publicId: string): string {
  return transform(publicId, {
    width: 50,
    quality: 30,
    format: 'auto',
    crop: 'limit',
  });
}

/**
 * Generate a blurred placeholder for lazy loading
 * @param publicId - Cloudinary public ID
 * @returns Blurred placeholder URL
 */
export function blurredPlaceholder(publicId: string): string {
  return cloudinary.url(publicId, {
    transformation: [
      { width: 100, crop: 'limit' },
      { effect: 'blur:1000', quality: 1 },
      { fetch_format: 'auto' },
    ],
  });
}

/**
 * Generate an image URL optimized for retina displays
 * @param publicId - Cloudinary public ID
 * @param width - Base width
 * @param height - Base height
 * @returns Retina-optimized URL
 */
export function retina(
  publicId: string,
  width: number,
  height?: number
): string {
  return transform(publicId, {
    width,
    height,
    dpr: 2,
    crop: 'limit',
    quality: 'auto',
    format: 'auto',
  });
}

/**
 * Apply aspect ratio transformation
 * @param publicId - Cloudinary public ID
 * @param aspectRatio - Aspect ratio (e.g., "16:9", "4:3", "1:1")
 * @param width - Target width
 * @returns Aspect ratio transformed URL
 */
export function aspectRatio(
  publicId: string,
  aspectRatio: string,
  width: number
): string {
  return transform(publicId, {
    aspectRatio,
    width,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
    format: 'auto',
  });
}

/**
 * Generate a square image (1:1 aspect ratio)
 * @param publicId - Cloudinary public ID
 * @param size - Size of the square
 * @returns Square image URL
 */
export function square(publicId: string, size: number): string {
  return aspectRatio(publicId, '1:1', size);
}

/**
 * Generate responsive image data for Next.js Image component
 * @param publicId - Cloudinary public ID
 * @param baseWidth - Base width for the image
 * @returns Object with src, srcSet, and sizes
 */
export function getNextImageProps(
  publicId: string,
  baseWidth: number = 1920
): {
  src: string;
  srcSet: string;
  sizes: string;
} {
  const widths = [320, 640, 768, 1024, 1280, 1536, 1920];
  const filteredWidths = widths.filter((w) => w <= baseWidth);

  const srcSet = filteredWidths
    .map((width) => {
      const url = transform(publicId, { width, crop: 'limit' });
      return `${url} ${width}w`;
    })
    .join(', ');

  return {
    src: transform(publicId, { width: baseWidth, crop: 'limit' }),
    srcSet,
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px',
  };
}

/**
 * Generate picture element sources for modern formats
 * @param publicId - Cloudinary public ID
 * @param width - Target width
 * @returns Array of source objects for picture element
 */
export function getPictureSources(
  publicId: string,
  width: number = 1920
): Array<{ srcSet: string; type: string }> {
  return [
    {
      srcSet: toAVIF(publicId, width),
      type: 'image/avif',
    },
    {
      srcSet: toWebP(publicId, width),
      type: 'image/webp',
    },
  ];
}

/**
 * Generate a cloudinary image URL with automatic format and quality
 * @param publicId - Cloudinary public ID or full URL
 * @param width - Optional width constraint
 * @returns Optimized URL
 */
export function optimizeImage(publicId: string, width?: number): string {
  // If already a full URL, return as-is
  if (publicId.startsWith('http://') || publicId.startsWith('https://')) {
    return publicId;
  }

  return transform(publicId, {
    width,
    crop: 'limit',
    quality: 'auto',
    format: 'auto',
  });
}

/**
 * Extract public_id from a Cloudinary URL
 * @param url - Cloudinary URL
 * @returns Public ID
 */
export function extractPublicId(url: string): string {
  // Match pattern: https://res.cloudinary.com/{cloud_name}/image/upload/{transformations}/{public_id}.{format}
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.\w+)?$/);
  if (match && match[1]) {
    // Remove any transformations
    return match[1].replace(/^[^/]+\//, '');
  }
  return url;
}
