import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cn } from '@/utilities/cn'
import React, { Suspense } from 'react'

import { Item } from './item'
import styles from './category-tabs.module.css'

async function List() {
  const payload = await getPayload({ config: configPromise })
  const categoriesData = await payload.find({
    collection: 'categories',
    sort: 'title',
    select: {
      title: true,
      slug: true,
    },
  })

  const categories = categoriesData.docs?.map((category) => {
    return {
      href: `/shop/${category.slug}`,
      title: category.title,
    }
  })

  return (
    <React.Fragment>
      <nav>
        <ul className={styles.list}>
          <Item title="All" href="/shop" />
          <Suspense fallback={null}>
            {categories.map((category) => {
              return <Item {...category} key={category.href} />
            })}
          </Suspense>
        </ul>
      </nav>
    </React.Fragment>
  )
}

export function CategoryTabs() {
  return (
    <Suspense
      fallback={
        <div className={styles.skeletonContainer}>
          <div className={cn(styles.skeleton, styles['skeleton--header'])} />
          <div className={cn(styles.skeleton, styles['skeleton--header'])} />
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={cn(styles.skeleton, styles['skeleton--item'])} />
          ))}
        </div>
      }
    >
      <List />
    </Suspense>
  )
}
