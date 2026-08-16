import { getCachedGlobal } from '@/utilities/get-globals'
import type { Locale } from '@/utilities/localized-path'

import { AboutPanelClient } from './index.client'

export async function AboutPanel({ locale }: { locale: Locale }) {
  const about = await getCachedGlobal('about', 0, locale)()

  return <AboutPanelClient {...about} />
}
