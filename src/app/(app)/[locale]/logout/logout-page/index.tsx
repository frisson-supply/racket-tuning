'use client'

import { useAuth } from '@/providers/auth'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { Fragment, useEffect, useState } from 'react'
import proseStyles from '@/components/common/rich-text/rich-text.module.css'
import { localeFromPathname, localizedHref } from '@/utilities/localized-path'

export const LogoutPage: React.FC = (props) => {
  const { logout } = useAuth()
  const locale = localeFromPathname(usePathname())
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout()
        setSuccess('Logged out successfully.')
      } catch (_) {
        setError('You are already logged out.')
      }
    }

    void performLogout()
  }, [logout])

  return (
    <Fragment>
      {(error || success) && (
        <div className={proseStyles.prose}>
          <h1>{error || success}</h1>
          <p>
            What would you like to do next?
            <Fragment>
              {' '}
              <Link href={localizedHref(locale, '/search')}>Click here</Link>
              {` to shop.`}
            </Fragment>
            {` To log back in, `}
            <Link href={localizedHref(locale, '/login')}>click here</Link>.
          </p>
        </div>
      )}
    </Fragment>
  )
}
