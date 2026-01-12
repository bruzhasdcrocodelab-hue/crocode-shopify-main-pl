import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'serviceOffer',
  type: 'object',
  title: 'Service Offer',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Offer Title',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'text',
      type: 'text',
      title: 'Offer Text',
      description: 'Use __ to mark underlined text (e.g., "__underlined text__"). Use empty line to separate paragraphs. Start line with "* " for bullet points. Use "## " for h2 and "### " for h3 headings.',
      validation: (Rule) => Rule.required()
    })
  ]
});
