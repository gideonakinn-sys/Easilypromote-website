/**
 * Splits a paragraph into per-character spans so the copy can be lit up
 * left-to-right as the reader scrolls — the read-along move from userank.com.
 * Words stay whole so wrapping is unaffected.
 */
function ReadAlong({ text }: { text: string }) {
  return (
    <>
      {text.split(' ').map((word, w) => (
        <span key={w} className="inline-block whitespace-nowrap">
          {[...word].map((char, c) => (
            <span key={c} data-letter="char" className="inline-block">
              {char}
            </span>
          ))}
          {w < text.split(' ').length - 1 ? (
            <span data-letter="char" className="inline-block">
              &nbsp;
            </span>
          ) : null}
        </span>
      ))}
    </>
  )
}

const OPENING =
  'Every business we spoke to described the same problem. They had paid a creator, the post went up, and it was not what they agreed. Wrong tone, wrong claim, sometimes the wrong product entirely. By the time they saw it, their customers had seen it too.'

function Letter() {
  return (
    <section
      data-section="letter"
      className="relative px-5 py-24 md:px-10 md:py-36"
    >
      <div className="mx-auto w-full max-w-[46rem]">
        <p className="stamp text-ink-3">Why this exists</p>

        <p
          data-letter="lead"
          className="mt-8 font-display text-[1.5rem] font-medium leading-[1.45] tracking-[-0.02em] text-ink md:text-[2rem]"
        >
          <ReadAlong text={OPENING} />
        </p>

        <div className="mt-10 space-y-6 text-[1rem] leading-[1.8] text-ink-2 md:text-[1.0625rem]">
          <p data-letter="para">
            The fix was not more reporting. Reporting arrives after the damage.
            The fix was to put a step in front of publication, so the business
            sees the work while it can still say no.
          </p>
          <p data-letter="para">
            So that is what we built. A business funds a campaign upfront and
            knows what it costs before anything starts. Creators claim the slots
            they want and make the content. Nothing reaches the public until the
            business has approved it. And when approved content is live, views
            are read from the platforms themselves, and creators are paid on
            what those platforms actually recorded.
          </p>
          <p data-letter="para">
            To the creators reading this: we know what it is like to be good at
            this and still get overlooked because your following is not big
            enough yet. Here, the campaigns are open. You claim a slot, you
            deliver, you get paid on what you delivered. That is the whole
            arrangement.
          </p>
          <p data-letter="para">
            We are starting in Nigeria, with Nigerian businesses and Nigerian
            creators. It is early. What we build next is whatever the people
            using it hit a wall on this month.
          </p>
        </div>

        <p
          data-letter="signoff"
          className="mt-12 font-display text-[1.25rem] font-medium italic tracking-[-0.02em] text-ink md:text-[1.5rem]"
        >
          — The EasilyPromote team
        </p>
      </div>
    </section>
  )
}

export default Letter
