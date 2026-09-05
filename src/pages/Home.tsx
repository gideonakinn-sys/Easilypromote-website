import { useLayoutEffect, useRef } from 'react'
import {
  gsap,
  ScrollTrigger,
  initSmoothScroll,
  reduceMotion,
  isMobile,
  lockScroll,
  unlockScroll,
  darkChapters,
} from '../lib/motion'
import Hero from '../components/Hero'
import HeroCard from '../components/HeroCard'
import Approval from '../components/sections/Approval'
import HowItWorks from '../components/sections/HowItWorks'
import Products from '../components/sections/Products'
import Compare from '../components/sections/Compare'
import Calculator from '../components/sections/Calculator'
import Letter from '../components/sections/Letter'
import Faq from '../components/sections/Faq'
import Closing from '../components/sections/Closing'

/*
 * The header scrolls away with the hero, so the hero is the only section that
 * is ever underneath it. Approval and closing paint dark grounds too, but the
 * header is long gone by then.
 */
const DARK_CHAPTERS = ['[data-section="hero"]']

const SCRIM_DARK = 1
const SCRIM_REST = 0.86

function Home() {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    let cancelled = false

    // Claim the card before anything else, so the no-JS failsafe in index.html
    // stands down. Without this it fires on every load and hides the card.
    document.documentElement.classList.add('motion-ready')

    const teardownScroll = initSmoothScroll()

    const ctx = gsap.context(() => {
      if (reduceMotion()) {
        unlockScroll()
        return
      }

      // Lock immediately so nothing scrolls while webfonts are still landing.
      lockScroll()

      // Measuring the chip before Figtree loads gives a stale width, so hold
      // the intro until the faces are ready (with a safety timeout).
      const fontsReady = document.fonts
        ? Promise.race([
            document.fonts.ready,
            new Promise((resolve) => setTimeout(resolve, 1500)),
          ])
        : Promise.resolve()

      fontsReady.then(() => {
        if (cancelled) return
        const intro = buildIntro()
        if (import.meta.env.DEV) {
          // Dev handle for scrubbing the opening: __intro.pause(1.5)
          ;(window as unknown as Record<string, unknown>).__intro = intro
        }
        intro.eventCallback('onComplete', () => {
          unlockScroll()
          buildScrollChoreography()
          ScrollTrigger.refresh()
        })
        intro.play()
      })
    }, rootRef)

    return () => {
      cancelled = true
      ctx.revert()
      teardownScroll?.()
      unlockScroll()
      document.body.classList.remove('on-dark')
    }
  }, [])

  return (
    <div ref={rootRef} className="flex flex-1 flex-col">
      {/*
        Hero and approval share one positioning context so the video card can
        travel out of the first and land inside the second. The card is the
        first child and carries no z-index, so both sections paint over it.
      */}
      <div data-stage="lead" className="relative bg-night">
        <HeroCard />
        <Hero />
        <Approval />
      </div>

      <HowItWorks />
      <Products />
      <Compare />
      <Calculator />
      <Letter />
      <Faq />
      <Closing />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────
 * The intro.
 *
 * Beat for beat, the opening from userank.com:
 *
 *   0.00  the card punches in from scale 0, rotated -25°, landing small and
 *         still tilted at -15°, while the footage INSIDE it zooms to 1.5 —
 *         so the frame shrinks as the picture grows
 *   0.30  headline enters from the left edge; paragraph enters from the right
 *         and deliberately parks short of its mark
 *   1.35  paragraph settles the rest of the way
 *   1.45  the whole head group drops in from above
 *   1.50  the card expands to fill the screen and un-rotates, footage settling
 *         back to 1:1
 *   1.65  the right rail snaps in
 *
 * ~2.6s, and the page cannot scroll until it lands.
 * ───────────────────────────────────────────────────────────────────────── */
function buildIntro() {
  const mobile = isMobile()
  const chip = document.querySelector<HTMLElement>('[data-hero="chip"]')
  const chipWidth = chip ? chip.scrollWidth : 0

  // Where the paragraph parks before its final settle.
  const parkX = mobile ? '10vw' : '38vw'

  const tl = gsap.timeline({
    paused: true,
    delay: 0.35,
    defaults: { ease: 'power2.out', duration: 0.75 },
  })

  if (chip) tl.set(chip, { width: 0 }, 0)

  tl
    // The card: in small and tilted…
    .fromTo(
      '[data-hero="card"]',
      { scale: 0, rotate: -25, autoAlpha: 0 },
      { scale: 0.278, rotate: -15.18, autoAlpha: 1 },
      0,
    )
    .fromTo(
      '[data-hero="scrim"]',
      { opacity: SCRIM_DARK },
      { opacity: SCRIM_REST },
      0,
    )
    // …while the footage inside it zooms the other way.
    .fromTo('[data-reveal="carousel"]', { scale: 1 }, { scale: 1.5, duration: 1 }, 0)

    // Copy enters from opposite edges.
    .fromTo(
      '[data-hero="head"] h1',
      { x: '-50vw', autoAlpha: 0 },
      { x: 0, autoAlpha: 1 },
      0.35,
    )
    .fromTo(
      '[data-hero="para"]',
      { x: '100vw', autoAlpha: 0, scale: 0.85 },
      { x: parkX, autoAlpha: 1, scale: 0.85 },
      0.3,
    )
    // The settle. This beat is what makes it read as choreography.
    .to(
      '[data-hero="para"]',
      { x: 0, scale: 1, duration: 1, ease: 'power2.inOut' },
      1.35,
    )
    .fromTo(
      '[data-hero="head"] > *',
      { y: '-35vh' },
      { y: '0vh', duration: 1, ease: 'power2.inOut' },
      1.45,
    )

    // …and the card opens out to full bleed.
    .to(
      '[data-hero="card"]',
      { scale: 1, rotate: 0, duration: 1, ease: 'power1.inOut' },
      1.5,
    )
    .to(
      '[data-reveal="carousel"]',
      { scale: 1, duration: 1, ease: 'power1.inOut' },
      1.5,
    )
    .fromTo(
      '[data-hero="rail"]',
      { xPercent: 150, autoAlpha: 0 },
      { xPercent: 0, autoAlpha: 1, duration: 1, ease: 'power2' },
      1.65,
    )
    .fromTo('[data-hero="top"]', { autoAlpha: 0 }, { autoAlpha: 1 }, 1.7)

  if (chip) {
    tl.to(chip, { width: chipWidth, duration: 0.55, ease: 'power2.out' }, 2.1).set(
      chip,
      { width: 'auto' },
    )
  }

  return tl
}

/* ─────────────────────────────────────────────────────────────────────────
 * Scroll choreography.
 *
 * Scroll-linked rather than scroll-hijacked: the reader keeps find-in-page,
 * skimming and deep links, and still gets the pinned stack, the chapter
 * grounds and the shrinking hero that give userank.com its feel.
 * ───────────────────────────────────────────────────────────────────────── */
function buildScrollChoreography() {
  /*
   * Collapse the step list into its single grid cell FIRST. Doing this removes
   * roughly three viewport heights from the document, so any trigger created
   * before it would be measured against a layout that no longer exists.
   */
  const stack = document.querySelector<HTMLElement>('[data-how="stack"]')
  const cards = gsap.utils.toArray<HTMLElement>('[data-how="card"]')
  const counter = document.querySelector<HTMLElement>('[data-how="counter"]')
  const hasStack = Boolean(stack) && cards.length > 1

  if (hasStack) {
    stack!.classList.add('is-stacked')
    gsap.set(cards.slice(1), { yPercent: 100 })
  }

  /* 1 ── The handoff.
   *
   * The full-bleed card flies down out of the hero and shrinks onto the empty
   * slot sitting in the approval headline, so the video ends up set between
   * the lines of type — the move userank.com makes between its hero and intro.
   * The approval lines rise around it as it arrives.
   *
   * Target geometry is read from the slot itself and recomputed on refresh,
   * so it stays correct at any viewport size.
   */
  const stage = document.querySelector<HTMLElement>('[data-stage="lead"]')
  const slot = document.querySelector<HTMLElement>('[data-approval="slot"]')

  if (stage && slot) {
    const target = () => {
      const s = slot.getBoundingClientRect()
      const w = stage.getBoundingClientRect()
      return {
        top: s.top - w.top,
        left: s.left - w.left,
        width: s.width,
        height: s.height,
        radius: getComputedStyle(slot).borderTopLeftRadius,
      }
    }

    gsap
      .timeline({
        // duration:1 spans the whole scrub. Without it GSAP's 0.5s default
        // lands the card halfway down the hero and parks it there.
        defaults: { ease: 'none', duration: 1 },
        scrollTrigger: {
          trigger: '[data-section="hero"]',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
      .to(
        '[data-hero="card"]',
        {
          top: () => target().top,
          left: () => target().left,
          width: () => target().width,
          height: () => target().height,
          borderRadius: () => target().radius,
          clipPath: () => `inset(0 round ${target().radius})`,
        },
        0,
      )
      // The scrim exists to keep hero copy legible. Once the card is a small
      // square with no type on it, it should be clean footage.
      .to('[data-hero="scrim"]', { opacity: 0 }, 0)
      .to(
        '[data-hero="head"], [data-hero="rail"], [data-hero="top"]',
        { y: '-10vh', autoAlpha: 0, duration: 0.35 },
        0,
      )
      // The copy rises around the card as it arrives.
      .from(
        '[data-approval="line"]',
        { yPercent: 300, autoAlpha: 0, stagger: { amount: 0.2 }, duration: 0.45 },
        0.5,
      )
  }

  /* 2 ── Approval chapter: body copy lifts in, the stamp pops on a spring. */
  gsap.from('[data-approval="body"]', {
    y: 18,
    autoAlpha: 0,
    duration: 0.7,
    ease: 'power3.out',
    stagger: 0.1,
    scrollTrigger: { trigger: '[data-section="approval"]', start: 'top 62%' },
  })

  gsap.from('[data-approval="beat"]', {
    y: 22,
    autoAlpha: 0,
    duration: 0.6,
    ease: 'power3.out',
    stagger: 0.12,
    scrollTrigger: { trigger: '[data-approval="beat"]', start: 'top 82%' },
  })

  gsap.fromTo(
    '[data-approval="seal"]',
    { autoAlpha: 0, scale: 0.6, rotate: -14 },
    {
      autoAlpha: 1,
      scale: 1,
      rotate: -3,
      duration: 0.55,
      ease: 'back.out(1.7)',
      scrollTrigger: { trigger: '[data-approval="seal"]', start: 'top 88%' },
    },
  )

  /* 3 ── The pinned stack: four steps sharing one grid cell. */
  if (hasStack) {
    const stackTl = gsap.timeline({ defaults: { ease: 'none' } })
    cards.slice(1).forEach((card) => {
      stackTl.to(card, { yPercent: 0, duration: 1 })
    })

    ScrollTrigger.create({
      trigger: '[data-how="stage"]',
      start: 'top top',
      end: `+=${(cards.length - 1) * 100}%`,
      pin: true,
      anticipatePin: 1,
      scrub: true,
      // The pin changes document height, so it must refresh before every
      // trigger that sits below it computes its own start and end.
      refreshPriority: 1,
      animation: stackTl,
      onUpdate: (self) => {
        if (!counter) return
        const step = Math.min(
          cards.length,
          Math.floor(self.progress * cards.length) + 1,
        )
        counter.textContent = `Step 0${step} / 0${cards.length}`
      },
    })
  }

  /* 4 ── Product cards. */
  gsap.from('[data-products="card"]', {
    y: 34,
    autoAlpha: 0,
    duration: 0.75,
    ease: 'power3.out',
    stagger: 0.12,
    scrollTrigger: { trigger: '[data-section="products"]', start: 'top 65%' },
  })

  /* 5 ── Comparison rows fill in top to bottom. */
  gsap.from('[data-compare="row"]', {
    autoAlpha: 0,
    y: 14,
    duration: 0.5,
    ease: 'power2.out',
    stagger: 0.07,
    scrollTrigger: { trigger: '[data-compare="scroll"]', start: 'top 75%' },
  })

  /* 6 ── The read-along. Characters light up left to right as you scroll,
   *      the same per-character scrub userank.com uses on its manifesto. */
  const chars = gsap.utils.toArray<HTMLElement>('[data-letter="char"]')
  if (chars.length) {
    gsap.fromTo(
      chars,
      { color: '#c4bfba' },
      {
        color: '#1c1917',
        duration: 0.1,
        ease: 'none',
        stagger: { amount: 1.6 },
        scrollTrigger: {
          trigger: '[data-letter="lead"]',
          start: 'top 78%',
          end: 'bottom 55%',
          scrub: true,
        },
      },
    )
  }

  gsap.from('[data-letter="para"], [data-letter="signoff"]', {
    y: 20,
    autoAlpha: 0,
    duration: 0.7,
    ease: 'power3.out',
    stagger: 0.1,
    scrollTrigger: { trigger: '[data-letter="para"]', start: 'top 80%' },
  })

  /* 7 ── Calculator. */
  gsap.from('[data-calc="reveal"]', {
    y: 24,
    autoAlpha: 0,
    duration: 0.7,
    ease: 'power3.out',
    stagger: 0.09,
    scrollTrigger: { trigger: '[data-section="calculator"]', start: 'top 70%' },
  })

  /* 8 ── FAQ rows. */
  gsap.from('[data-faq="item"]', {
    y: 16,
    autoAlpha: 0,
    duration: 0.55,
    ease: 'power2.out',
    stagger: 0.06,
    scrollTrigger: { trigger: '[data-faq="list"]', start: 'top 78%' },
  })

  /* 9 ── Closing. */
  gsap.from(
    '[data-closing="stamp"], [data-closing="head"], [data-closing="body"], [data-closing="cta"]',
    {
      y: 28,
      autoAlpha: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.09,
      scrollTrigger: { trigger: '[data-section="closing"]', start: 'top 68%' },
    },
  )

  /* 10 ── Header chrome last, so it measures the final document height. */
  darkChapters(DARK_CHAPTERS)
}

export default Home
