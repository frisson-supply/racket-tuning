import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cn } from '@/utilities/cn'
import React, { Suspense } from 'react'

import { FilterList } from './filter'
import { CategoryItem } from './categories.client'
import styles from './search.module.css'

async function CategoryList() {
  const payload = await getPayload({ config: configPromise })

  const categories = await payload.find({
    collection: 'categories',
    sort: 'title',
  })

  return (
    <div>
      <h3 className={styles.categoriesTitle}>Category</h3>

      <ul>
        {categories.docs.map((category) => {
          return (
            <li key={category.id}>
              <CategoryItem category={category} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function Categories() {
  return (
    <Suspense
      fallback={
        <div className={styles.skeletonWrapper}>
          <div className={cn(styles.skeleton, styles['skeleton--title'])} />
          <div className={cn(styles.skeleton, styles['skeleton--title'])} />
          <div className={cn(styles.skeleton, styles['skeleton--item'])} />
          <div className={cn(styles.skeleton, styles['skeleton--item'])} />
          <div className={cn(styles.skeleton, styles['skeleton--item'])} />
          <div className={cn(styles.skeleton, styles['skeleton--item'])} />
          <div className={cn(styles.skeleton, styles['skeleton--item'])} />
          <div className={cn(styles.skeleton, styles['skeleton--item'])} />
          <div className={cn(styles.skeleton, styles['skeleton--item'])} />
          <div className={cn(styles.skeleton, styles['skeleton--item'])} />
        </div>
      }
    >
      <CategoryList />
    </Suspense>
  )
}
