import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Initialize Sanity client with write token
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '7s19ept6',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN, // You need to add this to .env.local
  useCdn: false,
});

// Type definitions
interface Category {
  title: string;
  slug: string;
  description: string;
  color: string;
}

interface Article {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
}

interface Testimonial {
  name: string;
  tripType: 'family' | 'couple' | 'solo' | 'group';
  rating: number;
  text: string;
  location: string;
  tripDate: string;
  featured: boolean;
}

// Helper function to read JSON files
function readJSONFile<T>(fileName: string): T {
  const filePath = path.join(process.cwd(), 'content', fileName);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent) as T;
}

// Helper function to create a slug document
function createSlug(slug: string) {
  return {
    _type: 'slug',
    current: slug,
  };
}

// Seed categories
async function seedCategories() {
  console.log('\n📁 Seeding categories...');
  const categories = readJSONFile<Category[]>('categories.json');

  const categoryMap = new Map<string, string>();

  for (const category of categories) {
    try {
      const doc = {
        _type: 'category',
        title: category.title,
        slug: createSlug(category.slug),
        description: category.description,
        color: category.color,
      };

      const result = await client.create(doc);
      categoryMap.set(category.title, result._id);
      console.log(`✅ Created category: ${category.title} (ID: ${result._id})`);
    } catch (error) {
      console.error(`❌ Failed to create category ${category.title}:`, error);
    }
  }

  return categoryMap;
}

// Seed articles
async function seedArticles(categoryMap: Map<string, string>) {
  console.log('\n📝 Seeding articles...');
  const articles = readJSONFile<Article[]>('sample-articles.json');

  for (const article of articles) {
    try {
      const categoryId = categoryMap.get(article.category);

      if (!categoryId) {
        console.warn(`⚠️  Category "${article.category}" not found for article "${article.title}"`);
        continue;
      }

      const doc = {
        _type: 'article',
        title: article.title,
        slug: createSlug(article.slug),
        excerpt: article.excerpt,
        content: article.content,
        category: {
          _type: 'reference',
          _ref: categoryId,
        },
        tags: article.tags,
        seo: {
          _type: 'seo',
          title: article.seoTitle,
          description: article.seoDescription,
        },
        publishedAt: new Date().toISOString(),
        featured: false,
      };

      const result = await client.create(doc);
      console.log(`✅ Created article: ${article.title} (ID: ${result._id})`);
    } catch (error) {
      console.error(`❌ Failed to create article ${article.title}:`, error);
    }
  }
}

// Seed testimonials
async function seedTestimonials() {
  console.log('\n💬 Seeding testimonials...');
  const testimonials = readJSONFile<Testimonial[]>('sample-testimonials.json');

  for (const testimonial of testimonials) {
    try {
      const doc = {
        _type: 'testimonial',
        name: testimonial.name,
        tripType: testimonial.tripType,
        rating: testimonial.rating,
        text: testimonial.text,
        location: testimonial.location,
        tripDate: testimonial.tripDate,
        featured: testimonial.featured,
      };

      const result = await client.create(doc);
      console.log(`✅ Created testimonial from: ${testimonial.name} (ID: ${result._id})`);
    } catch (error) {
      console.error(`❌ Failed to create testimonial from ${testimonial.name}:`, error);
    }
  }
}

// Main seed function
async function seed() {
  console.log('🌱 Starting content seeding process...\n');

  // Check for write token
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error('❌ ERROR: SANITY_WRITE_TOKEN is not set in .env.local');
    console.error('Please create a write token in Sanity Studio and add it to your .env.local file');
    process.exit(1);
  }

  try {
    // Seed in order: categories first, then articles (which reference categories), then testimonials
    const categoryMap = await seedCategories();
    await seedArticles(categoryMap);
    await seedTestimonials();

    console.log('\n✨ Seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Categories: ${categoryMap.size}`);
    console.log(`   - Articles: ${readJSONFile<Article[]>('sample-articles.json').length}`);
    console.log(`   - Testimonials: ${readJSONFile<Testimonial[]>('sample-testimonials.json').length}`);
    console.log('\n🎉 You can now view your content in Sanity Studio!');
  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  }
}

// Run the seed function
seed();
