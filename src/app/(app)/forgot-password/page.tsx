import type { Metadata } from 'next'

import { mergeOpenGraph } from '@/utilities/merge-open-graph'
import React from 'react'

import { ForgotPasswordForm } from '@/components/forms/forgot-password-form'

export default async function ForgotPasswordPage() {
  return (
    <div className="container py-16">
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
