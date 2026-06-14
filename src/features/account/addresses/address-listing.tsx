'use client'

import React from 'react'
import { useAddresses } from '@payloadcms/plugin-ecommerce/client/react'
import { AddressItem } from '@/features/account/addresses/address-item'
import styles from './addresses.module.css'

export const AddressListing: React.FC = () => {
  const { addresses } = useAddresses()

  if (!addresses || addresses.length === 0) {
    return <p>No addresses found.</p>
  }

  return (
    <div>
      <ul className={styles.list}>
        {addresses.map((address) => (
          <li key={address.id} className={styles['list-item']}>
            <AddressItem address={address} />
          </li>
        ))}
      </ul>
    </div>
  )
}
