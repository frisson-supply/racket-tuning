'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/cn'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './account-nav.module.css'

type Props = {
  className?: string
}

export const AccountNav: React.FC<Props> = ({ className }) => {
  const pathname = usePathname()

  return (
    <div className={className}>
      <ul className={styles.list}>
        <li>
          <Button asChild variant="link">
            <Link
              href="/account"
              className={cn(styles.link, pathname === '/account' && styles['link--active'])}
            >
              Account settings
            </Link>
          </Button>
        </li>

        <li>
          <Button asChild variant="link">
            <Link
              href="/account/addresses"
              className={cn(
                styles.link,
                pathname === '/account/addresses' && styles['link--active'],
              )}
            >
              Addresses
            </Link>
          </Button>
        </li>

        <li>
          <Button
            asChild
            variant="link"
            className={cn(
              styles.link,
              (pathname === '/orders' || pathname.includes('/orders')) && styles['link--active'],
            )}
          >
            <Link href="/orders">Orders</Link>
          </Button>
        </li>
      </ul>

      <hr className={styles.divider} />

      <Button
        asChild
        variant="link"
        className={cn(styles.link, pathname === '/logout' && styles['link--active'])}
      >
        <Link href="/logout">Log out</Link>
      </Button>
    </div>
  )
}
