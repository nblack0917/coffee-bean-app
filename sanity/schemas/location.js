import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'location',
  title: 'Location',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name of Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
