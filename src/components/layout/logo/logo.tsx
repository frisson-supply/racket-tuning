import React from 'react'
import styles from './logo.module.css'

export const Logo = () => {
  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Payload Logo"
      className={styles.logo}
      src="https://raw.githubusercontent.com/payloadcms/payload/3.x/packages/payload/src/admin/assets/images/payload-logo-light.svg"
    />
  )
}
