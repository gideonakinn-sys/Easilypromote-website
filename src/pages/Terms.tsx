import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { termsMeta, termsSections } from '../data/terms'

const TITLE_WORDS = ['Creator', 'Terms', 'and', 'Conditions']

function Terms() {
  const rootRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('[data-reveal="word"]', {
        yPercent: 110,
        opacity: 0,
        duration: 0.85,
        ease: 'power4.out',
        stagger: 0.05,
      }).from(
        '[data-reveal="intro"]',
        { y: 18, opacity: 0, duration: 0.7 },
        '-=0.4',
      )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <main
      ref={rootRef}
      className="flex flex-1 flex-col px-5 pb-20 pt-12 md:px-10 md:pb-28 md:pt-16"
    >
      <div className="mx-auto w-full max-w-2xl text-left">
        <h1 className="max-w-2xl text-[28px] font-medium leading-[1.1] tracking-tighter text-stone-900 md:text-[36px]">
          {TITLE_WORDS.map((word, i) => (
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
              {i < TITLE_WORDS.length - 1 ? '\u00A0' : ''}
            </span>
          ))}
        </h1>

        <p
          data-reveal="intro"
          className="mt-4 text-[14px] font-medium leading-[1.6] tracking-[-0.01em] text-stone-600"
        >
          {termsMeta.intro}
        </p>
        <p className="mt-2 text-xs font-medium tracking-[-0.01em] text-stone-500">
          {termsMeta.effective}
        </p>

        <div className="mt-12">
          {termsSections.map((section) => (
            <section key={section.number} className="mt-10 md:mt-12">
              <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-stone-900 md:text-base">
                {section.number}. {section.title}
              </h2>
              <div className="mt-5 space-y-5">
                {section.clauses.map((clause) => (
                  <p
                    key={clause.number}
                    className="text-[13px] font-medium leading-[1.6] tracking-[-0.01em] text-stone-600"
                  >
                    <span className="font-semibold text-stone-900">
                      {clause.number}
                    </span>{' '}
                    {clause.text}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Terms
