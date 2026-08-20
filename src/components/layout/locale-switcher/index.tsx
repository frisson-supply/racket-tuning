'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { locales } from '@/utilities/localized-path'
import styles from './locale-switcher.module.css'

export function LocaleSwitcher() {
  const pathname = usePathname()
  const strippedPath = pathname.replace(/^\/en(\/|$)/, '/')

  return (
    <div className={styles.switcher}>
      {locales.map((locale) => {
        const isActive = locale === 'en' ? pathname.startsWith('/en') : !pathname.startsWith('/en')
        const href =
          locale === 'en' ? `/en${strippedPath === '/' ? '' : strippedPath}` : strippedPath

        return (
          <Link
            key={locale}
            aria-current={isActive ? 'page' : undefined}
            className={styles.link}
            data-active={isActive}
            href={href}
          >
            {locale.toUpperCase()}
          </Link>
        )
      })}
    </div>
  )
}
