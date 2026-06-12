'use client'

import { CartItem } from '@/features/cart'
import { useCart } from '@payloadcms/plugin-ecommerce/client/react'
import { cn } from '@/utilities/cn'
import { MinusIcon, PlusIcon } from 'lucide-react'
import React, { useMemo } from 'react'
import styles from './cart.module.css'

export function EditItemQuantityButton({ type, item }: { item: CartItem; type: 'minus' | 'plus' }) {
  const { decrementItem, incrementItem, isLoading } = useCart()

  const disabled = useMemo(() => {
    if (!item.id) return true

    const target =
      item.variant && typeof item.variant === 'object'
        ? item.variant
        : item.product && typeof item.product === 'object'
          ? item.product
          : null

    if (
      target &&
      typeof target === 'object' &&
      target.inventory !== undefined &&
      target.inventory !== null
    ) {
      if (type === 'plus' && item.quantity !== undefined && item.quantity !== null) {
        return item.quantity >= target.inventory
      }
    }

    return false
  }, [item, type])

  return (
    <form>
      <button
        disabled={disabled || isLoading}
        aria-label={type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'}
        className={cn(styles.quantityBtn, type === 'minus' && styles['quantityBtn--minus'])}
        onClick={(e: React.FormEvent<HTMLButtonElement>) => {
          e.preventDefault()
          if (item.id) {
            if (type === 'plus') incrementItem(item.id)
            else decrementItem(item.id)
          }
        }}
        type="button"
      >
        {type === 'plus' ? (
          <PlusIcon className={styles.quantityIcon} />
        ) : (
          <MinusIcon className={styles.quantityIcon} />
        )}
      </button>
    </form>
  )
}
