import type { Metadata } from 'next'

import { mergeOpenGraph } from '@/utilities/merge-open-graph'
import React from 'react'
import { FindOrderForm } from '@/features/auth/find-order-form'
import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers.js'
import configPromise from '@payload-config'
import styles from '../pages.module.css'

export default async function FindOrderPage() {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  return (
    <div className={`container ${styles.pagePy}`}>
      <FindOrderForm initialEmail={user?.email} />
    </div>
  )
}

export const metadata: Metadata = {
  description: 'Find your order using your email and order ID.',
  openGraph: mergeOpenGraph({
    title: 'Find order',
    url: '/find-order',
  }),
  title: 'Find order',
}
