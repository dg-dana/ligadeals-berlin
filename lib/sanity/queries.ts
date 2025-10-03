// Common fragments for reusability
const authorFields = `
  _id,
  name,
  image,
  bio
`;

const categoryFields = `
  _id,
  title,
  slug,
  description
`;

const articleBaseFields = `
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  category->{${categoryFields}},
  author->{${authorFields}},
  tags
`;

const articleFullFields = `
  ${articleBaseFields},
  content,
  seo
`;

// Get all articles with filtering, sorting, and pagination
export const getAllArticlesQuery = `
  *[_type == "article" && !(_id in path("drafts.**"))]
  | order(publishedAt desc)
  [$start...$end] {
    ${articleBaseFields}
  }
`;

export const getAllArticlesCountQuery = `
  count(*[_type == "article" && !(_id in path("drafts.**"))])
`;

// Get article by slug with related articles
export const getArticleBySlugQuery = `
  *[_type == "article" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    ${articleFullFields},
    "relatedArticles": *[
      _type == "article" &&
      slug.current != $slug &&
      category._ref == ^.category._ref &&
      !(_id in path("drafts.**"))
    ] | order(publishedAt desc) [0...3] {
      ${articleBaseFields}
    }
  }
`;

// Get featured articles for homepage
export const getFeaturedArticlesQuery = `
  *[_type == "article" && featured == true && !(_id in path("drafts.**"))]
  | order(publishedAt desc)
  [0...$limit] {
    ${articleBaseFields},
    featured
  }
`;

// Get all categories
export const getAllCategoriesQuery = `
  *[_type == "category"] | order(title asc) {
    ${categoryFields},
    "articleCount": count(*[_type == "article" && references(^._id) && !(_id in path("drafts.**"))])
  }
`;

// Get category by slug
export const getCategoryBySlugQuery = `
  *[_type == "category" && slug.current == $slug][0] {
    ${categoryFields},
    "articleCount": count(*[_type == "article" && references(^._id) && !(_id in path("drafts.**"))])
  }
`;

// Get articles by category
export const getArticlesByCategoryQuery = `
  *[_type == "article" && category->slug.current == $categorySlug && !(_id in path("drafts.**"))]
  | order(publishedAt desc)
  [$start...$end] {
    ${articleBaseFields}
  }
`;

export const getArticlesByCategoryCountQuery = `
  count(*[_type == "article" && category->slug.current == $categorySlug && !(_id in path("drafts.**"))])
`;

// Get all photos with category filtering
export const getAllPhotosQuery = `
  *[_type == "photo" && !(_id in path("drafts.**"))]
  | order(createdAt desc)
  [$start...$end] {
    _id,
    title,
    image,
    description,
    category->{${categoryFields}},
    tags,
    createdAt
  }
`;

export const getPhotosByCategoryQuery = `
  *[_type == "photo" && category->slug.current == $categorySlug && !(_id in path("drafts.**"))]
  | order(createdAt desc)
  [$start...$end] {
    _id,
    title,
    image,
    description,
    category->{${categoryFields}},
    tags,
    createdAt
  }
`;

export const getAllPhotosCountQuery = `
  count(*[_type == "photo" && !(_id in path("drafts.**"))])
`;

// Get all videos with category filtering
export const getAllVideosQuery = `
  *[_type == "video" && !(_id in path("drafts.**"))]
  | order(createdAt desc)
  [$start...$end] {
    _id,
    title,
    videoUrl,
    thumbnail,
    description,
    category->{${categoryFields}},
    tags,
    duration,
    createdAt
  }
`;

export const getVideosByCategoryQuery = `
  *[_type == "video" && category->slug.current == $categorySlug && !(_id in path("drafts.**"))]
  | order(createdAt desc)
  [$start...$end] {
    _id,
    title,
    videoUrl,
    thumbnail,
    description,
    category->{${categoryFields}},
    tags,
    duration,
    createdAt
  }
`;

export const getAllVideosCountQuery = `
  count(*[_type == "video" && !(_id in path("drafts.**"))])
`;

// Get approved testimonials (for public display)
export const getApprovedTestimonialsQuery = `
  *[_type == "testimonial" && status == "approved" && !(_id in path("drafts.**"))]
  | order(date desc)
  [0...$limit] {
    _id,
    customerName,
    rating,
    review,
    tripType,
    date,
    photo,
    featured,
    status
  }
`;

// Get featured testimonials (for homepage)
export const getFeaturedTestimonialsQuery = `
  *[_type == "testimonial" && status == "approved" && featured == true && !(_id in path("drafts.**"))]
  | order(date desc)
  [0...$limit] {
    _id,
    customerName,
    rating,
    review,
    tripType,
    date,
    photo,
    featured,
    status
  }
`;

// Get site settings
export const getSiteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    _id,
    siteName,
    siteDescription,
    logo,
    favicon,
    socialMedia,
    contactEmail,
    contactPhone,
    address,
    seo
  }
`;

// Search articles
export const searchArticlesQuery = `
  *[
    _type == "article" &&
    !(_id in path("drafts.**")) &&
    (
      title match $searchTerm + "*" ||
      excerpt match $searchTerm + "*" ||
      pt::text(content) match $searchTerm + "*"
    )
  ] | order(publishedAt desc) [$start...$end] {
    ${articleBaseFields}
  }
`;

export const searchArticlesCountQuery = `
  count(*[
    _type == "article" &&
    !(_id in path("drafts.**")) &&
    (
      title match $searchTerm + "*" ||
      excerpt match $searchTerm + "*" ||
      pt::text(content) match $searchTerm + "*"
    )
  ])
`;

// Get recent articles
export const getRecentArticlesQuery = `
  *[_type == "article" && !(_id in path("drafts.**"))]
  | order(publishedAt desc)
  [0...$limit] {
    ${articleBaseFields}
  }
`;

// Get articles by tag
export const getArticlesByTagQuery = `
  *[_type == "article" && $tag in tags && !(_id in path("drafts.**"))]
  | order(publishedAt desc)
  [$start...$end] {
    ${articleBaseFields}
  }
`;

export const getArticlesByTagCountQuery = `
  count(*[_type == "article" && $tag in tags && !(_id in path("drafts.**"))])
`;

// Get all unique tags
export const getAllTagsQuery = `
  array::unique(*[_type == "article" && !(_id in path("drafts.**"))].tags[])
`;
