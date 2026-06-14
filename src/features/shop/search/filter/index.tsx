import type { SortFilterItem } from '@/lib/constants'

import React, { Suspense } from 'react'

import { FilterItemDropdown } from './filter-item-dropdown'
import { FilterItem } from './filter-item'
import styles from '../search.module.css'

export type ListItem = PathFilterItem | SortFilterItem
export type PathFilterItem = { path: string; title: string }

function FilterItemList({ list }: { list: ListItem[] }) {
  return (
    <React.Fragment>
      {list.map((item: ListItem, i) => (
        <FilterItem item={item} key={i} />
      ))}
    </React.Fragment>
  )
}

export function FilterList({ list, title }: { list: ListItem[]; title?: string }) {
  return (
    <React.Fragment>
      <nav>
        {title ? <h3 className={styles['filter-title']}>{title}</h3> : null}
        <ul className={styles['filter-list-desktop']}>
          <Suspense fallback={null}>
            <FilterItemList list={list} />
          </Suspense>
        </ul>
        <ul className={styles['filter-list-mobile']}>
          <Suspense fallback={null}>
            <FilterItemDropdown list={list} />
          </Suspense>
        </ul>
      </nav>
    </React.Fragment>
  )
}
