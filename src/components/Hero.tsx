const APP = 'https://app.easilypromote.com'

const HEADLINE = ['Nothing', 'goes', 'live', 'until', 'you', 'say', 'so.']

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
            <span className="stamp whitespace-nowrap px-3 font-medium">
              Now live in Nigeria
            </span>
          </span>
          <span className="stamp hidden text-paper/50 sm:inline">
            Performance marketing marketplace
          </span>
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-16">
          <div data-hero="head" className="md:max-w-[60%]">
            <h1 className="max-w-[13ch] font-display text-[2.75rem] font-semibold leading-[0.94] tracking-[-0.045em] md:text-[5.25rem]">
              {HEADLINE.map((word, i) => (
                <span
                  key={i}
                  className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom"
                >
                  <span
                    data-hero="word"
                    className="inline-block will-change-transform"
                  >
                    {word}
                  </span>
                  {i < HEADLINE.length - 1 ? ' ' : ''}
                </span>
              ))}
            </h1>

            <p
              data-hero="para"
              className="mt-5 max-w-[46ch] text-[0.9375rem] leading-[1.6] text-paper/75 md:mt-7 md:text-[1.0625rem]"
            >
              Fund a campaign upfront, approve every piece of content before it
              reaches the public, and creators earn on views verified through
              platform APIs.
            </p>
          </div>

          {/* ── Right rail: CTAs and the two money flows ───────── */}
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
                Earn as a creator
              </a>
            </div>

            {/*
              Desktop only — on a phone the card has no room for it, and the
              two flows are stated again in the campaign steps and the FAQ.
            */}
            <dl className="mt-7 hidden border-t border-paper/20 text-[0.8125rem] leading-[1.5] md:block">
              <div className="flex gap-3 border-b border-paper/20 py-3">
                <dt className="w-[4.5rem] shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-amber">
                  Business
                </dt>
                <dd className="text-paper/70">
                  Pays a{' '}
                  <span className="font-medium text-paper">
                    single upfront fee
                  </span>{' '}
                  to run the campaign.
                </dd>
              </div>
              <div className="flex gap-3 py-3">
                <dt className="w-[4.5rem] shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-paper/60">
                  Creator
                </dt>
                <dd className="text-paper/70">
                  Is paid separately, on{' '}
                  <span className="font-medium text-paper">views verified</span>{' '}
                  through platform APIs.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
