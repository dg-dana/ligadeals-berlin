import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface CloudinaryUploadResult {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  bytes: number;
  type: string;
  url: string;
  secure_url: string;
}

export interface UploadOptions {
  folder?: string;
  public_id?: string;
  overwrite?: boolean;
  transformation?: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string | number;
    fetch_format?: string;
  };
  tags?: string[];
}

/**
 * Upload an image to Cloudinary with automatic optimization
 * @param file - File path, URL, or base64 data URI
 * @param options - Upload and transformation options
 * @returns Upload result with URLs and metadata
 */
export async function uploadImage(
  file: string | Buffer,
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult> {
  const {
    folder = 'blog-images',
    public_id,
    overwrite = false,
    transformation,
    tags = [],
  } = options;

  try {
    const result = await cloudinary.uploader.upload(file, {
      folder,
      public_id,
      overwrite,
      transformation,
      tags,
      // Automatic optimization settings
      quality: 'auto',
      fetch_format: 'auto',
      // Enable responsive breakpoints generation
      responsive_breakpoints: {
        create_derived: true,
        bytes_step: 20000,
        min_width: 200,
        max_width: 1000,
        max_images: 5,
      },
    });

    return result as CloudinaryUploadResult;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Upload multiple images to Cloudinary
 * @param files - Array of file paths, URLs, or base64 data URIs
 * @param options - Upload and transformation options
 * @returns Array of upload results
 */
export async function uploadImages(
  files: (string | Buffer)[],
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult[]> {
  const uploadPromises = files.map((file) => uploadImage(file, options));
  return Promise.all(uploadPromises);
}

/**
 * Generate a thumbnail URL for an uploaded image
 * @param publicId - Cloudinary public ID
 * @param width - Thumbnail width (default: 200)
 * @param height - Thumbnail height (default: 200)
 * @returns Thumbnail URL
 */
export function getThumbnailUrl(
  publicId: string,
  width: number = 200,
  height: number = 200
): string {
  return cloudinary.url(publicId, {
    transformation: [
      { width, height, crop: 'fill', gravity: 'auto' },
      { quality: 'auto', fetch_format: 'auto' },
    ],
  });
}

/**
 * Generate a full-size optimized URL for an uploaded image
 * @param publicId - Cloudinary public ID
 * @param maxWidth - Maximum width (default: 1920)
 * @returns Optimized image URL
 */
export function getOptimizedUrl(
  publicId: string,
  maxWidth: number = 1920
): string {
  return cloudinary.url(publicId, {
    transformation: [
      { width: maxWidth, crop: 'limit' },
      { quality: 'auto', fetch_format: 'auto' },
    ],
  });
}

/**
 * Generate responsive image URLs (srcset)
 * @param publicId - Cloudinary public ID
 * @param widths - Array of widths for responsive images
 * @returns Object with URLs for different sizes
 */
export function getResponsiveUrls(
  publicId: string,
  widths: number[] = [320, 640, 960, 1280, 1920]
): { [key: number]: string } {
  const urls: { [key: number]: string } = {};

  widths.forEach((width) => {
    urls[width] = cloudinary.url(publicId, {
      transformation: [
        { width, crop: 'limit' },
        { quality: 'auto', fetch_format: 'auto' },
      ],
    });
  });

  return urls;
}

/**
 * Generate srcset string for responsive images
 * @param publicId - Cloudinary public ID
 * @param widths - Array of widths for responsive images
 * @returns srcset string for use in img tag
 */
export function getSrcSet(
  publicId: string,
  widths: number[] = [320, 640, 960, 1280, 1920]
): string {
  const urls = getResponsiveUrls(publicId, widths);
  return Object.entries(urls)
    .map(([width, url]) => `${url} ${width}w`)
    .join(', ');
}

/**
 * Delete an image from Cloudinary
 * @param publicId - Cloudinary public ID
 * @returns Deletion result
 */
export async function deleteImage(publicId: string): Promise<any> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error(`Failed to delete image: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Delete multiple images from Cloudinary
 * @param publicIds - Array of Cloudinary public IDs
 * @returns Deletion results
 */
export async function deleteImages(publicIds: string[]): Promise<any[]> {
  const deletePromises = publicIds.map((publicId) => deleteImage(publicId));
  return Promise.all(deletePromises);
}

export default cloudinary;
