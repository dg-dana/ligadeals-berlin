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
      name: 'videoFile',
      title: 'קובץ וידאו (Video File)',
      type: 'file',
      options: {
        accept: 'video/mp4,video/webm,video/ogg,video/quicktime',
      },
      validation: (Rule) => Rule.required().error('Video file is required'),
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
