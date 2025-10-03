import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

// Mock data generators for testing
export const mockBlogPost = {
  _id: 'test-post-1',
  title: 'Test Blog Post',
  slug: { current: 'test-blog-post' },
  excerpt: 'This is a test excerpt for the blog post',
  publishedAt: '2025-01-15T10:00:00Z',
  author: {
    name: 'Test Author',
    image: '/test-author.jpg',
  },
  mainImage: {
    asset: {
      url: '/test-image.jpg',
    },
    alt: 'Test image',
  },
  categories: [{ title: 'Technology', slug: { current: 'technology' } }],
  readTime: 5,
}

export const mockTestimonial = {
  _id: 'test-testimonial-1',
  name: 'יוסי כהן',
  company: 'חברת בדיקה בע"מ',
  role: 'מנכ"ל',
  content: 'ליגה דילס הביאה לנו תוצאות מעולות. השירות מקצועי וממוקד.',
  rating: 5,
  image: {
    asset: {
      url: '/test-person.jpg',
    },
    alt: 'Test Person',
  },
  featured: true,
}

export const mockService = {
  _id: 'test-service-1',
  title: 'SEO Optimization',
  slug: { current: 'seo-optimization' },
  description: 'Comprehensive SEO services to improve your online visibility',
  icon: 'chart-bar',
  features: ['Keyword Research', 'On-page SEO', 'Link Building'],
  pricing: {
    basic: 500,
    advanced: 1000,
    enterprise: 2000,
  },
}

export const mockProject = {
  _id: 'test-project-1',
  title: 'E-commerce Website',
  slug: { current: 'ecommerce-website' },
  client: 'Test Client',
  description: 'Modern e-commerce platform with advanced features',
  challenge: 'Build a scalable online store',
  solution: 'Implemented Next.js with Sanity CMS',
  results: '300% increase in sales',
  technologies: ['Next.js', 'React', 'Sanity'],
  image: {
    asset: {
      url: '/test-project.jpg',
    },
    alt: 'Test Project',
  },
  featured: true,
  completedAt: '2025-01-01',
}

// Custom render function with providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialProps?: Record<string, unknown>
}

export function renderWithProviders(
  ui: ReactElement,
  options?: CustomRenderOptions
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <>{children}</>
  }

  return render(ui, { wrapper: Wrapper, ...options })
}

// Helper to test RTL behavior
export const isRTL = (element: HTMLElement): boolean => {
  const direction = window.getComputedStyle(element).direction
  return direction === 'rtl'
}

// Helper to wait for animations
export const waitForAnimation = () =>
  new Promise((resolve) => setTimeout(resolve, 500))

// Helper to create mock intersection observer
export const mockIntersectionObserver = () => {
  const mockIntersectionObserver = jest.fn()
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  })
  window.IntersectionObserver = mockIntersectionObserver as any
}

// Helper to create mock resize observer
export const mockResizeObserver = () => {
  const mockResizeObserver = jest.fn()
  mockResizeObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  })
  window.ResizeObserver = mockResizeObserver as any
}

// Export everything from React Testing Library
export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
