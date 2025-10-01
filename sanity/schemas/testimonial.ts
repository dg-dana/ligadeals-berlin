import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'המלצות לקוחות (Testimonials)',
  type: 'document',
  fields: [
    defineField({
      name: 'customerName',
      title: 'שם הלקוח (Customer Name)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'דירוג (Rating)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
      options: {
        list: [
          { title: '⭐', value: 1 },
          { title: '⭐⭐', value: 2 },
          { title: '⭐⭐⭐', value: 3 },
          { title: '⭐⭐⭐⭐', value: 4 },
          { title: '⭐⭐⭐⭐⭐', value: 5 },
        ],
      },
    }),
    defineField({
      name: 'review',
      title: 'ביקורת (Review)',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tripType',
      title: 'סוג הטיול (Trip Type)',
      type: 'string',
      options: {
        list: [
          { title: 'סיור בעיר', value: 'city-tour' },
          { title: 'מסעדות', value: 'restaurants' },
          { title: 'חיי לילה', value: 'nightlife' },
          { title: 'תרבות ואומנות', value: 'culture' },
          { title: 'אחר', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'date',
      title: 'תאריך (Date)',
      type: 'datetime',
    }),
    defineField({
      name: 'photo',
      title: 'תמונה (Photo)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'approved',
      title: 'אושר (Approved)',
      type: 'boolean',
      initialValue: false,
      description: 'Only approved testimonials will be shown on the website',
    }),
  ],
  preview: {
    select: {
      title: 'customerName',
      subtitle: 'review',
      media: 'photo',
      rating: 'rating',
    },
    prepare(selection) {
      const { title, subtitle, media, rating } = selection
      const stars = '⭐'.repeat(rating || 0)
      return {
        title: `${title} - ${stars}`,
        subtitle: subtitle,
        media: media,
      }
    },
  },
})
