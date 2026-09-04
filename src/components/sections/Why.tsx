const REASONS = [
  {
    n: '01',
    title: 'Optimised for your objectives',
    body: 'We use data from thousands of creators to match your campaign with creators who are most likely to help you achieve your objectives.',
  },
  {
    n: '02',
    title: 'Targeted distribution',
    body: 'Creators may have millions of followers, but reach means little if the right people aren’t watching. We use audience insights to ensure your product is promoted by creators whose audiences match your target market.',
  },
  {
    n: '03',
    title: 'Thousands of creators, working for you',
    body: 'Turn thousands of creators into your marketing team, creating and distributing content at scale to help you achieve your campaign objectives.',
  },
  {
    n: '04',
    title: 'Data, insights & feedback',
    body: 'The best way to build is through data. EasilyPromote gives you insights from your campaign — from content performance and engagement to audience feedback — so you can understand what works and make better decisions.',
  },
]

/**
 * The case for the platform, stated as four numbered claims on a dark ground —
 * a break between the light campaign sequence above and the manila product
 * chapter below.
 */
function Why() {
  return (
    <section
      data-section="why"
      className="relative bg-night px-5 py-24 text-paper md:px-10 md:py-32"
    >
      <div className="mx-auto w-full max-w-7xl">
        <p className="stamp text-paper/45">Why EasilyPromote</p>
        <h2 className="mt-4 max-w-[22ch] font-display text-[2rem] font-semibold leading-[1.04] tracking-[-0.03em] md:text-[3rem]">
          Why is EasilyPromote the best platform for UGC mass campaigns?
        </h2>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-paper/15 bg-paper/15 md:mt-16 md:grid-cols-2">
          {REASONS.map((reason) => (
            <article
              key={reason.n}
              data-why="card"
              className="flex flex-col bg-night p-7 md:p-10"
            >
              <p className="font-mono text-[0.75rem] font-medium tracking-[0.16em] text-amber">
                {reason.n}
              </p>
              <h3 className="mt-5 max-w-[22ch] font-display text-[1.375rem] font-semibold leading-[1.15] tracking-[-0.025em] md:text-[1.75rem]">
                {reason.title}
              </h3>
              <p className="mt-4 max-w-[48ch] text-[0.9375rem] leading-[1.65] text-paper/70 md:text-[1rem]">
                {reason.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Why
