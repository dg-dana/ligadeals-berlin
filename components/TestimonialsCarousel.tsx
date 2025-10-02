'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import TestimonialCard, { TestimonialProps } from './TestimonialCard'

interface TestimonialsCarouselProps {
  testimonials: TestimonialProps[]
  autoPlayInterval?: number // in milliseconds
}

export default function TestimonialsCarousel({
  testimonials,
  autoPlayInterval = 5000
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [cardsPerView, setCardsPerView] = useState(1)

  // Responsive cards per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(3) // Desktop: 3 cards
      } else if (window.innerWidth >= 768) {
        setCardsPerView(2) // Tablet: 2 cards
      } else {
        setCardsPerView(1) // Mobile: 1 card
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIndex = Math.max(0, testimonials.length - cardsPerView)

  // Auto-play functionality
  useEffect(() => {
    if (isPaused || testimonials.length <= cardsPerView) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isPaused, autoPlayInterval, maxIndex, testimonials.length, cardsPerView])

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex))
  }

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }, [maxIndex])

  // Swipe handlers
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50
    if (info.offset.x > threshold) {
      goToPrevious() // Swipe right (previous in RTL)
    } else if (info.offset.x < -threshold) {
      goToNext() // Swipe left (next in RTL)
    }
  }

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + cardsPerView)

  return (
    <div
      className="relative w-full"
      dir="rtl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="flex gap-6 cursor-grab active:cursor-grabbing"
        >
          <AnimatePresence mode="popLayout">
            {visibleTestimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className={`flex-shrink-0 ${
                  cardsPerView === 3
                    ? 'w-[calc(33.333%-1rem)]'
                    : cardsPerView === 2
                    ? 'w-[calc(50%-0.75rem)]'
                    : 'w-full'
                }`}
              >
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      {testimonials.length > cardsPerView && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 rounded-full bg-white dark:bg-gray-800 p-3 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="הקודם"
            disabled={currentIndex === 0}
          >
            <svg className="w-6 h-6 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 rounded-full bg-white dark:bg-gray-800 p-3 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="הבא"
            disabled={currentIndex >= maxIndex}
          >
            <svg className="w-6 h-6 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Navigation */}
      {testimonials.length > cardsPerView && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === index
                  ? 'w-8 bg-blue-600'
                  : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-blue-400'
              }`}
              aria-label={`עבור לעמוד ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Auto-play indicator */}
      {!isPaused && testimonials.length > cardsPerView && (
        <div className="mt-4 text-center">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            הצג מעבר אוטומטי - עבור עם העכבר להשהייה
          </span>
        </div>
      )}
    </div>
  )
}
