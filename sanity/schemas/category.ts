import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'category',
  title: 'קטגוריות (Categories)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'כותרת (Title)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      title: 'תיאור (Description)',
      type: 'text',
    }),
  ],
})
