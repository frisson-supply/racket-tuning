'use client'

import type { CartItem } from '@/features/cart'
import { useCart } from '@payloadcms/plugin-ecommerce/client/react'
import { XIcon } from 'lucide-react'
import React from 'react'
import styles from './cart.module.css'

export function DeleteItemButton({ item }: { item: CartItem }) {
  const { isLoading, removeItem } = useCart()
  const itemId = item.id

  return (
    <form>
      <button
        aria-label="Remove cart item"
        className={styles['delete-btn']}
        disabled={!itemId || isLoading}
        onClick={(e: React.FormEvent<HTMLButtonElement>) => {
          e.preventDefault()
          if (itemId) removeItem(itemId)
        }}
        type="button"
      >
        <XIcon className={styles['delete-icon']} />
      </button>
    </form>
  )
}
