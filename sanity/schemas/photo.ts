import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'photo',
  title: 'תמונות (Photos)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'כותרת (Title)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'תמונה (Image)',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'כיתוב (Caption)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'category',
      title: 'קטגוריה (Category)',
      type: 'reference',
      to: { type: 'category' },
    }),
    defineField({
      name: 'date',
      title: 'תאריך (Date)',
      type: 'datetime',
    }),
    defineField({
      name: 'featured',
      title: 'תמונה מומלצת (Featured)',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      subtitle: 'caption',
    },
  },
})
