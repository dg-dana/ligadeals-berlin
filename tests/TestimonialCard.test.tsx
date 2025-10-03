import { renderWithProviders, screen } from './utils'
import TestimonialCard from '@/components/TestimonialCard'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />
  },
}))

describe('TestimonialCard Component', () => {
  const mockTestimonial = {
    id: '1',
    customerName: 'יוסי כהן',
    tripType: 'טיול משפחתי לברלין',
    review: 'חוויה מדהימה! ליגה דילס תכננו לנו את הטיול המושלם. כל הפרטים היו מסודרים והשירות היה מעולה.',
    rating: 5,
    date: '2025-01-15T10:00:00Z',
    customerPhoto: '/customer.jpg',
  }

  it('renders testimonial with all content', () => {
    renderWithProviders(<TestimonialCard {...mockTestimonial} />)

    expect(screen.getByText('יוסי כהן')).toBeInTheDocument()
    expect(screen.getByText('טיול משפחתי לברלין')).toBeInTheDocument()
    expect(screen.getByText(/חוויה מדהימה/i)).toBeInTheDocument()
  })

  it('displays Hebrew text correctly', () => {
    renderWithProviders(<TestimonialCard {...mockTestimonial} />)

    const hebrewName = screen.getByText('יוסי כהן')
    expect(hebrewName).toBeInTheDocument()

    const hebrewReview = screen.getByText(/חוויה מדהימה/i)
    expect(hebrewReview).toBeInTheDocument()
  })

  it('renders correct number of filled stars based on rating', () => {
    const { container } = renderWithProviders(<TestimonialCard {...mockTestimonial} />)

    const stars = container.querySelectorAll('svg')
    const filledStars = Array.from(stars).filter((star) =>
      star.classList.contains('text-yellow-400')
    )

    // 5 stars + quote icon + possibly user icon = multiple SVGs
    // But only rating stars should have text-yellow-400 class
    expect(filledStars.length).toBe(5)
  })

  it('renders empty stars for remaining rating', () => {
    const partialRating = {
      ...mockTestimonial,
      rating: 3,
    }

    const { container } = renderWithProviders(<TestimonialCard {...partialRating} />)

    const stars = container.querySelectorAll('svg')
    const emptyStars = Array.from(stars).filter(
      (star) =>
        star.classList.contains('text-gray-300') || star.classList.contains('dark:text-gray-600')
    )

    expect(emptyStars.length).toBe(2)
  })

  it('displays formatted date in Hebrew', () => {
    renderWithProviders(<TestimonialCard {...mockTestimonial} />)

    // Check for Hebrew month (should contain the word for January in Hebrew)
    const dateElement = screen.getByText(/2025/i)
    expect(dateElement).toBeInTheDocument()
  })

  it('renders customer photo when provided', () => {
    renderWithProviders(<TestimonialCard {...mockTestimonial} />)

    const photo = screen.getByAltText('יוסי כהן')
    expect(photo).toBeInTheDocument()
    expect(photo).toHaveAttribute('src', '/customer.jpg')
  })

  it('renders default avatar when no photo provided', () => {
    const noPhotoTestimonial = {
      ...mockTestimonial,
      customerPhoto: undefined,
    }

    const { container } = renderWithProviders(<TestimonialCard {...noPhotoTestimonial} />)

    // Should render user icon SVG instead of image
    const avatar = container.querySelector('.bg-blue-100')
    expect(avatar).toBeInTheDocument()
  })

  it('has RTL direction attribute', () => {
    const { container } = renderWithProviders(<TestimonialCard {...mockTestimonial} />)

    const testimonialCard = container.querySelector('[dir="rtl"]')
    expect(testimonialCard).toBeInTheDocument()
  })

  it('has proper dark mode classes', () => {
    const { container } = renderWithProviders(<TestimonialCard {...mockTestimonial} />)

    const card = container.querySelector('.bg-white')
    expect(card).toHaveClass('bg-white', 'dark:bg-gray-800')
  })

  it('displays quote icon', () => {
    const { container } = renderWithProviders(<TestimonialCard {...mockTestimonial} />)

    const quoteIcon = container.querySelector('.text-blue-100')
    expect(quoteIcon).toBeInTheDocument()
  })

  it('displays review in italic style', () => {
    const { container } = renderWithProviders(<TestimonialCard {...mockTestimonial} />)

    const review = container.querySelector('.italic')
    expect(review).toBeInTheDocument()
    expect(review?.textContent).toContain('חוויה מדהימה')
  })

  it('separates trip type and date with bullet point', () => {
    renderWithProviders(<TestimonialCard {...mockTestimonial} />)

    expect(screen.getByText('•')).toBeInTheDocument()
  })

  it('handles zero rating', () => {
    const zeroRating = {
      ...mockTestimonial,
      rating: 0,
    }

    const { container } = renderWithProviders(<TestimonialCard {...zeroRating} />)

    const filledStars = Array.from(container.querySelectorAll('svg')).filter((star) =>
      star.classList.contains('text-yellow-400')
    )

    expect(filledStars.length).toBe(0)
  })

  it('has shadow and rounded corners', () => {
    const { container } = renderWithProviders(<TestimonialCard {...mockTestimonial} />)

    const card = container.querySelector('.rounded-2xl')
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('shadow-xl')
  })
})
