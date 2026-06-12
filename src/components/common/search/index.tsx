'use client'

import { cn } from '@/utilities/cn'
import { createUrl } from '@/utilities/create-url'
import { SearchIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import styles from '@/features/shop/search/search.module.css'

type Props = {
  className?: string
}

export const Search: React.FC<Props> = ({ className }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const val = e.target as HTMLFormElement
    const search = val.search as HTMLInputElement
    const newParams = new URLSearchParams(searchParams.toString())

    if (search.value) {
      newParams.set('q', search.value)
    } else {
      newParams.delete('q')
    }

    router.push(createUrl('/shop', newParams))
  }

  return (
    <form className={cn(styles.searchForm, className)} onSubmit={onSubmit}>
      <input
        autoComplete="off"
        className={styles.searchInput}
        defaultValue={searchParams?.get('q') || ''}
        key={searchParams?.get('q')}
        name="search"
        placeholder="Search for products..."
        type="text"
      />
      <div className={styles.searchIconWrap}>
        <SearchIcon className={styles.searchIcon} />
      </div>
    </form>
  )
}
