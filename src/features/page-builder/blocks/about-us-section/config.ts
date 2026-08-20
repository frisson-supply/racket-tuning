import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

export const AboutUsSection: Block = {
  slug: 'aboutUsSection',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      localized: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
      localized: true,
    },
    {
      name: 'aboutCardTitle',
      type: 'text',
      defaultValue: 'About us',
      label: 'Card title',
      localized: true,
    },
    {
      name: 'aboutCardDescription',
      type: 'textarea',
      label: 'Card description',
      localized: true,
    },
    link({ appearances: false, overrides: { name: 'aboutCardLink' } }),
    {
      name: 'cardsTitle',
      type: 'text',
      admin: {
        description: 'Shown above the cards on mobile, alongside the carousel arrows.',
      },
      label: 'Cards title (mobile)',
      localized: true,
    },
    {
      name: 'cards',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          label: 'Image',
          relationTo: 'media',
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        link({ appearances: false, overrides: { name: 'link' } }),
      ],
      maxRows: 4,
      minRows: 2,
    },
  ],
  interfaceName: 'AboutUsSectionBlock',
  labels: {
    plural: 'About Us / Services Sections',
    singular: 'About Us / Services Section',
  },
}
