import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/utilities/cn'
import styles from './button.module.css'

export type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link'
  | 'nav'

export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon' | 'clear'

export type ButtonProps = React.ComponentProps<'button'> & {
  asChild?: boolean
  variant?: ButtonVariant
  size?: ButtonSize
}

export function getButtonClass(variant: ButtonVariant = 'default', size: ButtonSize = 'default') {
  return cn(styles.base, styles[`variant-${variant}`], styles[`size-${size}`])
}

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(styles.base, styles[`variant-${variant}`], styles[`size-${size}`], className)}
      {...props}
    />
  )
}

export { Button }
