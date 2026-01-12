import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'brief',
  title: 'brief',
  type: 'object',
  fields: [
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Текст описания',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'industry',
      title: 'Industry',
      type: 'string',
      description: 'К какой категории относится (Fashion)',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      description: 'Технологии при создании проекта',
      of: [
        {
          type: 'string'
        }
      ],
      options: {
        layout: 'array'
      }
    },
    {
      name: 'website',
      title: 'Website link',
      type: 'link',
      description: 'Ссылка на сайт проекта'
    },
  ],
})