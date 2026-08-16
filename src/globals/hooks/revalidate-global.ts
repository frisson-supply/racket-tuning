import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateGlobal: GlobalAfterChangeHook = ({
  doc,
  global,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating global: ${global.slug}`)

    for (const locale of ['nl', 'en'] as const) {
      revalidateTag(`global_${global.slug}_${locale}`, 'max')
    }
  }

  return doc
}
