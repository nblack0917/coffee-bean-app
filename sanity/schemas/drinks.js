import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'drinks',
  title: 'Drinks',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name of drink',
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
      title: 'Base Price of the Drink (small)',
      type: 'number',
    }),
    defineField({
      name: 'image',
      title: 'Image of the Dish',
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
      validation: (Rule) => Rule.max(2),
    }),
    defineField({
      name: 'addons',
      title: 'Add-ons',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'addons'}]}],
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
    defineField({
      name: 'type',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required(),
    }),
  ],
})
