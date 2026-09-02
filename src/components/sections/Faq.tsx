/**
 * Set this to the real starting campaign price (e.g. '₦150,000') and the copy
 * below switches to the concrete answer. Leaving it null keeps the honest
 * "you see the figure before you fund" wording instead of inventing a number.
 */
const CAMPAIGN_FROM_PRICE: string | null = null

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: 'What does a campaign cost?',
    a: CAMPAIGN_FROM_PRICE ? (
      <>
        Campaigns start at {CAMPAIGN_FROM_PRICE}. You pay EasilyPromote a single
        upfront fee to run the campaign, and you see the exact figure before you
        fund anything. What each creator earns is handled separately by us, out
        of that campaign.
      </>
    ) : (
      <>
        You pay EasilyPromote a single upfront fee to run the campaign, and the
        calculator above quotes any campaign size at the real rate. The figure is
        shown to you before you fund anything — there is no invoice afterwards
        and no variable bill at the end of the month. What each creator earns is
        handled separately by us.
      </>
    ),
  },
  {
    q: 'Do I only pay if the campaign performs?',
    a: (
      <>
        No, and we want to be precise about this because it is the part people
        most often assume wrongly. Your payment to EasilyPromote is a single
        upfront fee for running the campaign. It is not conditional, and it is
        not held against results. Creator payouts are a separate flow: creators
        are paid based on views verified through platform APIs. The two are
        independent of each other.
      </>
    ),
  },
  {
    q: 'What happens if I do not like what a creator submits?',
    a: (
      <>
        You send it back with notes, and it is not published. Every submission
        goes through your approval before it can go public — that gate is the
        core of how the platform works. A creator can revise and resubmit, or the
        slot can go to someone else.
      </>
    ),
  },
  {
    q: 'How are views actually verified?',
    a: (
      <>
        Once approved content is live on the creator’s account, view counts are
        read from the platform’s own API rather than from anything the creator
        sends us. That figure is what appears on your dashboard, and it is what
        creator earnings are calculated from.
      </>
    ),
  },
  {
    q: 'Who are the creators, and do I choose them?',
    a: (
      <>
        Creators on the platform browse a storefront of live campaigns and claim
        the slots that fit their audience. You do not have to source anyone or
        negotiate individually. Because approval sits before publication, you
        keep control of the output regardless of who claims a slot.
      </>
    ),
  },
  {
    q: 'How quickly can a campaign start?',
    a: (
      <>
        As soon as it is funded, your campaign is visible in the creator
        storefront and creators can begin claiming slots. From there the pace is
        set by production and by how fast submissions come back to you for
        approval.
      </>
    ),
  },
  {
    q: 'I am a creator. How do I get paid?',
    a: (
      <>
        Claim a slot on a live campaign, submit your content, and get it
        approved. Once it is published and views are verified through the
        platform APIs, your earnings are tracked against that slot in the creator
        app. You are paid on the views you actually delivered.
      </>
    ),
  },
]

function Faq() {
  return (
    <section data-section="faq" className="relative px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <div className="md:sticky md:top-16 md:h-fit">
            <p className="stamp text-ink-3">On the record</p>
            <h2 className="mt-4 max-w-[14ch] font-display text-[2rem] font-semibold leading-[1.04] tracking-[-0.03em] text-ink md:text-[2.75rem]">
              The questions people actually ask.
            </h2>
            <p className="mt-5 max-w-[36ch] text-[0.9375rem] leading-[1.65] text-ink-2">
              If something here is still unclear, ask us directly and we will
              answer in plain terms.
            </p>
            <a
              href="mailto:easilypromote@gmail.com"
              className="springy mt-6 inline-block rounded-full border border-rule bg-raised px-5 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink"
            >
              Email us
            </a>
          </div>

          <div data-faq="list" className="divide-y divide-rule border-y border-rule">
            {FAQS.map((item) => (
              <details key={item.q} data-faq="item" className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                  <span className="max-w-[42ch] font-display text-[1.125rem] font-semibold leading-[1.35] tracking-[-0.02em] text-ink md:text-[1.375rem]">
                    {item.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-1 shrink-0 font-mono text-[1rem] leading-none text-amber transition-[rotate] duration-200 ease-[var(--ease-spring)] group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-[58ch] text-[0.9375rem] leading-[1.7] text-ink-2 md:text-[1rem]">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Faq
