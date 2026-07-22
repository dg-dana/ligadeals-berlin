import type { Metadata } from 'next';
import { client, urlFor } from '@/sanity/sanity.client';
import VideoGallery, { type Video } from '@/components/VideoGallery';
import type { SanityImage } from '@/lib/sanity/types';

export const metadata: Metadata = {
  title: 'גלריית וידאו',
  description: 'סרטונים מברלין - רגעים, מקומות וחוויות מהעיר.',
};

interface SanityVideo {
  _id: string;
  title: string;
  videoUrl: string;
  thumbnail?: SanityImage;
  description?: string;
  category?: { title: string };
}

const videosQuery = `
  *[_type == "video" && !(_id in path("drafts.**"))]
  | order(publishedAt desc) {
    _id,
    title,
    videoUrl,
    thumbnail,
    description,
    category->{title}
  }
`;

async function getVideos(): Promise<SanityVideo[]> {
  try {
    return await client.fetch<SanityVideo[]>(videosQuery, {}, { cache: 'no-store' });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}

export default async function VideosPage() {
  const sanityVideos = await getVideos();

  const videos: Video[] = sanityVideos.map((video) => ({
    id: video._id,
    title: video.title,
    description: video.description || '',
    thumbnail: video.thumbnail ? urlFor(video.thumbnail).width(800).height(450).url() : '/images/blog-fallback.png',
    videoUrl: video.videoUrl,
    category: video.category?.title || 'הכל',
  }));

  const categories = Array.from(
    new Set(sanityVideos.map((v) => v.category?.title).filter(Boolean))
  ) as string[];

  return (
    <div className="min-h-screen py-12 px-4" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-navy-700 dark:text-white mb-8">
          גלריית וידאו
        </h1>

        {videos.length === 0 ? (
          <p className="text-navy-400 dark:text-gray-300 text-lg">
            אין סרטונים זמינים כרגע. הוסף סרטונים ב-Sanity Studio.
          </p>
        ) : (
          <VideoGallery videos={videos} categories={categories} />
        )}
      </div>
    </div>
  );
}
