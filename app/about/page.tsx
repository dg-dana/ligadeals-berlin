import Button from '@/components/Button'
import { FaGift, FaBookOpen, FaHandshake, FaBullseye, FaPiggyBank, FaStar } from 'react-icons/fa'

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-600 via-navy-700 to-navy-800 py-20 px-4">
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gold-400/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 -left-24 h-72 w-72 rounded-full bg-gold-300/10 blur-3xl" />
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            אודות <span className="text-gold-400">Liga Deals Berlin</span>
          </h1>
          <p className="text-xl text-navy-100 max-w-3xl mx-auto">
            מועדון ההטבות המוביל בברלין - החיבור שלך לחוויות בלעדיות ועסקים מובילים בעיר
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Mission */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-navy-700 dark:text-white mb-6">
              מי אנחנו?
            </h2>
            <p className="text-lg text-navy-500 dark:text-gray-300 leading-relaxed mb-4">
              Liga Deals Berlin הוא מועדון ההטבות המוביל בברלין, שנוסד במטרה לחבר בין תושבי העיר לעסקים המובילים
              ולספק להם גישה להטבות בלעדיות שלא תמצאו בשום מקום אחר. אנחנו מאמינים שכל אחד ראוי ליהנות מהטוב ביותר
              שברלין מציעה, במחירים הכי משתלמים.
            </p>
            <p className="text-lg text-navy-500 dark:text-gray-300 leading-relaxed">
              החברים שלנו נהנים מהטבות בעסקים מובילים בתחומים מגוונים - מסעדות ובתי קפה, דרך חדרי כושר ומכוני יופי,
              ועד לבידור ותרבות. כל זאת כדי להפוך את החיים בברלין לנוחים, מהנים וכלכליים יותר.
            </p>
          </div>

          {/* What We Offer */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-navy-700 dark:text-white mb-8">
              מה אנחנו מציעים?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="rounded-2xl bg-white dark:bg-navy-700 p-6 shadow-sm ring-1 ring-navy-100 dark:ring-navy-600">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-700 dark:bg-navy-600/50 dark:text-gold-400">
                  <FaGift className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-navy-700 dark:text-white mb-3">
                  הטבות בלעדיות
                </h3>
                <p className="text-navy-400 dark:text-gray-300">
                  גישה להנחות ומבצעים מיוחדים בעסקים מובילים בברלין שלא תמצאו בשום מקום אחר
                </p>
              </div>

              <div className="rounded-2xl bg-white dark:bg-navy-700 p-6 shadow-sm ring-1 ring-navy-100 dark:ring-navy-600">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-700 dark:bg-navy-600/50 dark:text-gold-400">
                  <FaBookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-navy-700 dark:text-white mb-3">
                  תכנים ייחודיים
                </h3>
                <p className="text-navy-400 dark:text-gray-300">
                  מאמרים, מדריכים והמלצות אישיות שיעזרו לכם ליהנות מהטוב ביותר שברלין מציעה
                </p>
              </div>

              <div className="rounded-2xl bg-white dark:bg-navy-700 p-6 shadow-sm ring-1 ring-navy-100 dark:ring-navy-600">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-700 dark:bg-navy-600/50 dark:text-gold-400">
                  <FaHandshake className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-navy-700 dark:text-white mb-3">
                  קהילה תומכת
                </h3>
                <p className="text-navy-400 dark:text-gray-300">
                  הצטרפו לקהילה של אנשים שאוהבים את ברלין ומחפשים את החוויות הטובות ביותר בעיר
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
                  קבלו המלצות מותאמות אישית על בסיס העדפות והתחומים שמעניינים אתכם
                </p>
              </div>

              <div className="rounded-2xl bg-white dark:bg-navy-700 p-6 shadow-sm ring-1 ring-navy-100 dark:ring-navy-600">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-700 dark:bg-navy-600/50 dark:text-gold-400">
                  <FaPiggyBank className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-navy-700 dark:text-white mb-3">
                  חיסכון משמעותי
                </h3>
                <p className="text-navy-400 dark:text-gray-300">
                  חסכו כסף רב בכל חודש עם ההטבות השונות שאנחנו מציעים לחברי המועדון
                </p>
              </div>

              <div className="rounded-2xl bg-white dark:bg-navy-700 p-6 shadow-sm ring-1 ring-navy-100 dark:ring-navy-600">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-700 dark:bg-navy-600/50 dark:text-gold-400">
                  <FaStar className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-navy-700 dark:text-white mb-3">
                  חוויות בלעדיות
                </h3>
                <p className="text-navy-400 dark:text-gray-300">
                  גישה לאירועים מיוחדים, חוויות VIP והזדמנויות שרק חברי המועדון זוכים להן
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-600 to-navy-700 p-12 text-center shadow-lg">
            <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-gold-400/10 blur-3xl" />
            <div className="relative">
              <h2 className="text-4xl font-bold text-white mb-6">
                מוכנים להצטרף?
              </h2>
              <p className="text-xl text-navy-100 mb-8 max-w-2xl mx-auto">
                הצטרפו עכשיו למועדון Liga Deals Berlin וקבלו גישה מיידית לכל ההטבות והתכנים הבלעדיים שלנו
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
