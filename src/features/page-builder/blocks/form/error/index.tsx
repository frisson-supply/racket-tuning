import * as React from 'react'
import styles from '../form-block.module.css'

export const Error: React.FC = () => {
  return <div className={styles.error}>This field is required</div>
}
