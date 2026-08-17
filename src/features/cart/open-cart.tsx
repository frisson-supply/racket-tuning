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
      aria-label="Open cart"
      variant="nav"
      size="clear"
      className={cn('navLink relative items-end', styles['open-btn'], className)}
      {...rest}
    >
      <span>Cart</span>
      {quantity ? (
        <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] text-primary-foreground">
          {quantity}
        </span>
      ) : null}
    </Button>
  )
}
