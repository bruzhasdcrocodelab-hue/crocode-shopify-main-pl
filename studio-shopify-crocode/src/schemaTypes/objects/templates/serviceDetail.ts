import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'serviceDetail',
  type: 'object',
  title: 'Service Detail',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Detail Title',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'text',
      type: 'text',
      title: 'Detail Text',
      description: 'Use empty line to separate paragraphs. Start line with "* " for bullet points. Use "## " for h2 and "### " for h3 headings.',
      validation: (Rule) => Rule.required()
    })
  ]
});
