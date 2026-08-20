import React from 'react'
import { cn } from '@/utilities/cn'
import { Loader2 } from 'lucide-react'
import styles from './loading-spinner.module.css'

type SpinnerSize = 'small' | 'medium' | 'large'

const sizeClass: Record<SpinnerSize, string> = {
  small: styles['loader--sm'],
  medium: styles['loader--md'],
  large: styles['loader--lg'],
}

interface SpinnerContentProps {
  className?: string
  children?: React.ReactNode
  show?: boolean
  size?: SpinnerSize
}

export function LoadingSpinner({
  size = 'medium',
  show = true,
  children,
  className,
}: SpinnerContentProps) {
  return (
    <span className={cn(styles.wrapper, show && styles['wrapper--visible'])}>
      <Loader2 className={cn(styles.loader, sizeClass[size], className)} />
      {children}
    </span>
  )
}
