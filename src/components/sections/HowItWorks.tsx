const STEPS = [
  {
    n: '01',
    body: 'Create an instruction or campaign listing for your product.',
  },
  {
    n: '02',
    body: 'Fill the form, listing your objective — whether it is more streams, more sales, more downloads, awareness, traffic or another campaign goal.',
  },
  {
    n: '03',
    body: 'Input the minimum number of creators you want on your campaign.',
  },
  {
    n: '04',
    body: 'Decide the amount of views and reach you want your campaign to achieve.',
  },
  {
    n: '05',
    body: 'Decide which platform(s) you want the creators to use.',
  },
  {
    n: '06',
    body: 'Creators join the campaign and create engaging content following your instructions.',
  },
  {
    n: '07',
    body: 'You can reject any creator content that does not follow your instructions, so it does not count towards your campaign.',
  },
  {
    n: '08',
    body: 'At the end of your campaign, receive the data from the engagement and feedback generated around your product.',
  },
]

/**
 * The campaign sequence, read top to bottom.
 *
 * It replaced a pinned stack of sliding cards: eight steps do not fit that
 * format, and a sequence is easier to scan as one list than as a deck you have
 * to scroll through one card at a time. The rule down the left is drawn in as
 * the reader descends (see the `data-how` triggers in pages/Home).
 */
function HowItWorks() {
  return (
    <section
      data-section="how"
      className="relative px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto w-full max-w-7xl">
        <p className="stamp text-ink-3">How it works</p>
        <h2 className="mt-4 max-w-[24ch] font-display text-[1.875rem] font-semibold leading-[1.05] tracking-[-0.03em] text-ink md:text-[3rem]">
          Create an instruction and let the right creators drive results for
          your product.
        </h2>

        <ol data-how="list" className="relative mt-14 md:mt-20">
          {/* The track, and the amber line that fills it on scroll. */}
          <span
            aria-hidden="true"
            className="absolute left-[1.4375rem] top-4 h-[calc(100%-4rem)] w-px bg-rule md:left-[2.25rem] md:top-8 md:h-[calc(100%-6rem)]"
          />
          <span
            data-how="progress"
            aria-hidden="true"
            className="absolute left-[1.4375rem] top-4 h-[calc(100%-4rem)] w-px origin-top bg-amber md:left-[2.25rem] md:top-8 md:h-[calc(100%-6rem)]"
          />

          {STEPS.map((step) => (
            <li
              key={step.n}
              data-how="step"
              className="relative flex gap-5 pb-9 last:pb-0 md:gap-10 md:pb-14"
            >
              <span className="relative z-10 flex h-[2.875rem] w-[2.875rem] shrink-0 items-center justify-center rounded-full border border-rule bg-raised font-mono text-[0.75rem] font-medium tracking-[0.12em] text-amber md:h-[4.5rem] md:w-[4.5rem] md:text-[0.9375rem]">
                {step.n}
              </span>
              <p className="max-w-[54ch] pt-2.5 text-[1rem] leading-[1.6] text-ink md:pt-5 md:text-[1.375rem] md:leading-[1.5]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default HowItWorks
