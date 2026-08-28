import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'article',
  title: 'מאמרים (Articles)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'כותרת (Title)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleEn',
      title: 'כותרת באנגלית (Title — English)',
      description: 'תרגום אנגלי לכותרת. אם ריק, תוצג הכותרת בעברית.',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'כותב (Author)',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'mainImage',
      title: 'תמונה ראשית (Main Image)',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'טקסט חלופי (Alt Text)',
        },
      ],
    }),
    defineField({
      name: 'categories',
      title: 'קטגוריות (Categories)',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'תאריך פרסום (Published At)',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'תוכן (Body)',
      type: 'blockContent',
    }),
    defineField({
      name: 'excerpt',
      title: 'תקציר (Excerpt)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'excerptEn',
      title: 'תקציר באנגלית (Excerpt — English)',
      description: 'תרגום אנגלי לתקציר. אם ריק, יוצג התקציר בעברית.',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'featured',
      title: 'מאמר מומלץ (Featured)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
