import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'מדיניות פרטיות',
  description: 'מדיניות הפרטיות של Liga Deals Berlin - איך אנחנו אוספים, שומרים ומשתמשים במידע שלכם.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-navy-700 mb-4">מדיניות פרטיות</h1>
        <p className="text-navy-400 mb-12">עודכן לאחרונה: יולי 2026</p>

        <div className="space-y-10 text-navy-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-navy-700 mb-3">כללי</h2>
            <p>
              Liga Deals Berlin (&quot;אנחנו&quot;) מכבדת את פרטיות המשתמשים באתר. מדיניות זו מסבירה איזה
              מידע אנחנו אוספים, למה אנחנו משתמשים בו ואילו זכויות יש לכם. השימוש באתר מהווה הסכמה
              למדיניות זו.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-700 mb-3">איזה מידע אנחנו אוספים</h2>
            <ul className="list-disc pr-6 space-y-2">
              <li>
                <strong>מידע שאתם מוסרים לנו:</strong> כאשר אתם פונים אלינו דרך טופס יצירת הקשר או
                בוואטסאפ, אנחנו מקבלים את הפרטים שבחרתם למסור - שם, כתובת אימייל, מספר טלפון ותוכן
                הפנייה.
              </li>
              <li>
                <strong>מידע שנאסף אוטומטית:</strong> כמו רוב האתרים, ייתכן שנאסוף נתוני שימוש
                אנונימיים (סוג דפדפן, עמודים שנצפו, זמני ביקור) לצורך שיפור האתר.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-700 mb-3">איך אנחנו משתמשים במידע</h2>
            <ul className="list-disc pr-6 space-y-2">
              <li>מענה לפניות שלכם ומתן שירות.</li>
              <li>שליחת עדכונים על הטבות ותכנים חדשים - רק אם ביקשתם זאת.</li>
              <li>שיפור האתר, התכנים והשירותים שלנו.</li>
            </ul>
            <p className="mt-3">
              אנחנו לא מוכרים ולא משכירים את המידע האישי שלכם לצדדים שלישיים.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-700 mb-3">שירותי צד שלישי</h2>
            <p>
              האתר מופעל באמצעות ספקי תשתית מקובלים (אחסון אתרים, ניהול תוכן ושליחת אימייל). ספקים
              אלה מעבדים מידע עבורנו בלבד ובכפוף להתחייבויות פרטיות משלהם. ייתכן שהאתר כולל קישורים
              לאתרים חיצוניים - מדיניות זו אינה חלה עליהם.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-700 mb-3">שמירת מידע ואבטחה</h2>
            <p>
              אנחנו שומרים מידע אישי רק כל עוד הוא נדרש למטרות שלשמן נאסף, ונוקטים אמצעים סבירים
              להגן עליו מפני גישה לא מורשית.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-700 mb-3">הזכויות שלכם</h2>
            <p>
              אתם רשאים לבקש לעיין במידע שנשמר עליכם, לתקן אותו או למחוק אותו, וכן להסיר את עצמכם
              מרשימת התפוצה בכל עת. לכל בקשה או שאלה בנושא פרטיות, כתבו לנו:{' '}
              <a
                href="mailto:info@ligadeals-berlin.com"
                className="text-gold-600 hover:text-gold-500 underline"
              >
                info@ligadeals-berlin.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-700 mb-3">שינויים במדיניות</h2>
            <p>
              ייתכן שנעדכן מדיניות זו מעת לעת. הגרסה העדכנית תפורסם תמיד בעמוד זה, עם תאריך העדכון
              האחרון.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
