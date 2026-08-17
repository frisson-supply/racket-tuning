import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import type { Locale } from './localized-path'

type Global = keyof Config['globals']

async function getGlobal<T extends Global>(slug: T, depth = 0, locale?: Locale) {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
    locale,
  })

  return global
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug + locale
 */
export const getCachedGlobal = <T extends Global>(slug: T, depth = 0, locale?: Locale) =>
  unstable_cache(async () => getGlobal<T>(slug, depth, locale), [slug, locale ?? 'nl'], {
    tags: [`global_${slug}_${locale ?? 'nl'}`],
  })
