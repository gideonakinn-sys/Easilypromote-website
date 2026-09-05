import { useLayoutEffect, useRef } from 'react'
import {
  gsap,
  ScrollTrigger,
  initSmoothScroll,
  reduceMotion,
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

/* The full intro only plays on the first Home visit per tab. Returning to
   / jumps straight to the settled hero instead of replaying the lock. */
const INTRO_PLAYED_KEY = 'ep-intro-played'

function sessionHasIntroPlayed() {
  try {
    return window.sessionStorage.getItem(INTRO_PLAYED_KEY) === '1'
  } catch {
    return false
  }
}

function markIntroPlayed() {
  try {
    window.sessionStorage.setItem(INTRO_PLAYED_KEY, '1')
  } catch {
    /* Privacy mode: no storage, no tracking - the intro will replay. */
  }
}

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
        // The motion styles still leave the full-bleed card in place, so the
        // header needs its dark chrome even when the intro is skipped — and it
        // has to give it back as the hero scrolls away.
        markIntroPlayed()
        document.body.classList.add('on-dark')
        darkChapters(DARK_CHAPTERS)
        unlockScroll()
        return
      }

      // Repeat visits skip the gate entirely: settle the card, build the
      // scroll work, and hand the page straight over.
      if (sessionHasIntroPlayed()) {
        gsap.set('[data-hero="card"]', { scale: 1 })
        gsap.set('[data-hero="scrim"]', { opacity: SCRIM_REST })
        document.body.classList.add('on-dark')
        darkChapters(DARK_CHAPTERS)
        unlockScroll()
        buildScrollChoreography()
        ScrollTrigger.refresh()
        return
      }

      // Lock immediately so nothing scrolls while webfonts are still landing.
      lockScroll()

      // The header sits over the dark video card from the start of the reveal —
      // give it its dark chrome immediately.
      document.body.classList.add('on-dark')

      const runIntro = async () => {
        let playing = false
        try {
          // Build the intro before we wait on fonts. The reveal tweens sit
          // hidden in their "from" state the moment they are created, so the
          // navbar and hero copy never flash, disappear and come back — they
          // simply are not there until their beat arrives.
          const intro = buildIntro()
          if (import.meta.env.DEV) {
            // Dev handle for scrubbing the opening: __intro.pause(1.5)
            ;(window as unknown as Record<string, unknown>).__intro = intro
          }

          // Hold the reveal until the typefaces are in, so it plays in the
          // real font rather than the fallback (with a safety timeout).
          const fontsReady = document.fonts
            ? Promise.race([
                document.fonts.ready,
                new Promise((resolve) => setTimeout(resolve, 1500)),
              ])
            : Promise.resolve()
          await fontsReady
          if (cancelled) return

          intro.eventCallback('onComplete', () => {
            markIntroPlayed()
            buildScrollChoreography()
            ScrollTrigger.refresh()
            unlockScroll()
          })
          intro.play()
          playing = true
        } finally {
          // The scroll must always come back: if anything above threw before
          // the reveal got to play, this releases the page instead of leaving
          // it locked behind `is-preloading`.
          if (!playing) unlockScroll()
        }
      }

      runIntro()
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
      <div data-stage="lead" className="relative bg-paper">
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
 * The small centred video frame is already on the stone ground and playing
 * the moment the page paints. It holds there for a beat — the anticipation —
 * then sweeps out to fill the width, and the navbar and hero copy fade in on
 * top of the settled frame.
 *
 *  0.00  the small frame holds, playing; the scrim eases off
 *  1.40  the frame expands from centre to full width (~1.3s)
 *  2.45  as it lands, the hero copy and the header fade up
 *
 * ~3.2s, and the page cannot scroll until it lands.
 * ───────────────────────────────────────────────────────────────────────── */
function buildIntro() {
  const header = document.querySelector('header')

  const tl = gsap.timeline({
    paused: true,
    delay: 0.15,
    defaults: { ease: 'power2.out', duration: 0.75 },
  })

  tl
    // Settle the scrim while the frame holds.
    .fromTo(
      '[data-hero="scrim"]',
      { opacity: SCRIM_DARK },
      { opacity: SCRIM_REST, duration: 0.5 },
      0,
    )
    // After the hold, the frame sweeps out to fill the width.
    .to(
      '[data-hero="card"]',
      { scale: 1, duration: 1.3, ease: 'power2.inOut' },
      1.4,
    )
    // As it lands, the copy and the header fade up together.
    .fromTo(
      '[data-hero="head"] > *',
      { y: 16, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out', stagger: 0.08 },
      2.45,
    )

  if (header) {
    tl.fromTo(
      header,
      { y: -8, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' },
      2.45,
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
      // offsetTop/offsetLeft ignore transforms, so the card lands on the
      // slot's resting spot while the headline lines are still rising around
      // it (getBoundingClientRect would read the mid-animation position).
      let top = 0
      let left = 0
      let node: HTMLElement | null = slot
      while (node && node !== stage) {
        top += node.offsetTop
        left += node.offsetLeft
        node = node.offsetParent as HTMLElement | null
      }
      return {
        top,
        left,
        width: slot.offsetWidth,
        height: slot.offsetHeight,
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
