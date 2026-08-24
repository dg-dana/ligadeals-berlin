'use client'

import { useLanguage } from './LanguageContext'
import BerlinHero from './BerlinHero'
import BerlinFeatured, { type BerlinArticle } from './BerlinFeatured'
import BerlinContact from './BerlinContact'

interface BerlinGuideProps {
  articles: BerlinArticle[]
  contact: { email: string; phone: string }
}

/**
 * Client entry point for the Berlin guide. Reads the active language (provided
 * by the site layout, and toggled from the header) so the whole guide container
 * flips direction — RTL for Hebrew, LTR for English — as one unit. Data
 * (articles, contact details) is fetched on the server and passed in as props.
 */
export default function BerlinGuide({ articles, contact }: BerlinGuideProps) {
  const { dir, locale } = useLanguage()

  return (
    <div className="w-full" dir={dir} lang={locale}>
      <BerlinHero />
      <BerlinFeatured articles={articles} />
      <BerlinContact email={contact.email} phone={contact.phone} />
    </div>
  )
}
