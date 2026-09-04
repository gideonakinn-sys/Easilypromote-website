const APP = 'https://app.easilypromote.com'

const PRODUCTS = [
  {
    tag: 'For businesses',
    title: 'The brand app',
    body: 'Create and fund campaigns, review every submission before it is published, watch delivery on a live dashboard, and manage your wallet in one place.',
    points: [
      'Create and fund a campaign',
      'Pre-publish content approval',
      'Delivery dashboard with verified views',
      'Wallet and campaign history',
    ],
    href: `${APP}/create-account`,
    cta: 'Start a campaign',
  },
  {
    tag: 'For creators',
    title: 'The creator app',
    body: 'Browse a storefront of live campaigns, claim the slots you want, submit your content for approval, and track what you have earned through the slot lifecycle.',
    points: [
      'Campaign storefront',
      'Claim slots that suit your audience',
      'Submit content, get approval',
      'Earnings tracked on verified views',
    ],
    href: `${APP}/create-account`,
    cta: 'Work as a creator',
  },
]

function Products() {
  return (
    <section
      data-section="products"
      className="relative bg-manila px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto w-full max-w-7xl">
        <p className="stamp text-ink/45">Two sides of the file</p>
        <h2 className="mt-4 max-w-[20ch] font-display text-[2rem] font-semibold leading-[1.04] tracking-[-0.03em] text-ink md:text-[3rem]">
          One marketplace, built from both ends.
        </h2>

        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-6">
          {PRODUCTS.map((p) => (
            <article
              key={p.title}
              data-products="card"
              className="flex flex-col rounded-2xl border border-ink/10 bg-raised/80 p-7 md:p-10"
            >
              <p className="stamp text-amber">{p.tag}</p>
              <h3 className="mt-4 font-display text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink md:text-[2.25rem]">
                {p.title}
              </h3>
              <p className="mt-4 max-w-[46ch] text-[0.9375rem] leading-[1.65] text-ink-2 md:text-[1rem]">
                {p.body}
              </p>

              <ul className="mt-7 divide-y divide-ink/10 border-y border-ink/10">
                {p.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-3 py-3 text-[0.875rem] text-ink-2"
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-amber" />
                    {point}
                  </li>
                ))}
              </ul>

              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="springy mt-8 inline-block self-start rounded-full bg-ink px-6 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-paper"
              >
                {p.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Products
