'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  videoUrl: string // YouTube, Vimeo URL, or direct video file URL
  videoType?: 'file' | 'url' // Type of video source
  category: string
}

interface VideoGalleryProps {
  videos: Video[]
  categories?: string[]
}

export default function VideoGallery({ videos, categories = [] }: VideoGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('הכל')
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [embedError, setEmbedError] = useState(false)

  const allCategories = ['הכל', ...categories]

  // Filter videos by category
  const filteredVideos = videos.filter(
    (video) => selectedCategory === 'הכל' || video.category === selectedCategory
  )

  // Convert YouTube/Vimeo URL to embed URL
  const getEmbedUrl = (url: string): string => {
    // YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('youtu.be')
        ? url.split('youtu.be/')[1]?.split('?')[0]?.split('&')[0]
        : url.split('v=')[1]?.split('&')[0]?.split('#')[0]
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`
    }
    // Vimeo
    if (url.includes('vimeo.com')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0]
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`
    }
    return url
  }

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedVideo(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Prevent body scroll when modal is open and reset embed error
  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = 'hidden'
      setEmbedError(false)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedVideo])

  return (
    <div className="w-full" dir="rtl">
      {/* Category Filter Tabs */}
      {categories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-3">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-6 py-2 font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Video Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredVideos.map((video) => (
          <motion.div
            key={video.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
            onClick={() => setSelectedVideo(video)}
          >
            {/* Thumbnail */}
            <div className="relative aspect-video">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Play Icon Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-all group-hover:bg-black/60">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="rounded-full bg-blue-600 p-4 shadow-xl"
                >
                  <svg
                    className="w-10 h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>
              </div>

              {/* Category Tag */}
              <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {video.category}
              </div>
            </div>

            {/* Video Info */}
            <div className="bg-white dark:bg-gray-800 p-4">
              <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {video.title}
              </h3>
              {video.description && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {video.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={() => setSelectedVideo(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 left-4 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
              aria-label="סגור"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Video Player Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Responsive Video Player */}
              <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-2xl bg-black">
                {selectedVideo.videoType === 'file' ? (
                  // Direct video file player
                  <video
                    className="absolute inset-0 h-full w-full"
                    controls
                    autoPlay
                    playsInline
                    preload="metadata"
                    crossOrigin="anonymous"
                  >
                    <source src={selectedVideo.videoUrl} type="video/mp4" />
                    <source src={selectedVideo.videoUrl} type="video/webm" />
                    <source src={selectedVideo.videoUrl} type="video/quicktime" />
                    <source src={selectedVideo.videoUrl} type="video/ogg" />
                    Your browser does not support the video tag.
                  </video>
                ) : embedError ? (
                  // Fallback for YouTube embed errors
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <svg className="w-20 h-20 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h3 className="text-xl font-bold text-white mb-2">
                      לא ניתן להטמיע סרטון זה
                    </h3>
                    <p className="text-gray-300 mb-6">
                      YouTube חסם את ההטמעה של סרטון זה. אנא צפה בו ישירות ב-YouTube או העלה את הסרטון כקובץ.
                    </p>
                    <a
                      href={selectedVideo.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      צפה ב-YouTube
                    </a>
                  </div>
                ) : (
                  // Embedded YouTube/Vimeo player
                  <iframe
                    src={getEmbedUrl(selectedVideo.videoUrl)}
                    title={selectedVideo.title}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    onError={() => setEmbedError(true)}
                  />
                )}
              </div>

              {/* Video Info Below Player */}
              <div className="mt-4 rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                <div className="mb-2">
                  <span className="inline-block rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
                    {selectedVideo.category}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">
                  {selectedVideo.title}
                </h2>
                {selectedVideo.description && (
                  <p className="text-gray-300 leading-relaxed">
                    {selectedVideo.description}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
