import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/common/link'
import { Media } from '@/components/common/media'
import { RichText } from '@/components/common/rich-text'
import styles from './hero.module.css'
import proseStyles from '@/components/common/rich-text/rich-text.module.css'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div>
      <div className={`container ${styles.header}`}>
        {richText && <RichText className={proseStyles['mb-6']} data={richText} enableGutter={false} />}

        {Array.isArray(links) && links.length > 0 && (
          <ul className={styles.links}>
            {links.map(({ link }, i) => {
              return (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <div className="container">
        {media && typeof media === 'object' && (
          <div>
            <Media
              className={styles.mediaBleed}
              priority
              resource={media}
            />
            {media?.caption && (
              <div className={styles.caption}>
                <RichText data={media.caption} enableGutter={false} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
