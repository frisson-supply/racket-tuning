'use client'
import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export const LivePreviewListener: React.FC = () => {
  const router = useRouter()
  return (
    <PayloadLivePreview
      refresh={router.refresh}
      // ponytail: the admin iframes us on its own origin, so derive it instead of
      // trusting NEXT_PUBLIC_SERVER_URL — any port/host/trailing-slash drift there
      // makes isDocumentEvent reject every message and live preview goes silent.
      serverURL={typeof window === 'undefined' ? '' : window.location.origin}
    />
  )
}
