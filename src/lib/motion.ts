import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

// Dev-only handle so scroll positions can be inspected from the console.
if (import.meta.env.DEV) {
  ;(window as unknown as Record<string, unknown>).ScrollTrigger = ScrollTrigger
}

/** Design canvas breakpoint. Matches the `md:` boundary used across the site. */
export const MOBILE_QUERY = '(max-width: 767px)'

export function isMobile() {
  return window.matchMedia(MOBILE_QUERY).matches
}

export function reduceMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

let lenis: Lenis | null = null

/**
 * Smooth scroll, driven off the GSAP ticker so ScrollTrigger and Lenis stay on
 * the same frame. Skipped entirely when the visitor asks for reduced motion.
 */
export function initSmoothScroll() {
  if (lenis || reduceMotion()) return null

  lenis = new Lenis({
    duration: 1.1,
    smoothWheel: true,
    // Native momentum on touch feels better than a JS-smoothed one.
    syncTouch: false,
  })

  lenis.on('scroll', ScrollTrigger.update)

  const raf = (time: number) => lenis?.raf(time * 1000)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)

  return () => {
    gsap.ticker.remove(raf)
    lenis?.destroy()
    lenis = null
  }
}

export function lockScroll() {
  document.body.classList.add('is-preloading')
  lenis?.stop()
}

export function unlockScroll() {
  document.body.classList.remove('is-preloading')
  lenis?.start()
}

/**
 * Header contrast per chapter.
 *
 * Dark sections paint their own background, so the only thing that has to
 * follow the scroll is the fixed header. Each dark section owns the chrome for
 * exactly as long as it sits under the header — the same idea as userank.com's
 * `filter: invert()` scrub, keyed to the top of the viewport rather than a
 * whole-page tint, so a heading is never left on the wrong ground.
 */
export function darkChapters(selectors: string[]) {
  const triggers: ScrollTrigger[] = []

  /*
   * Recomputed from scratch on every toggle rather than tracked with a
   * counter: enter/leave callbacks can fire more than once across a refresh,
   * and a counter that drifts above zero leaves the header stuck in dark
   * chrome over a light section.
   */
  const sync = () => {
    const overDark = triggers.some((t) => t.isActive === true)
    document.body.classList.toggle('on-dark', overDark)
  }

  // The handover has to happen the moment the section slides under the header,
  // not when it reaches the top of the viewport — otherwise the wordmark spends
  // the height of the bar as dark ink on a dark ground.
  const headerHeight = () =>
    document.querySelector('header')?.getBoundingClientRect().height ?? 60

  selectors.forEach((selector) => {
    const el = document.querySelector(selector)
    if (!el) return

    triggers.push(
      ScrollTrigger.create({
        trigger: el,
        start: () => `top ${headerHeight()}px`,
        end: () => `bottom ${headerHeight()}px`,
        invalidateOnRefresh: true,
        onToggle: sync,
        onRefresh: sync,
      }),
    )
  })

  sync()
}
