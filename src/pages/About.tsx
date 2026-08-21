import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

const HEADING_WORDS = ['We', 'built', 'the', 'marketplace', 'we', 'wished', 'existed.']

function About() {
  const rootRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(
        '[data-reveal="word"]',
        {
          yPercent: 110,
          opacity: 0,
          duration: 0.85,
          ease: 'power4.out',
          stagger: 0.035,
        },
      )
        .from(
          '[data-reveal="block"]',
          { y: 24, opacity: 0, duration: 0.7 },
          '-=0.4',
        )
        .from(
          '[data-reveal="closing"]',
          { y: 20, opacity: 0, duration: 0.7 },
          '-=0.3',
        )
        .from(
          '[data-reveal="signature"]',
          { y: 16, opacity: 0, duration: 0.7 },
          '-=0.35',
        )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <main
      ref={rootRef}
      className="flex flex-1 items-center px-5 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto w-full max-w-2xl text-left">
        <h1 className="max-w-2xl text-[30px] font-medium leading-[1.1] tracking-tighter text-stone-900 md:text-[36px]">
          {HEADING_WORDS.map((word, i) => (
            <span
              key={i}
              className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom"
            >
              <span
                data-reveal="word"
                className="inline-block will-change-transform"
              >
                {word}
              </span>
              {i < HEADING_WORDS.length - 1 ? '\u00A0' : ''}
            </span>
          ))}
        </h1>

        <div
          data-reveal="block"
          className="mt-8 space-y-7 text-[15px] font-medium leading-[1.8] tracking-[-0.01em] text-stone-600 md:mt-10 md:text-[16px]"
        >
          <p>
            Influencer marketing has always asked businesses to pay for a
            promise, not a result. You find a creator, negotiate a rate, hope
            the brief gets followed, and hope the post performs. The money is
            spent before anyone knows if it worked.
          </p>

          <p>
            We didn&apos;t think that made sense anymore. Every serious digital
            category eventually moves from paying for effort to paying for
            outcomes. Search advertising did it. Ecommerce did it. Creator
            marketing was the last big channel still stuck in the old model.
          </p>

          <p>
            So we built the trusted layer that lets it move too.
          </p>

          <p>
            A business sets a goal, say 250,000 views, and funds it into
            escrow. That goal is split into smaller slots that hundreds of
            creators can claim and deliver in parallel. Every submission is
            reviewed before it ever goes public. Once it&apos;s posted, we verify the views against real platform data, not self-reported numbers. Only then does the creator get paid for the views they delivered.
          </p>
        </div>

        <div
          data-reveal="block"
          className="mt-12 space-y-7 text-[15px] font-medium leading-[1.8] tracking-[-0.01em] text-stone-600 md:text-[16px]"
        >
          <p>
            And to the creators reading this — we see you too. We know what
            it&apos;s like to be talented and consistent and still overlooked
            because your following isn&apos;t big enough yet. That ends here.
            On EasilyPromote, your rank isn&apos;t built on followers, it&apos;s
            built on what you actually deliver. Show up, do the work, hit your
            targets, and the platform notices. Slowly, then all at once, bigger
            opportunities open up. Not because you got lucky. Because
            you&apos;re reliable, and reliability is the rarest thing in this
            business.
          </p>

          <p>
            This is the deal we&apos;re offering both of you: businesses get
            certainty, creators get a fair shot, and nobody gets paid until the
            work is real. We think that&apos;s how it should have always
            worked.
          </p>

          <p>
            We&apos;re starting here, in Nigeria, with Nigerian businesses and
            Nigerian creators building something the rest of the continent
            hasn&apos;t seen yet. If you&apos;re ready, we&apos;re ready with
            you.
          </p>
        </div>

        <p
          data-reveal="closing"
          className="mt-14 text-base font-semibold leading-snug tracking-[-0.01em] text-stone-900 md:text-lg"
        >
          Businesses buy results. Creators earn them. Let&apos;s get to work.
        </p>

        <p
          data-reveal="signature"
          className="mt-6 font-motterdam text-xl font-normal tracking-[-0.01em] text-stone-900 md:mt-8 md:text-2xl"
        >
          — The EasilyPromote team
        </p>
      </div>
    </main>
  )
}

export default About
