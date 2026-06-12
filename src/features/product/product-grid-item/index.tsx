import type { Product } from '@/payload-types'

import Link from 'next/link'
import React from 'react'
import { Media } from '@/components/common/media'
import { Price } from '@/components/common/price'
import styles from '@/features/product/product.module.css'

type Props = {
  product: Partial<Product>
}

export const ProductGridItem: React.FC<Props> = ({ product }) => {
  const { gallery, priceInUSD, title } = product

  let price = priceInUSD

  const variants = product.variants?.docs

  if (variants && variants.length > 0) {
    const variant = variants[0]
    if (
      variant &&
      typeof variant === 'object' &&
      variant?.priceInUSD &&
      typeof variant.priceInUSD === 'number'
    ) {
      price = variant.priceInUSD
    }
  }

  const image =
    gallery?.[0]?.image && typeof gallery[0]?.image !== 'string' ? gallery[0]?.image : false

  return (
    <Link className={styles.gridItemLink} href={`/products/${product.slug}`}>
      {image ? (
        <Media
          className={styles.gridItemMedia}
          height={80}
          imgClassName={styles.gridItemImg}
          resource={image}
          width={80}
        />
      ) : null}

      <div className={styles.gridItemMeta}>
        <div>{title}</div>
        {typeof price === 'number' && <Price amount={price} />}
      </div>
    </Link>
  )
}
