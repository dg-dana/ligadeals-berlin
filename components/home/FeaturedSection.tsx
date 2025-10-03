export default function FeaturedSection() {
  return (
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
  )
}
