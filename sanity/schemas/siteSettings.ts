import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'הגדרות אתר (Site Settings)',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'שם האתר (Site Name)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'תיאור (Description)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'לוגו (Logo)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'email',
      title: 'אימייל (Email)',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'טלפון (Phone)',
      type: 'string',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'string',
      description: 'Phone number with country code, e.g., +491234567890',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'url',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook',
      type: 'url',
    }),
    defineField({
      name: 'twitter',
      title: 'Twitter/X',
      type: 'url',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
    }),
    defineField({
      name: 'aboutText',
      title: 'טקסט אודות (About Text)',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
      subtitle: 'description',
      media: 'logo',
    },
  },
})
