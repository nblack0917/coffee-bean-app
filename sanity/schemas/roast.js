import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'roast',
  title: 'Roast',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Strength of roast',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
