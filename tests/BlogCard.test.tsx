import { renderWithProviders, screen } from './utils'
import BlogCard from '@/components/BlogCard'

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    article: ({ children, ...props }: any) => <article {...props}>{children}</article>,
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

describe('BlogCard Component', () => {
  const mockProps = {
    slug: 'test-blog-post',
    title: 'כותרת לדוגמה',
    excerpt: 'זהו תיאור קצר של הפוסט לבלוג שלנו עם תוכן מעניין',
    thumbnail: '/test-image.jpg',
    date: '2025-01-15T10:00:00Z',
    category: 'טכנולוגיה',
  }

  it('renders blog card with all content', () => {
    renderWithProviders(<BlogCard {...mockProps} />)

    expect(screen.getByText('כותרת לדוגמה')).toBeInTheDocument()
    expect(screen.getByText('זהו תיאור קצר של הפוסט לבלוג שלנו עם תוכן מעניין')).toBeInTheDocument()
    expect(screen.getByText('טכנולוגיה')).toBeInTheDocument()
  })

  it('renders correct link to blog post', () => {
    renderWithProviders(<BlogCard {...mockProps} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/blog/test-blog-post')
  })

  it('displays formatted date in Hebrew', () => {
    renderWithProviders(<BlogCard {...mockProps} />)

    // The date should be formatted in Hebrew locale
    const timeElement = screen.getByText(/15/i)
    expect(timeElement).toBeInTheDocument()
  })

  it('renders image with correct props', () => {
    renderWithProviders(<BlogCard {...mockProps} />)

    const image = screen.getByAltText('כותרת לדוגמה')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/test-image.jpg')
  })

  it('displays category tag', () => {
    renderWithProviders(<BlogCard {...mockProps} />)

    const category = screen.getByText('טכנולוגיה')
    expect(category).toBeInTheDocument()
    expect(category).toHaveClass('bg-blue-600', 'text-white')
  })

  it('displays "Read More" button in Hebrew', () => {
    renderWithProviders(<BlogCard {...mockProps} />)

    expect(screen.getByText('קרא עוד')).toBeInTheDocument()
  })

  it('has RTL direction attribute', () => {
    const { container } = renderWithProviders(<BlogCard {...mockProps} />)

    const article = container.querySelector('article')
    expect(article).toHaveAttribute('dir', 'rtl')
  })

  it('has proper dark mode classes', () => {
    const { container } = renderWithProviders(<BlogCard {...mockProps} />)

    const article = container.querySelector('article')
    expect(article).toHaveClass('bg-white', 'dark:bg-gray-800')
  })

  it('handles long title with line-clamp', () => {
    const longTitleProps = {
      ...mockProps,
      title: 'כותרת ארוכה מאוד מאוד מאוד שצריכה להיות מקוצרת עם line-clamp כדי שלא תיקח יותר מדי מקום בכרטיס',
    }

    renderWithProviders(<BlogCard {...longTitleProps} />)

    const title = screen.getByRole('heading', { level: 3 })
    expect(title).toHaveClass('line-clamp-2')
  })

  it('handles long excerpt with line-clamp', () => {
    const longExcerptProps = {
      ...mockProps,
      excerpt: 'תיאור ארוך מאוד מאוד מאוד שיכול להיות מקוצר עם line-clamp כדי שהכרטיס יישאר נקי וממוקד. זה יכול להכיל הרבה טקסט נוסף שלא יוצג במלואו.',
    }

    const { container } = renderWithProviders(<BlogCard {...longExcerptProps} />)

    const excerpt = container.querySelector('.line-clamp-3')
    expect(excerpt).toBeInTheDocument()
  })
})
