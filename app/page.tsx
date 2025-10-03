import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'

// Lazy load components that are below the fold
const FeaturedSection = dynamic(() => import('@/components/home/FeaturedSection'), {
  loading: () => <div className="py-16 px-4 bg-white dark:bg-gray-800 h-96" />
})

const AboutPreview = dynamic(() => import('@/components/home/AboutPreview'), {
  loading: () => <div className="py-16 px-4 bg-gray-50 dark:bg-gray-900 h-96" />
})

const ContactPreview = dynamic(() => import('@/components/home/ContactPreview'), {
  loading: () => <div className="py-16 px-4 bg-white dark:bg-gray-800 h-96" />
})

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section - Critical, loaded immediately */}
      <Hero />

      {/* Lazy loaded sections below the fold */}
      <FeaturedSection />
      <AboutPreview />
      <ContactPreview />
    </div>
  );
}
