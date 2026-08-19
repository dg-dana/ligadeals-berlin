import type { Metadata } from 'next';
import { client, urlFor } from '@/sanity/sanity.client';
import { getApprovedTestimonialsQuery } from '@/lib/sanity/queries';
import TestimonialsGrid, { type Testimonial } from '@/components/TestimonialsGrid';
import type { SanityImage } from '@/lib/sanity/types';

export const metadata: Metadata = {
  title: 'המלצות | Traveliga',
  description: 'המלצות מלקוחות Traveliga על הטיולים והחוויות שלהם בברלין.',
};

interface SanityTestimonial {
  _id: string;
  customerName: string;
  rating: number;
  review: string;
  tripType?: string;
  date?: string;
  photo?: SanityImage;
}

async function getTestimonials() {
  try {
    return await client.fetch<SanityTestimonial[]>(
      getApprovedTestimonialsQuery,
      { limit: 100 },
      { cache: 'no-store' }
    );
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

export default async function RecommendationsPage() {
  const testimonials = await getTestimonials();

  const items: Testimonial[] = testimonials.map((t) => ({
    id: t._id,
    customerName: t.customerName,
    rating: t.rating,
    review: t.review,
    tripType: t.tripType,
    date: t.date,
    photoUrl: t.photo ? urlFor(t.photo).width(200).height(200).url() : undefined,
  }));

  return (
    <div className="min-h-screen py-12 px-4" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-navy-700 dark:text-white mb-4">המלצות</h1>
        <p className="mb-8 text-lg text-navy-400 dark:text-gray-300">
          מה הלקוחות שלנו מספרים על הטיולים והחוויות שלהם בברלין
        </p>

        {items.length === 0 ? (
          <p className="text-lg text-navy-400 dark:text-gray-300">
            אין המלצות זמינות כרגע. הוסף המלצות מאושרות ב-Sanity Studio.
          </p>
        ) : (
          <TestimonialsGrid testimonials={items} />
        )}
      </div>
    </div>
  );
}
