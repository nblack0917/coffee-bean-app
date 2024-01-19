import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'sizes',
  title: 'Sizes',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name of Size',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
