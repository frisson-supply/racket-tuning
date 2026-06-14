import type { Metadata } from 'next'

import { mergeOpenGraph } from '@/utilities/merge-open-graph'
import React from 'react'

import { ForgotPasswordForm } from '@/features/auth/forgot-password-form'
import styles from '../pages.module.css'

export default async function ForgotPasswordPage() {
  return (
    <div className={`container ${styles['page-py']}`}>
      <ForgotPasswordForm />
    </div>
  )
}

export const metadata: Metadata = {
  description: 'Enter your email address to recover your password.',
  openGraph: mergeOpenGraph({
    title: 'Forgot Password',
    url: '/forgot-password',
  }),
  title: 'Forgot Password',
}
