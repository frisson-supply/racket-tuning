import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/cn'
import React from 'react'
import styles from './cart.module.css'

export function OpenCartButton({
  className,
  quantity,
  ...rest
}: {
  className?: string
  quantity?: number
}) {
  return (
    <Button
      variant="nav"
      size="clear"
      className={cn('navLink relative items-end', styles['open-btn'], className)}
      {...rest}
    >
      <span>Cart</span>
      {quantity ? (
        <>
          <span>•</span>
          <span>{quantity}</span>
        </>
      ) : null}
    </Button>
  )
}
