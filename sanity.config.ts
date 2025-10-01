import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'ligadeals-berlin',
  title: 'Liga Deals Berlin - מועדון הטבות בברלין',

  projectId: '7s19ept6',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('תוכן (Content)')
          .items([
            // Content sections
            S.listItem()
              .title('מאמרים (Articles)')
              .icon(() => '📝')
              .child(
                S.documentTypeList('article')
                  .title('מאמרים (Articles)')
                  .filter('_type == "article"')
              ),
            S.listItem()
              .title('מאמרים ישנים (Old Posts)')
              .icon(() => '📄')
              .child(
                S.documentTypeList('post')
                  .title('מאמרים ישנים (Old Posts)')
                  .filter('_type == "post"')
              ),
            S.divider(),

            // Gallery sections
            S.listItem()
              .title('גלריית תמונות (Photo Gallery)')
              .icon(() => '📷')
              .child(
                S.documentTypeList('photo')
                  .title('תמונות (Photos)')
                  .filter('_type == "photo"')
              ),
            S.listItem()
              .title('גלריית וידאו (Video Gallery)')
              .icon(() => '🎬')
              .child(
                S.documentTypeList('video')
                  .title('סרטונים (Videos)')
                  .filter('_type == "video"')
              ),
            S.divider(),

            // Testimonials
            S.listItem()
              .title('המלצות לקוחות (Testimonials)')
              .icon(() => '⭐')
              .child(
                S.documentTypeList('testimonial')
                  .title('המלצות (Testimonials)')
                  .filter('_type == "testimonial"')
              ),
            S.divider(),

            // Reference data
            S.listItem()
              .title('כותבים (Authors)')
              .icon(() => '👤')
              .child(
                S.documentTypeList('author')
                  .title('כותבים (Authors)')
                  .filter('_type == "author"')
              ),
            S.listItem()
              .title('קטגוריות (Categories)')
              .icon(() => '🏷️')
              .child(
                S.documentTypeList('category')
                  .title('קטגוריות (Categories)')
                  .filter('_type == "category"')
              ),
            S.divider(),

            // Settings
            S.listItem()
              .title('הגדרות אתר (Site Settings)')
              .icon(() => '⚙️')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('הגדרות אתר (Site Settings)')
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  // Custom theme with LigaDeals branding
  theme: {
    colors: {
      primary: '#2563eb', // Blue
      accent: '#3b82f6',
      warning: '#f59e0b',
      success: '#10b981',
    },
  },

  // Studio configuration
  studio: {
    components: {
      logo: () => {
        return (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px'
          }}>
            <span style={{ fontSize: '24px' }}>🎯</span>
            <span style={{
              fontWeight: 'bold',
              fontSize: '16px',
              color: '#2563eb'
            }}>
              Liga Deals
            </span>
          </div>
        )
      },
    },
  },

  // Document actions customization
  document: {
    actions: (prev, context) => {
      // Only show relevant actions
      return prev
    },

    // Production URL for preview
    productionUrl: async (prev, context) => {
      const { document } = context
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

      if (document._type === 'article' || document._type === 'post') {
        return `${baseUrl}/blog/${document.slug?.current}`
      }

      return prev
    },
  },
})
