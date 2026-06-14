import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/cn'
import styles from './not-found.module.css'
import proseStyles from '@/components/common/rich-text/rich-text.module.css'

export default function NotFound() {
  return (
    <div className={`container ${styles.notFoundPy}`}>
      <div className={cn(proseStyles.prose, proseStyles['prose-max-w-none'])}>
        <h1 style={{ marginBottom: 0 }}>404</h1>
        <p className={styles['mb-4']}>This page could not be found.</p>
      </div>
      <Button asChild variant="default">
        <Link href="/">Go home</Link>
      </Button>
    </div>
  )
}
