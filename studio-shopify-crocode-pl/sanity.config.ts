import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/schemaTypes'
import { documentInternationalization } from '@sanity/document-internationalization'
import {structure} from './src/structure'

export default defineConfig({
  name: 'default',
  title: 'Shopify crocode',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  plugins: [
    structureTool({
      structure,
    }), 
    visionTool(), 
  ],

  schema: {
    types: schemaTypes,
  },
})
