'use client'

import { CustomEase } from 'gsap/CustomEase'
import gsap from 'gsap'
import { XIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef } from 'react'

import { useFlyout } from '@/providers/flyout'

import styles from './flyout-panel.module.css'

gsap.registerPlugin(CustomEase)

type Props = {
  children: React.ReactNode
}

export function FlyoutPanel({ children }: Props) {
  const router = useRouter()
  const { setIsOpen } = useFlyout()
  const contentRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLElement | null>(null)
  const closingRef = useRef(false)

  useEffect(() => {
    if (!CustomEase.get('energy')) {
      CustomEase.create('energy', 'M0,0 C0.32,0.72 0,1 1,1')
    }

    const main = document.querySelector<HTMLElement>('[data-flyout-main]')
    const content = contentRef.current
    const panel = panelRef.current
    if (!main || !content || !panel) return

    mainRef.current = main

    gsap.set(main, {
      height: '100vh',
      overflowX: 'hidden',
      overflowY: 'auto',
      transformOrigin: 'center center',
    })

    gsap.to(main, {
      x: -panel.offsetWidth,
      scale: 0.96,
      borderRadius: '2em',
      duration: 0.6,
      ease: 'energy',
    })
    gsap.fromTo(
      content,
      { autoAlpha: 0, x: 24 },
      { autoAlpha: 1, x: 0, duration: 0.5, ease: 'power3.out', delay: 0.15 },
    )

    setIsOpen(true)

    return () => {
      setIsOpen(false)
      gsap.set(main, {
        clearProps:
          'height,overflowX,overflowY,transform,transformOrigin,borderRadius,filter',
      })
    }
  }, [setIsOpen])

  const close = () => {
    if (closingRef.current) return
    closingRef.current = true
    setIsOpen(false)

    const main = mainRef.current
    const content = contentRef.current
    if (!main || !content) {
      router.back()
      return
    }

    gsap.killTweensOf([main, content])
    gsap.to(content, { autoAlpha: 0, x: 24, duration: 0.3, ease: 'power3.in' })
    gsap.to(main, {
      x: 0,
      scale: 1,
      borderRadius: 0,
      duration: 0.5,
      ease: 'power3.inOut',
      onComplete: () => router.back(),
    })
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.panel} ref={panelRef} role="dialog" aria-modal="true">
      <button aria-label="Close" className={styles.close} onClick={close} type="button">
        Close
        <XIcon className="size-4" />
      </button>
      <div className={styles.content} ref={contentRef}>
        {children}
      </div>
    </div>
  )
}
