import Hero from '@/components/Hero'

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <Hero />

      {/* Featured Articles Preview */}
      <section id="featured" className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            מאמרים מומלצים
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-12">
            הכי חדש והכי מעניין מהבלוג שלנו
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    כותרת מאמר {item}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    תיאור קצר של המאמר יופיע כאן. זה יכול להיות משפט או שניים שמסבירים על מה המאמר.
                  </p>
                  <a href="#" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                    קרא עוד ←
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                אודות Liga Deals Berlin
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg leading-relaxed">
                אנחנו מועדון ההטבות המוביל בברלין, המספק לחברים שלנו גישה להטבות בלעדיות, מאמרים מעניינים,
                המלצות אישיות וכל המידע שצריך כדי ליהנות מהחיים בברלין.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                הצטרפו אלינו וקבלו גישה למגוון רחב של הטבות בעסקים מובילים בברלין, תכנים ייחודיים וקהילה תומכת.
              </p>
              <a
                href="/about"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                למד עוד עלינו
              </a>
            </div>
            <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg h-96 flex items-center justify-center">
              <p className="text-white text-2xl font-bold">תמונה תופיע כאן</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Preview */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            צור קשר
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
            יש לכם שאלות? רוצים להצטרף למועדון? נשמח לשמוע מכם!
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <div className="text-3xl mb-3">📧</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">אימייל</h3>
              <p className="text-gray-600 dark:text-gray-300">info@ligadeals-berlin.com</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">טלפון</h3>
              <p className="text-gray-600 dark:text-gray-300">+49 30 1234 5678</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <div className="text-3xl mb-3">📍</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">מיקום</h3>
              <p className="text-gray-600 dark:text-gray-300">ברלין, גרמניה</p>
            </div>
          </div>
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            שלח הודעה
          </a>
        </div>
      </section>
    </div>
  );
}
