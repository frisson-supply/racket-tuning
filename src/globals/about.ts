import type { GlobalConfig } from 'payload'

import { adminOnly } from '@/access/admin-only'
import { revalidateGlobal } from './hooks/revalidate-global'

export const About: GlobalConfig = {
  slug: 'about',
  access: {
    read: () => true,
    update: adminOnly,
  },
  hooks: {
    afterChange: [revalidateGlobal],
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'About',
    },
    {
      name: 'body',
      type: 'textarea',
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
      maxRows: 6,
    },
    {
      name: 'contactEmail',
      type: 'email',
    },
  ],
}
