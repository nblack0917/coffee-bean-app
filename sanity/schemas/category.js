import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Drink Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Category name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: 'drinks',
    //   title: 'Drinks',
    //   type: 'array',
    //   of: [{type: 'reference', to: [{type: 'drinks'}]}],
    // }),
  ],
})
