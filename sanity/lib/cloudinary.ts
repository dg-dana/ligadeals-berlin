/**
 * Cloudinary integration for Sanity
 * Handles image uploads and optimization through Cloudinary
 */

import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { uploadImage, CloudinaryUploadResult } from '@/lib/cloudinary/upload';
import { optimizeImage } from '@/lib/cloudinary/transform';

/**
 * Upload Sanity image asset to Cloudinary
 * @param imageAsset - Sanity image asset reference or URL
 * @returns Cloudinary upload result
 */
export async function uploadSanityImageToCloudinary(
  imageAsset: SanityImageSource | string
): Promise<CloudinaryUploadResult> {
  let imageUrl: string;

  if (typeof imageAsset === 'string') {
    imageUrl = imageAsset;
  } else if (imageAsset && typeof imageAsset === 'object' && 'asset' in imageAsset) {
    // Handle Sanity image reference
    const asset = imageAsset.asset as any;
    if (typeof asset === 'string') {
      // Reference ID - need to construct URL
      const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
      const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
      const assetId = asset.replace('image-', '').replace(/-(\w+)$/, '.$1');
      imageUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${assetId}`;
    } else if (asset.url) {
      imageUrl = asset.url;
    } else {
      throw new Error('Invalid Sanity image asset');
    }
  } else {
    throw new Error('Invalid image asset format');
  }

  return uploadImage(imageUrl, {
    folder: 'sanity-uploads',
    tags: ['sanity', 'blog'],
  });
}

/**
 * Get optimized Cloudinary URL from Sanity image
 * Falls back to Sanity CDN if Cloudinary URL is not available
 * @param imageAsset - Sanity image asset or Cloudinary public_id
 * @param width - Optional width constraint
 * @returns Optimized image URL
 */
export function getOptimizedImageUrl(
  imageAsset: SanityImageSource | string,
  width?: number
): string {
  if (typeof imageAsset === 'string') {
    return optimizeImage(imageAsset, width);
  }

  // If it's a Sanity asset, construct the URL
  const asset = imageAsset && typeof imageAsset === 'object' && 'asset' in imageAsset
    ? imageAsset.asset
    : null;

  if (!asset) {
    throw new Error('Invalid image asset');
  }

  if (typeof asset === 'object' && 'url' in asset) {
    return optimizeImage(asset.url as string, width);
  }

  // Fallback to Sanity CDN
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  const assetId = typeof asset === 'string'
    ? asset.replace('image-', '').replace(/-(\w+)$/, '.$1')
    : '';

  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${assetId}`;
}

/**
 * Check if an image is hosted on Cloudinary
 * @param url - Image URL
 * @returns True if hosted on Cloudinary
 */
export function isCloudinaryImage(url: string): boolean {
  return url.includes('cloudinary.com') || url.includes('res.cloudinary.com');
}
