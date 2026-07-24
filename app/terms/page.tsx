import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'תנאי שימוש',
  description: 'תנאי השימוש באתר Liga Deals Berlin.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-12 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-navy-700 dark:text-white mb-4">תנאי שימוש</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-12">עודכן לאחרונה: יולי 2026</p>

        <div className="space-y-10 text-lg leading-relaxed text-navy-700 dark:text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-navy-700 dark:text-white mb-3">כללי</h2>
            <p>
              ברוכים הבאים לאתר Liga Deals Berlin. השימוש באתר, בתכניו ובשירותיו כפוף לתנאים
              המפורטים להלן. גלישה באתר מהווה הסכמה לתנאים אלה. אם אינכם מסכימים להם, אנא הימנעו
              משימוש באתר.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-700 dark:text-white mb-3">אופי התכנים</h2>
            <p>
              האתר מציע מידע, המלצות וטיפים על ברלין - מסעדות, אטרקציות, אירועים והטבות - למטרות
              אינפורמטיביות בלבד. אנחנו משתדלים שהמידע יהיה מדויק ועדכני, אבל פרטים כמו מחירים,
              שעות פתיחה, תנאי הטבות וזמינות עשויים להשתנות ללא הודעה מוקדמת. מומלץ לוודא את
              הפרטים מול בית העסק לפני הגעה או רכישה.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-700 dark:text-white mb-3">הטבות ועסקים מומלצים</h2>
            <p>
              ההטבות וההמלצות באתר ניתנות על ידי בתי העסק עצמם ובאחריותם. Liga Deals Berlin אינה
              צד לעסקה בינכם לבין בית העסק ואינה אחראית לטיב המוצרים או השירותים הניתנים על ידו.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-700 dark:text-white mb-3">קניין רוחני</h2>
            <p>
              כל התכנים באתר - טקסטים, תמונות, לוגו ועיצוב - שייכים ל-Liga Deals Berlin או
              לבעלי הזכויות בהם, אלא אם צוין אחרת. אין להעתיק, לשכפל או להפיץ תכנים מהאתר למטרות
              מסחריות ללא אישור מראש ובכתב.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-700 dark:text-white mb-3">קישורים חיצוניים</h2>
            <p>
              האתר עשוי לכלול קישורים לאתרים חיצוניים. איננו אחראים לתכנים, לזמינות או למדיניות
              הפרטיות של אתרים אלה.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-700 dark:text-white mb-3">הגבלת אחריות</h2>
            <p>
              השימוש באתר נעשה על אחריותכם בלבד. Liga Deals Berlin לא תישא באחריות לכל נזק ישיר
              או עקיף הנובע מהשימוש באתר או מהסתמכות על המידע המופיע בו.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-700 dark:text-white mb-3">שינויים בתנאים</h2>
            <p>
              אנחנו רשאים לעדכן תנאים אלה מעת לעת. הגרסה העדכנית תפורסם תמיד בעמוד זה. המשך שימוש
              באתר לאחר עדכון מהווה הסכמה לתנאים המעודכנים.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-700 dark:text-white mb-3">יצירת קשר</h2>
            <p>
              לשאלות על תנאי השימוש אפשר לפנות אלינו בכתובת{' '}
              <a
                href="mailto:info@ligadeals-berlin.com"
                className="text-gold-800 underline hover:text-gold-900 dark:text-gold-400 dark:hover:text-gold-300"
              >
                info@ligadeals-berlin.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
