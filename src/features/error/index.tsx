'use client'

import React from 'react'
import styles from './error.module.css'

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className={styles.card}>
      <h2 className={styles.heading}>Oh no!</h2>
      <p className={styles.message}>
        There was an issue with our storefront. This could be a temporary issue, please try your
        action again.
      </p>
      <button className={styles.button} onClick={() => reset()} type="button">
        Try Again
      </button>
    </div>
  )
}
