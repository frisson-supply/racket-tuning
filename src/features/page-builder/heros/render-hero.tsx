import React from 'react'

import type { Page } from '@/payload-types'

import { HighImpactHero } from '@/features/page-builder/heros/high-impact'
import { LowImpactHero } from '@/features/page-builder/heros/low-impact'
import { MediumImpactHero } from '@/features/page-builder/heros/medium-impact'

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
