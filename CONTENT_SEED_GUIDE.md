# Content Seeding Guide for LigaDeals Berlin

This guide explains how to populate your Sanity CMS with sample content using the seed script.

## 📋 Overview

The seed script will populate your Sanity dataset with:
- **7 Categories**: Hotels, Flights, Attractions, Restaurants, Travel Tips, Shopping, Nightlife
- **7 Articles**: Comprehensive blog posts in Hebrew about Berlin (500-800 words each)
- **7 Testimonials**: Customer reviews with varied ratings and trip types

## 🔐 Prerequisites

### 1. Create a Sanity Write Token

You need a write token to allow the script to create content in your Sanity dataset.

**Steps:**
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project: **LigaDeals Berlin** (Project ID: `7s19ept6`)
3. Go to **API** → **Tokens**
4. Click **Add API token**
5. Enter token name: `Content Seeder`
6. Set permissions: **Editor** (read + write)
7. Click **Add token**
8. **Copy the token immediately** (you won't be able to see it again!)

### 2. Add Token to Environment Variables

Add the token to your `.env.local` file:

```env
# Sanity Write Token (for content seeding)
SANITY_WRITE_TOKEN=your_write_token_here
```

⚠️ **IMPORTANT**: Never commit this token to Git! The `.env.local` file is already in `.gitignore`.

## 🚀 Running the Seed Script

### Option 1: Using npm script (Recommended)

Add this script to your `package.json`:

```json
{
  "scripts": {
    "seed": "tsx scripts/seedContent.ts"
  }
}
```

Then run:

```bash
npm run seed
```

### Option 2: Using tsx directly

If you have `tsx` installed globally:

```bash
npx tsx scripts/seedContent.ts
```

### Option 3: Using ts-node

```bash
npx ts-node scripts/seedContent.ts
```

## 📊 What Gets Created

### Categories (7 total)

| Title | Slug | Color |
|-------|------|-------|
| מלונות | hotels | Blue |
| טיסות | flights | Green |
| אטרקציות | attractions | Amber |
| מסעדות | restaurants | Red |
| טיפים לטיול | travel-tips | Purple |
| שופינג | shopping | Pink |
| חיי לילה | nightlife | Indigo |

### Articles (7 total)

1. **המדריך המלא למלונות הטובים ביותר בברלין לשנת 2025**
   - Category: Hotels
   - 800+ words about hotels in different Berlin neighborhoods

2. **איך למצוא טיסות זולות לברלין: 10 טריקים שחוסכים כסף**
   - Category: Flights
   - Tips for finding cheap flights

3. **10 האטרקציות שאי אפשר לפספס בברלין**
   - Category: Attractions
   - Must-see attractions with prices and tips

4. **המסעדות הכי טובות בברלין: מדריך אוכל מלא**
   - Category: Restaurants
   - Restaurant recommendations including kosher options

5. **טיפים לטיול מושלם בברלין: כל מה שצריך לדעת לפני הנסיעה**
   - Category: Travel Tips
   - Comprehensive travel guide

6. **שופינג בברלין: מה לקנות ואיפה**
   - Category: Shopping
   - Shopping districts, markets, and recommendations

7. **חיי הלילה בברלין: המדריך המלא למועדונים, ברים ואירועים**
   - Category: Nightlife
   - Clubs, bars, and nightlife tips

### Testimonials (7 total)

- **5 stars** (5 reviews): Family trips, couple trips, solo travelers, group tours
- **4 stars** (2 reviews): Minor issues but overall positive
- Mix of trip types: family, couple, solo, group
- All in Hebrew with realistic details

## 🔍 Verifying the Seeded Content

After running the script:

1. **Check Sanity Studio**:
   ```bash
   npm run dev:sanity
   # or
   cd sanity && npx sanity dev
   ```

2. Open [http://localhost:3333](http://localhost:3333)

3. Navigate through:
   - **Articles** → Should see 7 articles
   - **Categories** → Should see 7 categories
   - **Testimonials** → Should see 7 testimonials

4. **Publish the content**:
   - By default, content is created as drafts
   - Go through each document and click **Publish**

## 🔄 Re-seeding

If you need to re-seed:

### Option 1: Delete all content via Sanity Studio
1. Go to **Vision** (query editor) in Sanity Studio
2. Run these queries to delete:

```groq
// Delete all articles
*[_type == "article"]

// Delete all categories
*[_type == "category"]

// Delete all testimonials
*[_type == "testimonial"]
```

Then click the delete button for each result.

### Option 2: Delete via CLI

```bash
cd sanity
npx sanity dataset delete production
npx sanity dataset create production
```

⚠️ **Warning**: This deletes ALL data in your dataset!

## 🛠️ Troubleshooting

### Error: "SANITY_WRITE_TOKEN is not set"
- Make sure you added the token to `.env.local`
- Restart your terminal/IDE after adding the token

### Error: "Reference to non-existent document"
- Categories must be created before articles
- The script handles this automatically by seeding in order

### Error: "Insufficient permissions"
- Make sure your write token has **Editor** permissions
- Check that you're using the correct project ID

### Script runs but no content appears
- Check if content is in **Drafts**
- You need to publish each document manually or use the Sanity API to publish

### TypeScript errors
- Make sure you have the required dependencies:
  ```bash
  npm install --save-dev tsx ts-node @types/node
  ```

## 📝 Customizing the Content

You can edit the sample content files before seeding:

- `/content/sample-articles.json` - Edit article content, titles, SEO
- `/content/sample-testimonials.json` - Edit testimonials
- `/content/categories.json` - Edit categories, colors, descriptions

After editing, just run the seed script again (after deleting existing content).

## 🔒 Security Notes

- **Never commit** your `SANITY_WRITE_TOKEN` to Git
- The token has write access - keep it secure
- Consider creating a separate token for production vs development
- Revoke tokens you no longer need in the Sanity dashboard

## ✅ Next Steps

After seeding:

1. **Publish all content** in Sanity Studio
2. **Add images** to articles (the seed script doesn't include images)
3. **Verify content** appears on your Next.js website
4. **Customize content** as needed for your brand

## 📞 Support

If you encounter issues:
- Check the [Sanity documentation](https://www.sanity.io/docs)
- Review the seed script logs for specific error messages
- Ensure your Sanity schema matches the content structure

---

**Happy seeding! 🌱**
