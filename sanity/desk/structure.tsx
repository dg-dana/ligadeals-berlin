import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('תוכן')
    .id('root')
    .items([
      // Articles
      S.documentTypeListItem('article').title('מאמרים (Articles)').icon(() => '📝'),

      S.divider(),

      // Blog Posts
      S.documentTypeListItem('post').title('פוסטים (Posts)').icon(() => '📄'),

      S.divider(),

      // Photos
      S.documentTypeListItem('photo').title('תמונות (Photos)').icon(() => '📷'),

      S.divider(),

      // Videos
      S.documentTypeListItem('video').title('סרטונים (Videos)').icon(() => '🎥'),

      S.divider(),

      // Testimonials
      S.documentTypeListItem('testimonial').title('המלצות (Testimonials)').icon(() => '💬'),

      S.divider(),

      // Categories
      S.documentTypeListItem('category').title('קטגוריות (Categories)').icon(() => '🏷️'),

      S.divider(),

      // Authors
      S.documentTypeListItem('author').title('כותבים (Authors)').icon(() => '👤'),

      S.divider(),

      // Settings
      S.listItem()
        .title('הגדרות (Settings)')
        .id('settings')
        .icon(() => '⚙️')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
    ])
