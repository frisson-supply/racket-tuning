import { getCachedGlobal } from '@/utilities/get-globals'
import type { Locale } from '@/utilities/localized-path'

import { HeaderClient } from './index.client'

export async function Header({ locale }: { locale: Locale }) {
  const header = await getCachedGlobal('header', 1, locale)()

  return <HeaderClient header={header} />
}
