import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'addons',
  title: 'Add-ons',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name of Size',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price to Add On',
      type: 'number',
    }),
  ],
})
