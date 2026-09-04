const APP = 'https://app.easilypromote.com'

function Closing() {
  return (
    <section
      data-section="closing"
      className="relative bg-night px-5 py-28 text-paper md:px-10 md:py-40"
    >
      <div className="mx-auto w-full max-w-7xl">
        <p data-closing="stamp" className="stamp text-paper/45">
          Open a campaign
        </p>

        <h2
          data-closing="head"
          className="mt-6 max-w-[16ch] font-display text-[2.5rem] font-semibold leading-[1] tracking-[-0.035em] md:text-[4.5rem]"
        >
          Post a campaign. Creators come to you.
        </h2>

        <p
          data-closing="body"
          className="mt-7 max-w-[50ch] text-[1rem] leading-[1.7] text-paper/70 md:text-[1.125rem]"
        >
          One upfront fee, agreed before anything starts. Every piece of content
          approved by you before it is published. Creators paid on views verified
          through platform APIs.
        </p>

        <div data-closing="cta" className="mt-10 flex flex-wrap items-center gap-3 md:mt-12">
          <a
            href={`${APP}/create-account`}
            target="_blank"
            rel="noopener noreferrer"
            className="springy rounded-full bg-amber px-7 py-4 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-white"
          >
            Start a campaign
          </a>
          <a
            href={`${APP}/create-account`}
            target="_blank"
            rel="noopener noreferrer"
            className="springy rounded-full border border-paper/25 px-7 py-4 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-paper"
          >
            Work as a creator
          </a>
        </div>

        <p className="mt-8 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-paper/40">
          Prefer to talk first? easilypromote@gmail.com
        </p>
      </div>
    </section>
  )
}

export default Closing
