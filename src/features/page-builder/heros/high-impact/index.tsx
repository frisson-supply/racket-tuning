'use client'
import { useHeaderTheme } from '@/providers/header-theme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/common/link'
import { Media } from '@/components/common/media'
import { RichText } from '@/components/common/rich-text'
import styles from './hero.module.css'
import proseStyles from '@/components/common/rich-text/rich-text.module.css'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div className={styles.wrap} data-theme="dark">
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
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
      </div>
      <div className={styles['media-wrap']}>
        {media && typeof media === 'object' && (
          <Media fill imgClassName={styles['media-image']} priority resource={media} />
        )}
      </div>
    </div>
  )
}
