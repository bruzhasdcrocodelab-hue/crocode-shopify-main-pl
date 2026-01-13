import {defineType} from 'sanity'

export default defineType({
  name: 'solution',
  title: 'Solution',
  type: 'object',
  fields: [
    {
      name: 'solutionText',
      title: 'Text',
      type: 'text',
      validation: (Rule: any) => Rule.required()
    },
    {
      title: 'Project screenshot',
      name: 'projectScreenshot',
      type: 'imageWithAlt',
      description: 'Скриншот сайта'
    },
  ],
})