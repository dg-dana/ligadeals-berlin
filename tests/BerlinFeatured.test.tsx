import { render, screen } from './utils'
import BerlinFeatured, { type BerlinArticle } from '@/components/berlin/BerlinFeatured'
import { LanguageProvider } from '@/components/berlin/LanguageContext'

// Mock framer-motion + next/image so the underlying BlogCard renders in jsdom.
jest.mock('framer-motion', () => ({
  motion: {
    article: ({ children, ...props }: any) => <article {...props}>{children}</article>,
  },
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />
  },
}))

const bilingualArticle: BerlinArticle = {
  id: 'a1',
  title: 'כותרת בעברית',
  titleEn: 'English Title',
  slug: 'a1',
  excerpt: 'תקציר בעברית',
  excerptEn: 'English excerpt',
  thumbnail: '/a1.jpg',
  date: '2025-01-15T10:00:00Z',
  category: 'טיולים',
  categoryEn: 'Travel',
}

// An article with no English translations — should fall back to Hebrew in en.
const hebrewOnlyArticle: BerlinArticle = {
  id: 'a2',
  title: 'רק עברית',
  titleEn: '',
  slug: 'a2',
  excerpt: 'תקציר עברי בלבד',
  excerptEn: '',
  thumbnail: '/a2.jpg',
  date: '2025-02-20T10:00:00Z',
  category: '',
  categoryEn: '',
}

function renderInLanguage(lang: 'he' | 'en', articles: BerlinArticle[]) {
  return render(
    <LanguageProvider initialLanguage={lang}>
      <BerlinFeatured articles={articles} />
    </LanguageProvider>,
  )
}

describe('BerlinFeatured bilingual content', () => {
  beforeEach(() => {
    // The provider restores a saved choice from localStorage on mount, which
    // would otherwise leak between tests and override initialLanguage.
    localStorage.clear()
  })

  it('renders nothing when there are no articles', () => {
    const { container } = renderInLanguage('he', [])
    expect(container).toBeEmptyDOMElement()
  })

  it('shows Hebrew title, excerpt and category in Hebrew mode', () => {
    renderInLanguage('he', [bilingualArticle])

    expect(screen.getByText('כותרת בעברית')).toBeInTheDocument()
    expect(screen.getByText('תקציר בעברית')).toBeInTheDocument()
    expect(screen.getByText('טיולים')).toBeInTheDocument()
    expect(screen.queryByText('English Title')).not.toBeInTheDocument()
  })

  it('shows English title, excerpt and category in English mode', () => {
    renderInLanguage('en', [bilingualArticle])

    expect(screen.getByText('English Title')).toBeInTheDocument()
    expect(screen.getByText('English excerpt')).toBeInTheDocument()
    expect(screen.getByText('Travel')).toBeInTheDocument()
    expect(screen.queryByText('כותרת בעברית')).not.toBeInTheDocument()
  })

  it('falls back to Hebrew content in English mode when a translation is missing', () => {
    renderInLanguage('en', [hebrewOnlyArticle])

    expect(screen.getByText('רק עברית')).toBeInTheDocument()
    expect(screen.getByText('תקציר עברי בלבד')).toBeInTheDocument()
  })

  it('uses the dictionary category fallback when an article has no category', () => {
    // Hebrew-only article has an empty category; in English mode the section
    // falls back to the English dictionary label ("Blog").
    renderInLanguage('en', [hebrewOnlyArticle])
    expect(screen.getByText('Blog')).toBeInTheDocument()
  })
})
