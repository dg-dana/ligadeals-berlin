import { renderWithProviders, screen, userEvent } from './utils'
import Navigation from '@/components/Navigation'

describe('Navigation Component', () => {
  it('renders the logo and site name', () => {
    renderWithProviders(<Navigation />)
    expect(screen.getByText('LD')).toBeInTheDocument()
    expect(screen.getByText('Liga Deals Berlin')).toBeInTheDocument()
  })

  it('renders all menu items', () => {
    renderWithProviders(<Navigation />)
    expect(screen.getByText('דף הבית')).toBeInTheDocument()
    expect(screen.getByText('בלוג')).toBeInTheDocument()
    expect(screen.getByText('גלריית תמונות')).toBeInTheDocument()
    expect(screen.getByText('גלריית וידאו')).toBeInTheDocument()
    expect(screen.getByText('המלצות')).toBeInTheDocument()
    expect(screen.getByText('צור קשר')).toBeInTheDocument()
  })

  it('renders correct links for menu items', () => {
    renderWithProviders(<Navigation />)
    const homeLinks = screen.getAllByRole('link', { name: /דף הבית/i })
    expect(homeLinks[0]).toHaveAttribute('href', '/')

    const blogLinks = screen.getAllByRole('link', { name: /בלוג/i })
    expect(blogLinks[0]).toHaveAttribute('href', '/blog')
  })

  it('shows mobile menu button on small screens', () => {
    renderWithProviders(<Navigation />)
    const toggleButton = screen.getByLabelText('Toggle menu')
    expect(toggleButton).toBeInTheDocument()
  })

  it('toggles mobile menu when button is clicked', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Navigation />)

    const toggleButton = screen.getByLabelText('Toggle menu')

    // Menu should not be visible initially (checking for duplicate menu items)
    const initialMenuItems = screen.getAllByText('דף הבית')
    expect(initialMenuItems).toHaveLength(1) // Only desktop version

    // Click to open menu
    await user.click(toggleButton)

    // Menu should now be visible (both desktop and mobile versions)
    const openMenuItems = screen.getAllByText('דף הבית')
    expect(openMenuItems.length).toBeGreaterThan(1) // Desktop + mobile versions
  })

  it('closes mobile menu when a menu item is clicked', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Navigation />)

    const toggleButton = screen.getByLabelText('Toggle menu')

    // Open menu
    await user.click(toggleButton)

    // Click a menu item
    const mobileMenuItems = screen.getAllByText('בלוג')
    await user.click(mobileMenuItems[mobileMenuItems.length - 1]) // Click mobile version

    // Menu should close (back to one instance)
    const closedMenuItems = screen.getAllByText('דף הבית')
    expect(closedMenuItems).toHaveLength(1)
  })

  it('displays RTL Hebrew text correctly', () => {
    renderWithProviders(<Navigation />)
    const hebrewText = screen.getByText('דף הבית')
    expect(hebrewText).toBeInTheDocument()
    expect(hebrewText).toHaveTextContent('דף הבית')
  })

  it('has proper sticky navigation styling', () => {
    const { container } = renderWithProviders(<Navigation />)
    const nav = container.querySelector('nav')
    expect(nav).toHaveClass('sticky', 'top-0', 'z-50')
  })

  it('has dark mode support classes', () => {
    const { container } = renderWithProviders(<Navigation />)
    const nav = container.querySelector('nav')
    expect(nav).toHaveClass('bg-white', 'dark:bg-gray-900')
  })
})
