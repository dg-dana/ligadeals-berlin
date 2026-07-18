import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '7s19ept6',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

// Freely licensed (CC BY-SA) photo of the Teufelsberg radomes, served via
// Wikimedia Commons' stable "Special:FilePath" redirect.
const IMAGE_URL =
  'https://commons.wikimedia.org/wiki/Special:FilePath/Teufelsberg_Listening_Station.jpg';
const IMAGE_CREDIT = 'Wikimedia Commons (CC BY-SA)';

const title = 'טויפלסברג: ההר המלאכותי וסודות הריגול של ברלין';
const slug = 'teufelsberg-berlin';
const excerpt =
  'הר מלאכותי שנבנה מהריסות מלחמת העולם השנייה, ומעליו תחנת ציתות אמריקאית נטושה שהפכה לאחד מאתרי הגרפיטי והתצפית המרשימים בברלין.';

const body = [
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'טויפלסברג ("הר השטן") הוא אחד המקומות המוזרים והמרתקים ביותר בברלין - הר בגובה כ-120 מטר שממוקם ביער גרונוואלד שבמערב העיר, ולמרות המראה הטבעי שלו, הוא כולו מלאכותי לחלוטין.',
      },
    ],
    markDefs: [],
  },
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'הר שנבנה מהריסות מלחמה' }],
    markDefs: [],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'לאחר מלחמת העולם השנייה נערמו על שטח זה מיליוני טונות של פסולת בניינים מברלין ההרוסה - כ-26 מיליון מטרים מעוקבים של הריסות שכיסו למעשה בית ספר צבאי נאצי שלא ניתן היה להרוס בפיצוץ. כך נוצר, במשך כשני עשורים, ההר המלאכותי הגבוה ביותר בברלין.',
      },
    ],
    markDefs: [],
  },
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'תחנת ריגול בתקופת המלחמה הקרה' }],
    markDefs: [],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'בשנות ה-60 וה-70, בשיא המלחמה הקרה, הקימו הצבא האמריקאי וה-NSA על פסגת ההר תחנת ציתות ענקית, שממנה יירטו שידורים ותקשורת מברלין המזרחית ומגוש ברית המועצות. הכיפות הלבנות המפורסמות (Radomes) עדיין ניצבות במקום, ומעניקות לאתר את המראה הפוסט-אפוקליפטי המיוחד שלו.',
      },
    ],
    markDefs: [],
  },
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'גן חיות של אמנות רחוב' }],
    markDefs: [],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'מאז שהתחנה ננטשה בתחילת שנות ה-90, הפך המתחם למגרש משחקים לאמני גרפיטי מכל העולם, וכיום כל קיר, מסדרון וכיפה מכוסים ביצירות אמנות רחוב צבעוניות ומרשימות. מהפסגה נשקף גם אחד המבטים הפנורמיים היפים ביותר על קו הרקיע של ברלין.',
      },
    ],
    markDefs: [],
  },
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'טיפים לביקור' }],
    markDefs: [],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'הכניסה לאתר בתשלום וכוללת סיורים מודרכים וחופשיים. מומלץ להגיע בנעליים נוחות, להקדיש לפחות שעה-שעתיים לביקור, ולבדוק מראש את שעות הפתיחה באתר הרשמי של טויפלסברג. השילוב של טבע, היסטוריה ואמנות הופך את המקום לאחת התחנות המומלצות ביותר לישראלים המבקרים בברלין.',
      },
    ],
    markDefs: [],
  },
];

async function run() {
  if (!process.env.SANITY_API_TOKEN && !process.env.SANITY_WRITE_TOKEN) {
    console.error(
      '❌ ERROR: SANITY_API_TOKEN (or SANITY_WRITE_TOKEN) is not set in .env.local'
    );
    process.exit(1);
  }

  console.log('📷 Downloading Teufelsberg photo from Wikimedia Commons...');
  const imageResponse = await fetch(IMAGE_URL, { redirect: 'follow' });
  if (!imageResponse.ok) {
    throw new Error(`Failed to download image: ${imageResponse.status}`);
  }
  const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

  console.log('⬆️  Uploading image asset to Sanity...');
  const asset = await client.assets.upload('image', imageBuffer, {
    filename: 'teufelsberg-berlin.jpg',
  });
  console.log(`✅ Uploaded image asset: ${asset._id}`);

  console.log('📝 Creating post document...');
  const doc = {
    _type: 'post',
    title,
    slug: { _type: 'slug', current: slug },
    mainImage: {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
      alt: `כיפות הציתות של טויפלסברג בברלין (${IMAGE_CREDIT})`,
    },
    publishedAt: new Date().toISOString(),
    excerpt,
    body,
    featured: false,
  };

  const result = await client.create(doc);
  console.log(`✅ Created post: "${title}" (ID: ${result._id})`);
  console.log('\n🎉 Done! Review and publish the draft in Sanity Studio.');
}

run().catch((error) => {
  console.error('❌ Failed:', error);
  process.exit(1);
});
