import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { structure } from './sanity/desk/structure'
import {
  ApproveAction,
  RejectAction,
  ResetToPendingAction,
  ApproveAndFeatureAction,
} from './sanity/workflows/testimonialReview'

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
    actions: (prev, context) => {
      // Add workflow actions for testimonials
      if (context.schemaType === 'testimonial') {
        return [
          ...prev.map((originalAction) => {
            // Customize action labels to Hebrew
            if (originalAction.action === 'publish') {
              return {
                ...originalAction,
                label: 'פרסם',
                title: 'פרסם מסמך זה',
              }
            }
            if (originalAction.action === 'unpublish') {
              return {
                ...originalAction,
                label: 'בטל פרסום',
                title: 'בטל פרסום מסמך זה',
              }
            }
            if (originalAction.action === 'delete') {
              return {
                ...originalAction,
                label: 'מחק',
                title: 'מחק מסמך זה',
              }
            }
            if (originalAction.action === 'duplicate') {
              return {
                ...originalAction,
                label: 'שכפל',
                title: 'צור עותק של מסמך זה',
              }
            }
            if (originalAction.action === 'restore') {
              return {
                ...originalAction,
                label: 'שחזר',
                title: 'שחזר גרסה קודמת',
              }
            }
            return originalAction
          }),
          // Add workflow actions
          ApproveAndFeatureAction,
          ApproveAction,
          RejectAction,
          ResetToPendingAction,
        ]
      }

      // For other document types, just translate labels
      return prev.map((originalAction) => {
        // Customize action labels to Hebrew
        if (originalAction.action === 'publish') {
          return {
            ...originalAction,
            label: 'פרסם',
            title: 'פרסם מסמך זה',
          }
        }
        if (originalAction.action === 'unpublish') {
          return {
            ...originalAction,
            label: 'בטל פרסום',
            title: 'בטל פרסום מסמך זה',
          }
        }
        if (originalAction.action === 'delete') {
          return {
            ...originalAction,
            label: 'מחק',
            title: 'מחק מסמך זה',
          }
        }
        if (originalAction.action === 'duplicate') {
          return {
            ...originalAction,
            label: 'שכפל',
            title: 'צור עותק של מסמך זה',
          }
        }
        if (originalAction.action === 'restore') {
          return {
            ...originalAction,
            label: 'שחזר',
            title: 'שחזר גרסה קודמת',
          }
        }
        return originalAction
      })
    },

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
