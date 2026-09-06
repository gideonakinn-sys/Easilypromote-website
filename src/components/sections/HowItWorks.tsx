import { useEffect, useRef } from 'react'
import clipCreate from '../../assets/videos/1.mp4'
import clipClaim from '../../assets/videos/4.mp4'
import clipApprove from '../../assets/videos/6.mp4'
import clipPaid from '../../assets/videos/10.mp4'

const REASONS = [
  {
    n: '01',
    title: 'Optimised for your objectives',
    body: 'We use data from thousands of creators to match your campaign with creators who are most likely to help you achieve your objectives.',
    clip: clipCreate,
  },
  {
    n: '02',
    title: 'Targeted distribution',
    body: 'Creators may have millions of followers, but reach means little if the right people aren\u2019t watching. We use audience insights to ensure your product is promoted by creators whose audiences match your target market.',
    clip: clipClaim,
  },
  {
    n: '03',
    title: 'Thousands of creators, working for you',
    body: 'Turn thousands of creators into your marketing team, creating and distributing content at scale to help you achieve your campaign objectives.',
    clip: clipApprove,
  },
  {
    n: '04',
    title: 'Data Insights & feedback',
    body: 'The best way to build is through data. EasilyPromote gives you insights from your campaign \u2014 from content performance and engagement to audience feedback \u2014 so you can understand what works and make better decisions.',
    clip: clipPaid,
  },
]

function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)

  /*
   * Four more looping clips is real decoding cost, so they only run while the
   * section is actually on screen — the same treatment userank.com gives its
   * testimonial videos.
   */
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const clips = Array.from(section.querySelectorAll('video'))

    const observer = new IntersectionObserver(
      ([entry]) => {
        clips.forEach((clip) => {
          if (entry.isIntersecting) {
            const played = clip.play()
            if (played) played.catch(() => {})
          } else {
            clip.pause()
          }
        })
      },
      { threshold: 0 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} data-section="how" className="relative">
      <div
        data-how="stage"
        className="flex flex-col justify-center px-5 py-20 md:px-10 md:py-24"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex items-start justify-between gap-6 border-b border-rule pb-5">
            <div>
              <h2 className="max-w-[22ch] font-display text-[1.75rem] font-semibold leading-[1.05] tracking-[-0.03em] text-ink md:text-[2.5rem]">
                Why is EasilyPromote the best platform for UGC mass campaigns?
              </h2>
              <p className="mt-3 max-w-[52ch] text-[0.9375rem] leading-[1.65] text-ink-2 md:text-[1rem]">
                More than just a marketplace. A performance engine built for
                scale.
              </p>
            </div>
            <p
              data-how="counter"
              className="hidden shrink-0 pt-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-3 md:block"
            >
              Step 01 / 04
            </p>
          </div>

          {/*
            Every card sits in the same grid cell, so each one slides up and
            covers the last while the section is pinned.
          */}
          <ul data-how="stack" className="step-list mt-8 md:mt-10">
            {REASONS.map((reason) => (
              <li
                key={reason.n}
                data-how="card"
                className="flex flex-col justify-between rounded-[2rem] border border-rule bg-raised p-7 md:p-10"
              >
                <span className="font-mono text-[0.75rem] font-medium tracking-[0.16em] text-amber">
                  {reason.n}
                </span>

                <div className="mt-4 md:mt-5">
                  <video
                    src={reason.clip}
                    className="h-16 w-16 rounded-[0.9rem] object-cover md:h-24 md:w-24 md:rounded-[1.1rem]"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                    tabIndex={-1}
                  />

                  <h3 className="mt-4 max-w-[22ch] font-display text-[1.25rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink md:mt-5 md:text-[1.875rem]">
                    {reason.title}
                  </h3>
                  <p className="mt-3 max-w-[58ch] text-[0.875rem] leading-[1.65] text-ink-2 md:text-[1rem]">
                    {reason.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks