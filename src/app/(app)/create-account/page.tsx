import type { Metadata } from 'next'

import { RenderParams } from '@/components/common/render-params'
import { mergeOpenGraph } from '@/utilities/merge-open-graph'
import React from 'react'
import { headers as getHeaders } from 'next/headers'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { CreateAccountForm } from '@/features/auth/create-account-form'
import { redirect } from 'next/navigation'
import styles from '../pages.module.css'

export default async function CreateAccount() {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  if (user) {
    redirect(`/account?warning=${encodeURIComponent('You are already logged in.')}`)
  }

  return (
    <div className={`container ${styles.pagePy}`}>
      <h1 className={styles.headingXl}>Create Account</h1>
      <RenderParams />
      <CreateAccountForm />
    </div>
  )
}

export const metadata: Metadata = {
  description: 'Create an account or log in to your existing account.',
  openGraph: mergeOpenGraph({
    title: 'Account',
    url: '/account',
  }),
  title: 'Account',
}
