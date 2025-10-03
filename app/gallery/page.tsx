import Link from 'next/link';

export default function GalleryPage() {
  return (
    <div className="min-h-screen py-12 px-4" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          גלריה
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <Link
            href="/gallery/photos"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 p-12 text-white hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">תמונות</h2>
              <p className="text-blue-100 mb-6">צפו בגלריית התמונות שלנו מברלין</p>
              <span className="inline-flex items-center gap-2 text-lg font-semibold">
                צפייה בגלריה
                <svg className="w-6 h-6 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </span>
            </div>
          </Link>

          <Link
            href="/gallery/videos"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 p-12 text-white hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">סרטונים</h2>
              <p className="text-purple-100 mb-6">צפו בסרטוני הוידאו שלנו מברלין</p>
              <span className="inline-flex items-center gap-2 text-lg font-semibold">
                צפייה בגלריה
                <svg className="w-6 h-6 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
