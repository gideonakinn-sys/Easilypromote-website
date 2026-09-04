import { Fragment } from 'react'

const APP = 'https://app.easilypromote.com'

const HEADLINE = [
  'Deploy',
  'thousands',
  'of',
  'content',
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
      <div className="relative z-10 flex h-full flex-col justify-between px-7 pb-8 pt-24 md:px-14 md:pb-12 md:pt-28">
        <div data-hero="top" className="flex items-center gap-3">
          <span
            data-hero="chip"
            className="grow-slot h-7 shrink-0 rounded-full bg-seal text-white"
          >
            {/*
              Longer than the badge it replaced, and the chip cannot wrap — it
              is width-animated on a single line. Sized down on phones so the
              full line still clears a 393px frame.
            */}
            <span className="stamp whitespace-nowrap px-3 text-[0.5625rem] font-medium tracking-[0.1em] md:text-[0.6875rem] md:tracking-[0.16em]">
              Nigeria’s creator-powered distribution platform
            </span>
          </span>
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-16">
          <div data-hero="head" className="md:max-w-[64%]">
            <h1 className="max-w-[16ch] font-display text-[2.5rem] font-semibold leading-[0.98] tracking-[-0.045em] md:text-[4.25rem]">
              {/*
                The separator sits OUTSIDE the clipping box on purpose:
                trailing whitespace inside an inline-block is dropped, so a
                space kept in there would leave the words running together.
              */}
              {HEADLINE.map((word, i) => (
                <Fragment key={i}>
                  <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
                    <span
                      data-hero="word"
                      className="inline-block will-change-transform"
                    >
                      {word}
                    </span>
                  </span>
                  {i < HEADLINE.length - 1 ? ' ' : null}
                </Fragment>
              ))}
            </h1>

            <p
              data-hero="para"
              className="mt-5 max-w-[48ch] text-[0.9375rem] leading-[1.6] text-paper/75 md:mt-7 md:text-[1.0625rem]"
            >
              Thousands of creators are here, ready to create engaging content
              for your product and put it in front of their audiences.
            </p>
          </div>

          {/* ── Right rail: the two ways in ────────────────────── */}
          <div data-hero="rail" className="shrink-0 md:w-[22rem]">
            <div className="flex flex-wrap gap-2.5">
              <a
                href={`${APP}/create-account`}
                target="_blank"
                rel="noopener noreferrer"
                className="springy rounded-full bg-amber px-6 py-3.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-white"
              >
                Start a campaign
              </a>
              <a
                href={`${APP}/create-account`}
                target="_blank"
                rel="noopener noreferrer"
                className="springy rounded-full border border-paper/30 px-6 py-3.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-paper"
              >
                Work as a creator
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
