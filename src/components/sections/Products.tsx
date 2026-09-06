const APP = 'https://app.easilypromote.com'

const PRODUCTS = [
  {
    tag: 'For businesses',
    title: 'What would your marketing look like with thousands of creators working for you?',
    body: 'Create a campaign, set your objectives and put your product in front of thousands of creators who can create and distribute content to their audiences.',
    points: [
      'Create campaigns built around your objectives',
      'Reach thousands of creators at scale',
      'Set your target reach and views',
      'Track campaign performance and audience feedback',
    ],
    href: `${APP}/create-account`,
    cta: 'Start a campaign',
    variant: 'primary',
  },
  {
    tag: 'For creators',
    title: 'Look at all the content you post. How many of those posts actually make you money?',
    body: 'EasilyPromote helps you earn from the content you already create. Join campaigns, create content for products you believe in, and get paid for the views you deliver.',
    points: [
      'Browse campaigns that fit your style and audience',
      'Create and post content following the instructions',
      'Get paid for the views you deliver',
      'Withdraw earnings (on scheduled payout dates)',
    ],
    href: `${APP}/create-account`,
    cta: 'Earn as a creator',
    variant: 'outline',
  },
]

function Products() {
  return (
    <section
      data-section="products"
      className="relative bg-manila px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="max-w-[20ch] font-display text-[2rem] font-semibold leading-[1.04] tracking-[-0.03em] text-ink md:text-[3rem]">
          One marketplace, built from both ends.
        </h2>

        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-6">
          {PRODUCTS.map((p) => (
            <article
              key={p.title}
              data-products="card"
              className="flex flex-col rounded-[2rem] border border-ink/10 bg-raised/80 p-7 md:p-10"
            >
              <p className="text-sm font-semibold text-amber">{p.tag}</p>
              <h3 className="mt-4 font-display text-[1.375rem] font-semibold leading-[1.15] tracking-[-0.025em] text-ink md:text-[1.625rem]">
                {p.title}
              </h3>
              <p className="mt-4 text-[0.9375rem] leading-[1.65] text-ink-2 md:text-[1rem]">
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
                className={`springy mt-8 inline-block self-start rounded-full px-6 py-3 text-sm font-semibold tracking-[-0.01em] ${
                  p.variant === 'outline'
                    ? 'border border-stone-200 bg-white text-stone-900'
                    : 'bg-brand text-stone-900'
                }`}
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
