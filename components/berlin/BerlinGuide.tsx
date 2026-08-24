'use client'

import { LanguageProvider, useLanguage } from './LanguageContext'
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
      {/* The language switch lives inside the hero (top corner) so it reads as
          part of the composition instead of floating over every section. */}
      <BerlinHero />
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
