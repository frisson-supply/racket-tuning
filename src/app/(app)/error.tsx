'use client'

import ErrorFeature from '@/features/error'

export default function Error({ reset }: { reset: () => void }) {
  return <ErrorFeature reset={reset} />
}
