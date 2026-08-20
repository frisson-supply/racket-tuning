import type { ReactNode } from 'react'

import { AboutPanel } from '@/components/about-panel'
import { AdminBar } from '@/components/admin/admin-bar'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { LivePreviewListener } from '@/components/admin/live-preview-listener'
import { ensureStartsWith } from '@/utilities/ensure-starts-with'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/theme/init-theme'
import { type Locale, locales } from '@/utilities/localized-path'
import { Geist, Geist_Mono, Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import React from 'react'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

/* const { SITE_NAME, TWITTER_CREATOR, TWITTER_SITE } = process.env
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000'
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined
 */
/* export const metadata = {
  metadataBase: new URL(baseUrl),
  robots: {
    follow: true,
    index: true,
  },
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite,
      },
    }),
} */

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
  children,
  modal,
  params,
}: {
  children: ReactNode
  modal: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: segment } = await params

  // `/favicon.ico`, `/anything.js` etc. slip past the proxy matcher and land here
  if (!locales.includes(segment as Locale)) notFound()
  const locale = segment as Locale

  return (
    <html
      className={[geistSans.variable, geistMono.variable, inter.variable].filter(Boolean).join(' ')}
      lang={locale}
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar />
          <LivePreviewListener />

          <AboutPanel locale={locale} />

          <div data-about-main>
            <Header locale={locale} />
            <main>{children}</main>
            <Footer locale={locale} />
          </div>
          {modal}
        </Providers>
      </body>
    </html>
  )
}
