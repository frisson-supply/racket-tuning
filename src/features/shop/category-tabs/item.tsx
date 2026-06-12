'use client'
import { cn } from '@/utilities/cn'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import styles from './item.module.css'

type Props = {
  href: string
  title: string
}

export function Item({ href, title }: Props) {
  const pathname = usePathname()
  const active = pathname === href
  const DynamicTag = active ? 'p' : Link

  return (
    <li className={styles.item}>
      <DynamicTag
        className={cn(styles.link, active && styles['link--active'])}
        href={href}
        prefetch={!active ? false : undefined}
      >
        {title}
      </DynamicTag>
    </li>
  )
}
