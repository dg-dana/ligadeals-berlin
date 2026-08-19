import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteSettings } from '@/lib/sanity/siteSettings';

export const metadata: Metadata = {
  title: 'מדיניות פרטיות',
  description:
    'מדיניות הפרטיות של Traveliga - איזה מידע נאסף באתר, למה ואיך משתמשים בו, מי הצדדים השלישיים המעורבים, כמה זמן המידע נשמר ואילו זכויות עומדות לכם.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'מדיניות פרטיות | Traveliga',
    description:
      'הסבר מלא ושקוף על איסוף המידע, השימוש בו, קובצי Cookie, אנליטיקה והזכויות שלכם.',
    url: '/privacy',
    type: 'article',
  },
  robots: { index: true, follow: true },
};

// Bump whenever the substance of this policy changes.
const LAST_UPDATED = 'יולי 2026';

const headingClass = 'text-2xl font-bold text-navy-700 dark:text-white mb-3';
const sectionClass = 'scroll-mt-24';
const linkClass =
  'text-gold-800 underline hover:text-gold-900 dark:text-gold-400 dark:hover:text-gold-300';

/** Rows of the "what we collect" and "third parties" tables. */
function DataTable({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="mt-4 w-full min-w-[34rem] border-collapse text-right text-base">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="bg-navy-50 dark:bg-navy-700">
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="border border-navy-100 px-4 py-3 font-bold text-navy-700 dark:border-navy-600 dark:text-white"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="align-top">
              {row.map((cell, index) => (
                <td
                  key={index}
                  className="border border-navy-100 px-4 py-3 dark:border-navy-600"
                >
                  {index === 0 ? <strong>{cell}</strong> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function PrivacyPage() {
  const { email, phone, whatsapp } = await getSiteSettings();
  const telHref = `tel:${phone.replace(/\s/g, '')}`;

  return (
    <div className="min-h-screen py-12 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-navy-700 dark:text-white mb-4">מדיניות פרטיות</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">עודכן לאחרונה: {LAST_UPDATED}</p>

        {/* Table of contents */}
        <nav
          aria-label="תוכן העניינים של מדיניות הפרטיות"
          className="mb-12 rounded-2xl border border-navy-100 bg-navy-50 p-6 dark:border-navy-600 dark:bg-navy-800"
        >
          <h2 className="mb-3 text-lg font-bold text-navy-700 dark:text-white">בעמוד זה</h2>
          <ol className="list-decimal space-y-1 pr-6 text-navy-700 dark:text-gray-300">
            {[
              ['general', 'כללי ומי אחראי על המידע'],
              ['what-we-collect', 'איזה מידע אנחנו אוספים'],
              ['why-and-legal-basis', 'למה אנחנו אוספים והבסיס החוקי'],
              ['who-has-access', 'מי יכול לגשת למידע'],
              ['third-parties', 'שירותי צד שלישי'],
              ['analytics', 'אנליטיקה ומדידה'],
              ['cookies', 'קובצי Cookie ואחסון מקומי'],
              ['international-transfers', 'העברת מידע אל מחוץ לאיחוד האירופי'],
              ['retention', 'כמה זמן אנחנו שומרים את המידע'],
              ['security', 'אבטחת מידע'],
              ['your-rights', 'הזכויות שלכם'],
              ['children', 'פרטיות של קטינים'],
              ['changes', 'שינויים במדיניות'],
              ['contact', 'יצירת קשר בנושא פרטיות'],
            ].map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} className={linkClass}>
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-12 text-lg leading-relaxed text-navy-700 dark:text-gray-300">
          <section id="general" className={sectionClass}>
            <h2 className={headingClass}>כללי ומי אחראי על המידע</h2>
            <p>
              Traveliga (&quot;אנחנו&quot;, &quot;האתר&quot;) הוא מדריך בעברית לברלין
              ושירות ליווי אישי לתכנון טיולים, המופעל על ידי מיטל מברלין, גרמניה. אנחנו מכבדים את
              פרטיותכם ומחויבים לשקיפות מלאה לגבי המידע שאנחנו אוספים.
            </p>
            <p className="mt-3">
              מדיניות זו מסבירה איזה מידע נאסף בעת השימוש באתר, למה הוא נאסף, מה נעשה בו, עם מי הוא
              משותף ואילו זכויות עומדות לכם. מכיוון שהפעילות מתנהלת מגרמניה, המדיניות נכתבה ברוח
              תקנת הגנת המידע האירופית (GDPR) והחוק הגרמני להגנת נתונים בתקשורת (TDDDG), וכן ברוח
              חוק הגנת הפרטיות הישראלי, התשמ&quot;א-1981, עבור גולשים מישראל.
            </p>
            <p className="mt-3">
              לפרטי יצירת קשר בנושאי פרטיות ראו את הסעיף{' '}
              <a href="#contact" className={linkClass}>
                יצירת קשר בנושא פרטיות
              </a>{' '}
              בהמשך העמוד.
            </p>
          </section>

          <section id="what-we-collect" className={sectionClass}>
            <h2 className={headingClass}>איזה מידע אנחנו אוספים</h2>
            <p>
              אנחנו אוספים מעט מאוד מידע, ורק כזה שנחוץ בפועל. באתר אין הרשמה, אין חשבונות משתמש,
              אין תשלומים ואיננו אוספים מידע רגיש (כגון נתוני בריאות, אמונה או מוצא).
            </p>

            <h3 className="mt-6 mb-2 text-xl font-bold text-navy-700 dark:text-white">
              מידע שאתם מוסרים לנו ביוזמתכם
            </h3>
            <DataTable
              caption="פירוט השדות הנאספים בכל טופס באתר"
              columns={['מקור', 'מה נאסף', 'האם חובה']}
              rows={[
                [
                  'טופס יצירת קשר',
                  'שם מלא, כתובת אימייל, מספר טלפון, תוכן ההודעה, ואישור מדיניות הפרטיות',
                  'שם, אימייל, הודעה ואישור המדיניות - חובה. טלפון - רשות.',
                ],
                [
                  'פנייה ישירה בוואטסאפ, בטלפון או באימייל',
                  'הפרטים שבחרתם לכלול בפנייה (למשל שם, מספר טלפון ותוכן ההודעה)',
                  'לפי בחירתכם',
                ],
                [
                  'המלצות וחוות דעת',
                  'שם התצוגה, דירוג, תוכן ההמלצה, ולעיתים תמונה - מפורסמים באתר רק לאחר שמסרתם אותם לפרסום',
                  'רשות',
                ],
              ]}
            />

            <h3 className="mt-6 mb-2 text-xl font-bold text-navy-700 dark:text-white">
              מידע שנאסף אוטומטית
            </h3>
            <ul className="list-disc pr-6 space-y-2">
              <li>
                <strong>נתוני שרת טכניים:</strong> ספק האחסון שלנו רושם, כחלק מתפעול תקין ומאבטחת
                השירות, נתונים כגון כתובת IP, מועד הבקשה, כתובת העמוד שנטען, סוג הדפדפן ומערכת
                ההפעלה.
              </li>
              <li>
                <strong>נתוני אנליטיקה:</strong> רק אם אישרתם זאת בבאנר ה-Cookie. ראו את הסעיף{' '}
                <a href="#analytics" className={linkClass}>
                  אנליטיקה ומדידה
                </a>
                .
              </li>
              <li>
                <strong>העדפות שנשמרות במכשיר שלכם:</strong> הגדרות הנגישות שבחרתם (גודל טקסט,
                ניגודיות, הפחתת אנימציות) והבחירה שלכם בבאנר ה-Cookie. מידע זה נשמר בדפדפן שלכם
                בלבד ואינו נשלח לשרתים שלנו.
              </li>
            </ul>
          </section>

          <section id="why-and-legal-basis" className={sectionClass}>
            <h2 className={headingClass}>למה אנחנו אוספים והבסיס החוקי</h2>
            <p>
              אנחנו משתמשים במידע רק למטרות המפורטות להלן. לצד כל מטרה מצוין הבסיס החוקי לעיבוד לפי
              סעיף 6(1) ל-GDPR.
            </p>
            <DataTable
              caption="מטרות העיבוד והבסיס החוקי לכל אחת מהן"
              columns={['המטרה', 'איך זה בא לידי ביטוי', 'בסיס חוקי']}
              rows={[
                [
                  'מענה לפניות',
                  'קריאת הפנייה שלכם וחזרה אליכם באימייל, בטלפון או בוואטסאפ',
                  'סעיף 6(1)(ב) - צעדים טרום-חוזיים לבקשתכם; ובפניות כלליות סעיף 6(1)(ו) - אינטרס לגיטימי לנהל תקשורת עם פונים',
                ],
                [
                  'מתן שירות הליווי האישי',
                  'תכנון הטיול, המלצות מותאמות ותמיכה שוטפת לאורך החופשה',
                  'סעיף 6(1)(ב) - ביצוע ההתקשרות שביקשתם',
                ],
                [
                  'אבטחה ותפעול תקין של האתר',
                  'לוגים של השרת, הגבלת קצב בקשות ומניעת ניצול לרעה של הטפסים',
                  'סעיף 6(1)(ו) - אינטרס לגיטימי לאבטח את השירות',
                ],
                [
                  'שיפור האתר והתכנים',
                  'סטטיסטיקה מצטברת על עמודים נצפים ועל אופן השימוש באתר',
                  'סעיף 6(1)(א) - הסכמה שניתנה בבאנר ה-Cookie, וניתנת לביטול בכל עת',
                ],
                [
                  'פרסום המלצות',
                  'הצגת חוות דעת של לקוחות בעמוד ההמלצות',
                  'סעיף 6(1)(א) - הסכמה של מוסר ההמלצה',
                ],
                [
                  'עמידה בחובות חוקיות',
                  'שמירת תכתובות ומסמכים כנדרש בדין המסחרי והמסי בגרמניה',
                  'סעיף 6(1)(ג) - חובה חוקית',
                ],
              ]}
            />
            <p className="mt-4">
              <strong>אנחנו לא</strong> מוכרים, משכירים או מעבירים את המידע האישי שלכם לצדדים
              שלישיים למטרות שיווק, ואיננו מבצעים פרופיילינג או קבלת החלטות אוטומטית שיש לה השפעה
              משפטית עליכם.
            </p>
          </section>

          <section id="who-has-access" className={sectionClass}>
            <h2 className={headingClass}>מי יכול לגשת למידע</h2>
            <ul className="list-disc pr-6 space-y-2">
              <li>
                <strong>מיטל</strong> - הפניות שלכם מגיעות ישירות לתיבת הדואר של האתר ונקראות על ידה
                בלבד. אין לנו צוות שירות רחב שיש לו גישה למידע.
              </li>
              <li>
                <strong>ספקי שירות טכניים</strong> - חברות שמספקות לנו אחסון, שליחת אימייל ואחסון
                תמונות, ומעבדות מידע אך ורק לפי הוראותינו ובכפוף להסכמי עיבוד מידע (סעיף 28 ל-GDPR).
                הרשימה המלאה מופיעה בסעיף{' '}
                <a href="#third-parties" className={linkClass}>
                  שירותי צד שלישי
                </a>
                .
              </li>
              <li>
                <strong>רשויות מוסמכות</strong> - רק אם נידרש לכך על פי דין או צו שיפוטי מחייב.
              </li>
            </ul>
          </section>

          <section id="third-parties" className={sectionClass}>
            <h2 className={headingClass}>שירותי צד שלישי</h2>
            <p>
              כדי להפעיל את האתר אנחנו נעזרים בספקים הבאים. חלקם עשויים לקבל את כתובת ה-IP שלכם עצם
              כך שהדפדפן שלכם טוען מהם תוכן:
            </p>
            <DataTable
              caption="ספקי צד שלישי, תפקידם ומיקומם"
              columns={['הספק', 'לשם מה', 'איזה מידע מגיע אליו']}
              rows={[
                [
                  'Vercel Inc.',
                  'אחסון האתר ורשת הפצת תוכן',
                  'כתובת IP ונתוני בקשה טכניים, כחלק מלוגים תפעוליים',
                ],
                [
                  'Sanity.io',
                  'מערכת ניהול התוכן שבה נכתבים המאמרים והתמונות',
                  'תוכן האתר. תמונות נטענות מ-cdn.sanity.io ולכן מגיעה לשם כתובת ה-IP שלכם',
                ],
                [
                  'Cloudinary',
                  'אחסון ואופטימיזציה של חלק מהתמונות',
                  'כתובת IP בעת טעינת תמונה',
                ],
                [
                  'Resend',
                  'שליחת האימייל שנוצר מטופס יצירת הקשר',
                  'שם, אימייל, טלפון ותוכן ההודעה שמסרתם בטופס',
                ],
                [
                  'Google Analytics (Google Ireland Ltd.)',
                  'סטטיסטיקת שימוש - נטען אך ורק בהסכמתכם',
                  'מזהה אנונימי, עמודים נצפים, כתובת IP מקוצרת',
                ],
                [
                  'YouTube / Vimeo',
                  'הצגת סרטונים בגלריית הווידאו',
                  'נטענים רק כשאתם בוחרים לנגן סרטון. עד לאותו רגע לא נשלחת אליהם שום בקשה',
                ],
                [
                  'WhatsApp (Meta)',
                  'ערוץ תקשורת, אם בחרתם להשתמש בו',
                  'הפנייה שלכם כפופה למדיניות הפרטיות של WhatsApp',
                ],
              ]}
            />
            <p className="mt-4">
              <strong>גופנים:</strong> הגופנים באתר מאוחסנים אצלנו ונטענים מהשרת שלנו. אין פנייה
              לשרתי Google Fonts ולא נשלחת אליהם כתובת ה-IP שלכם.
            </p>
            <p className="mt-3">
              האתר עשוי לכלול קישורים לאתרים חיצוניים (בתי עסק, אטרקציות וכדומה). מדיניות זו אינה
              חלה עליהם, ומומלץ לעיין במדיניות הפרטיות שלהם.
            </p>
          </section>

          <section id="analytics" className={sectionClass}>
            <h2 className={headingClass}>אנליטיקה ומדידה</h2>
            <p>
              כדי להבין אילו תכנים מעניינים אתכם ולשפר את האתר, אנחנו עשויים להשתמש ב-Google
              Analytics 4. חשוב לנו להיות מדויקים לגבי אופן הפעולה:
            </p>
            <ul className="mt-3 list-disc pr-6 space-y-2">
              <li>
                האנליטיקה <strong>אינה נטענת כלל</strong> עד שאתם בוחרים &quot;אישור&quot; בבאנר
                ה-Cookie. אם בחרתם &quot;דחייה&quot;, או שלא בחרתם כלל - הסקריפט אינו נטען ולא נוצר
                שום Cookie של Google.
              </li>
              <li>כתובת ה-IP מקוצרת (anonymize_ip) לפני העיבוד ואינה נשמרת במלואה.</li>
              <li>
                איננו מפעילים פרסום, רימרקטינג או התאמה אישית של מודעות. אחסון לצורכי פרסום
                (ad_storage) מוגדר כחסום.
              </li>
              <li>הנתונים משמשים אותנו במצטבר בלבד. איננו מזהים באמצעותם משתמשים ספציפיים.</li>
              <li>
                אפשר לחזור בכם בכל רגע דרך הקישור &quot;הגדרות Cookie&quot; שבתחתית כל עמוד.
              </li>
            </ul>
            <p className="mt-3">
              איננו משתמשים ב-Google Tag Manager, ב-Meta Pixel, ב-Hotjar, ב-Microsoft Clarity,
              ב-LinkedIn Insight, ב-TikTok Pixel או בכל כלי מעקב פרסומי אחר.
            </p>
          </section>

          <section id="cookies" className={sectionClass}>
            <h2 className={headingClass}>קובצי Cookie ואחסון מקומי</h2>
            <p>
              Cookie הוא קובץ טקסט קטן שאתר שומר בדפדפן שלכם. האתר הזה עושה בהם שימוש מצומצם מאוד,
              והוא אינו מציב שום Cookie למטרות שיווק או פרסום.
            </p>
            <DataTable
              caption="פירוט האחסון שהאתר עושה בו שימוש בדפדפן"
              columns={['מה נשמר', 'לשם מה', 'כמה זמן ודרוש אישור?']}
              rows={[
                [
                  'a11y-font-scale, a11y-contrast, a11y-reduce-motion',
                  'שמירת הגדרות הנגישות שבחרתם, כדי שלא תצטרכו להגדיר אותן מחדש בכל ביקור',
                  'נשמר עד שתמחקו אותו. חיוני לתפקוד - אינו דורש אישור',
                ],
                [
                  'cookie-consent',
                  'זכירת הבחירה שלכם בבאנר, כדי שלא יוצג שוב ושוב',
                  'נשמר עד שתמחקו אותו. חיוני לתפקוד - אינו דורש אישור',
                ],
                [
                  '_ga, _ga_*',
                  'Cookie של Google Analytics לזיהוי ביקור חוזר לצורכי סטטיסטיקה',
                  'עד 14 חודשים. נוצר אך ורק אם אישרתם אנליטיקה',
                ],
              ]}
            />
            <p className="mt-4">
              שלוש השורות הראשונות אינן Cookie במובן הקלאסי אלא אחסון מקומי (localStorage) שנשאר
              במכשיר שלכם ואינו נשלח לשרת. אפשר למחוק את כל האחסון הזה דרך הגדרות הדפדפן, וכן לחסום
              Cookie באופן גורף - אם כי חסימה מלאה עלולה לפגוע בשמירת הגדרות הנגישות.
            </p>
            <p className="mt-3">
              לשינוי ההסכמה לאנליטיקה בכל עת, השתמשו בקישור{' '}
              <strong>&quot;הגדרות Cookie&quot;</strong> שבתחתית כל עמוד באתר.
            </p>
          </section>

          <section id="international-transfers" className={sectionClass}>
            <h2 className={headingClass}>העברת מידע אל מחוץ לאיחוד האירופי</h2>
            <p>
              חלק מספקי השירות שלנו הם חברות אמריקאיות, ולכן ייתכן שמידע יעובד גם מחוץ לאיחוד
              האירופי. העברות כאלה מתבצעות על בסיס מנגנוני ההגנה המקובלים בדין האירופי - החלטת
              הלימות (EU-US Data Privacy Framework) או סעיפים חוזיים תקניים (SCC) שאושרו על ידי
              הנציבות האירופית.
            </p>
          </section>

          <section id="retention" className={sectionClass}>
            <h2 className={headingClass}>כמה זמן אנחנו שומרים את המידע</h2>
            <p>
              אנחנו שומרים מידע אישי רק כל עוד הוא נדרש למטרה שלשמה נאסף, ולא מעבר לכך:
            </p>
            <ul className="mt-3 list-disc pr-6 space-y-2">
              <li>
                <strong>פניות שלא הבשילו להתקשרות:</strong> נשמרות בתיבת הדואר עד שהטיפול בפנייה
                מסתיים, ונמחקות לכל היותר בתוך שנתיים.
              </li>
              <li>
                <strong>תכתובות של לקוחות שקיבלו שירות:</strong> נשמרות למשך תקופת ההתיישנות
                הרלוונטית, וכן ככל שנדרש לפי חובות שמירת מסמכים בדין הגרמני (בין 6 ל-10 שנים למסמכים
                בעלי משמעות מסחרית או מיסויית).
              </li>
              <li>
                <strong>נתוני אנליטיקה:</strong> עד 14 חודשים, ולאחר מכן נמחקים אוטומטית.
              </li>
              <li>
                <strong>לוגים טכניים של השרת:</strong> נשמרים לתקופה קצרה בלבד לצורכי אבטחה ותפעול.
              </li>
              <li>
                <strong>העדפות במכשיר שלכם:</strong> נשארות אצלכם עד שתמחקו אותן דרך הדפדפן.
              </li>
            </ul>
          </section>

          <section id="security" className={sectionClass}>
            <h2 className={headingClass}>אבטחת מידע</h2>
            <p>אנחנו נוקטים אמצעים טכניים וארגוניים סבירים כדי להגן על המידע שלכם:</p>
            <ul className="mt-3 list-disc pr-6 space-y-2">
              <li>
                כל התעבורה באתר מוצפנת ב-HTTPS/TLS, ומוגדרת מדיניות HSTS המחייבת חיבור מאובטח.
              </li>
              <li>
                כותרות אבטחה בדפדפן להקטנת סיכוני התקפה (בין היתר X-Frame-Options,
                X-Content-Type-Options ו-Referrer-Policy).
              </li>
              <li>
                הגבלת קצב שליחה בטופס יצירת הקשר, ואימות הנתונים גם בצד השרת ולא רק בדפדפן.
              </li>
              <li>
                מפתחות וסודות של שירותים חיצוניים נשמרים בצד השרת בלבד ואינם נחשפים בקוד שרץ
                בדפדפן.
              </li>
              <li>
                איננו אוספים ואיננו מאחסנים פרטי אמצעי תשלום. באתר לא מתבצעות עסקאות תשלום.
              </li>
            </ul>
            <p className="mt-3">
              עם זאת, חשוב להיות כנים: אף העברת מידע באינטרנט אינה מאובטחת ב-100%. אנחנו משתדלים
              להגן על המידע באמצעים מקובלים, אך איננו יכולים להבטיח אבטחה מוחלטת. אם נודע לנו על
              אירוע אבטחה שעלול לסכן את זכויותיכם, נפעל להודיע לכם ולרשות המפקחת כנדרש בסעיפים 33-34
              ל-GDPR.
            </p>
          </section>

          <section id="your-rights" className={sectionClass}>
            <h2 className={headingClass}>הזכויות שלכם</h2>
            <p>ביחס למידע האישי שלכם עומדות לכם הזכויות הבאות:</p>
            <ul className="mt-3 list-disc pr-6 space-y-2">
              <li>
                <strong>זכות עיון (סעיף 15):</strong> לקבל אישור אם מתנהל אצלנו מידע עליכם, ולעיין
                בו.
              </li>
              <li>
                <strong>זכות תיקון (סעיף 16):</strong> לתקן מידע שגוי או להשלים מידע חסר.
              </li>
              <li>
                <strong>זכות מחיקה (סעיף 17):</strong> לבקש שנמחק את המידע, בכפוף לחובות שמירה
                חוקיות.
              </li>
              <li>
                <strong>זכות להגבלת עיבוד (סעיף 18):</strong> לבקש שנפסיק לעבד את המידע במצבים
                מסוימים.
              </li>
              <li>
                <strong>זכות לניידות מידע (סעיף 20):</strong> לקבל את המידע שמסרתם בפורמט מובנה
                וקריא במכונה.
              </li>
              <li>
                <strong>זכות התנגדות (סעיף 21):</strong> להתנגד לעיבוד המבוסס על אינטרס לגיטימי.
              </li>
              <li>
                <strong>זכות לחזור מהסכמה:</strong> בכל עת, ללא שהדבר יפגע בחוקיות העיבוד שנעשה עד
                אותו רגע. לאנליטיקה - דרך הקישור &quot;הגדרות Cookie&quot; בתחתית העמוד.
              </li>
            </ul>
            <p className="mt-4">
              למימוש כל אחת מהזכויות אפשר לפנות אלינו בכתובת{' '}
              <a href={`mailto:${email}`} className={linkClass}>
                {email}
              </a>
              . נשתדל להשיב בתוך 30 יום. הפנייה אינה כרוכה בתשלום.
            </p>
            <p className="mt-3">
              אם אתם סבורים שהעיבוד פוגע בזכויותיכם, אתם רשאים להגיש תלונה לרשות מפקחת. בגרמניה
              הרשות הרלוונטית היא הממונה על הגנת המידע וחופש המידע בברלין (Berliner Beauftragte für
              Datenschutz und Informationsfreiheit). גולשים מישראל רשאים לפנות גם לרשות להגנת
              הפרטיות במשרד המשפטים.
            </p>
          </section>

          <section id="children" className={sectionClass}>
            <h2 className={headingClass}>פרטיות של קטינים</h2>
            <p>
              האתר והשירותים שלנו מיועדים לבגירים. איננו אוספים ביודעין מידע אישי מילדים מתחת לגיל
              16. אם הגיע אלינו מידע כזה, נמחק אותו עם גילוי העניין. הורה או אפוטרופוס שסבור שילדו
              מסר לנו מידע מוזמן לפנות אלינו ונפעל בהתאם.
            </p>
          </section>

          <section id="changes" className={sectionClass}>
            <h2 className={headingClass}>שינויים במדיניות</h2>
            <p>
              ייתכן שנעדכן מדיניות זו מעת לעת, למשל אם נוסיף שירות חדש או נשנה ספק. הגרסה העדכנית
              תפורסם תמיד בעמוד זה, עם תאריך העדכון האחרון בראשו. שינוי מהותי שנוגע לעיבוד המבוסס על
              הסכמה יחייב את הסכמתכם מחדש.
            </p>
          </section>

          <section id="contact" className={sectionClass}>
            <h2 className={headingClass}>יצירת קשר בנושא פרטיות</h2>
            <p>
              לכל שאלה, בקשה או תלונה בנושא פרטיות ניתן ליצור קשר עם מיטל באמצעים הבאים:
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <span className="font-semibold text-navy-700 dark:text-white">אימייל: </span>
                <a href={`mailto:${email}`} className={linkClass}>
                  {email}
                </a>
              </li>
              <li>
                <span className="font-semibold text-navy-700 dark:text-white">טלפון: </span>
                <a href={telHref} dir="ltr" className={linkClass}>
                  {phone}
                </a>
              </li>
              <li>
                <span className="font-semibold text-navy-700 dark:text-white">וואטסאפ: </span>
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  שליחת הודעה
                </a>
              </li>
            </ul>
            <p className="mt-6">
              ראו גם:{' '}
              <Link href="/terms" className={linkClass}>
                תנאי שימוש
              </Link>{' '}
              ו
              <Link href="/accessibility" className={linkClass}>
                הצהרת נגישות
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
