import { client, urlFor } from '@/sanity/sanity.client';
import { getAllVideosQuery } from '@/lib/sanity/queries';
import VideoGallery, { Video as VideoType } from '@/components/VideoGallery';

interface SanityVideo {
  _id: string;
  title: string;
  videoFile?: {
    asset?: {
      _id: string;
      url: string;
    };
  };
  thumbnail?: any;
  description?: string;
  category?: {
    title: string;
  };
  duration?: string;
}

async function getVideos() {
  try {
    const videos = await client.fetch<SanityVideo[]>(
      getAllVideosQuery,
      { start: 0, end: 100 },
      { cache: 'no-store' }
    );
    return videos;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}

export default async function VideosPage() {
  const sanityVideos = await getVideos();

  // Transform Sanity videos to VideoGallery format
  const videos: VideoType[] = sanityVideos
    .filter((video) => video.videoFile?.asset?.url) // Only include videos with valid file
    .map((video) => {
      const videoUrl = video.videoFile?.asset?.url || '';

      return {
        id: video._id,
        title: video.title,
        description: video.description || '',
        thumbnail: video.thumbnail
          ? urlFor(video.thumbnail).width(800).height(450).url()
          : '/default-video-thumbnail.jpg',
        videoUrl: videoUrl,
        category: video.category?.title || 'כללי',
      };
    });

  // Extract unique categories
  const categories = Array.from(new Set(videos.map(v => v.category)));

  return (
    <div className="min-h-screen py-12 px-4" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          גלריית וידאו
        </h1>

        {videos.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            אין סרטונים זמינים כרגע. הוסף סרטונים ב-Sanity Studio.
          </p>
        ) : (
          <VideoGallery videos={videos} categories={categories} />
        )}
      </div>
    </div>
  );
}
