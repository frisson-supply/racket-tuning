import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Page } from '../../../payload-types'
import { type Locale, locales, localizedHref } from '../../../utilities/localized-path'

const pathForSlug = (locale: Locale, slug?: string | null) =>
  localizedHref(locale, slug === 'home' || !slug ? '/' : `/${slug}`)

export const revalidatePage: CollectionAfterChangeHook<Page> = async ({
  doc,
  previousDoc,
  req,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      for (const locale of locales) {
        // `req` keeps this inside the current transaction, otherwise a freshly
        // created doc is not visible yet and findByID throws a 404.
        const localizedDoc = await payload.findByID({
          collection: 'pages',
          id: doc.id,
          locale,
          req,
        })
        const path = pathForSlug(locale, localizedDoc.slug)

        payload.logger.info(`Revalidating page at path: ${path}`)

        revalidatePath(path)
      }
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      for (const locale of locales) {
        const oldPath = pathForSlug(locale, previousDoc.slug)

        payload.logger.info(`Revalidating old page at path: ${oldPath}`)

        revalidatePath(oldPath)
      }
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    for (const locale of locales) {
      revalidatePath(pathForSlug(locale, doc?.slug))
    }
  }

  return doc
}
