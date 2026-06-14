import { Grid } from '@/components/common/grid'
import React from 'react'
import styles from './shop.module.css'

export default function Loading() {
  return (
    <Grid className={styles['loading-grid']}>
      {Array(12)
        .fill(0)
        .map((_, index) => {
          return <div className={styles.skeleton} key={index} />
        })}
    </Grid>
  )
}
