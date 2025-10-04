import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { structure } from './sanity/desk/structure'
// TEMPORARILY DISABLED TO DEBUG
// import {
//   ApproveAction,
//   RejectAction,
//   ResetToPendingAction,
//   ApproveAndFeatureAction,
// } from './sanity/workflows/testimonialReview'

export default defineConfig({
  name: 'ligadeals-berlin',
  title: 'Liga Deals Berlin - מועדון הטבות בברלין',

  projectId: '7s19ept6',
  dataset: 'production',

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  // Custom title for browser tab
  basePath: '/studio',

  // Document actions customization - Hebrew labels
  document: {
    // TEMPORARILY DISABLED ALL CUSTOM ACTIONS TO DEBUG
    // actions: (prev, context) => {
    //   return prev
    // },

    // Production URL for preview
    productionUrl: async (prev, context) => {
      const { document } = context
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

      if (document._type === 'article' || document._type === 'post') {
        const slug = document.slug?.current
        if (slug) {
          return `${baseUrl}/blog/${slug}`
        }
      }

      if (document._type === 'photo') {
        return `${baseUrl}/gallery/photos`
      }

      if (document._type === 'video') {
        return `${baseUrl}/gallery/videos`
      }

      return prev
    },
  },
})
