'use client'

import { type RefObject, useEffect, useRef } from 'react'

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export const useFocusTrap = (
  ref: RefObject<HTMLElement | null>,
  isOpen: boolean,
  onClose: () => void,
) => {
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!isOpen || !ref.current) return

    const el = ref.current
    const getFocusable = () => Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS))

    const previouslyFocused = document.activeElement as HTMLElement | null

    // ponytail: rAF lets GSAP flip visibility before we focus
    const raf = requestAnimationFrame(() => el.focus())

    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current()
        return
      }
      if (e.key !== 'Tab') return

      const focusable = getFocusable()
      if (!focusable.length) {
        e.preventDefault()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    const onFocusIn = (e: FocusEvent) => {
      if (!el.contains(e.target as Node)) el.focus()
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('focusin', onFocusIn)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('focusin', onFocusIn)
      document.body.style.overflow = ''
      previouslyFocused?.focus()
    }
  }, [isOpen, ref])
}
