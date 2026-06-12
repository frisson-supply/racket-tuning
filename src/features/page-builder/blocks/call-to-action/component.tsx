import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'
import { RichText } from '@/components/common/rich-text'
import { CMSLink } from '@/components/common/link'
import styles from './cta.module.css'

export const CallToActionBlock: React.FC<
  CTABlockProps & {
    id?: string | number
    className?: string
  }
> = ({ links, richText }) => {
  return (
    <div className="container">
      <div className={styles.inner}>
        <div className={styles.content}>
          {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
        </div>
        <div className={styles.links}>
          {(links || []).map(({ link }, i) => {
            return (
              <CMSLink
                key={i}
                size="lg"
                {...link}
                appearance={link.appearance ?? undefined}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
