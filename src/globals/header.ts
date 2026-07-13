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
          name: 'enableFlyout',
          type: 'checkbox',
          admin: {
            condition: (_, siblingData) => siblingData?.link?.type === 'reference',
            description:
              'When checked, clicking this link opens the page in a flyout overlay instead of navigating away. The page remains reachable at its normal URL.',
          },
          defaultValue: false,
          label: 'Open in flyout overlay instead of navigating',
        },
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
