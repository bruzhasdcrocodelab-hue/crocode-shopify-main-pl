import { DocumentsIcon } from "@sanity/icons";
import {defineField, defineType} from 'sanity'

export default defineType({
  name: "serviceCategories",
  type: "document",
  title: "Service Categories",
  icon: DocumentsIcon,
  preview: {
    select: {
      title: "categoryName",
      subtitle: "language"
    }
  },
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      description: 'Language for this category',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'Polish', value: 'pl' },
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: "Category Name",
      name: "categoryName",
      description: "Display name of the service category",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: "Slug",
      name: "slug",
      type: "slug",
      description: "URL-friendly category identifier",
      options: {
        source: 'categoryName',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: "Description",
      name: "description",
      description: "Brief description of the category. Use \\n\\n to separate paragraphs.",
      type: "text",
    }),
    defineField({
      title: "Text",
      name: "text",
      description: "Brief text of the category. Use empty line to separate paragraphs. Start line with \"* \" for bullet points. Use \"## \" for h2 and \"### \" for h3 headings.",
      type: "text",
    }),
    defineField({
      title: "Category Image",
      name: "categoryImage",
      description: "Image displayed for this category",
      type: "imageWithAlt",
    }),
    defineField({
      title: "Order",
      name: "order",
      description: "Display order in dropdown (lower numbers first)",
      type: "number",
      initialValue: 0,
    }),
  ],
});
