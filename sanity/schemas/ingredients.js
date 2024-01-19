import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'ingredients',
  title: 'Ingredients',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name of ingredient',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
