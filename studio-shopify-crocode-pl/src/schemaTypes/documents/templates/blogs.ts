import { DocumentsIcon } from "@sanity/icons";
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blogs',
  title: 'Blogs',
  type: 'document',
  icon: DocumentsIcon,
  preview: {
    select: {
      title: 'title',
      subtitle: 'language',
    },
  },
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      description: 'На каком языке отображать проект',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'Polish', value: 'pl' },
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'Название статьи',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Customer',
      name: 'customer',
      type: 'string',
      description: 'Заказчик',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Gallery',
      name: 'gallery',
      type: 'gallery',
      description: 'Изображениея для галереи'
    }),
    defineField({
      title: 'Status',
      name: 'status',
      type: 'string',
      hidden: true,
    }),
    defineField({
      title: 'Content',
      name: 'content',
      description: 'Текст блога',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
          },
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'H5', value: 'h5'},
            {title: 'H6', value: 'h6'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
        },
        {
          type: 'image',
        },
      ],
    }),
    defineField({
      name: 'seo',
      type: 'seo',
    }),
  ],
})