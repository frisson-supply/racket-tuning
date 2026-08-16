import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

export const queryPageBySlug = async ({ slug, locale }: { slug: string; locale: 'nl' | 'en' }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    fallbackLocale: false,
    limit: 1,
    locale,
    overrideAccess: draft,
    pagination: false,
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        ...(draft ? [] : [{ _status: { equals: 'published' } }]),
      ],
    },
  })

  return result.docs?.[0] || null
}
