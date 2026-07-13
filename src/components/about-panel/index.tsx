import { getCachedGlobal } from '@/utilities/get-globals'

import { AboutPanelClient } from './index.client'

export async function AboutPanel() {
  const about = await getCachedGlobal('about', 0)()

  return <AboutPanelClient {...about} />
}
