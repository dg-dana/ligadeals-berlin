import { client, urlFor } from '@/sanity/sanity.client';
import { getAllVideosQuery } from '@/lib/sanity/queries';
import Image from 'next/image';

interface Video {
  _id: string;
  title: string;
  videoUrl: string;
  thumbnail?: any;
  description?: string;
  category?: {
    title: string;
  };
  duration?: string;
}

async function getVideos() {
  try {
    const videos = await client.fetch<Video[]>(
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

// Extract YouTube video ID from URL
function getYouTubeID(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default async function VideosPage() {
  const videos = await getVideos();

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => {
              const youtubeID = getYouTubeID(video.videoUrl);

              return (
                <div
                  key={video._id}
                  className="group relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-shadow"
                >
                  <a
                    href={video.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="relative aspect-video bg-gray-200 dark:bg-gray-700">
                      {video.thumbnail ? (
                        <Image
                          src={urlFor(video.thumbnail).width(800).height(450).url()}
                          alt={video.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : youtubeID ? (
                        <Image
                          src={`https://img.youtube.com/vi/${youtubeID}/maxresdefault.jpg`}
                          alt={video.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                          </svg>
                        </div>
                      )}

                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-colors">
                        <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        </div>
                      </div>

                      {video.duration && (
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                          {video.description}
                        </p>
                      )}
                      {video.category && (
                        <span className="inline-block text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded">
                          {video.category.title}
                        </span>
                      )}
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
