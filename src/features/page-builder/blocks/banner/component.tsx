import type { BannerBlock as BannerBlockProps } from '@/payload-types'
import { cn } from '@/utilities/cn'
import React from 'react'
import { RichText } from '@/components/common/rich-text'
import styles from './banner.module.css'

export const BannerBlock: React.FC<
  BannerBlockProps & {
    id?: string | number
    className?: string
  }
> = ({ className, content, style }) => {
  return (
    <div className={cn(styles.wrap, className)}>
      <div
        className={cn(styles.inner, {
          [styles['inner--info']]: style === 'info',
          [styles['inner--error']]: style === 'error',
          [styles['inner--success']]: style === 'success',
          [styles['inner--warning']]: style === 'warning',
        })}
      >
        <RichText data={content} enableGutter={false} enableProse={false} />
      </div>
    </div>
  )
}
