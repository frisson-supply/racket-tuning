'use client'

import type { Header } from '@/payload-types'

import { CMSLink } from '@/components/common/link'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useAuth } from '@/providers/auth'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import styles from './mobile-menu.module.css'

interface Props {
  menu: Header['navItems']
}

export function MobileMenu({ menu }: Props) {
  const { user } = useAuth()

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  const closeMobileMenu = () => setIsOpen(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname, searchParams])

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger className={styles.trigger}>
        <MenuIcon />
      </SheetTrigger>

      <SheetContent side="left" className={styles.sheetContent}>
        <SheetHeader className={styles.sheetHeader}>
          <SheetTitle>My Store</SheetTitle>
          <SheetDescription />
        </SheetHeader>

        <div className={styles.sheetBody}>
          {menu?.length ? (
            <ul className={styles.menuList}>
              {menu.map((item) => (
                <li className={styles.menuItem} key={item.id}>
                  <CMSLink {...item.link} appearance="link" />
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {user ? (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>My account</h2>
            <hr className={styles.divider} />
            <ul className={styles.accountList}>
              <li><Link href="/orders">Orders</Link></li>
              <li><Link href="/account/addresses">Addresses</Link></li>
              <li><Link href="/account">Manage account</Link></li>
              <li className={styles.logoutItem}>
                <Button asChild variant="outline">
                  <Link href="/logout">Log out</Link>
                </Button>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <h2 className={styles.sectionTitle}>My account</h2>
            <div className={styles.authButtons}>
              <Button asChild className={styles.authButton} variant="outline">
                <Link href="/login">Log in</Link>
              </Button>
              <span className={styles.authOr}>or</span>
              <Button asChild className={styles.authButton}>
                <Link href="/create-account">Create an account</Link>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
