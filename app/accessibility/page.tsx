import type { Metadata } from 'next';
import { getSiteSettings } from '@/lib/sanity/siteSettings';

export const metadata: Metadata = {
  title: 'הצהרת נגישות',
  description:
    'הצהרת הנגישות של Liga Deals Berlin - המחויבות שלנו להנגשת האתר בהתאם לתקן ישראלי 5568 ולהנחיות WCAG 2.1 ברמה AA.',
};

// Kept in sync with the last meaningful accessibility review of the site.
const LAST_UPDATED = 'יולי 2026';

export default async function AccessibilityPage() {
  const { email, phone, whatsapp } = await getSiteSettings();
  const telHref = `tel:${phone.replace(/\s/g, '')}`;

  return (
    <div className="min-h-screen py-12 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-navy-700 dark:text-white mb-4">הצהרת נגישות</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-12">עודכן לאחרונה: {LAST_UPDATED}</p>

        <div className="space-y-10 text-lg leading-relaxed text-navy-700 dark:text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-navy-700 dark:text-white mb-3">המחויבות שלנו לנגישות</h2>
            <p>
              אנחנו ב-Liga Deals Berlin רואים חשיבות רבה במתן שירות שוויוני לכלל הגולשים, ומאמינים
              שלכל אדם מגיעה הזכות לגלוש באתר בעצמאות, בכבוד ובנוחות. אנחנו פועלים באופן שוטף לשפר
              את נגישות האתר ולהתאים אותו לשימוש על ידי אנשים עם מוגבלויות, לרבות משתמשים בטכנולוגיות
              מסייעות כגון קוראי מסך וניווט באמצעות מקלדת.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-700 dark:text-white mb-3">התקן שאליו אנחנו חותרים</h2>
            <p>
              אנחנו שואפים להתאים את האתר, ככל שהדבר ישים מבחינה טכנית, לדרישות{' '}
              <strong>תקן ישראלי 5568</strong> (&quot;קווים מנחים לנגישות תכנים באינטרנט&quot;) ברמת
              התאמה AA, המבוסס על הנחיות{' '}
              <strong>WCAG 2.1</strong> של ארגון ה-W3C, וכן לרוח{' '}
              <strong>תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע&quot;ג-2013</strong>.
              הנגשת האתר היא תהליך מתמשך, ואנחנו ממשיכים לבחון ולשפר אותו מעת לעת.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-700 dark:text-white mb-3">התאמות הנגישות שבוצעו באתר</h2>
            <ul className="list-disc pr-6 space-y-2">
              <li>מבנה סמנטי תקין (כותרות, אזורי ניווט, תוכן ראשי ותחתית) לתמיכה בקוראי מסך.</li>
              <li>קישור &quot;דלג לתוכן הראשי&quot; המופיע בעת ניווט במקלדת.</li>
              <li>ניווט מלא באמצעות מקלדת בכל הרכיבים האינטראקטיביים, כולל תפריטים, גלריות וחלונות מודאליות.</li>
              <li>סימון מיקוד (focus) ברור וגלוי לכל אלמנט הניתן להפעלה.</li>
              <li>טקסט חלופי (alt) לתמונות נושאות מידע, וסימון תמונות דקורטיביות ככאלה.</li>
              <li>תוויות (labels) מקושרות לכל שדות הטפסים, כולל סימון שדות חובה והודעות שגיאה נגישות.</li>
              <li>ניגודיות צבעים התואמת את דרישות WCAG AA עבור טקסט ורכיבי ממשק.</li>
              <li>תמיכה בכיווניות מימין לשמאל (RTL) ובשפה העברית.</li>
              <li>עמידה בהעדפת המערכת להפחתת אנימציות (prefers-reduced-motion).</li>
              <li>
                תפריט נגישות ייעודי המאפשר הגדלת גודל הטקסט, מצב ניגודיות גבוהה והפחתת אנימציות,
                תוך שמירת ההעדפה בין ביקורים.
              </li>
              <li>תאימות לתצוגה במחשב, בטאבלט ובנייד, ותמיכה בהגדלת התצוגה (zoom) של הדפדפן.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-700 dark:text-white mb-3">מגבלות נגישות ידועות</h2>
            <p>
              למרות מאמצינו להנגיש את כלל עמודי האתר, ייתכן שיימצאו חלקים או תכנים שטרם הונגשו במלואם.
              בפרט:
            </p>
            <ul className="mt-3 list-disc pr-6 space-y-2">
              <li>
                תכנים המוטמעים מגורמי צד שלישי (כגון סרטוני וידאו מ-YouTube או Vimeo) כפופים לרמת
                הנגישות של אותם שירותים חיצוניים.
              </li>
              <li>
                ייתכן שתכנים חדשים שנוספים באופן שוטף יידרשו להשלמת התאמות נגישות לאחר פרסומם.
              </li>
            </ul>
            <p className="mt-3">
              אם נתקלתם בתוכן שאינו נגיש, נשמח שתעדכנו אותנו ונפעל לתקן זאת בהקדם האפשרי.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-700 dark:text-white mb-3">פנייה בנושא נגישות</h2>
            <p>
              אם נתקלתם בבעיית נגישות באתר, יש לכם הצעה לשיפור, או שאתם זקוקים לסיוע בגישה לתוכן
              מסוים - נשמח לשמוע מכם. לפניות בנושא נגישות ניתן ליצור קשר עם מיטל באמצעים הבאים:
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <span className="font-semibold text-navy-700 dark:text-white">אימייל: </span>
                <a
                  href={`mailto:${email}`}
                  className="text-gold-800 underline hover:text-gold-900 dark:text-gold-400 dark:hover:text-gold-300"
                >
                  {email}
                </a>
              </li>
              <li>
                <span className="font-semibold text-navy-700 dark:text-white">טלפון: </span>
                <a
                  href={telHref}
                  dir="ltr"
                  className="text-gold-800 underline hover:text-gold-900 dark:text-gold-400 dark:hover:text-gold-300"
                >
                  {phone}
                </a>
              </li>
              <li>
                <span className="font-semibold text-navy-700 dark:text-white">וואטסאפ: </span>
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-800 underline hover:text-gold-900 dark:text-gold-400 dark:hover:text-gold-300"
                >
                  שליחת הודעה
                </a>
              </li>
            </ul>
            <p className="mt-4">
              בפנייתכם נשמח אם תוכלו לפרט את הבעיה שנתקלתם בה, את העמוד שבו היא הופיעה ואת סוג הדפדפן
              או הטכנולוגיה המסייעת שבהם השתמשתם - כדי שנוכל לטפל בפנייה במהירות וביעילות.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
