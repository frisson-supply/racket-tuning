import { cn } from '@/utilities/cn'
import React from 'react'
import { RichText } from '@/components/common/rich-text'
import type { DefaultDocumentIDType } from 'payload'
import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/common/link'
import styles from './content.module.css'

export const ContentBlock: React.FC<
  ContentBlockProps & {
    id?: DefaultDocumentIDType
    className?: string
  }
> = (props) => {
  const { columns } = props

  const colsSpanClasses: Record<string, string> = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className={`container ${styles.wrap}`}>
      <div className={styles.grid}>
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col

            return (
              <div
                className={cn(styles.column, size !== 'full' && styles['column--notfull'])}
                key={index}
                style={{ '--col-span': colsSpanClasses[size!] } as React.CSSProperties}
              >
                {richText && <RichText data={richText} enableGutter={false} />}

                {enableLink && <CMSLink {...link} />}
              </div>
            )
          })}
      </div>
    </div>
  )
}
