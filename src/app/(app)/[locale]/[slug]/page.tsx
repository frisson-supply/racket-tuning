import type { Metadata } from 'next'

import { RenderBlocks } from '@/features/page-builder/blocks/render-blocks'
import { RenderHero } from '@/features/page-builder/heros/render-hero'
import { generateMeta } from '@/utilities/generate-meta'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { homeStaticData } from '@/endpoints/seed/home-static'
import React from 'react'

import type { Page } from '@/payload-types'
import { notFound } from 'next/navigation'
import styles from '../pages.module.css'
import { queryPageBySlug } from '@/utilities/query-page-by-slug'
import { type Locale, locales } from '@/utilities/localized-path'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const results = await Promise.all(
    locales.map((locale) =>
      payload.find({
        collection: 'pages',
        draft: false,
        limit: 1000,
        locale,
        overrideAccess: false,
        pagination: false,
        select: {
          slug: true,
        },
      }),
    ),
  )

  return results.flatMap((result, i) =>
    result.docs
      ?.filter((doc) => doc.slug !== 'home')
      .map(({ slug }) => ({ locale: locales[i], slug })),
  )
}

type Args = {
  params: Promise<{
    locale: string
    slug?: string
  }>
}

export default async function Page({ params }: Args) {
  const { locale, slug = 'home' } = await params
  const url = '/' + slug

  // Pages render in parallel with the layout, so the layout's locale guard does
  // not stop this query from running with a bogus segment (e.g. `/favicon.svg`).
  if (!locales.includes(locale as Locale)) return notFound()

  let page: Page | null = await queryPageBySlug({
    slug,
    locale: locale as Locale,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStaticData() as Page
  }

  if (!page) {
    return notFound()
  }

  const { hero, layout } = page

  return (
    <article className={styles.article}>
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale, slug = 'home' } = await params

  if (!locales.includes(locale as Locale)) return {}

  const page = await queryPageBySlug({
    slug,
    locale: locale as Locale,
  })

  return generateMeta({ doc: page })
}
