import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import VideoCarousel from '../components/VideoCarousel'
import Hero from '../components/Hero'

function Home() {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(
        '[data-reveal="carousel"]',
        { y: 30, opacity: 0, duration: 0.9 },
      )
        .from(
          '[data-reveal="word"]',
          {
            yPercent: 110,
            opacity: 0,
            duration: 0.85,
            ease: 'power4.out',
            stagger: 0.035,
          },
          '-=0.55',
        )
        .from(
          '[data-reveal="subtext"]',
          { y: 18, opacity: 0, duration: 0.7 },
          '-=0.45',
        )
        .from(
          '[data-reveal="cta"]',
          { y: 16, opacity: 0, duration: 0.6 },
          '-=0.35',
        )
        .from(
          '[data-reveal="asset"]',
          {
            scale: 0.9,
            opacity: 0,
            duration: 0.9,
            ease: 'back.out(1.4)',
          },
          '-=0.55',
        )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className="flex flex-1 flex-col">
      <VideoCarousel />
      <Hero />
    </div>
  )
}

export default Home
