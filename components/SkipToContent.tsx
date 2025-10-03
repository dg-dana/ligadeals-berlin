'use client'

/**
 * Skip to Content Link
 *
 * Provides keyboard users a way to skip navigation and jump directly to main content.
 * This is a WCAG 2.1 Level A requirement (2.4.1 Bypass Blocks).
 *
 * The link is visually hidden but becomes visible when focused via keyboard.
 */

export default function SkipToContent() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const mainContent = document.getElementById('main-content')

    if (mainContent) {
      mainContent.focus()
      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <a
      href="#main-content"
      onClick={handleClick}
      className="
        sr-only focus:not-sr-only
        fixed top-4 right-4 z-[9999]
        bg-blue-600 text-white
        px-6 py-3 rounded-lg
        font-bold text-lg
        focus:outline-none focus:ring-4 focus:ring-blue-300
        transition-all
      "
    >
      דלג לתוכן הראשי
    </a>
  )
}
