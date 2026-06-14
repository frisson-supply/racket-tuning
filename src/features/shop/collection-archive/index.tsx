import React from 'react'

import type { Product } from '@/payload-types'
import styles from './archive.module.css'

/* import { Card } from '../Card' */

export type Props = {
  posts: Product[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div className="container">
      <div>
        <div className={styles.grid}>
          {posts?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className={styles.col} key={index}>
                  {/* <Card className="h-full" doc={result} relationTo="posts" showCategories /> */}
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
