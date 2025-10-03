# מדריך פריסה מהיר - LigaDeals Berlin
## Quick Start Deployment Guide

---

## ✅ רשימת משימות לפריסה (Deployment Checklist)

עקוב אחרי השלבים הבאים בדיוק כפי שהם כתובים:

---

## שלב 1️⃣: הכנת הקוד ל-GitHub

### 1.1 ודא שכל הקוד מועלה ל-GitHub

```bash
# בדוק סטטוס
git status

# אם יש שינויים, הוסף אותם
git add .
git commit -m "Ready for production deployment"
git push origin main
```

**✅ Checkpoint**: הקוד שלך צריך להיות ב-GitHub ב-branch `main` או `master`

---

## שלב 2️⃣: פריסה ל-Vercel

### 2.1 הירשם/התחבר ל-Vercel

1. **גש ל-[vercel.com](https://vercel.com)**
2. **לחץ על "Sign Up" (או "Login" אם יש לך כבר חשבון)**
3. **בחר "Continue with GitHub"**
4. **אשר את ההרשאות ל-Vercel**

### 2.2 יבא את הפרויקט

1. **בדף הבית של Vercel, לחץ על "Add New..." → "Project"**

   ![Add New Project](https://vercel.com/_next/image?url=%2Fdocs-proxy%2Fstatic%2Fdocs%2Fconcepts%2Fprojects%2Fadd-new-project.png&w=3840&q=75)

2. **בחר את הרפוזיטורי "ligadeals-berlin"**
   - אם לא רואה אותו, לחץ על "Adjust GitHub App Permissions"
   - תן הרשאות ל-Vercel לגשת לרפוזיטורי

3. **לחץ "Import"**

### 2.3 קונפיגורציה בסיסית

בעמוד הקונפיגורציה, מלא את הפרטים הבאים:

| שדה | ערך |
|-----|-----|
| **Project Name** | `ligadeals-berlin` (או כל שם שתרצה) |
| **Framework Preset** | Next.js (אמור להתגלות אוטומטית ✅) |
| **Root Directory** | `./` (השורש - השאר כמו שזה) |
| **Build Command** | `npm run build` (אוטומטי ✅) |
| **Output Directory** | `.next` (אוטומטי ✅) |
| **Install Command** | `npm install` (אוטומטי ✅) |

**⚠️ חשוב**: **לא ללחוץ על "Deploy" עדיין!**

---

## שלב 3️⃣: הוספת משתני סביבה (Environment Variables)

### 3.1 פתח את לשונית Environment Variables

בעמוד הקונפיגורציה, **לחץ על "Environment Variables"**

### 3.2 הוסף את כל המשתנים הבאים

לכל משתנה:
1. הקלד את השם ב-**Name**
2. הקלד את הערך ב-**Value**
3. בחר **Production** ב-Environment
4. לחץ **Add**

#### 📋 רשימת משתנים חובה:

**Sanity CMS:**
```
Name: NEXT_PUBLIC_SANITY_PROJECT_ID
Value: [ה-Project ID שלך מ-https://sanity.io/manage]
Environment: Production
```

```
Name: NEXT_PUBLIC_SANITY_DATASET
Value: production
Environment: Production
```

```
Name: NEXT_PUBLIC_SANITY_STUDIO_URL
Value: https://[your-project].sanity.studio
Environment: Production
```

```
Name: SANITY_API_TOKEN
Value: [הטוקן שלך מ-Sanity - צור ב-https://sanity.io/manage → API → Tokens → Add New Token עם הרשאות Editor]
Environment: Production
```

```
Name: SANITY_WEBHOOK_SECRET
Value: [צור מחרוזת אקראית - ראה למטה איך]
Environment: Production
```

**איך ליצור SANITY_WEBHOOK_SECRET:**

**Windows (PowerShell):**
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
```

**Mac/Linux:**
```bash
openssl rand -base64 32
```

**או פשוט השתמש ב-:** `your_super_secret_webhook_key_change_this_12345`

---

**Cloudinary:**
```
Name: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
Value: [Cloud Name מ-https://cloudinary.com/console]
Environment: Production
```

```
Name: CLOUDINARY_API_KEY
Value: [API Key מ-Cloudinary Dashboard]
Environment: Production
```

```
Name: CLOUDINARY_API_SECRET
Value: [API Secret מ-Cloudinary Dashboard]
Environment: Production
```

---

**Resend (Email Service):**
```
Name: RESEND_API_KEY
Value: [צור API Key ב-https://resend.com/api-keys]
Environment: Production
```

```
Name: RESEND_FROM_EMAIL
Value: noreply@ligadeals-berlin.com
Environment: Production
```

```
Name: CONTACT_EMAIL
Value: [האימייל שלך לקבלת הודעות יצירת קשר]
Environment: Production
```

**⚠️ חשוב**: צריך לאמת את הדומיין ב-Resend לפני ששולחים מיילים!
- גש ל-[Resend Domains](https://resend.com/domains)
- הוסף את הדומיין שלך
- הוסף את רשומות ה-DNS שהם נותנים לך

---

**Google Analytics (אופציונלי):**
```
Name: NEXT_PUBLIC_GA_MEASUREMENT_ID
Value: G-XXXXXXXXXX [מ-Google Analytics]
Environment: Production
```

---

**Security & Performance:**
```
Name: NEXT_PUBLIC_SITE_URL
Value: https://ligadeals-berlin.vercel.app [כרגע, נשנה אחר כך לדומיין שלך]
Environment: Production
```

```
Name: RATE_LIMIT_MAX_REQUESTS
Value: 100
Environment: Production
```

```
Name: RATE_LIMIT_WINDOW_MS
Value: 60000
Environment: Production
```

```
Name: ALLOWED_ORIGINS
Value: https://ligadeals-berlin.vercel.app [נוסיף את הדומיין האמיתי אחר כך]
Environment: Production
```

### 3.3 בדוק שכל המשתנים הוספו

ודא שיש לך **לפחות 14 משתנים** ברשימה.

**✅ Checkpoint**: כל משתני הסביבה מוגדרים

---

## שלב 4️⃣: לחץ Deploy! 🚀

1. **גלול למטה**
2. **לחץ על כפתור "Deploy"**
3. **המתן 2-5 דקות** (Vercel בונה את האתר)

אתה תראה:
- ✅ Building
- ✅ Running Build Command
- ✅ Deploying

כשזה מסתיים:
- 🎉 **"Congratulations!"**

**לחץ על "Visit"** כדי לראות את האתר החי!

---

## שלב 5️⃣: בדיקות ראשוניות לאחר פריסה

### 5.1 בדוק שהאתר טוען

1. **פתח את ה-URL של Vercel** (משהו כמו `https://ligadeals-berlin.vercel.app`)
2. **ודא שדף הבית נטען**

### 5.2 בדוק את ה-API Routes

**Test Contact Form:**
1. גש ל-`https://your-url.vercel.app/contact` (או איפה שטופס יצירת הקשר שלך)
2. נסה לשלוח הודעה
3. בדוק שקיבלת מייל

**או בדוק ישירות:**
```bash
curl -X POST https://your-url.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

אמור לקבל:
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

### 5.3 בדוק את Sanity Content

1. **גש ל-Sanity Studio** שלך (`https://your-project.sanity.studio`)
2. **ערוך דיל כלשהו** או תוכן אחר
3. **שמור**
4. **רענן את האתר** (עדיין לא יתעדכן - נגדיר webhook בשלב הבא)

### 5.4 בדוק את התמונות מ-Cloudinary

1. **פתח DevTools** (F12)
2. **לך ל-Network tab**
3. **רענן את הדף**
4. **סנן ל-"Img"**
5. **ודא שהתמונות מגיעות מ-`res.cloudinary.com`**

**✅ Checkpoint**: האתר עובד ב-production!

---

## שלב 6️⃣: הגדרת Sanity Webhook (עדכון אוטומטי)

כדי שהאתר יתעדכן אוטומטית כשאתה משנה תוכן ב-Sanity:

### 6.1 גש ל-Sanity Dashboard

1. **לך ל-[sanity.io/manage](https://sanity.io/manage)**
2. **בחר את הפרויקט שלך**

### 6.2 צור Webhook חדש

1. **לחץ על "API" בתפריט הצד**
2. **גלול למטה ל-"Webhooks"**
3. **לחץ על "Create webhook"**

### 6.3 מלא את הפרטים

| שדה | ערך |
|-----|-----|
| **Name** | `Vercel Production Revalidation` |
| **URL** | `https://your-vercel-url.vercel.app/api/revalidate` |
| **Dataset** | `production` |
| **Trigger on** | ✅ Create<br>✅ Update<br>✅ Delete |
| **Projection** | `{_id, _type, slug}` |
| **Filter** | `_type in ["deal", "category", "testimonial", "article"]` |
| **HTTP method** | `POST` |
| **API version** | `v2021-03-25` (או הגרסה העדכנית ביותר) |

### 6.4 הוסף HTTP Headers

לחץ על **"Add HTTP Header"**:

```
Header name: x-sanity-webhook-secret
Header value: [אותה מחרוזת שהשתמשת ב-SANITY_WEBHOOK_SECRET]
```

### 6.5 שמור את ה-Webhook

**לחץ "Save"**

### 6.6 בדוק שה-Webhook עובד

1. **חזור ל-Sanity Studio**
2. **ערוך דיל**
3. **שמור**
4. **המתן 5-10 שניות**
5. **רענן את האתר** - השינוי אמור להופיע! 🎉

**לבדוק את ה-Webhook Deliveries:**
- בדף ה-Webhook ב-Sanity, לחץ על "Deliveries"
- אמור לראות בקשות עם **Status 200 OK**

**✅ Checkpoint**: Webhook פועל, התוכן מתעדכן אוטומטית!

---

## שלב 7️⃣: הגדרת דומיין מותאם (Custom Domain) - אופציונלי

### 7.1 קנה דומיין

אם אין לך עדיין:
- **Namecheap** - [namecheap.com](https://namecheap.com)
- **GoDaddy** - [godaddy.com](https://godaddy.com)
- **Google Domains** - [domains.google.com](https://domains.google.com)

**מומלץ**: `ligadeals-berlin.com` או משהו דומה

### 7.2 הוסף דומיין ב-Vercel

1. **ב-Vercel Dashboard, בחר את הפרויקט שלך**
2. **לחץ "Settings" (למעלה)**
3. **בתפריט הצד, לחץ "Domains"**
4. **הקלד את הדומיין שלך** (לדוגמה: `ligadeals-berlin.com`)
5. **לחץ "Add"**

### 7.3 Vercel יציג לך את רשומות ה-DNS

אתה תראה משהו כזה:

**עבור Domain Root (ligadeals-berlin.com):**
```
Type: A
Name: @ (או ligadeals-berlin.com)
Value: 76.76.21.21
TTL: 3600
```

**עבור www (www.ligadeals-berlin.com):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### 7.4 הוסף את הרשומות ברושם הדומיינים

**לדוגמה, ב-Namecheap:**

1. **התחבר ל-Namecheap**
2. **Dashboard → Domain List → Manage**
3. **Advanced DNS**
4. **Add New Record:**
   - **Type**: A Record
   - **Host**: `@`
   - **Value**: `76.76.21.21`
   - **TTL**: Automatic

5. **Add New Record:**
   - **Type**: CNAME Record
   - **Host**: `www`
   - **Target**: `cname.vercel-dns.com`
   - **TTL**: Automatic

6. **Save All Changes**

**ב-GoDaddy או Google Domains התהליך דומה**

### 7.5 המתן לעדכון DNS (5 דקות - 48 שעות)

**בדרך כלל: 5-30 דקות**

**בדיקה:**
```bash
# Windows
nslookup ligadeals-berlin.com

# Mac/Linux
dig ligadeals-berlin.com
```

אמור להחזיר: `76.76.21.21`

### 7.6 SSL יופעל אוטומטית

Vercel יטפל בזה בשבילך! תראה:
- ✅ SSL Certificate: Valid

**בדיקה:**
```bash
curl -I https://ligadeals-berlin.com
```

אמור להחזיר: `HTTP/2 200`

### 7.7 עדכן משתני סביבה

חזור ל-Vercel → Settings → Environment Variables:

**עדכן:**
```
NEXT_PUBLIC_SITE_URL = https://ligadeals-berlin.com
ALLOWED_ORIGINS = https://ligadeals-berlin.com,https://www.ligadeals-berlin.com
```

**Redeploy:**
- Vercel → Deployments → (העדכני ביותר) → ⋯ → Redeploy

### 7.8 עדכן את ה-Webhook URL ב-Sanity

1. **Sanity Dashboard → API → Webhooks**
2. **ערוך את ה-Webhook**
3. **שנה URL ל-**: `https://ligadeals-berlin.com/api/revalidate`
4. **Save**

**✅ Checkpoint**: הדומיין שלך פועל עם HTTPS!

---

## שלב 8️⃣: בדיקות סופיות

### 8.1 בדיקה פונקציונלית מלאה

- [ ] דף הבית נטען
- [ ] דפי דילים עובדים
- [ ] חיפוש וסינון פועלים
- [ ] טופס יצירת קשר שולח מיילים
- [ ] עדכון תוכן ב-Sanity מתעדכן באתר תוך 10 שניות
- [ ] תמונות נטענות מהר מ-Cloudinary
- [ ] האתר מגיב (responsive) בנייד/טאבלט/דסקטופ

### 8.2 Lighthouse Audit

1. **פתח את האתר ב-Chrome**
2. **DevTools (F12) → Lighthouse**
3. **Categories: בחר הכל**
4. **Analyze page load**

**מטרה:**
- 🎯 Performance: 90+
- 🎯 Accessibility: 90+
- 🎯 Best Practices: 90+
- 🎯 SEO: 90+

**או השתמש ב-:** [PageSpeed Insights](https://pagespeed.web.dev)

### 8.3 בדיקת אבטחה

```bash
# בדוק headers
curl -I https://ligadeals-berlin.com
```

אמור לראות:
```
strict-transport-security: max-age=63072000
x-frame-options: SAMEORIGIN
x-content-type-options: nosniff
```

### 8.4 בדוק Analytics

**Google Analytics:**
1. **Google Analytics Dashboard**
2. **Realtime**
3. **גש לאתר שלך**
4. **אמור לראות את עצמך ב-Realtime!**

**✅ Checkpoint**: הכל עובד! 🎉

---

## 🎉 סיימת! האתר שלך חי!

### הצעדים הבאים:

1. **📱 שתף את האתר**
   - שלח לחברים, משפחה, קהילה
   - פרסם ברשתות חברתיות

2. **📊 עקוב אחרי נתונים**
   - Google Analytics - מי מבקר באתר
   - Vercel Analytics - ביצועים
   - Sanity - ניהול תוכן

3. **🔄 עדכן תוכן באופן קבוע**
   - הוסף דילים חדשים ב-Sanity
   - הם יתעדכנו אוטומטית באתר!

4. **🚀 שיפורים עתידיים**
   - הוסף עוד דילים
   - קטגוריות חדשות
   - שפר SEO
   - קמפיינים שיווקיים

---

## 🆘 עזרה ופתרון בעיות

### האתר לא נטען (500 Error)

**סיבה**: משתני סביבה חסרים

**פתרון:**
1. Vercel → Settings → Environment Variables
2. ודא שכל 14 המשתנים קיימים
3. Deployments → Redeploy

### תמונות לא נטענות

**סיבה**: Cloudinary לא מוגדר

**פתרון:**
1. בדוק `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
2. ודא שהוא תואם לשם ב-Cloudinary Dashboard
3. DevTools → Network → סנן ל-Img → בדוק שגיאות

### מיילים לא נשלחים

**סיבה**: Resend לא מאומת

**פתרון:**
1. Resend Dashboard → Domains
2. ודא שהדומיין מאומת (יש ✅ ירוק)
3. הוסף רשומות DNS שהם נתנו לך
4. בדוק `RESEND_API_KEY` ב-Vercel

### Webhook לא עובד

**סיבה**: סוד לא תואם או URL שגוי

**פתרון:**
1. Sanity → API → Webhooks → Deliveries
2. בדוק Status Codes
3. אם 401 Unauthorized: בדוק `x-sanity-webhook-secret`
4. אם 404 Not Found: בדוק את ה-URL

### דומיין לא עובד

**סיבה**: DNS עדיין לא עדכנו

**פתרון:**
```bash
nslookup ligadeals-berlin.com
```
צריך להחזיר: `76.76.21.21`

אם לא - המתן עוד קצת (עד 48 שעות)

---

## 📞 תמיכה נוספת

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Sanity Slack**: [slack.sanity.io](https://slack.sanity.io)
- **GitHub Issues**: פתח issue בפרויקט שלך

---

**🎊 מזל טוב על ההשקה של LigaDeals Berlin! 🎊**

**עכשיו אפשר להתחיל לעזור לקהילה למצוא את הדילים הטובים ביותר בברלין!**
