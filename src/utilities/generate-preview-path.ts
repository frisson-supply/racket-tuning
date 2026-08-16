import { PreviewSearchParams } from '@/app/(app)/next/preview/route'
import { PayloadRequest, CollectionSlug } from 'payload'
import { localizedHref, type Locale } from '@/utilities/localized-path'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  pages: '',
  products: '/products',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug, req }: Props) => {
  if (slug === undefined || slug === null) {
    return null
  }

  // Encode to support slugs with special characters
  const encodedSlug = encodeURIComponent(slug)
  const locale: Locale = req.locale === 'en' ? 'en' : 'nl'

  const encodedParams = new URLSearchParams({
    path: localizedHref(locale, `${collectionPrefixMap[collection]}/${encodedSlug}`),
    previewSecret: process.env.PREVIEW_SECRET || '',
  } satisfies PreviewSearchParams)

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}
