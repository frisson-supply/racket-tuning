import { RenderBlocks } from '@/features/page-builder/blocks/render-blocks'
import { FlyoutPanel } from '@/components/flyout-panel/index.client'
import { FlyoutRedirect } from '@/components/flyout-panel/flyout-redirect.client'
import { RenderHero } from '@/features/page-builder/heros/render-hero'
import { getCachedGlobal } from '@/utilities/get-globals'
import { queryPageBySlug } from '@/utilities/query-page-by-slug'
import { notFound } from 'next/navigation'
import React from 'react'

import type { Header } from '@/payload-types'
import type { Locale } from '@/utilities/localized-path'

type Args = {
  params: Promise<{
    locale: Locale
    slug: string
  }>
}

export default async function FlyoutPage({ params }: Args) {
  const { locale, slug } = await params

  // /about has its own dedicated intercepting route + always-mounted AboutPanel;
  // bail out here so the two flyouts don't both try to animate at once.
  if (slug === 'about') return null

  const header: Header = await getCachedGlobal('header', 1, locale)()

  const isFlyoutEnabled = (header.navItems || []).some((item) => {
    return (
      item.enableFlyout &&
      item.link.type === 'reference' &&
      item.link.reference?.relationTo === 'pages' &&
      typeof item.link.reference.value === 'object' &&
      item.link.reference.value.slug === slug
    )
  })

  if (!isFlyoutEnabled) {
    return <FlyoutRedirect slug={slug} />
  }

  const page = await queryPageBySlug({ slug, locale })

  if (!page) {
    return notFound()
  }

  const { hero, layout } = page

  return (
    <FlyoutPanel>
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </FlyoutPanel>
  )
}
