import type { Metadata } from 'next'

import { RenderParams } from '@/components/common/render-params'
import Link from 'next/link'
import React from 'react'

import { headers as getHeaders } from 'next/headers'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { LoginForm } from '@/features/auth/login-form'
import { redirect } from 'next/navigation'
import styles from '../pages.module.css'
import { localizedHref, type Locale } from '@/utilities/localized-path'

type PageProps = {
  params: Promise<{ locale: Locale }>
}

export default async function Login({ params }: PageProps) {
  const { locale } = await params
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  if (user) {
    redirect(
      localizedHref(locale, `/account?warning=${encodeURIComponent('You are already logged in.')}`),
    )
  }

  return (
    <div className="container">
      <div className={styles['auth-inner']}>
        <RenderParams />

        <h1 className={styles['auth-heading']}>Log in</h1>
        <p className={styles['auth-intro']}>
          {`This is where your customers will login to manage their account, review their order history, and more. To manage all users, `}
          <Link href="/admin/collections/users">login to the admin dashboard</Link>.
        </p>
        <LoginForm />
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  description: 'Login or create an account to get started.',
  openGraph: {
    title: 'Login',
    url: '/login',
  },
  title: 'Login',
}
