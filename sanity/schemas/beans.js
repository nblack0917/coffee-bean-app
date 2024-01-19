import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'beans',
  title: 'Beans',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name of bean',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtext',
      title: 'subtext of drink',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (Rule) => Rule.max(400),
    }),
    defineField({
      name: 'price',
      title: 'Price per pound of beans',
      type: 'number',
    }),
    defineField({
      name: 'image',
      title: 'Image of the Beans',
      type: 'image',
    }),
    defineField({
      name: 'sizes',
      title: 'Sizes Available',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'sizes'}]}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'ingredients'}]}],
      validation: (Rule) => Rule.max(1),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'location'}]}],
      validation: (Rule) => Rule.max(1),
    }),
    defineField({
      name: 'roast',
      title: 'Roast',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'roast'}]}],
      validation: (Rule) => Rule.max(1),
    }),
    defineField({
      name: 'rating',
      title: 'Enter a Rating from (1-5 Stars)',
      type: 'number',
      validation: (Rule) =>
        Rule.required().min(1).max(5).error('Please ender a Value between 1 and 5'),
    }),
  ],
})
