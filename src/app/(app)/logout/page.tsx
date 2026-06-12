import type { Metadata } from 'next'

import { mergeOpenGraph } from '@/utilities/merge-open-graph'
import React from 'react'

import { LogoutPage } from './logout-page'
import styles from '../pages.module.css'

export default async function Logout() {
  return (
    <div className={`container ${styles.logoutInner}`}>
      <LogoutPage />
    </div>
  )
}

export const metadata: Metadata = {
  description: 'You have been logged out.',
  openGraph: mergeOpenGraph({
    title: 'Logout',
    url: '/logout',
  }),
  title: 'Logout',
}
