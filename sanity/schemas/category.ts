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
      name: 'titleEn',
      title: 'כותרת באנגלית (Title — English)',
      description: 'תרגום אנגלי לשם הקטגוריה. אם ריק, יוצג השם בעברית.',
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
    }),
    defineField({
      name: 'description',
      title: 'תיאור (Description)',
      type: 'text',
    }),
  ],
})
