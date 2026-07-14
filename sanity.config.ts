import { defineConfig } from 'sanity'
import type { DocumentActionComponent, DocumentActionProps } from 'sanity'
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

// Hebrew labels for the built-in document actions, keyed by their `.action` id
const HEBREW_ACTION_LABELS: Record<string, { label: string; title: string }> = {
  publish: { label: 'פרסם', title: 'פרסם מסמך זה' },
  unpublish: { label: 'בטל פרסום', title: 'בטל פרסום מסמך זה' },
  delete: { label: 'מחק', title: 'מחק מסמך זה' },
  duplicate: { label: 'שכפל', title: 'צור עותק של מסמך זה' },
  restore: { label: 'שחזר', title: 'שחזר גרסה קודמת' },
}

// Wraps a built-in action component so its rendered description uses Hebrew labels,
// while preserving the component's callable shape that Sanity expects.
function withHebrewLabel(action: DocumentActionComponent): DocumentActionComponent {
  const translation = action.action ? HEBREW_ACTION_LABELS[action.action] : undefined
  if (!translation) return action

  const wrapped: DocumentActionComponent = (props: DocumentActionProps) => {
    const result = action(props)
    if (!result) return result
    return { ...result, label: translation.label, title: translation.title }
  }
  wrapped.action = action.action
  wrapped.displayName = action.displayName

  return wrapped
}

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
          ...prev.map(withHebrewLabel),
          // Add workflow actions
          ApproveAndFeatureAction,
          ApproveAction,
          RejectAction,
          ResetToPendingAction,
        ]
      }

      // For other document types, just translate labels
      return prev.map(withHebrewLabel)
    },

    // Production URL for preview
    productionUrl: async (prev, context) => {
      const { document } = context
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

      if (document._type === 'article' || document._type === 'post') {
        const slug = (document as { slug?: { current?: string } }).slug?.current
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
