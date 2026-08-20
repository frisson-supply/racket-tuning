import type { AboutUsSectionBlock as AboutUsSectionBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/common/link'
import { Media } from '@/components/common/media'
import React from 'react'
import styles from './about-us-section.module.css'

type Props = {
  card: NonNullable<AboutUsSectionBlockProps['cards']>[number]
}

export const ServiceCard: React.FC<Props> = ({ card }) => (
  <div className={styles.card}>
    <div className={styles['card-top']}>
      {card.image && typeof card.image === 'object' && (
        <Media
          className={styles['card-image-wrap']}
          fill
          imgClassName={styles['card-image']}
          resource={card.image}
        />
      )}
      {card.title && <p className={styles['card-title']}>{card.title}</p>}
    </div>
    <div className={styles['card-bottom']}>
      {card.description && <p className={styles['card-description']}>{card.description}</p>}
      {(card.link?.url || card.link?.reference) && <CMSLink {...card.link} appearance="inline" />}
    </div>
  </div>
)
