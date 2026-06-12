import type { Footer } from '@/payload-types'

import { FooterMenu } from '@/components/layout/footer/menu'
import { getCachedGlobal } from '@/utilities/get-globals'
import Link from 'next/link'
import React, { Suspense } from 'react'
import { LogoIcon } from '@/components/common/icons/logo'
import styles from './footer.module.css'

const { COMPANY_NAME, SITE_NAME } = process.env

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer', 1)()
  const menu = footer.navItems || []
  const currentYear = new Date().getFullYear()
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '')
  const copyrightName = COMPANY_NAME || SITE_NAME || ''

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.upper}>
          <div>
            <Link className={styles.logoLink} href="/">
              <LogoIcon className={styles.logoIcon} />
              <span className="sr-only">{SITE_NAME}</span>
            </Link>
          </div>
          <Suspense
            fallback={
              <div className={styles.skeletonFallback}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className={styles.skeleton} />
                ))}
              </div>
            }
          >
            <FooterMenu menu={menu} />
          </Suspense>
        </div>
      </div>
      <div className={styles.lower}>
        <div className="container">
          <div className={styles.lowerInner}>
            <p>
              &copy; {copyrightDate} {copyrightName}
              {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All rights reserved.
            </p>
            <hr className={styles.divider} />
            <p>Designed in Michigan</p>
            <p className={styles.creditGroup}>
              <a className={styles.credit} href="https://payloadcms.com">
                Crafted by Payload
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
