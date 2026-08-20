import type { AboutUsSectionBlock as AboutUsSectionBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/common/link'
import { RichText } from '@/components/common/rich-text'
import React from 'react'
import { ServiceCards } from './service-cards.client'
import styles from './about-us-section.module.css'

export const AboutUsSectionBlock: React.FC<
  AboutUsSectionBlockProps & {
    id?: string | number
    className?: string
  }
> = ({
  aboutCardDescription,
  aboutCardLink,
  aboutCardTitle,
  cards,
  cardsTitle,
  eyebrow,
  richText,
}) => {
  return (
    <div className="container">
      <div className={styles.wrap}>
        <div className={styles.content}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          {richText && <RichText data={richText} enableGutter={false} />}
          {(aboutCardLink?.url || aboutCardLink?.reference) && (
            <div className={styles['about-card']}>
              {aboutCardTitle && <p className={styles['about-card-title']}>{aboutCardTitle}</p>}
              {aboutCardDescription && (
                <p className={styles['about-card-description']}>{aboutCardDescription}</p>
              )}
              <CMSLink {...aboutCardLink} appearance="inline" />
            </div>
          )}
        </div>
        <ServiceCards cards={cards} cardsTitle={cardsTitle} />
      </div>
    </div>
  )
}
