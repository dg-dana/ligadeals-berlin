import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'video',
  title: 'סרטונים (Videos)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'כותרת (Title)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'קישור לסרטון (Video URL)',
      type: 'url',
      description: 'YouTube or Vimeo URL',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'תמונת תצוגה מקדימה (Thumbnail)',
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
      name: 'description',
      title: 'תיאור (Description)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'category',
      title: 'קטגוריה (Category)',
      type: 'reference',
      to: { type: 'category' },
    }),
    defineField({
      name: 'duration',
      title: 'משך הסרטון (Duration)',
      type: 'string',
      description: 'e.g., "5:30"',
    }),
    defineField({
      name: 'publishedAt',
      title: 'תאריך פרסום (Published At)',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'thumbnail',
      subtitle: 'duration',
    },
  },
})
