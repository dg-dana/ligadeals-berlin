# מדריך פריסה לייצור (Production Deployment Guide)
## LigaDeals Berlin

---

## תוכן עניינים

1. [דרישות מקדימות](#דרישות-מקדימות)
2. [הכנת הפרויקט לפריסה](#הכנת-הפרויקט-לפריסה)
3. [פריסה ל-Vercel](#פריסה-ל-vercel)
4. [הגדרת משתני סביבה](#הגדרת-משתני-סביבה)
5. [קונפיגורציה של דומיין מותאם](#קונפיגורציה-של-דומיין-מותאם)
6. [הגדרת SSL/HTTPS](#הגדרת-sslhttps)
7. [קונפיגורציה של Sanity Webhooks](#קונפיגורציה-של-sanity-webhooks)
8. [רשימת בדיקות לאחר פריסה](#רשימת-בדיקות-לאחר-פריסה)
9. [פתרון בעיות נפוצות](#פתרון-בעיות-נפוצות)

---

## דרישות מקדימות

לפני שמתחילים את תהליך הפריסה, ודא שיש לך:

- [ ] חשבון GitHub עם הקוד שלך מועלה
- [ ] חשבון Vercel (חינמי) - [הרשמה כאן](https://vercel.com/signup)
- [ ] חשבון Sanity עם הפרויקט שלך - [Sanity.io](https://sanity.io)
- [ ] חשבון Cloudinary - [Cloudinary.com](https://cloudinary.com)
- [ ] חשבון Resend לשליחת מיילים - [Resend.com](https://resend.com)
- [ ] חשבון Google Analytics (אופציונלי) - [Analytics.google.com](https://analytics.google.com)
- [ ] דומיין משלך (אופציונלי, אך מומלץ)

---

## הכנת הפרויקט לפריסה

### 1. בדיקת הקוד המקומי

```bash
# ודא שהפרויקט עובד בסביבה המקומית
npm run dev

# הרץ את הבדיקות
npm test

# בנה את הפרויקט לייצור
npm run build

# בדוק את הבנייה המקומית
npm start
```

### 2. ודא שכל הקבצים הרגישים ב-.gitignore

```bash
# ודא שהקבצים הבאים לא עולים ל-Git:
# .env.local
# .env.production
# .env*.local
# node_modules/
# .DS_Store
```

### 3. Commit ו-Push לאחרונה

```bash
git add .
git commit -m "Prepare for production deployment"
git push origin main
```

---

## פריסה ל-Vercel

### שלב 1: חיבור הפרויקט

1. **היכנס ל-Vercel**
   - גש ל-[vercel.com](https://vercel.com)
   - התחבר עם חשבון GitHub שלך

2. **יבא את הפרויקט**
   - לחץ על "Add New..." → "Project"
   - בחר את הרפוזיטורי `ligadeals-berlin` (או השם שנתת לפרויקט)
   - לחץ על "Import"

3. **קונפיגורציה בסיסית**
   - **Framework Preset**: Next.js (אמור להתגלות אוטומטית)
   - **Root Directory**: `.` (השורש של הפרויקט)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### שלב 2: אל תפרוס עדיין!

**חשוב**: לחץ על "Environment Variables" לפני שאתה לוחץ על "Deploy"

---

## הגדרת משתני סביבה

### הוספת משתנים ב-Vercel Dashboard

1. **גש להגדרות**
   - בעמוד הפרויקט, לחץ על "Settings"
   - בתפריט הצד, בחר "Environment Variables"

2. **הוסף כל משתנה בנפרד**

#### משתני Sanity (חובה)

```env
NEXT_PUBLIC_SANITY_PROJECT_ID
Value: [ה-Project ID שלך מ-Sanity Dashboard]
Environment: Production
```

```env
NEXT_PUBLIC_SANITY_DATASET
Value: production
Environment: Production
```

```env
NEXT_PUBLIC_SANITY_STUDIO_URL
Value: https://[your-project].sanity.studio
Environment: Production
```

```env
SANITY_API_TOKEN
Value: [הטוקן שלך מ-Sanity - הרשאות Editor]
Environment: Production
```

```env
SANITY_WEBHOOK_SECRET
Value: [מחרוזת אקראית - צור באמצעות: openssl rand -base64 32]
Environment: Production
```

#### משתני Cloudinary (חובה)

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
Value: [Cloud Name מ-Cloudinary Dashboard]
Environment: Production
```

```env
CLOUDINARY_API_KEY
Value: [API Key מ-Cloudinary]
Environment: Production
```

```env
CLOUDINARY_API_SECRET
Value: [API Secret מ-Cloudinary]
Environment: Production
```

#### משתני Email - Resend (חובה)

```env
RESEND_API_KEY
Value: re_[your_api_key]
Environment: Production
```

```env
RESEND_FROM_EMAIL
Value: noreply@ligadeals-berlin.com
Environment: Production
```

```env
CONTACT_EMAIL
Value: info@ligadeals-berlin.com
Environment: Production
```

#### משתני Analytics (אופציונלי)

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID
Value: G-XXXXXXXXXX
Environment: Production
```

```env
NEXT_PUBLIC_CLARITY_PROJECT_ID
Value: [Clarity Project ID]
Environment: Production
```

#### משתני Security (מומלץ)

```env
NEXT_PUBLIC_SITE_URL
Value: https://ligadeals-berlin.com
Environment: Production
```

```env
RATE_LIMIT_MAX_REQUESTS
Value: 100
Environment: Production
```

```env
RATE_LIMIT_WINDOW_MS
Value: 60000
Environment: Production
```

```env
ALLOWED_ORIGINS
Value: https://ligadeals-berlin.com,https://www.ligadeals-berlin.com
Environment: Production
```

### שלב 3: פרוס את האתר

לאחר הוספת כל המשתנים:

1. חזור ל-"Deployments" בתפריט הצד
2. לחץ על "Redeploy" (או "Deploy" אם זו הפעם הראשונה)
3. המתן לסיום הפריסה (בדרך כלל 2-5 דקות)

---

## קונפיגורציה של דומיין מותאם

### הוספת דומיין משלך

1. **גש להגדרות הדומיין**
   - בעמוד הפרויקט ב-Vercel, לחץ על "Settings"
   - בחר "Domains" בתפריט הצד

2. **הוסף את הדומיין**
   - הקלד את הדומיין שלך (לדוגמה: `ligadeals-berlin.com`)
   - לחץ על "Add"

3. **קונפיגורציה של DNS**

   Vercel יציג לך את רשומות ה-DNS שצריך להגדיר אצל רושם הדומיינים שלך:

   **עבור דומיין ראשי (ligadeals-berlin.com):**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

   **עבור www (www.ligadeals-berlin.com):**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

4. **עדכן ברושם הדומיינים**
   - היכנס לחשבון רושם הדומיינים שלך (GoDaddy, Namecheap, וכו')
   - גש להגדרות DNS
   - הוסף את הרשומות לעיל
   - המתן 24-48 שעות לעדכון (לרוב זה קורה תוך דקות)

5. **אימות ב-Vercel**
   - חזור ל-Vercel Dashboard
   - Vercel יאמת אוטומטית את הדומיין כשה-DNS יתעדכן
   - תראה סטטוס "Valid" ליד הדומיין

---

## הגדרת SSL/HTTPS

**חדשות טובות**: Vercel מטפל ב-SSL אוטומטית! 🎉

### מה קורה אוטומטית:

1. ✅ Vercel מנפיק תעודת SSL חינמית מ-Let's Encrypt
2. ✅ חידוש אוטומטי של התעודה
3. ✅ הפניית HTTP ל-HTTPS אוטומטית
4. ✅ תמיכה ב-HTTP/2 ו-HTTP/3

### בדיקה שה-HTTPS עובד:

```bash
# בדוק את תעודת ה-SSL
curl -I https://ligadeals-berlin.com

# אמת הפניית HTTP ל-HTTPS
curl -I http://ligadeals-berlin.com
```

אתה אמור לראות:
- Status: `301 Moved Permanently` או `200 OK`
- Header: `strict-transport-security`

---

## קונפיגורציה של Sanity Webhooks

כדי שהאתר יתעדכן אוטומטית כשאתה משנה תוכן ב-Sanity:

### 1. צור Webhook ב-Sanity

1. **גש ל-Sanity Dashboard**
   - לך ל-[sanity.io/manage](https://sanity.io/manage)
   - בחר את הפרויקט שלך

2. **הוסף Webhook**
   - לחץ על "API" בתפריט
   - גלול ל-"Webhooks"
   - לחץ על "Create webhook"

3. **הגדר את ה-Webhook**
   ```
   Name: Vercel Production Deployment
   URL: https://ligadeals-berlin.com/api/revalidate
   Dataset: production
   Trigger on: Create, Update, Delete
   Filter: _type == "deal" || _type == "category" || _type == "testimonial" || _type == "page"
   HTTP method: POST
   HTTP Headers:
     x-sanity-webhook-secret: [הסוד שהגדרת ב-SANITY_WEBHOOK_SECRET]
   ```

4. **שמור את ה-Webhook**

### 2. בדיקת ה-Webhook

1. ערוך דיל ב-Sanity Studio
2. שמור את השינוי
3. המתן כ-10 שניות
4. בדוק את האתר - השינוי אמור להופיע

---

## רשימת בדיקות לאחר פריסה

### בדיקות פונקציונליות

- [ ] **העמוד הראשי טוען כראוי**
  - גש ל-`https://ligadeals-berlin.com`
  - ודא שכל התוכן מוצג

- [ ] **דפי דילים עובדים**
  - בדוק לפחות 3 דילים שונים
  - ודא שהתמונות נטענות מ-Cloudinary

- [ ] **חיפוש וסינון**
  - נסה לחפש דיל
  - סנן לפי קטגוריה
  - בדוק מיון (מחיר, פופולריות)

- [ ] **טופס יצירת קשר**
  - שלח הודעת בדיקה
  - ודא שקיבלת מייל ב-CONTACT_EMAIL

- [ ] **רספונסיביות**
  - בדוק באייפון (או Chrome DevTools)
  - בדוק בטאבלט
  - בדוק בדסקטופ

- [ ] **RTL (עברית)**
  - ודא שהעברית מוצגת מימין לשמאל
  - בדוק יישור טקסט

### בדיקות ביצועים

- [ ] **Google PageSpeed Insights**
  - גש ל-[pagespeed.web.dev](https://pagespeed.web.dev)
  - בדוק את הציון (שאף ל-90+)

- [ ] **זמני טעינה**
  - דף הבית: < 3 שניות
  - דפי דילים: < 2 שניות

- [ ] **תמונות**
  - ודא שכל התמונות נטענות מ-Cloudinary
  - בדוק optimized formats (WebP, AVIF)

### בדיקות אבטחה

- [ ] **HTTPS פעיל**
  ```bash
  curl -I https://ligadeals-berlin.com | grep "strict-transport-security"
  ```

- [ ] **Headers אבטחה**
  ```bash
  curl -I https://ligadeals-berlin.com
  ```
  ודא שיש:
  - `x-frame-options: DENY`
  - `x-content-type-options: nosniff`
  - `strict-transport-security`

- [ ] **אין נתונים רגישים בקוד הלקוח**
  - פתח DevTools → Sources
  - חפש "api_key", "secret", "password"
  - ודא שאין חשיפה

- [ ] **Rate Limiting עובד**
  ```bash
  # נסה לשלוח הרבה בקשות מהר
  for i in {1..150}; do curl https://ligadeals-berlin.com/api/contact; done
  ```
  אתה אמור לקבל 429 (Too Many Requests) אחרי 100 בקשות

### בדיקות SEO

- [ ] **Meta Tags**
  - הצג את קוד המקור של הדף
  - ודא שיש `<title>`, `<meta name="description">`
  - ודא שיש Open Graph tags

- [ ] **Sitemap**
  - גש ל-`https://ligadeals-berlin.com/sitemap.xml`
  - ודא שכל הדפים רשומים

- [ ] **Robots.txt**
  - גש ל-`https://ligadeals-berlin.com/robots.txt`
  - ודא שהוא מצביע ל-sitemap

- [ ] **Google Search Console**
  - הוסף את האתר ל-[Google Search Console](https://search.google.com/search-console)
  - שלח את ה-sitemap

### בדיקות Analytics

- [ ] **Google Analytics פעיל**
  - גש לאתר
  - פתח GA Real-Time
  - ודא שאתה רואה את הביקור שלך

- [ ] **Microsoft Clarity (אופציונלי)**
  - גש ל-Clarity Dashboard
  - ודא שההקלטות מתחילות

---

## פתרון בעיות נפוצות

### 1. האתר לא נטען ("500 Internal Server Error")

**סיבה אפשרית**: משתני סביבה חסרים

**פתרון**:
1. גש ל-Vercel Dashboard → Settings → Environment Variables
2. ודא שכל המשתנים הנדרשים מוגדרים
3. לחץ על "Redeploy" ב-Deployments

### 2. תמונות לא נטענות

**סיבה אפשרית**: Cloudinary לא מוגדר כראוי

**פתרון**:
1. בדוק את `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
2. ודא שהוא תואם לשם ב-Cloudinary Dashboard
3. בדוק ב-DevTools → Network אם יש שגיאות 404

### 3. טופס יצירת קשר לא שולח מיילים

**סיבה אפשרית**: Resend לא מוגדר או כתובת המייל לא אומתה

**פתרון**:
1. גש ל-[Resend Dashboard](https://resend.com/domains)
2. ודא שהדומיין `ligadeals-berlin.com` מאומת
3. בדוק את `RESEND_API_KEY` ב-Vercel
4. בדוק Logs ב-Vercel → Deployments → [Latest] → Functions

### 4. השינויים ב-Sanity לא מתעדכנים באתר

**סיבה אפשרית**: Webhook לא מוגדר או לא עובד

**פתרון**:
1. בדוק ב-Sanity → API → Webhooks → Deliveries
2. ודא שיש deliveries מוצלחים (200 OK)
3. אם יש שגיאות, בדוק את `SANITY_WEBHOOK_SECRET`

### 5. דומיין מותאם לא עובד

**סיבה אפשרית**: DNS עדיין לא התעדכן

**פתרון**:
1. בדוק DNS:
   ```bash
   nslookup ligadeals-berlin.com
   ```
2. אמת שמצביע ל-`76.76.21.21`
3. המתן עד 48 שעות (בדרך כלל 1-2 שעות)

### 6. בעיות ביצועים (אתר איטי)

**פתרון**:
1. בדוק את ה-Vercel Analytics → Performance
2. זהה דפים איטיים
3. אופטימיזציה אפשרית:
   - הקטן תמונות ב-Cloudinary
   - הוסף caching ל-API routes
   - השתמש ב-`next/image` לכל התמונות

---

## תחזוקה שוטפת

### עדכונים שוטפים

```bash
# עדכן תלויות באופן קבוע
npm update

# בדוק vulnerabilities
npm audit

# תקן אם אפשר
npm audit fix
```

### Monitoring

1. **Vercel Analytics**
   - בדוק ביצועים שבועית
   - עקוב אחרי שגיאות

2. **Google Analytics**
   - עקוב אחרי תעבורה
   - זהה דפים פופולריים

3. **Sanity**
   - עקוב אחרי שימוש ב-API
   - נקה תמונות ישנות

### גיבויים

1. **Sanity Content**
   ```bash
   npx sanity dataset export production backup.tar.gz
   ```

2. **קוד**
   - GitHub שומר את כל ההיסטוריה
   - צור tags לגרסאות חשובות:
   ```bash
   git tag -a v1.0.0 -m "Production release"
   git push --tags
   ```

---

## תמיכה נוספת

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Sanity Docs**: [sanity.io/docs](https://sanity.io/docs)
- **Cloudinary Docs**: [cloudinary.com/documentation](https://cloudinary.com/documentation)

---

**🎉 מזל טוב על ההשקה! 🎉**

האתר שלך עכשיו חי ב-production. זכור לעדכן תוכן באופן קבוע ולעקוב אחרי ביצועים.

**LigaDeals Berlin - מוכנים לעזור לקהילה למצוא את הדילים הכי טובים בברלין!**
