import type { GlobalConfig } from 'payload'

import { adminOnly } from '@/access/admin-only'
import { link } from '@/fields/link'

import { revalidateGlobal } from './hooks/revalidate-global'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
    update: adminOnly,
  },
  hooks: {
    afterChange: [revalidateGlobal],
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
        {
          name: 'children',
          type: 'array',
          fields: [
            link({
              appearances: false,
            }),
            {
              name: 'image',
              type: 'upload',
              admin: {
                description:
                  'Optional. If set, this item renders as an image card in the dropdown.',
              },
              relationTo: 'media',
            },
          ],
          maxRows: 6,
        },
      ],
      maxRows: 6,
    },
  ],
}
