import { cn } from '@/utilities/cn'
import { XIcon } from 'lucide-react'
import React from 'react'
import styles from './cart.module.css'

export function CloseCart({ className }: { className?: string }) {
  return (
    <div className={styles.closeWrap}>
      <XIcon className={cn(styles.closeIcon, className)} />
    </div>
  )
}
