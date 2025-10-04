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
      name: 'videoType',
      title: 'סוג הסרטון (Video Type)',
      type: 'string',
      options: {
        list: [
          { title: 'קובץ וידאו (Upload File)', value: 'file' },
          { title: 'YouTube/Vimeo', value: 'url' },
        ],
        layout: 'radio',
      },
      initialValue: 'file',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoFile',
      title: 'קובץ וידאו (Video File)',
      type: 'file',
      options: {
        accept: 'video/mp4,video/webm,video/ogg',
      },
      hidden: ({ parent }) => parent?.videoType !== 'file',
      validation: (Rule) => Rule.custom((file, context) => {
        const parent = context.parent as any
        if (parent?.videoType === 'file' && !file) {
          return 'Video file is required when video type is "file"'
        }
        return true
      }),
    }),
    defineField({
      name: 'videoUrl',
      title: 'קישור לסרטון (Video URL)',
      type: 'url',
      description: 'YouTube or Vimeo URL',
      hidden: ({ parent }) => parent?.videoType !== 'url',
      validation: (Rule) => Rule.custom((url, context) => {
        const parent = context.parent as any
        if (parent?.videoType === 'url' && !url) {
          return 'Video URL is required when video type is "url"'
        }
        return true
      }),
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
