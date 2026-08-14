const HEADING_WORDS = ['Get', 'thousands', 'of', 'creators', 'promoting', 'your', 'business']

function Hero() {
  return (
    <main className="flex flex-1 flex-col px-5 pb-8 pt-10 md:max-h-[400px] md:px-10 md:pb-12 md:pt-6">
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 md:flex-row md:items-stretch md:gap-14">
        <section className="order-2 w-full md:order-none md:flex-1 md:self-end">
          <h1 className="max-w-2xl text-[36px] font-normal leading-[1.05] tracking-tighter text-stone-900">
            {HEADING_WORDS.map((word, i) => (
              <span
                key={i}
                className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom"
              >
                <span
                  data-reveal="word"
                  className="inline-block will-change-transform"
                >
                  {word}
                </span>
                {i < HEADING_WORDS.length - 1 ? '\u00A0' : ''}
              </span>
            ))}
          </h1>

          <p
            data-reveal="subtext"
            className="mt-6 max-w-lg text-[15px] font-medium leading-[1.6] tracking-[-0.02em] text-stone-500"
          >
            EasilyPromote is a performance marketplace for businesses that want
            proof, not promises. Set a target, let creators deliver it, and you
            only pay once the views are verified.
          </p>

          <div data-reveal="cta" className="mt-8 flex flex-row gap-3 md:hidden">
            <a
              href="https://app.easilypromote.com/create-account"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-full border border-stone-100 bg-brand px-4 py-3.5 text-center text-sm font-semibold text-stone-900"
            >
              Create account
            </a>
            <a
              href="https://app.easilypromote.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-full border border-stone-200 bg-white px-4 py-3.5 text-center text-sm font-semibold text-stone-900"
            >
              Sign in
            </a>
          </div>
        </section>

        <div className="order-first hidden w-full md:order-none md:block md:flex-1 md:self-end">
          <img
            data-reveal="asset"
            src="/Assets.svg"
            alt="Easily Promote illustration"
            className="ml-auto w-full max-w-[220px]"
          />
        </div>
      </div>
    </main>
  )
}

export default Hero
