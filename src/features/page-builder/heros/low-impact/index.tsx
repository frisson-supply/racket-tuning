import React from 'react'

import type { Page } from '@/payload-types'

import { RichText } from '@/components/common/rich-text'
import styles from './hero.module.css'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
    <div className={`container ${styles.wrap}`}>
      <div className={styles.content}>
        {children || (richText && <RichText data={richText} enableGutter={false} />)}
      </div>
    </div>
  )
}
