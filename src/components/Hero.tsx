import { Fragment } from 'react'

const HEADLINE = [
  'Deploy',
  'thousands',
  'of',
  'creators',
  'to',
  'work',
  'for',
  'your',
  'product.',
]

/**
 * The hero copy. The video card it sits on is rendered by <HeroCard /> in the
 * stage wrapper, so it can travel out of this section and land in the one
 * below — the handoff userank.com makes between its hero and intro.
 */
function Hero() {
  return (
    <section
      data-section="hero"
      className="relative h-svh min-h-[38rem] text-paper"
    >
      {/* Top padding clears the fixed header, which floats over the card. */}
      <div className="relative z-10 flex h-full flex-col justify-end px-7 pb-8 pt-24 md:px-14 md:pb-12 md:pt-28">
        <div data-hero="head" className="md:max-w-[72%]">
          <h1 className="font-display text-[2.25rem] font-semibold leading-[1.02] tracking-[-0.02em] md:text-[4.25rem]">
            {HEADLINE.map((word, i) => (
              <Fragment key={i}>
                <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                  <span
                    data-hero="word"
                    className="inline-block will-change-transform"
                  >
                    {word}
                  </span>
                  {i < HEADLINE.length - 1 ? '\u00A0' : ''}
                </span>
                {i === 3 ? <br /> : null}
              </Fragment>
            ))}
          </h1>

          <p
            data-hero="para"
            className="mt-5 max-w-[46ch] text-[0.9375rem] leading-[1.6] text-paper/75 md:mt-7 md:text-[1.0625rem]"
          >
            Thousands of creators are here, ready to create engaging content
            for your product and put it in front of their audiences.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
