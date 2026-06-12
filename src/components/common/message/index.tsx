import { cn } from '@/utilities/cn'
import React from 'react'
import styles from './message.module.css'

export const Message: React.FC<{
  className?: string
  error?: React.ReactNode
  message?: React.ReactNode
  success?: React.ReactNode
  warning?: React.ReactNode
}> = ({ className, error, message, success, warning }) => {
  const messageToRender = message || error || success || warning

  if (messageToRender) {
    return (
      <div
        className={cn(
          styles.message,
          success && styles.success,
          warning && styles.warning,
          error && styles.error,
          className,
        )}
      >
        {messageToRender}
      </div>
    )
  }
  return null
}
