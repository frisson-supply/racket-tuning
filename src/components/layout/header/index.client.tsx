'use client'
import { CMSLink } from '@/components/common/link'
import { Cart } from '@/features/cart'
import { OpenCartButton } from '@/features/cart/open-cart'
import Link from 'next/link'
import React, { Suspense, useEffect, useState } from 'react'

import type { Header } from 'src/payload-types'

import { LogoIcon } from '@/components/common/icons/logo'
import { NavDropdown } from './nav-dropdown'
import { usePathname, useSearchParams } from 'next/navigation'
import { useAuth } from '@/providers/auth'
import { cn } from '@/utilities/cn'
import styles from './header.module.css'

type Props = {
  header: Header
}

function ChevronIcon() {
  return (
    <svg
      className={styles.navLinkDropdownIcon}
      fill="none"
      viewBox="0 0 17 10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 1.5L8.5 8.5L15.5 1.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export function HeaderClient({ header }: Props) {
  const menu = header.navItems || []
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { user } = useAuth()

  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)

  useEffect(() => {
    setMenuOpen(false)
    setOpenDropdownId(null)
  }, [pathname, searchParams])

  const toggleDropdown = (id: string) => {
    setOpenDropdownId((current) => (current === id ? null : id))
  }

  return (
    <nav className={styles.nav} data-menu-status={menuOpen ? 'open' : 'closed'}>
      <div className={cn('container', styles.navContainer)}>
        <div className={styles.navBg} />
        <div className={styles.navInner}>
          <Link className={styles.navLogo} href="/">
            <LogoIcon className="w-full h-auto" />
          </Link>

          <div className={styles.navCenter}>
            <ul className={styles.navCenterList}>
              {menu.map((item) => {
                const hasChildren = Boolean(item.children?.length)
                const isOpen = openDropdownId === (item.id ?? item.link.label)

                if (hasChildren) {
                  return (
                    <li key={item.id}>
                      <button
                        className={styles.navLink}
                        data-dropdown-toggle={isOpen ? 'open' : 'closed'}
                        onClick={() => toggleDropdown(item.id ?? item.link.label)}
                        type="button"
                      >
                        <span className={styles.navLinkLabel}>{item.link.label}</span>
                        <ChevronIcon />
                      </button>
                      <NavDropdown item={item} />
                    </li>
                  )
                }

                const { label, ...link } = item.link

                return (
                  <li key={item.id}>
                    <CMSLink
                      {...link}
                      appearance="inline"
                      className={cn(styles.navLink, {
                        [styles.active]:
                          item.link.url && item.link.url !== '/'
                            ? pathname.includes(item.link.url)
                            : false,
                      })}
                    >
                      <span className={styles.navLinkLabel}>{label}</span>
                    </CMSLink>
                  </li>
                )
              })}

              <li className={styles.accountItem}>
                {user ? (
                  <div className={styles.accountLinks}>
                    <Link className={styles.navLink} href="/orders">
                      <span className={styles.navLinkLabel}>Orders</span>
                    </Link>
                    <Link className={styles.navLink} href="/account/addresses">
                      <span className={styles.navLinkLabel}>Addresses</span>
                    </Link>
                    <Link className={styles.navLink} href="/account">
                      <span className={styles.navLinkLabel}>Manage account</span>
                    </Link>
                    <Link className={styles.navLink} href="/logout">
                      <span className={styles.navLinkLabel}>Log out</span>
                    </Link>
                  </div>
                ) : (
                  <div className={styles.accountLinks}>
                    <Link className={styles.navLink} href="/login">
                      <span className={styles.navLinkLabel}>Log in</span>
                    </Link>
                    <Link className={styles.navLink} href="/create-account">
                      <span className={styles.navLinkLabel}>Create an account</span>
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </div>

          <div className={styles.navEnd}>
            <Suspense fallback={<OpenCartButton />}>
              <Cart />
            </Suspense>

            <button
              aria-label="Toggle menu"
              className={styles.menuButton}
              onClick={() => setMenuOpen((open) => !open)}
              type="button"
            >
              <div className={styles.menuButtonLine} />
              <div className={styles.menuButtonLine} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.pageBg} />
    </nav>
  )
}
