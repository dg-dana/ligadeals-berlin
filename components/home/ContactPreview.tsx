export default function ContactPreview() {
  return (
    <section className="py-16 px-4 bg-cream-100 dark:bg-navy-800">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-navy-700 dark:text-white mb-4">
          צור קשר
        </h2>
        <p className="text-navy-400 dark:text-cream-200 mb-8 text-lg">
          יש לכם שאלות? רוצים להצטרף למועדון? נשמח לשמוע מכם!
        </p>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-navy-700 p-6 rounded-2xl shadow-sm ring-1 ring-navy-100 dark:ring-navy-600">
            <div className="text-3xl mb-3">📧</div>
            <h3 className="font-semibold text-navy-700 dark:text-white mb-2">אימייל</h3>
            <p className="text-navy-400 dark:text-cream-200">info@ligadeals-berlin.com</p>
          </div>
          <div className="bg-white dark:bg-navy-700 p-6 rounded-2xl shadow-sm ring-1 ring-navy-100 dark:ring-navy-600">
            <div className="text-3xl mb-3">📱</div>
            <h3 className="font-semibold text-navy-700 dark:text-white mb-2">טלפון</h3>
            <p className="text-navy-400 dark:text-cream-200">+49 30 1234 5678</p>
          </div>
          <div className="bg-white dark:bg-navy-700 p-6 rounded-2xl shadow-sm ring-1 ring-navy-100 dark:ring-navy-600">
            <div className="text-3xl mb-3">📍</div>
            <h3 className="font-semibold text-navy-700 dark:text-white mb-2">מיקום</h3>
            <p className="text-navy-400 dark:text-cream-200">ברלין, גרמניה</p>
          </div>
        </div>
        <a
          href="/contact"
          className="inline-block bg-gold-400 text-navy-800 px-8 py-3 rounded-full font-semibold hover:bg-gold-300 transition-colors"
        >
          שלח הודעה
        </a>
      </div>
    </section>
  )
}
