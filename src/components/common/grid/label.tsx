import React from 'react'

import { Price } from '@/components/common/price'
import styles from './label.module.css'

type Props = {
  amount: number
  position?: 'bottom' | 'center'
  title: string
}

export const Label: React.FC<Props> = ({ amount, title }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <h3 className={styles.title}>{title}</h3>
        <Price amount={amount} className={styles.price} />
      </div>
    </div>
  )
}
