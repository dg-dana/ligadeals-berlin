import { client, urlFor } from '@/sanity/sanity.client';
import { getAllVideosQuery } from '@/lib/sanity/queries';
import VideoGallery, { Video as VideoType } from '@/components/VideoGallery';

interface SanityVideo {
  _id: string;
  title: string;
  videoType?: 'file' | 'url';
  videoUrl?: string;
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

// Extract YouTube video ID from URL for thumbnails
function getYouTubeID(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default async function VideosPage() {
  const sanityVideos = await getVideos();

  // Transform Sanity videos to VideoGallery format
  const videos: VideoType[] = sanityVideos.map((video) => {
    const isFileUpload = video.videoType === 'file';
    const videoUrl = isFileUpload
      ? video.videoFile?.asset?.url || ''
      : video.videoUrl || '';
    const youtubeID = !isFileUpload && videoUrl ? getYouTubeID(videoUrl) : null;

    return {
      id: video._id,
      title: video.title,
      description: video.description || '',
      thumbnail: video.thumbnail
        ? urlFor(video.thumbnail).width(800).height(450).url()
        : youtubeID
          ? `https://img.youtube.com/vi/${youtubeID}/maxresdefault.jpg`
          : '/default-video-thumbnail.jpg',
      videoUrl: videoUrl,
      videoType: video.videoType || 'url',
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
