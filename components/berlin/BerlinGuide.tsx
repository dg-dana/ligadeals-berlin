'use client'

import { LanguageProvider, useLanguage } from './LanguageContext'
import LanguageToggle from './LanguageToggle'
import BerlinHero from './BerlinHero'
import BerlinFeatured, { type BerlinArticle } from './BerlinFeatured'
import BerlinContact from './BerlinContact'

interface BerlinGuideProps {
  articles: BerlinArticle[]
  contact: { email: string; phone: string }
}

/**
 * Inner layout — reads the active language so the whole guide container flips
 * direction (RTL for Hebrew, LTR for English) as one unit.
 */
function BerlinGuideContent({ articles, contact }: BerlinGuideProps) {
  const { dir, locale } = useLanguage()

  return (
    <div className="w-full" dir={dir} lang={locale}>
      {/* Language switch — sticks just below the site navigation while scrolling,
          pinned to the top-right corner regardless of the guide's direction. */}
      <div dir="ltr" className="pointer-events-none sticky top-20 z-40 flex justify-end px-4">
        <LanguageToggle className="pointer-events-auto" />
      </div>

      {/* The sticky bar above sits in normal flow, so pull the hero back up to
          reclaim the space and keep it flush against the navigation. */}
      <div className="-mt-16">
        <BerlinHero />
      </div>
      <BerlinFeatured articles={articles} />
      <BerlinContact email={contact.email} phone={contact.phone} />
    </div>
  )
}

/**
 * Client entry point for the Berlin guide. Wraps the guide in the language
 * provider so the Hebrew/English toggle drives every section's copy and
 * direction. Data (articles, contact details) is fetched on the server and
 * passed in as plain props.
 */
export default function BerlinGuide(props: BerlinGuideProps) {
  return (
    <LanguageProvider>
      <BerlinGuideContent {...props} />
    </LanguageProvider>
  )
}
