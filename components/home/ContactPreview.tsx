export default function ContactPreview() {
  return (
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
  )
}
