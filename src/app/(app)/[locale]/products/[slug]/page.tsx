import type { Media, Product } from '@/payload-types'

import { RenderBlocks } from '@/features/page-builder/blocks/render-blocks'
import { GridTileImage } from '@/components/common/grid/tile'
import { Gallery } from '@/features/product/gallery'
import { ProductDescription } from '@/features/product/product-description'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeftIcon } from 'lucide-react'
import { Metadata } from 'next'
import styles from '../product.module.css'
import { localizedHref, type Locale } from '@/utilities/localized-path'
import { t } from '@/utilities/i18n'

type Args = {
  params: Promise<{
    locale: Locale
    slug: string
  }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale, slug } = await params
  const product = await queryProductBySlug({ slug, locale })

  if (!product) return notFound()

  const gallery = product.gallery?.filter((item) => typeof item.image === 'object') || []

  const metaImage = typeof product.meta?.image === 'object' ? product.meta?.image : undefined
  const canIndex = product._status === 'published'

  const seoImage = metaImage || (gallery.length ? (gallery[0]?.image as Media) : undefined)

  return {
    description: product.meta?.description || '',
    openGraph: seoImage?.url
      ? {
          images: [
            {
              alt: seoImage?.alt,
              height: seoImage.height!,
              url: seoImage?.url,
              width: seoImage.width!,
            },
          ],
        }
      : null,
    robots: {
      follow: canIndex,
      googleBot: {
        follow: canIndex,
        index: canIndex,
      },
      index: canIndex,
    },
    title: product.meta?.title || product.title,
  }
}

export default async function ProductPage({ params }: Args) {
  const { locale, slug } = await params
  const product = await queryProductBySlug({ slug, locale })

  if (!product) return notFound()

  const gallery =
    product.gallery
      ?.filter((item) => typeof item.image === 'object')
      .map((item) => ({
        ...item,
        image: item.image as Media,
      })) || []

  const metaImage = typeof product.meta?.image === 'object' ? product.meta?.image : undefined
  const hasStock = product.enableVariants
    ? product?.variants?.docs?.some((variant) => {
        if (typeof variant !== 'object') return false
        return variant.inventory && variant?.inventory > 0
      })
    : product.inventory! > 0

  let price = product.priceInUSD

  if (product.enableVariants && product?.variants?.docs?.length) {
    price = product?.variants?.docs?.reduce((acc, variant) => {
      if (typeof variant === 'object' && variant?.priceInUSD && acc && variant?.priceInUSD > acc) {
        return variant.priceInUSD
      }
      return acc
    }, price)
  }

  const productJsonLd = {
    name: product.title,
    '@context': 'https://schema.org',
    '@type': 'Product',
    description: product.description,
    image: metaImage?.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: hasStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      price: price,
      priceCurrency: 'usd',
    },
  }

  const relatedProducts =
    product.relatedProducts?.filter((relatedProduct) => typeof relatedProduct === 'object') ?? []

  return (
    <React.Fragment>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
        type="application/ld+json"
      />
      <div className={`container ${styles['page-wrap']}`}>
        <Button asChild variant="ghost" className={styles['back-btn']}>
          <Link href={localizedHref(locale, '/shop')}>
            <ChevronLeftIcon />
            {t(locale, 'shop', 'allProducts')}
          </Link>
        </Button>
        <div className={styles['product-card']}>
          <div className={styles['gallery-col']}>
            <Suspense fallback={<div className={styles['gallery-fallback']} />}>
              {Boolean(gallery?.length) && <Gallery gallery={gallery} />}
            </Suspense>
          </div>

          <div className={styles['info-col']}>
            <ProductDescription product={product} />
          </div>
        </div>
      </div>

      {product.layout?.length ? <RenderBlocks blocks={product.layout} /> : <></>}

      {relatedProducts.length ? (
        <div className="container">
          <RelatedProducts locale={locale} products={relatedProducts as Product[]} />
        </div>
      ) : (
        <></>
      )}
    </React.Fragment>
  )
}

function RelatedProducts({ locale, products }: { locale: Locale; products: Product[] }) {
  if (!products.length) return null

  return (
    <div className={styles.related}>
      <h2 className={styles['related-heading']}>{t(locale, 'shop', 'relatedProducts')}</h2>
      <ul className={styles['related-list']}>
        {products.map((product) => (
          <li className={styles['related-item']} key={product.id}>
            <Link
              className={styles['related-link']}
              href={localizedHref(locale, `/products/${product.slug}`)}
            >
              <GridTileImage
                label={{
                  amount: product.priceInUSD!,
                  title: product.title,
                }}
                media={product.meta?.image as Media}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const queryProductBySlug = async ({ slug, locale }: { slug: string; locale: Locale }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    depth: 3,
    draft,
    fallbackLocale: false,
    limit: 1,
    locale,
    overrideAccess: draft,
    pagination: false,
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        ...(draft ? [] : [{ _status: { equals: 'published' } }]),
      ],
    },
    populate: {
      variants: {
        title: true,
        priceInUSD: true,
        inventory: true,
        options: true,
      },
    },
  })

  return result.docs?.[0] || null
}
