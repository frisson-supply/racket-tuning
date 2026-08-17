import { Categories } from '@/features/shop/search/categories'
import { FilterList } from '@/features/shop/search/filter'
import { sorting } from '@/lib/constants'
import { Search } from '@/components/common/search'
import React, { Suspense } from 'react'
import styles from './shop.module.css'

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <div className={`container ${styles.layout}`}>
        <Search className={styles.searchBar} />

        <div className={styles.inner}>
          <div className={styles.sidebar}>
            <Categories />
            <FilterList list={sorting} title="Sort by" />
          </div>
          <div className={styles.main}>{children}</div>
        </div>
      </div>
    </Suspense>
  )
}
