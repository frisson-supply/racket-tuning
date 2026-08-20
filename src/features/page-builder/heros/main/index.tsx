import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/common/link'
import { Media } from '@/components/common/media'
import { RichText } from '@/components/common/rich-text'
import styles from './hero.module.css'

export const MainHero: React.FC<Page['hero']> = ({ button, eyebrow, media, richText }) => {
  return (
    <div className={styles.wrap} data-theme="dark">
      <div className={styles.content}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        {richText && <RichText data={richText} enableGutter={false} />}
        {/* ponytail: CMSLink placeholder, swap for the button component when it lands */}
        {button?.url || button?.reference ? <CMSLink {...button} /> : null}
      </div>
      <div className={styles['media-wrap']}>
        {media && typeof media === 'object' && (
          <Media
            fill
            imgClassName={styles.media}
            priority
            resource={media}
            videoClassName={styles.media}
          />
        )}
      </div>
    </div>
  )
}
