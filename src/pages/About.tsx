import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

const HEADING_WORDS = ['We', 'built', 'the', 'marketplace', 'we', 'wished', 'existed.']

function About() {
  const rootRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('[data-reveal="word"]', {
        yPercent: 115,
        autoAlpha: 0,
        duration: 0.85,
        ease: 'power4.out',
        stagger: 0.04,
      })
        .from('[data-reveal="block"]', { y: 24, autoAlpha: 0, duration: 0.7 }, '-=0.4')
        .from('[data-reveal="closing"]', { y: 20, autoAlpha: 0, duration: 0.7 }, '-=0.3')
        .from('[data-reveal="signature"]', { y: 16, autoAlpha: 0, duration: 0.7 }, '-=0.35')
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <article ref={rootRef} className="flex flex-1 items-start px-5 pb-16 pt-28 md:px-10 md:pb-28 md:pt-36">
      <div className="mx-auto w-full max-w-[46rem] text-left">
        <p className="stamp text-ink-3">About us</p>

        <h1 className="mt-6 max-w-[18ch] font-display text-[2.25rem] font-semibold leading-[1.02] tracking-[-0.035em] text-ink md:text-[3.25rem]">
          {HEADING_WORDS.map((word, i) => (
            <span
              key={i}
              className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom"
            >
              <span data-reveal="word" className="inline-block will-change-transform">
                {word}
              </span>
              {i < HEADING_WORDS.length - 1 ? ' ' : ''}
            </span>
          ))}
        </h1>

        <div
          data-reveal="block"
          className="mt-10 space-y-6 text-[1rem] leading-[1.8] text-ink-2 md:text-[1.0625rem]"
        >
          <p>
            Creator marketing has always asked businesses to hand over control.
            You find a creator, agree a rate, send a brief, and then wait to see
            what appears on the internet with your name attached to it. If it is
            wrong, you find out when everyone else does.
          </p>

          <p>
            We did not think that was the trade anyone actually wanted. Businesses
            were not asking for guarantees, they were asking to see the work
            before it went out. That is a much smaller thing to build, and nobody
            had built it properly.
          </p>

          <p>
            So we made the approval step the centre of the product. A business
            creates a campaign and funds it upfront, so the cost is known before
            anything begins. The campaign is split into slots that creators claim
            from a storefront. Every submission comes back to the business for
            review, and nothing is published without that approval. Once approved
            content is live, views are read from the platforms themselves, and
            creators are paid on those verified views.
          </p>
        </div>

        <div
          data-reveal="block"
          className="mt-10 space-y-6 text-[1rem] leading-[1.8] text-ink-2 md:text-[1.0625rem]"
        >
          <p>
            And to the creators reading this — we see you too. We know what it is
            like to be talented and consistent and still overlooked because your
            following is not big enough yet. On EasilyPromote the campaigns are
            open. You claim a slot, you make the work, you get it approved, and
            you earn on the views you delivered. Not on how many followers you
            arrived with.
          </p>

          <p>
            We are starting here, in Nigeria, with Nigerian businesses and
            Nigerian creators. It is early, and we would rather build the next
            part with the people using it than guess at it.
          </p>
        </div>

        <p
          data-reveal="closing"
          className="mt-14 font-display text-[1.375rem] font-semibold leading-[1.35] tracking-[-0.025em] text-ink md:text-[1.75rem]"
        >
          Businesses keep control. Creators get a fair shot. Let’s get to work.
        </p>

        <p
          data-reveal="signature"
          className="mt-6 font-display text-[1.125rem] font-medium italic tracking-[-0.02em] text-ink md:mt-8 md:text-[1.375rem]"
        >
          — The EasilyPromote team
        </p>
      </div>
    </article>
  )
}

export default About
