import type { Metadata } from 'next';
import { client, urlFor } from '@/sanity/sanity.client';
import PhotoGallery, { type Photo } from '@/components/PhotoGallery';
import type { SanityImage } from '@/lib/sanity/types';

export const metadata: Metadata = {
  title: 'גלריית תמונות',
  description: 'תמונות מברלין - רגעים, מקומות וחוויות מהעיר.',
};

interface SanityPhoto {
  _id: string;
  title: string;
  image: SanityImage;
  caption?: string;
  category?: { title: string };
}

const photosQuery = `
  *[_type == "photo" && !(_id in path("drafts.**"))]
  | order(date desc) {
    _id,
    title,
    image,
    caption,
    category->{title}
  }
`;

async function getPhotos(): Promise<SanityPhoto[]> {
  try {
    return await client.fetch<SanityPhoto[]>(photosQuery, {}, { cache: 'no-store' });
  } catch (error) {
    console.error('Error fetching photos:', error);
    return [];
  }
}

export default async function PhotosPage() {
  const sanityPhotos = await getPhotos();

  const photos: Photo[] = sanityPhotos.map((photo) => ({
    id: photo._id,
    src: urlFor(photo.image).width(1200).height(1200).url(),
    alt: photo.image?.alt || photo.title,
    caption: photo.caption || photo.title,
    category: photo.category?.title || 'הכל',
  }));

  const categories = Array.from(
    new Set(sanityPhotos.map((p) => p.category?.title).filter(Boolean))
  ) as string[];

  return (
    <div className="min-h-screen py-12 px-4" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-navy-700 dark:text-white mb-8">
          גלריית תמונות
        </h1>

        {photos.length === 0 ? (
          <p className="text-navy-400 dark:text-gray-300 text-lg">
            אין תמונות זמינות כרגע. הוסף תמונות ב-Sanity Studio.
          </p>
        ) : (
          <PhotoGallery photos={photos} categories={categories} />
        )}
      </div>
    </div>
  );
}
