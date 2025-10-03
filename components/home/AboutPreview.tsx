export default function AboutPreview() {
  return (
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
              href="/contact"
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
  )
}
