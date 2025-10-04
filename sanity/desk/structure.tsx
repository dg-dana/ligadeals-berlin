import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('תוכן')
    .id('root')
    .items([
      // Blog Posts Section
      S.documentTypeListItem('post').title('מאמרים').icon(() => '📝'),

      S.divider(),

      // Categories
      S.documentTypeListItem('category').title('קטגוריות').icon(() => '🏷️'),

      S.divider(),

      // Authors
      S.documentTypeListItem('author').title('כותבים').icon(() => '👤'),

      S.divider(),

      // Photos
      S.documentTypeListItem('photo').title('תמונות').icon(() => '📷'),

      S.divider(),

      // Videos
      S.documentTypeListItem('video').title('סרטונים').icon(() => '🎥'),

      S.divider(),

      // Testimonials
      S.documentTypeListItem('testimonial').title('המלצות').icon(() => '💬'),

      S.divider(),

      // Settings
      S.listItem()
        .title('הגדרות')
        .id('settings')
        .icon(() => '⚙️')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
    ])
