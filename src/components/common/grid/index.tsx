import { cn } from '@/utilities/cn'
import React from 'react'
import styles from './grid.module.css'

export function Grid(props: React.ComponentProps<'div'>) {
  const { children, className } = props
  return (
    <div {...props} className={cn(styles.grid, className)}>
      {children}
    </div>
  )
}
