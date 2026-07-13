import { CMSLink } from '@/components/common/link'
import { Image } from '@/components/common/media/image'
import type { Header } from 'src/payload-types'

import { cn } from '@/utilities/cn'
import styles from './header.module.css'

type NavItem = NonNullable<Header['navItems']>[number]

type Props = {
  item: NavItem
}

function ArrowIcon() {
  return (
    <svg className={styles.icon} fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.33398 12.6666L14.0007 7.99992L9.33398 3.33325" stroke="currentColor" strokeMiterlimit="10" />
      <path d="M14.0007 8H1.33398" stroke="currentColor" strokeMiterlimit="10" />
    </svg>
  )
}

export function NavDropdown({ item }: Props) {
  const children = item.children || []

  if (!children.length) return null

  return (
    <div className={styles.navDropdown}>
      <div className={styles.navDropdownOverflow}>
        <div className={styles.navDropdownOverflowInner}>
          <div className={cn('container', styles.navDropdownInner)}>
            <ul className={styles.navDropdownContent}>
              {children.map((child) => {
                const image = typeof child.image === 'object' ? child.image : undefined
                const { label, ...link } = child.link

                return (
                  <li className={styles.navDropdownContentLi} key={child.id}>
                    <CMSLink {...link} appearance="inline" className={styles.navDropdownLink}>
                      <div className={styles.navDropdownLinkBg}>
                        {image ? (
                          <Image imgClassName={styles.navDropdownImg} resource={image} fill />
                        ) : (
                          <div className={styles.navDropdownPlaceholder} />
                        )}
                        <div className={styles.navDropdownImgOverlay} />
                      </div>
                      <div className={styles.navDropdownLinkInner}>
                        <span className={styles.navDropdownLinkLabel}>{label}</span>
                        <div className={styles.navDropdownLinkBubble}>
                          <ArrowIcon />
                        </div>
                      </div>
                    </CMSLink>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
