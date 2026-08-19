import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import Button from '@/components/Button'
import { FaWhatsapp, FaBookOpen, FaHandshake, FaBullseye, FaPiggyBank, FaStar } from 'react-icons/fa'
import { getSiteSettings } from '@/lib/sanity/siteSettings'
import { articlePortableTextComponents } from '@/lib/sanity/portableTextComponents'
import { urlFor } from '@/sanity/sanity.client'

// Shown until aboutText is filled in via Sanity Studio (siteSettings document)
const FALLBACK_ABOUT = (
  <>
    <p className="mb-4 text-lg leading-relaxed text-navy-700 dark:text-gray-300">
      נעים להכיר, אני מיטל - מומחית ברלין, וכבר 17 שנה שאני חיה ונושמת את העיר הזאת. את כל מה
      שלמדתי כאן - השכונות, המקומות, והטריקים הקטנים שחוסכים זמן וכסף - אני מעמידה לרשותכם, כדי
      שתצאו לחופשה בראש שקט באמת.
    </p>
    <ul className="mb-4 list-disc space-y-2 pr-6 text-lg text-navy-700 dark:text-gray-300">
      <li>ליווי אישי מהרגע הראשון - מבחירת המלון המושלם בשבילכם ועד החזרה הביתה</li>
      <li>תמיכת וואטסאפ צמודה לפני הטיול ולכל אורכו - לכל שאלה שצצה בדרך</li>
      <li>טיפים והמלצות של מקומית אמיתית - המקומות שרק מי שגרה כאן מכירה</li>
      <li>סיורים מיוחדים בהתאמה אישית</li>
    </ul>
    <p className="text-lg leading-relaxed text-navy-700 dark:text-gray-300">
      בקיצור: אתם באים ליהנות, ואני דואגת לכל השאר. מוזמנים לכתוב לי - אני כאן.
    </p>
  </>
)

export default async function About() {
  const settings = await getSiteSettings()
  const aboutImageUrl = settings.aboutImage
    ? urlFor(settings.aboutImage).width(800).height(800).url()
    : '/images/meital.jpg'

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-600 via-navy-700 to-navy-800 py-20 px-4">
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gold-400/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 -left-24 h-72 w-72 rounded-full bg-gold-300/10 blur-3xl" />
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            אודות <span className="text-gold-400">Traveliga</span>
          </h1>
          <p className="text-xl text-navy-100 max-w-3xl mx-auto">
            מדריך ברלין בעברית - טיפים, המלצות וליווי אישי לחופשה מושלמת בעיר
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Meet Meital */}
          <div className="mb-16 grid items-center gap-10 md:grid-cols-[minmax(0,340px)_1fr]" dir="rtl">
            <div className="relative mx-auto w-full max-w-[340px]">
              <div className="pointer-events-none absolute -inset-3 rounded-3xl bg-gold-400/20" />
              <Image
                src={aboutImageUrl}
                alt="מיטל - מומחית ברלין"
                width={800}
                height={800}
                className="relative aspect-square w-full rounded-3xl object-cover shadow-lg ring-4 ring-gold-400/60"
                priority
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-navy-700 dark:text-white mb-6">
                הכירו את מיטל
              </h2>
              {settings.aboutText && settings.aboutText.length > 0 ? (
                <PortableText value={settings.aboutText} components={articlePortableTextComponents} />
              ) : (
                FALLBACK_ABOUT
              )}
            </div>
          </div>

          {/* What We Offer */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-navy-700 dark:text-white mb-8">
              מה תמצאו כאן?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="rounded-2xl bg-white dark:bg-navy-700 p-6 shadow-sm ring-1 ring-navy-100 dark:ring-navy-600">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-700 dark:bg-navy-600/50 dark:text-gold-400">
                  <FaHandshake className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-navy-700 dark:text-white mb-3">
                  ליווי אישי
                </h3>
                <p className="text-navy-400 dark:text-gray-300">
                  ליווי צמוד בתכנון החופשה - מבחירת המלון המושלם בשבילכם ועד החזרה הביתה
                </p>
              </div>

              <div className="rounded-2xl bg-white dark:bg-navy-700 p-6 shadow-sm ring-1 ring-navy-100 dark:ring-navy-600">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-700 dark:bg-navy-600/50 dark:text-gold-400">
                  <FaBookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-navy-700 dark:text-white mb-3">
                  מדריכים בעברית
                </h3>
                <p className="text-navy-400 dark:text-gray-300">
                  כתבות ומדריכים על השכונות, האטרקציות והפינות שרק מקומיים מכירים
                </p>
              </div>

              <div className="rounded-2xl bg-white dark:bg-navy-700 p-6 shadow-sm ring-1 ring-navy-100 dark:ring-navy-600">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-700 dark:bg-navy-600/50 dark:text-gold-400">
                  <FaWhatsapp className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-navy-700 dark:text-white mb-3">
                  וואטסאפ זמין
                </h3>
                <p className="text-navy-400 dark:text-gray-300">
                  תמיכה צמודה לפני הטיול ולכל אורכו - תשובה אמיתית לכל שאלה, בעברית
                </p>
              </div>

              <div className="rounded-2xl bg-white dark:bg-navy-700 p-6 shadow-sm ring-1 ring-navy-100 dark:ring-navy-600">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-700 dark:bg-navy-600/50 dark:text-gold-400">
                  <FaBullseye className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-navy-700 dark:text-white mb-3">
                  המלצות אישיות
                </h3>
                <p className="text-navy-400 dark:text-gray-300">
                  מסעדות, הופעות, קניות או טיול עם ילדים - המלצות לפי מה שמעניין בדיוק אתכם
                </p>
              </div>

              <div className="rounded-2xl bg-white dark:bg-navy-700 p-6 shadow-sm ring-1 ring-navy-100 dark:ring-navy-600">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-700 dark:bg-navy-600/50 dark:text-gold-400">
                  <FaPiggyBank className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-navy-700 dark:text-white mb-3">
                  חיסכון בזמן ובכסף
                </h3>
                <p className="text-navy-400 dark:text-gray-300">
                  הטריקים המקומיים שחוסכים - תחבורה, כרטיסים וקניות, בלי ללמוד בדרך הקשה
                </p>
              </div>

              <div className="rounded-2xl bg-white dark:bg-navy-700 p-6 shadow-sm ring-1 ring-navy-100 dark:ring-navy-600">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-700 dark:bg-navy-600/50 dark:text-gold-400">
                  <FaStar className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-navy-700 dark:text-white mb-3">
                  סיורים מיוחדים
                </h3>
                <p className="text-navy-400 dark:text-gray-300">
                  סיורים בהתאמה אישית שיראו לכם את ברלין מזווית שלא הכרתם
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-600 to-navy-700 p-12 text-center shadow-lg">
            <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-gold-400/10 blur-3xl" />
            <div className="relative">
              <h2 className="text-4xl font-bold text-white mb-6">
                מתכננים חופשה בברלין?
              </h2>
              <p className="text-xl text-navy-100 mb-8 max-w-2xl mx-auto">
                ספרו לי מה אתם מחפשים, ואדאג שהחופשה שלכם תהיה בדיוק כמו שדמיינתם - ואפילו יותר
              </p>
              <Button href="/contact" variant="gold" size="lg">
                צור קשר עכשיו
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
