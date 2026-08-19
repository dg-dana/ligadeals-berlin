'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useReducedMotion } from '@/lib/a11y/useReducedMotion'

export interface Photo {
  id: string
  src: string
  alt: string
  caption: string
  category: string
}

interface PhotoGalleryProps {
  photos: Photo[]
  categories?: string[]
  itemsPerPage?: number
}

export default function PhotoGallery({
  photos,
  categories = [],
  itemsPerPage = 12
}: PhotoGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('הכל')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [displayedCount, setDisplayedCount] = useState(itemsPerPage)
  const reduceMotion = useReducedMotion()
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  })

  const openLightbox = (index: number) => {
    triggerRef.current = document.activeElement as HTMLElement
    setLightboxIndex(index)
  }

  // Focus restoration on close is handled by the focus-management effect below.
  const closeLightbox = () => setLightboxIndex(null)

  const allCategories = ['הכל', ...categories]

  // Filter photos by category
  const filteredPhotos = photos.filter(
    (photo) => selectedCategory === 'הכל' || photo.category === selectedCategory
  )

  // Reset displayed count when category changes
  useEffect(() => {
    setDisplayedCount(itemsPerPage)
  }, [selectedCategory, itemsPerPage])

  // Load more photos when scrolling to bottom
  useEffect(() => {
    if (inView && displayedCount < filteredPhotos.length) {
      setDisplayedCount(prev => Math.min(prev + itemsPerPage, filteredPhotos.length))
    }
  }, [inView, displayedCount, filteredPhotos.length, itemsPerPage])

  const displayedPhotos = filteredPhotos.slice(0, displayedCount)

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex === null) return

      if (e.key === 'Escape') {
        setLightboxIndex(null)
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1
        )
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0
        )
      }
    },
    [lightboxIndex, filteredPhotos.length]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Dialog focus management: move focus into the lightbox, trap Tab within it,
  // and return focus to the triggering thumbnail on close.
  const isLightboxOpen = lightboxIndex !== null
  useEffect(() => {
    if (!isLightboxOpen) return
    const dialog = dialogRef.current
    dialog?.querySelector<HTMLElement>('button')?.focus()

    const trapTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !dialog) return
      const focusable = dialog.querySelectorAll<HTMLElement>('button, a[href]')
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
  }, [isLightboxOpen])

  const goToNext = () => {
    setLightboxIndex((prev) =>
      prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0
    )
  }

  const goToPrevious = () => {
    setLightboxIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1
    )
  }

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

      {/* Masonry Grid Layout */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {displayedPhotos.map((photo, index) => (
          <motion.div
            key={photo.id}
            layout
            initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.8 }}
            transition={{ duration: reduceMotion ? 0 : 0.3 }}
            className="group relative overflow-hidden rounded-lg shadow-lg transition-shadow hover:shadow-2xl focus-within:ring-4 focus-within:ring-navy-900 focus-within:ring-offset-2"
          >
            {/* Full-card button (accessible name) opens the lightbox */}
            <button
              type="button"
              onClick={() => openLightbox(index)}
              aria-label={`הגדלת תמונה: ${photo.caption}`}
              className="absolute inset-0 z-10 cursor-pointer focus:outline-none"
            />
            <div className="relative aspect-square">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </div>
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-sm font-medium">{photo.caption}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Infinite Scroll Trigger */}
      {displayedCount < filteredPhotos.length && (
        <div ref={ref} className="mt-8 flex justify-center">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-navy-600 border-t-transparent"></div>
            <p className="text-gray-600 dark:text-gray-400">טוען עוד תמונות...</p>
          </div>
        </div>
      )}

      {/* Show total count */}
      {displayedCount >= filteredPhotos.length && filteredPhotos.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            מוצגות {filteredPhotos.length} תמונות מתוך {photos.length}
          </p>
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`תמונה ${lightboxIndex + 1} מתוך ${filteredPhotos.length}: ${filteredPhotos[lightboxIndex].caption}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-4 left-4 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              aria-label="סגירת התצוגה המוגדלת"
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

            {/* Previous Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              aria-label="התמונה הקודמת"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              aria-label="התמונה הבאה"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Main Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-h-[80vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredPhotos[lightboxIndex].src}
                alt={filteredPhotos[lightboxIndex].alt}
                width={1200}
                height={800}
                className="h-auto w-auto max-h-[80vh] max-w-full object-contain"
                priority
              />
              {/* Caption in Lightbox */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <p className="text-center text-lg font-medium">
                  {filteredPhotos[lightboxIndex].caption}
                </p>
                <p className="text-center text-sm text-gray-300 mt-1">
                  {lightboxIndex + 1} / {filteredPhotos.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
