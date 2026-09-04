const BEATS = [
  {
    label: 'Creator submits',
    body: 'The creator uploads the content to the campaign. It is not published anywhere yet.',
  },
  {
    label: 'You review',
    body: 'It lands in your dashboard. Approve it, or send it back with notes. Nothing moves without you.',
  },
  {
    label: 'It goes public',
    body: 'Only approved content is published to the creator’s own audience.',
  },
]

function Approval() {
  return (
    <section
      data-section="approval"
      className="relative px-5 py-24 text-paper md:px-10 md:py-36"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-14 md:grid-cols-[1fr_1fr] md:items-start md:gap-20">
        <div>
          <p data-approval="line" className="stamp text-paper/45">
            The difference
          </p>

          {/*
            The empty slot on the second line is where the hero card lands.
            It reserves the space; the card itself is positioned onto it by the
            scroll choreography, so the copy sets around it exactly as it does
            once the card has arrived.
          */}
          <h2 className="mt-5 font-display text-[2.25rem] font-semibold leading-[1.02] tracking-[-0.03em] md:text-[3.5rem]">
            <span data-approval="line" className="block">
              You see the content
            </span>
            <span data-approval="line" className="flex items-center gap-4 md:gap-6">
              <span
                data-approval="slot"
                aria-hidden="true"
                className="h-[4.5rem] w-[4.5rem] shrink-0 rounded-[1.1rem] md:h-[7rem] md:w-[7rem] md:rounded-[1.5rem]"
              />
              <span>before the</span>
            </span>
            <span data-approval="line" className="block">
              internet does.
            </span>
          </h2>

          <p
            data-approval="body"
            className="mt-7 max-w-[52ch] text-[1rem] leading-[1.7] text-paper/70 md:text-[1.0625rem]"
          >
            Most creator platforms hand you a report after the post is already
            up. If the tone is wrong, the claim is wrong, or your product is held
            the wrong way round, you find out at the same time your customers do.
          </p>
          <p
            data-approval="body"
            className="mt-5 max-w-[52ch] text-[1rem] leading-[1.7] text-paper/70 md:text-[1.0625rem]"
          >
            EasilyPromote allows you to reject any content that doesn’t follow
            the instructions, so it doesn’t count towards your campaign.
          </p>
        </div>

        <ol className="relative md:pt-3">
          <span
            aria-hidden="true"
            className="absolute left-[7px] top-2 h-[calc(100%-2rem)] w-px bg-paper/15"
          />
          {BEATS.map((beat, i) => (
            <li
              key={beat.label}
              data-approval="beat"
              className="relative flex gap-5 pb-9 last:pb-0"
            >
              <span
                className={`relative z-10 mt-1.5 h-[15px] w-[15px] shrink-0 rounded-full border-2 ${
                  i === 1 ? 'border-seal bg-seal' : 'border-paper/30 bg-night'
                }`}
              />
              <div>
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-paper">
                  {beat.label}
                </p>
                <p className="mt-2 max-w-[38ch] text-[0.9375rem] leading-[1.6] text-paper/60">
                  {beat.body}
                </p>
              </div>
            </li>
          ))}

          <li
            data-approval="seal"
            className="mt-10 inline-flex origin-left -rotate-3 items-center gap-3 rounded-md border-2 border-seal px-5 py-3"
          >
            <span className="font-mono text-[0.8125rem] font-semibold uppercase tracking-[0.2em] text-seal">
              Approved by you
            </span>
          </li>
        </ol>
      </div>
    </section>
  )
}

export default Approval
