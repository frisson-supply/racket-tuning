import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/common/media'
import { Price } from '@/components/common/price'
import Link from 'next/link'
import React from 'react'
import styles from './product-card.module.css'

type Props = {
  amount: number
  currencyCode?: string
  href: string
  image?: MediaType | null
  swatchColor?: string
  tagline?: string
  title: string
}

export const ProductCard: React.FC<Props> = ({
  amount,
  currencyCode,
  href,
  image,
  swatchColor,
  tagline,
  title,
}) => (
  <Link className={styles.card} href={href}>
    <div className={styles.image}>{image ? <Media resource={image} /> : null}</div>
    <div className={styles.info}>
      {swatchColor ? <span className={styles.swatch} style={{ background: swatchColor }} /> : null}
      <p className={styles.title}>{title}</p>
      <Price amount={amount} className={styles.price} currencyCode={currencyCode} />
    </div>
    {tagline ? <p className={styles.tagline}>{tagline}</p> : null}
  </Link>
)
