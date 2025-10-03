export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            אודות Liga Deals Berlin
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            מועדון ההטבות המוביל בברלין - החיבור שלך לחוויות בלעדיות ועסקים מובילים בעיר
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Mission */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              מי אנחנו?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Liga Deals Berlin הוא מועדון ההטבות המוביל בברלין, שנוסד במטרה לחבר בין תושבי העיר לעסקים המובילים
              ולספק להם גישה להטבות בלעדיות שלא תמצאו בשום מקום אחר. אנחנו מאמינים שכל אחד ראוי ליהנות מהטוב ביותר
              שברלין מציעה, במחירים הכי משתלמים.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              החברים שלנו נהנים מהטבות בעסקים מובילים בתחומים מגוונים - מסעדות ובתי קפה, דרך חדרי כושר ומכוני יופי,
              ועד לבידור ותרבות. כל זאת כדי להפוך את החיים בברלין לנוחים, מהנים וכלכליים יותר.
            </p>
          </div>

          {/* What We Offer */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
              מה אנחנו מציעים?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <div className="text-4xl mb-4">🎁</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  הטבות בלעדיות
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  גישה להנחות ומבצעים מיוחדים בעסקים מובילים בברלין שלא תמצאו בשום מקום אחר
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  תכנים ייחודיים
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  מאמרים, מדריכים והמלצות אישיות שיעזרו לכם ליהנות מהטוב ביותר שברלין מציעה
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  קהילה תומכת
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  הצטרפו לקהילה של אנשים שאוהבים את ברלין ומחפשים את החוויות הטובות ביותר בעיר
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  המלצות אישיות
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  קבלו המלצות מותאמות אישית על בסיס העדפות והתחומים שמעניינים אתכם
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  חיסכון משמעותי
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  חסכו כסף רב בכל חודש עם ההטבות השונות שאנחנו מציעים לחברי המועדון
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  חוויות בלעדיות
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  גישה לאירועים מיוחדים, חוויות VIP והזדמנויות שרק חברי המועדון זוכים להן
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              מוכנים להצטרף?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              הצטרפו עכשיו למועדון Liga Deals Berlin וקבלו גישה מיידית לכל ההטבות והתכנים הבלעדיים שלנו
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              צור קשר עכשיו
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
