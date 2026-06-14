'use client'
import { CMSLink } from '@/components/common/link'
import { Cart } from '@/features/cart'
import { OpenCartButton } from '@/features/cart/open-cart'
import Link from 'next/link'
import React, { Suspense } from 'react'

import { MobileMenu } from './mobile-menu'
import type { Header } from 'src/payload-types'

import { LogoIcon } from '@/components/common/icons/logo'
import { usePathname } from 'next/navigation'
import { cn } from '@/utilities/cn'
import styles from './header.module.css'

type Props = {
  header: Header
}

export function HeaderClient({ header }: Props) {
  const menu = header.navItems || []
  const pathname = usePathname()

  return (
    <div className={styles.wrapper}>
      <nav className={cn(styles.nav, 'container')}>
        <div className={styles['mobile-toggle']}>
          <Suspense fallback={null}>
            <MobileMenu menu={menu} />
          </Suspense>
        </div>
        <div className={styles.inner}>
          <div className={styles['logo-group']}>
            <Link className={styles['logo-link']} href="/">
              <LogoIcon className={styles['logo-icon']} />
            </Link>
            {menu.length ? (
              <ul className={styles['menu-list']}>
                {menu.map((item) => (
                  <li key={item.id}>
                    <CMSLink
                      {...item.link}
                      size={'clear'}
                      className={cn('navLink relative', {
                        active:
                          item.link.url && item.link.url !== '/'
                            ? pathname.includes(item.link.url)
                            : false,
                      })}
                      appearance="nav"
                    />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className={styles['cart-group']}>
            <Suspense fallback={<OpenCartButton />}>
              <Cart />
            </Suspense>
          </div>
        </div>
      </nav>
    </div>
  )
}
