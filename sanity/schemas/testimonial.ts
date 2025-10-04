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
      name: 'featured',
      title: 'מומלץ (Featured)',
      type: 'boolean',
      initialValue: false,
      description: 'Featured testimonials appear on the homepage',
    }),
    // Workflow fields
    defineField({
      name: 'status',
      title: 'סטטוס (Status)',
      type: 'string',
      initialValue: 'pending',
      options: {
        list: [
          { title: '⏳ ממתין לאישור (Pending)', value: 'pending' },
          { title: '✅ אושר (Approved)', value: 'approved' },
          { title: '❌ נדחה (Rejected)', value: 'rejected' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'reviewedBy',
      title: 'נבדק על ידי (Reviewed By)',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'reviewedAt',
      title: 'תאריך בדיקה (Reviewed At)',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'reviewNotes',
      title: 'הערות בדיקה (Review Notes)',
      type: 'text',
      rows: 3,
      description: 'Internal notes about the review decision',
    }),
  ],
  preview: {
    select: {
      title: 'customerName',
      subtitle: 'review',
      media: 'photo',
      rating: 'rating',
      status: 'status',
    },
    prepare(selection) {
      const { title, subtitle, media, rating, status } = selection
      const stars = '⭐'.repeat(rating || 0)
      const statusEmoji = status === 'approved' ? '✅' : status === 'rejected' ? '❌' : '⏳'
      return {
        title: `${statusEmoji} ${title} - ${stars}`,
        subtitle: subtitle,
        media: media,
      }
    },
  },
})
