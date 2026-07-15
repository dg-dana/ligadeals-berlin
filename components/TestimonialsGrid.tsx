'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

export interface Testimonial {
  id: string;
  customerName: string;
  rating: number;
  review: string;
  tripType?: string;
  date?: string;
  photoUrl?: string;
}

const TRIP_TYPE_LABELS: Record<string, string> = {
  'city-tour': 'סיור בעיר',
  restaurants: 'מסעדות',
  nightlife: 'חיי לילה',
  culture: 'תרבות ואומנות',
  other: 'אחר',
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`דירוג ${rating} מתוך 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={star <= rating ? 'text-gold-500' : 'text-gray-300 dark:text-gray-600'}
        />
      ))}
    </div>
  );
}

export default function TestimonialsGrid({ testimonials }: { testimonials: Testimonial[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState<number | 'all'>('all');

  const filtered = useMemo(() => {
    return testimonials.filter((t) => {
      const matchesRating = selectedRating === 'all' || t.rating === selectedRating;
      const matchesSearch = t.customerName.toLowerCase().includes(searchTerm.trim().toLowerCase());
      return matchesRating && matchesSearch;
    });
  }, [testimonials, searchTerm, selectedRating]);

  return (
    <div dir="rtl">
      {/* Search + Rating Filter */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="חיפוש לפי שם..."
          className="w-full max-w-sm rounded-lg border border-gray-300 bg-white px-4 py-2 text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedRating('all')}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              selectedRating === 'all'
                ? 'bg-navy-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            הכל
          </button>
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => setSelectedRating(rating)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                selectedRating === rating
                  ? 'bg-navy-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {rating} ⭐
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-lg text-navy-400 dark:text-gray-300">
          לא נמצאו המלצות התואמות לחיפוש.
        </p>
      ) : (
        <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800"
            >
              <div className="flex items-center gap-3">
                {testimonial.photoUrl ? (
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={testimonial.photoUrl}
                      alt={testimonial.customerName}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-600 text-lg font-bold text-gold-400">
                    {testimonial.customerName.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-bold text-navy-700 dark:text-white">
                    {testimonial.customerName}
                  </p>
                  <StarRating rating={testimonial.rating} />
                </div>
              </div>

              <p className="flex-1 text-navy-500 dark:text-gray-300">{testimonial.review}</p>

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                {testimonial.tripType && (
                  <span className="rounded-full bg-gold-50 px-3 py-1 font-medium text-navy-600 dark:bg-navy-900 dark:text-gold-400">
                    {TRIP_TYPE_LABELS[testimonial.tripType] || testimonial.tripType}
                  </span>
                )}
                {testimonial.date && (
                  <time>
                    {new Date(testimonial.date).toLocaleDateString('he-IL', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
