import { useEffect, useRef } from 'react'
import clipCreate from '../../assets/videos/1.mp4'
import clipClaim from '../../assets/videos/4.mp4'
import clipApprove from '../../assets/videos/6.mp4'
import clipPaid from '../../assets/videos/10.mp4'

const STEPS = [
  {
    n: '01',
    title: 'Create the campaign and fund it',
    body: 'Choose what you want promoted and the scale you want it at. You pay EasilyPromote a single upfront fee to run it. One payment, made once, at the start.',
    note: 'Business → EasilyPromote',
    clip: clipCreate,
  },
  {
    n: '02',
    title: 'Creators claim their slots',
    body: 'Your campaign appears in the creator storefront. Vetted creators browse it, claim a slot, and start producing. You are not chasing anyone in DMs.',
    note: 'Storefront → slot claimed',
    clip: clipClaim,
  },
  {
    n: '03',
    title: 'Every submission comes to you first',
    body: 'Content arrives in your dashboard before it is public. Approve it, or send it back with notes. This is the gate nothing gets past without you.',
    note: 'Pre-publish approval',
    clip: clipApprove,
  },
  {
    n: '04',
    title: 'Views are verified, creators are paid',
    body: 'Once the approved content is live, views are read from the platform APIs. Creators are paid separately on those verified views — not on what anyone screenshots.',
    note: 'EasilyPromote → Creator',
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
        className="flex min-h-svh flex-col justify-center px-5 py-16 md:px-10"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex items-baseline justify-between gap-6 border-b border-rule pb-5">
            <div>
              <p className="stamp text-ink-3">Case procedure</p>
              <h2 className="mt-3 font-display text-[1.875rem] font-semibold leading-[1.05] tracking-[-0.03em] text-ink md:text-[2.75rem]">
                How a campaign actually runs
              </h2>
            </div>
            <p
              data-how="counter"
              className="hidden shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-3 md:block"
            >
              Step 01 / 04
            </p>
          </div>

          {/*
            Every card sits in the same grid cell, so each one slides up and
            covers the last while the section is pinned.
          */}
          <ul data-how="stack" className="step-list mt-8 md:mt-10">
            {STEPS.map((step) => (
              <li
                key={step.n}
                data-how="card"
                className="flex min-h-[28rem] flex-col justify-between rounded-2xl border border-rule bg-raised p-7 md:min-h-[34rem] md:p-12"
              >
                <div className="flex items-start justify-between gap-6">
                  <span className="font-mono text-[0.75rem] font-medium tracking-[0.16em] text-amber">
                    {step.n}
                  </span>
                  <span className="stamp rounded-full border border-rule px-3 py-1 text-ink-3">
                    {step.note}
                  </span>
                </div>

                <div className="mt-8">
                  <video
                    src={step.clip}
                    className="h-24 w-24 rounded-[1.1rem] object-cover md:h-36 md:w-36 md:rounded-[1.5rem]"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                    tabIndex={-1}
                  />

                  <h3 className="mt-6 max-w-[18ch] font-display text-[1.625rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink md:mt-8 md:text-[2.375rem]">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-[58ch] text-[0.9375rem] leading-[1.65] text-ink-2 md:text-[1.0625rem]">
                    {step.body}
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
