'use client'

import { LoadingSpinner } from '@/components/common/loading-spinner'
import { useCart, usePayments } from '@payloadcms/plugin-ecommerce/client/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import styles from './checkout.module.css'
import { localeFromPathname, localizedHref } from '@/utilities/localized-path'

export const ConfirmOrder: React.FC = () => {
  const { confirmOrder } = usePayments()
  const { cart } = useCart()

  const searchParams = useSearchParams()
  const router = useRouter()
  const locale = localeFromPathname(usePathname())
  const isConfirming = useRef(false)

  useEffect(() => {
    if (!cart || !cart.items || cart.items?.length === 0) {
      return
    }

    const paymentIntentID = searchParams.get('payment_intent')
    const email = searchParams.get('email')

    if (paymentIntentID) {
      if (!isConfirming.current) {
        isConfirming.current = true

        confirmOrder('stripe', {
          additionalData: {
            paymentIntentID,
          },
        }).then((result) => {
          if (result && typeof result === 'object' && 'orderID' in result && result.orderID) {
            const accessToken = 'accessToken' in result ? (result.accessToken as string) : ''
            const queryParams = new URLSearchParams()

            if (email) {
              queryParams.set('email', email)
            }
            if (accessToken) {
              queryParams.set('accessToken', accessToken)
            }

            const queryString = queryParams.toString()
            router.push(
              localizedHref(
                locale,
                `/orders/${result.orderID}${queryString ? `?${queryString}` : ''}`,
              ),
            )
          }
        })
      }
    } else {
      router.push(localizedHref(locale, '/'))
    }
  }, [cart, confirmOrder, router, searchParams])

  return (
    <div className={styles['confirm-wrap']}>
      <h1 className={styles['confirm-heading']}>Confirming Order</h1>

      <LoadingSpinner className={styles['confirm-spinner']} />
    </div>
  )
}
