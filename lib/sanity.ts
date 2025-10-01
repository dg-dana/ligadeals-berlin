import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Fetch all posts
export async function getAllPosts() {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      featured,
      mainImage {
        asset->{
          _id,
          url
        },
        alt
      },
      author->{
        name,
        slug,
        image
      },
      categories[]->{
        title,
        slug
      }
    }`
  )
}

// Fetch featured posts
export async function getFeaturedPosts() {
  return client.fetch(
    `*[_type == "post" && featured == true] | order(publishedAt desc) [0...3] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage {
        asset->{
          _id,
          url
        },
        alt
      },
      author->{
        name,
        slug
      }
    }`
  )
}

// Fetch single post by slug
export async function getPostBySlug(slug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      body,
      mainImage {
        asset->{
          _id,
          url
        },
        alt
      },
      author->{
        name,
        slug,
        image,
        bio
      },
      categories[]->{
        title,
        slug
      }
    }`,
    { slug }
  )
}

// Fetch all categories
export async function getAllCategories() {
  return client.fetch(
    `*[_type == "category"] | order(title asc) {
      _id,
      title,
      slug,
      description
    }`
  )
}
