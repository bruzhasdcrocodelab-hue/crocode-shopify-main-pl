import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'bigAndSmallImages',
  title: 'images',
  type: 'object',
  fields: [
    defineField({
      name: 'imageDesktop',
      title: 'Desktop',
      type: 'image',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'imageMobile',
      title: 'Mobile',
      type: 'image',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
  ],
})