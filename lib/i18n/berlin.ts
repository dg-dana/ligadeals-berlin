/**
 * Bilingual (Hebrew / English) copy for the Traveliga Berlin guide.
 *
 * The rest of the site is Hebrew-only (the root layout is `lang="he" dir="rtl"`),
 * but the Berlin landing guide supports a client-side language toggle so the
 * chrome/copy can be read in either language. Only the guide's own UI strings
 * live here — article content authored in Sanity keeps its original language.
 */

export type Language = 'he' | 'en'

export const LANGUAGES: Language[] = ['he', 'en']
export const DEFAULT_LANGUAGE: Language = 'he'

/** localStorage key used to remember the reader's choice across visits. */
export const LANGUAGE_STORAGE_KEY = 'traveliga-berlin-lang'

/** Text direction for a given language. */
export function dirForLanguage(lang: Language): 'rtl' | 'ltr' {
  return lang === 'he' ? 'rtl' : 'ltr'
}

/** BCP-47 locale for a given language (used for `lang=` attributes). */
export function localeForLanguage(lang: Language): string {
  return lang === 'he' ? 'he-IL' : 'en-US'
}

export interface BerlinDictionary {
  /** Human-readable name of this language, shown on the toggle. */
  languageName: string
  /** aria-label for the language toggle control. */
  toggleAriaLabel: string
  hero: {
    badge: string
    /** Headline split so the middle part can be highlighted in gold. */
    headlineBefore: string
    headlineHighlight: string
    headlineAfter: string
    /** Sub-headline rendered as separate lines. */
    subheadline: string[]
    ctaContact: string
    ctaBlog: string
    scrollCue: string
  }
  featured: {
    title: string
    subtitle: string
    allButton: string
    /** Fallback label when an article has no category. */
    categoryFallback: string
  }
  contact: {
    title: string
    subtitle: string
    emailLabel: string
    phoneLabel: string
    button: string
  }
}

export const berlinDictionaries: Record<Language, BerlinDictionary> = {
  he: {
    languageName: 'עברית',
    toggleAriaLabel: 'בחירת שפה',
    hero: {
      badge: 'מדריך ברלין לישראלים',
      headlineBefore: 'גלו את ברלין ',
      headlineHighlight: 'בצורה אישית',
      headlineAfter: ' ובלתי נשכחת',
      subheadline: [
        'מדריכים, המלצות מקומיות וליווי אישי צמוד',
        'מתכנון החופשה ועד החזרה הביתה',
        'הכל בעברית ברוח ישראלית',
      ],
      ctaContact: 'צרו קשר עכשיו',
      ctaBlog: 'קראו את הבלוג',
      scrollCue: 'גלול למטה',
    },
    featured: {
      title: 'מאמרים מומלצים',
      subtitle: 'הכי חדש והכי מעניין מהבלוג שלנו',
      allButton: 'לכל המאמרים',
      categoryFallback: 'בלוג',
    },
    contact: {
      title: 'צור קשר',
      subtitle: 'יש לכם שאלות? מתכננים טיול לברלין? נשמח לשמוע מכם!',
      emailLabel: 'אימייל',
      phoneLabel: 'טלפון',
      button: 'שלח הודעה',
    },
  },
  en: {
    languageName: 'English',
    toggleAriaLabel: 'Choose language',
    hero: {
      badge: 'Your personal Berlin guide',
      headlineBefore: 'Discover Berlin ',
      headlineHighlight: 'your way',
      headlineAfter: ' — personal and unforgettable',
      subheadline: [
        'Guides, local recommendations and close personal support',
        'From planning your trip to your journey home',
        'Every step of the way, with a warm personal touch',
      ],
      ctaContact: 'Get in touch',
      ctaBlog: 'Read the blog',
      scrollCue: 'Scroll down',
    },
    featured: {
      title: 'Featured articles',
      subtitle: 'The latest and most interesting from our blog',
      allButton: 'View all articles',
      categoryFallback: 'Blog',
    },
    contact: {
      title: 'Contact us',
      subtitle: "Have questions? Planning a trip to Berlin? We'd love to hear from you!",
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      button: 'Send a message',
    },
  },
}

export function getBerlinDictionary(lang: Language): BerlinDictionary {
  return berlinDictionaries[lang] ?? berlinDictionaries[DEFAULT_LANGUAGE]
}
