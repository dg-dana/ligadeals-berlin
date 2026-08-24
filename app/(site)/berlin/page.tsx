import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'

const FeaturedSection = dynamic(() => import('@/components/home/FeaturedSection'), {
  loading: () => <div className="py-16 px-4 bg-white dark:bg-gray-800 h-96" />
})

const ContactPreview = dynamic(() => import('@/components/home/ContactPreview'), {
  loading: () => <div className="py-16 px-4 bg-white dark:bg-gray-800 h-96" />
})

export default function BerlinPage() {
  return (
    <div className="w-full">
      <Hero />
      <FeaturedSection />
      <ContactPreview />
    </div>
  );
}
