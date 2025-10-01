import blockContent from './blockContent'
import post from './post'
import article from './article'
import author from './author'
import category from './category'
import photo from './photo'
import video from './video'
import testimonial from './testimonial'
import siteSettings from './siteSettings'

export const schemaTypes = [
  // Content types
  article,
  post,
  photo,
  video,
  testimonial,

  // Reference types
  author,
  category,

  // Settings
  siteSettings,

  // Block content
  blockContent,
]
