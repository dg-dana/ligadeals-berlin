import { client, urlFor } from '@/sanity/sanity.client';
import { getAllPhotosQuery } from '@/lib/sanity/queries';
import Image from 'next/image';

interface Photo {
  _id: string;
  title: string;
  image: any;
  caption?: string;
  category?: {
    title: string;
  };
  date?: string;
}

async function getPhotos() {
  try {
    const photos = await client.fetch<Photo[]>(
      getAllPhotosQuery,
      { start: 0, end: 100 },
      { cache: 'no-store' }
    );
    return photos;
  } catch (error) {
    console.error('Error fetching photos:', error);
    return [];
  }
}

export default async function PhotosPage() {
  const photos = await getPhotos();

  return (
    <div className="min-h-screen py-12 px-4" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          גלריית תמונות
        </h1>

        {photos.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            אין תמונות זמינות כרגע. הוסף תמונות ב-Sanity Studio.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {photos.map((photo) => (
              <div
                key={photo._id}
                className="group relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-shadow"
              >
                <div className="relative aspect-square">
                  <Image
                    src={urlFor(photo.image).width(600).height(600).url()}
                    alt={photo.image.alt || photo.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {photo.title}
                  </h3>
                  {photo.caption && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {photo.caption}
                    </p>
                  )}
                  {photo.category && (
                    <span className="inline-block mt-2 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                      {photo.category.title}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
