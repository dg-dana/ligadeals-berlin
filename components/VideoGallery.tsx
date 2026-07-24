'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/lib/a11y/useReducedMotion'

export interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  videoUrl: string // YouTube or Vimeo URL
  category: string
}

interface VideoGalleryProps {
  videos: Video[]
  categories?: string[]
}

export default function VideoGallery({ videos, categories = [] }: VideoGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('הכל')
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const reduceMotion = useReducedMotion()
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  const openVideo = (video: Video) => {
    triggerRef.current = document.activeElement as HTMLElement
    setSelectedVideo(video)
  }

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
        ? url.split('youtu.be/')[1]?.split('?')[0]
        : url.split('v=')[1]?.split('&')[0]
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`
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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedVideo])

  // Dialog focus management: focus into the modal, trap Tab, and restore focus
  // to the triggering thumbnail on close.
  const isVideoOpen = selectedVideo !== null
  useEffect(() => {
    if (!isVideoOpen) return
    const dialog = dialogRef.current
    dialog?.querySelector<HTMLElement>('button, iframe')?.focus()

    const trapTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !dialog) return
      const focusable = dialog.querySelectorAll<HTMLElement>('button, a[href], iframe')
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', trapTab)
    return () => {
      document.removeEventListener('keydown', trapTab)
      triggerRef.current?.focus()
    }
  }, [isVideoOpen])

  return (
    <div className="w-full" dir="rtl">
      {/* Category Filter Tabs */}
      {categories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-3">
          {allCategories.map((category) => (
            <button
              type="button"
              key={category}
              onClick={() => setSelectedCategory(category)}
              aria-pressed={selectedCategory === category}
              className={`rounded-full px-6 py-2 font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-navy-600 text-white shadow-lg scale-105'
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
            initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.8 }}
            transition={{ duration: reduceMotion ? 0 : 0.3 }}
            className="group relative overflow-hidden rounded-lg shadow-lg transition-shadow hover:shadow-2xl focus-within:ring-4 focus-within:ring-navy-900 focus-within:ring-offset-2"
          >
            {/* Full-card button (accessible name) opens the video modal */}
            <button
              type="button"
              onClick={() => openVideo(video)}
              aria-label={`ניגון וידאו: ${video.title}`}
              className="absolute inset-0 z-10 cursor-pointer focus:outline-none"
            />
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
                  className="rounded-full bg-gold-400 p-4 shadow-xl"
                >
                  <svg
                    className="w-10 h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
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
              <h3 className="font-bold text-navy-700 dark:text-white line-clamp-2 group-hover:text-gold-700 dark:group-hover:text-gold-400 transition-colors">
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
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`נגן וידאו: ${selectedVideo.title}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={() => setSelectedVideo(null)}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 left-4 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              aria-label="סגירת הווידאו"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
              {/* Responsive Video Iframe */}
              <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-2xl">
                <iframe
                  src={getEmbedUrl(selectedVideo.videoUrl)}
                  title={selectedVideo.title}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Info Below Player */}
              <div className="mt-4 rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                <div className="mb-2">
                  <span className="inline-block rounded-full bg-gold-400 px-3 py-1 text-sm font-semibold text-navy-800">
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
