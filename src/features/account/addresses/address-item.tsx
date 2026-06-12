'use client'

import React from 'react'
import type { Address } from '@/payload-types'
import { CreateAddressModal } from '@/features/account/addresses/create-address-modal'
import styles from './addresses.module.css'

type Props = {
  address: Partial<Omit<Address, 'country'>> & { country?: string }
  actions?: React.ReactNode
  beforeActions?: React.ReactNode
  afterActions?: React.ReactNode
  hideActions?: boolean
}

export const AddressItem: React.FC<Props> = ({
  address,
  actions,
  hideActions = false,
  beforeActions,
  afterActions,
}) => {
  if (!address) {
    return null
  }

  return (
    <div className={styles.item}>
      <div className={styles.content}>
        <p className="font-medium">
          {address.title && <span>{address.title} </span>}
          {address.firstName} {address.lastName}
        </p>
        <p>{address.company && <span>{address.company} </span>}</p>
        <p>{address.phone && <span>{address.phone}</span>}</p>
        <p>
          {address.addressLine1}
          {address.addressLine2 && <>, {address.addressLine2}</>}
        </p>
        <p>
          {address.city}, {address.state} {address.postalCode}
        </p>
        <p>{address.country}</p>
      </div>

      {!hideActions && address.id && (
        <div className={styles.actions}>
          {actions ? (
            actions
          ) : (
            <>
              {beforeActions}
              {address.id && (
                <CreateAddressModal
                  addressID={address.id}
                  initialData={address}
                  buttonText={'Edit'}
                  modalTitle={'Edit address'}
                />
              )}
              {afterActions}
            </>
          )}
        </div>
      )}
    </div>
  )
}
