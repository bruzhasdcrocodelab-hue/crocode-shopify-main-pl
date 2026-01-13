import { DocumentsIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'services',
  title: 'Services',
  type: 'document',
  icon: DocumentsIcon,
  preview: {
    select: {
      title: 'title',
      subtitle: 'language',
      media: 'heroImage.image'
    },
  },
  fields: [
    // Language field (required)
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      description: 'Language for this service',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'Polish', value: 'pl' },
        ]
      },
      validation: (Rule) => Rule.required()
    }),

    // Category reference (filtered by language)
    defineField({
      name: 'category',
      title: 'Service Category',
      description: "Category this service belongs to",
      type: 'reference',
      to: [{ type: 'serviceCategories' }],
      options: {
        filter: ({ document }) => {
          if (!document?.language) {
            return { filter: '' }
          }
          return {
            filter: 'language == $lang',
            params: { lang: document.language }
          }
        }
      },
      validation: (Rule) => Rule.required()
    }),

    // Basic Info
    defineField({
      title: 'Service Title',
      name: 'title',
      type: 'string',
      description: 'Main H1 title for the service page (REQUIRED - populate initially)',
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL slug for service (e.g., shopify-plus-development)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required()
    }),

    defineField({
      title: 'Order',
      name: 'order',
      description: 'Display order within category (lower numbers first)',
      type: 'number',
      initialValue: 0,
    }),

    // Hero Section
    defineField({
      title: 'Hero Subtitle',
      name: 'heroSubtitle',
      type: 'text',
      description: 'Subtitle text shown in hero section',
    }),

    defineField({
      title: 'Hero Background Image',
      name: 'heroImage',
      type: 'imageWithAlt',
      description: 'Background image for hero section (optional, defaults to standard)',
    }),

    // Service Description Section (~100 words - INITIALLY POPULATE)
    defineField({
      title: 'Description Title',
      name: 'descriptionTitle',
      type: 'string',
      description: 'H2 title for description section',
    }),

    defineField({
      title: 'Description Text',
      name: 'descriptionText',
      type: 'text',
      description: 'Main description text (~100 words - REQUIRED - populate initially). Use empty line to separate paragraphs. Start line with "* " for bullet points. Use "## " for h2 and "### " for h3 headings.',
      validation: (Rule) => Rule.required()
    }),

    // Why Shopify Section
    defineField({
      title: 'Why Shopify Title',
      name: 'whyShopifyTitle',
      type: 'string',
      description: 'Title for "Why Shopify" section',
    }),

    defineField({
      title: 'Why Shopify Text',
      name: 'whyShopifyText',
      type: 'text',
      description: 'Main text for "Why Shopify" section. Use empty line to separate paragraphs. Start line with "* " for bullet points. Use "## " for h2 and "### " for h3 headings.',
    }),

    // Offers
    defineField({
      title: 'Offers',
      name: 'offers',
      type: 'array',
      description: 'Offer cards shown in dark section (flexible number)',
      of: [{ type: 'serviceOffer' }],
    }),

    defineField({
      title: 'Why Shopify Final Text',
      name: 'whyShopifyFinalText',
      type: 'text',
      description: 'Final text shown after offers in "Why Shopify" section. Use empty line to separate paragraphs. Start line with "* " for bullet points. Use "## " for h2 and "### " for h3 headings.',
    }),

    // Service Details Section
    defineField({
      title: 'Details',
      name: 'details',
      type: 'array',
      description: 'Service detail blocks (flexible number of title + text sections)',
      of: [{ type: 'serviceDetail' }],
    }),

    // Video Section
    defineField({
      title: 'Video Title',
      name: 'videoTitle',
      type: 'string',
      description: 'Title for video section',
    }),

    defineField({
      title: 'Video URL',
      name: 'videoUrl',
      type: 'url',
      description: 'YouTube or video URL',
    }),

    // SEO
    defineField({
      name: 'seo',
      type: 'seo',
    }),
  ],
});
