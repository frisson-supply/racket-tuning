import type { ReactNode } from 'react'

import { headers as getHeaders } from 'next/headers.js'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { RenderParams } from '@/components/common/render-params'
import { AccountNav } from '@/features/account/account-nav'
import styles from './account.module.css'

export default async function RootLayout({ children }: { children: ReactNode }) {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  return (
    <div>
      <div className="container">
        <RenderParams className="" />
      </div>

      <div className={`container ${styles['layout-row']}`}>
        {user && <AccountNav className={styles.nav} />}

        <div className={styles['content-area']}>{children}</div>
      </div>
    </div>
  )
}
