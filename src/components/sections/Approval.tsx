function Approval() {
  return (
    <section
      data-section="approval"
      className="relative px-5 py-24 text-ink md:px-10 md:py-36"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/*
          The empty slot on the second line is where the hero card lands.
          It reserves the space; the card itself is positioned onto it by the
          scroll choreography, so the copy sets around it exactly as it does
          once the card has arrived.
        */}
        <h2 className="mt-5 text-center font-display text-[2.25rem] font-semibold leading-[1.02] tracking-[-0.03em] md:text-[3.5rem]">
          <span data-approval="line" className="block">
            Don&rsquo;t waste budget on
          </span>
          <span data-approval="line" className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <span>creators</span>
            <span
              data-approval="slot"
              aria-hidden="true"
              className="h-10 w-10 shrink-0 rounded-lg md:h-16 md:w-16 md:rounded-xl"
            />
            <span>who miss</span>
          </span>
          <span data-approval="line" className="block">
            your target market
          </span>
        </h2>

        <p
          data-approval="body"
          className="mx-auto mt-7 max-w-[52ch] text-[1rem] leading-[1.7] text-ink-2 md:mt-10 md:text-[1.0625rem]"
        >
          EasilyPromote matches your product with creators who already have
          your ideal audience—based on location, age, and interests.
        </p>
        <p
          data-approval="body"
          className="mx-auto mt-5 max-w-[52ch] text-[1rem] leading-[1.7] text-ink-2 md:text-[1.0625rem]"
        >
          Stop gambling on single influencers. Launch a coordinated campaign
          with thousands of creators, scale your organic reach, and drive
          measurable ROI. You set the brief; we handle the creators,
          management, and tracking.
        </p>
      </div>
    </section>
  )
}

export default Approval