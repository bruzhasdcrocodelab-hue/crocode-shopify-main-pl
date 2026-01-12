import { DocumentsIcon } from "@sanity/icons";
import {defineField, defineType} from 'sanity'

export default defineType({
  name: "projectCategories",
  type: "document",
  title: "Project Categories",
  icon: DocumentsIcon,
  preview: {
    select: {
      title: "categoryName",
      subtitle: "description"
    }
  },
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      description: 'К какому языку относится категория',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'Polish', value: 'pl' },
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: "Category name",
      name: "categoryName",
      description: "Название категории",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: "Description",
      name: "description",
      description: "Пояснение или перевод названия",
      type: "string",
    }),
  ],
});
