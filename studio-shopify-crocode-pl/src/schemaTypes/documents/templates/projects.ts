import { DocumentsIcon } from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'projects',
  title: 'Projects',
  type: 'document',
  icon: DocumentsIcon,
  preview: {
    select: {
      title: 'title',
      subtitle: 'language',
      media: 'coverImage.image'
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
      description: 'Название проекта',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Client',
      name: 'client',
      type: 'string',
      description: 'Название заказчика или оргинизации',
    }),
    defineField({
      title: 'Work Done',
      name: 'workDone',
      type: 'string',
      description: 'Краткое описание проделанной работы (Shopify Custom Theme Design & Development)',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Название ссылки проекта',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      description: 'В какой теме отображать hero и header',
      options: {
        list: [
          { title: 'light', value: 'light' },
          { title: 'dark', value: 'dark' },
        ]
      },
      initialValue: 'light',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      description: "К какой категории относится проект",
      type: 'reference',
      to: [{ type: 'projectCategories' }],
      options: {
        filter: ({ document }) => {
          if (!document?.language) {
            return { filter: '' } // Пока не выбран язык
          }
          
          return {
            filter: 'language == $lang',
            params: { lang: document.language }
          }
        }
      }
    }),
    defineField({
      title: 'Card Image',
      name: 'cardImage',
      type: 'imageWithAlt',
      description: 'Изображение для карточки',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Hero images',
      name: 'coverImage',
      type: 'bigAndSmallImages',
      description: 'Изображения для главной страницы'
    }),
    defineField({
      title: 'Brief',
      name: 'brief',
      type: 'brief',
      description: 'Краткое описание проекта'
    }),
    defineField({
      title: 'Gallery',
      name: 'gallery',
      type: 'bigAndSmallImages',
      description: 'Изображения для галереи'
    }),
    defineField({
      title: 'Solution',
      name: 'solution',
      type: 'solution',
      description: 'Описани выполненой работы',
    }),
    defineField({
      title: 'Status',
      name: 'status',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'seo',
      type: 'seo',
    }),
  ],
})