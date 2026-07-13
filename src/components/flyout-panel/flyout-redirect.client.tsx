'use client'

import { useEffect } from 'react'

export function FlyoutRedirect({ slug }: { slug: string }) {
  useEffect(() => {
    window.location.href = `/${slug}`
  }, [slug])

  return null
}
