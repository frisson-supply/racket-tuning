'use client'

import type { About } from '@/payload-types'

import { CustomEase } from 'gsap/CustomEase'
import gsap from 'gsap'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { useFocusTrap } from '@/hooks/use-focus-trap'
import { localeFromPathname, localizedHref } from '@/utilities/localized-path'

import './index.css'

gsap.registerPlugin(CustomEase)

const ABOUT_HREF = '/about'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

type Props = Pick<About, 'heading' | 'body' | 'socialLinks' | 'contactEmail'>

export function AboutPanelClient({ heading, body, socialLinks, contactEmail }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const isOpen = pathname === localizedHref(localeFromPathname(pathname), ABOUT_HREF)

  const panelRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const enterEndTime = useRef(0)
  const isOpenRef = useRef(false)

  useFocusTrap(panelRef, isOpen, () => router.back())

  // Builds the single paused timeline once
  useEffect(() => {
    if (tlRef.current) return

    const mainEl = document.querySelector<HTMLElement>('[data-about-main]')
    const overlayEl = overlayRef.current
    const panelEl = panelRef.current
    if (!mainEl || !overlayEl || !panelEl) return

    if (!CustomEase.get('energy')) {
      CustomEase.create('energy', 'M0,0 C0.32,0.72 0,1 1,1')
    }

    const darkEl = overlayEl.querySelector<HTMLElement>('[data-dark]')
    const corners = overlayEl.querySelectorAll('[data-corner]')
    const overlayBorders = overlayEl.querySelectorAll('[data-border-row]')
    const largeItems = panelEl.querySelectorAll('[data-reveal-l]')
    const smallItems = panelEl.querySelectorAll('[data-reveal-s]')
    const menuBorder = panelEl.querySelector('[data-menu-border]')

    const getPanelOffset = () => -panelEl.offsetWidth

    gsap.set(overlayEl, { visibility: 'hidden', pointerEvents: 'none' })
    gsap.set(panelEl, { visibility: 'hidden' })
    gsap.set(darkEl, { autoAlpha: 0 })
    gsap.set(mainEl, { x: 0 })
    gsap.set(overlayBorders[0], { yPercent: -100 })
    gsap.set(overlayBorders[1], { yPercent: 100 })
    gsap.set(corners, { scale: 0 })
    gsap.set(menuBorder, { scaleX: 0 })

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: 'energy', easeReverse: 'power2.inOut' },
    })

    tl.set(overlayEl, { visibility: 'visible', pointerEvents: 'auto' }, 0)
      .set(panelEl, { visibility: 'visible' }, 0)
      .to([mainEl, overlayEl], { x: getPanelOffset, duration: 0.7 }, 0)
      .to(darkEl, { autoAlpha: 1, duration: 0.5 }, 0)
      .to(corners, { scale: 1, duration: 0.5 }, 0)
      .to(overlayBorders, { yPercent: 0, duration: 0.5 }, 0)
      .fromTo(
        largeItems,
        { autoAlpha: 0, xPercent: 25 },
        { autoAlpha: 1, xPercent: 0, duration: 0.7, stagger: 0.05 },
        0,
      )
      .fromTo(
        smallItems,
        { autoAlpha: 0, yPercent: 100 },
        { autoAlpha: 1, yPercent: 0, duration: 0.5, stagger: 0.03, ease: 'power3.out' },
        0.3,
      )
      .to(menuBorder, { scaleX: 1, duration: 0.5 }, '<')
    enterEndTime.current = tl.duration()
    tl.addPause()

    tl.to([largeItems, smallItems], { autoAlpha: 0, duration: 0.3 }, '<')
      .to([mainEl, overlayEl], { x: 0, duration: 0.6 }, '<')
      .to(darkEl, { autoAlpha: 0, duration: 0.35, ease: 'power2.inOut' }, '<')
      .to(corners, { scale: 0, duration: 0.5 }, '<')
      .to(overlayBorders[0], { yPercent: -100, duration: 0.5 }, '<')
      .to(overlayBorders[1], { yPercent: 100, duration: 0.5 }, '<')
      .to(menuBorder, { scaleX: 0, duration: 0.5 }, '<')
      .set(overlayEl, { visibility: 'hidden', pointerEvents: 'none' })
      .set(panelEl, { visibility: 'hidden' })

    tlRef.current = tl

    // Direct URL load on /about: jump to open state without animating
    if (isOpen) {
      isOpenRef.current = true
      tl.seek(enterEndTime.current)
      tl.pause()
    }

    return () => {
      tl.kill()
      tlRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Toggle mapped to pathname — fires on every navigation
  useEffect(() => {
    const tl = tlRef.current
    if (!tl) return

    if (isOpen === isOpenRef.current) return
    const shouldBeOpen = isOpen

    isOpenRef.current = shouldBeOpen

    if (prefersReducedMotion()) {
      tl.seek(shouldBeOpen ? enterEndTime.current : tl.totalDuration())
      tl.pause()
      return
    }

    if (shouldBeOpen) {
      tl.invalidate()
      if (tl.time() >= enterEndTime.current) tl.timeScale(1).restart()
      else tl.timeScale(1).play()
    } else {
      if (tl.time() < enterEndTime.current) tl.timeScale(1).reverse()
      else tl.timeScale(1).play()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <>
      <div ref={overlayRef} className="aboutOverlay" onClick={() => router.back()}>
        <div data-dark className="aboutOverlay__dark" />
        <div className="aboutOverlay__borders">
          <div data-border-row className="aboutOverlay__borderRow">
            <div className="aboutOverlay__border" />
            <div data-corner className="aboutOverlay__corner" />
          </div>
          <div data-border-row className="aboutOverlay__borderRow">
            <div data-corner className="aboutOverlay__corner aboutOverlay__corner--bottom" />
            <div className="aboutOverlay__border" />
          </div>
        </div>
      </div>
      <div
        ref={panelRef}
        data-about-panel
        className="aboutPanel"
        role="dialog"
        aria-modal={isOpen}
        aria-label="About"
        tabIndex={-1}
      >
        <button
          data-reveal-s
          className="aboutPanel__close"
          onClick={() => router.back()}
          aria-label="Close about panel"
        >
          <span>Close</span>
          <span aria-hidden="true">✕</span>
        </button>
        <div className="aboutPanel__inner">
          <div data-reveal-l>
            <h2 className="aboutPanel__heading">{heading}</h2>
          </div>
          <ul className="aboutPanel__list">
            <li data-reveal-l>
              <p className="aboutPanel__body">{body}</p>
            </li>
          </ul>
          <div className="aboutPanel__bottom">
            <div className="aboutPanel__bottomCol">
              {socialLinks && socialLinks.length > 0 && (
                <>
                  <div data-reveal-s>
                    <span className="aboutPanel__faded">Find us on</span>
                  </div>
                  <ul className="aboutPanel__list aboutPanel__list--small">
                    {socialLinks.map((socialLink) => (
                      <li data-reveal-s key={socialLink.id ?? socialLink.url}>
                        <a
                          className="aboutPanel__linkSmall"
                          href={socialLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {socialLink.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {contactEmail && (
                <p data-reveal-s className="aboutPanel__contactLine">
                  or{' '}
                  <a className="aboutPanel__linkSmall" href={`mailto:${contactEmail}`}>
                    get in touch directly
                  </a>
                </p>
              )}
            </div>
            <div data-menu-border className="aboutPanel__bottomBorder" />
          </div>
        </div>
      </div>
    </>
  )
}
