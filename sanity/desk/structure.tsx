import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('תוכן')
    .items([
      // Blog Posts Section
      S.listItem()
        .title('מאמרים')
        .icon(() => '📝')
        .child(
          S.list()
            .title('מאמרים')
            .items([
              S.listItem()
                .title('כל המאמרים')
                .child(
                  S.documentTypeList('post')
                    .title('כל המאמרים')
                ),
              S.divider(),
              S.listItem()
                .title('מאמרים מפורסמים')
                .child(
                  S.documentTypeList('post')
                    .title('מאמרים מפורסמים')
                    .filter('_type == "post" && !(_id in path("drafts.**"))')
                ),
              S.listItem()
                .title('טיוטות')
                .child(
                  S.documentTypeList('post')
                    .title('טיוטות')
                    .filter('_type == "post" && _id in path("drafts.**")')
                ),
              S.divider(),
              S.listItem()
                .title('לפי קטגוריה')
                .child(
                  S.documentTypeList('category')
                    .title('קטגוריות')
                    .child((categoryId) =>
                      S.documentList()
                        .title('מאמרים')
                        .filter('_type == "post" && $categoryId in categories[]._ref')
                        .params({categoryId})
                    )
                ),
            ])
        ),

      S.divider(),

      // Categories
      S.listItem()
        .title('קטגוריות')
        .icon(() => '🏷️')
        .child(
          S.documentTypeList('category')
            .title('קטגוריות')
        ),

      S.divider(),

      // Authors
      S.listItem()
        .title('כותבים')
        .icon(() => '👤')
        .child(
          S.documentTypeList('author')
            .title('כותבים')
        ),

      S.divider(),

      // Galleries Section
      S.listItem()
        .title('גלריות')
        .icon(() => '🖼️')
        .child(
          S.list()
            .title('גלריות')
            .items([
              S.listItem()
                .title('גלריית תמונות')
                .icon(() => '📷')
                .child(
                  S.documentTypeList('photoGallery')
                    .title('גלריית תמונות')
                ),
              S.listItem()
                .title('גלריית וידאו')
                .icon(() => '🎥')
                .child(
                  S.documentTypeList('videoGallery')
                    .title('גלריית וידאו')
                ),
            ])
        ),

      S.divider(),

      // Testimonials with workflow
      S.listItem()
        .title('המלצות')
        .icon(() => '💬')
        .child(
          S.list()
            .title('המלצות')
            .items([
              S.listItem()
                .title('כל ההמלצות')
                .child(
                  S.documentTypeList('testimonial')
                    .title('כל ההמלצות')
                ),
              S.divider(),
              // Workflow sections
              S.listItem()
                .title('⏳ ממתינות לאישור')
                .child(
                  S.documentTypeList('testimonial')
                    .title('ממתינות לאישור')
                    .filter('_type == "testimonial" && status == "pending"')
                ),
              S.listItem()
                .title('✅ אושרו')
                .child(
                  S.documentTypeList('testimonial')
                    .title('אושרו')
                    .filter('_type == "testimonial" && status == "approved"')
                ),
              S.listItem()
                .title('❌ נדחו')
                .child(
                  S.documentTypeList('testimonial')
                    .title('נדחו')
                    .filter('_type == "testimonial" && status == "rejected"')
                ),
              S.divider(),
              // Featured section
              S.listItem()
                .title('⭐ המלצות מומלצות (דף הבית)')
                .child(
                  S.documentTypeList('testimonial')
                    .title('המלצות מומלצות')
                    .filter('_type == "testimonial" && featured == true && status == "approved"')
                ),
            ])
        ),

      S.divider(),

      // Settings Section
      S.listItem()
        .title('הגדרות')
        .icon(() => '⚙️')
        .child(
          S.list()
            .title('הגדרות')
            .items([
              S.listItem()
                .title('הגדרות כלליות')
                .icon(() => '🌐')
                .child(
                  S.document()
                    .schemaType('settings')
                    .documentId('settings')
                    .title('הגדרות כלליות')
                ),
              S.listItem()
                .title('הגדרות SEO')
                .icon(() => '🔍')
                .child(
                  S.document()
                    .schemaType('seoSettings')
                    .documentId('seoSettings')
                    .title('הגדרות SEO')
                ),
            ])
        ),

      S.divider(),

      // Help Documentation
      S.listItem()
        .title('עזרה ותיעוד')
        .icon(() => '❓')
        .child(
          S.component()
            .component(() => {
              return (
                <div style={{padding: '2rem', direction: 'rtl', fontFamily: 'system-ui'}}>
                  <h2>עזרה ותיעוד</h2>
                  <p>למדריכים מפורטים, ראה את התיקייה <code>/sanity/docs/</code></p>
                  <ul>
                    <li><a href="/sanity/docs/adding-articles.md">כיצד להוסיף מאמרים</a></li>
                    <li><a href="/sanity/docs/managing-galleries.md">ניהול גלריות</a></li>
                    <li><a href="/sanity/docs/testimonials.md">ניהול המלצות</a></li>
                    <li><a href="/sanity/docs/troubleshooting.md">פתרון בעיות נפוצות</a></li>
                  </ul>
                </div>
              )
            })
        ),
    ])
