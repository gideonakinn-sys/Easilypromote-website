import { useEffect, useMemo, useState } from 'react'

const APP = 'https://app.easilypromote.com'

type Tier = { views: number; price: number }

/**
 * Mirrors TIER_PRICING in Backend/src/config/pricing.js.
 *
 * Used immediately so the slider is live on first paint, then replaced by
 * whatever GET /api/campaigns/pricing returns — that endpoint is the source of
 * truth, and admins can change industry rates behind it. If this list ever
 * drifts from the backend the fetched copy wins.
 */
const FALLBACK_TIERS: Tier[] = [
  { views: 100_000, price: 430_000 },
  { views: 200_000, price: 780_000 },
  { views: 500_000, price: 1_830_000 },
  { views: 1_000_000, price: 3_330_000 },
  { views: 2_000_000, price: 6_405_000 },
  { views: 5_000_000, price: 15_000_000 },
  { views: 10_000_000, price: 28_500_000 },
  { views: 20_000_000, price: 54_000_000 },
  { views: 40_000_000, price: 100_000_000 },
]

/**
 * Reads the tier table at a fractional index.
 *
 * Interpolating views and price against the same fraction reproduces the
 * backend's getPriceForViews() exactly: it solves for the same `t` between the
 * same pair of tiers, so the quote here always matches what the campaign will
 * actually cost.
 */
function atPosition(tiers: Tier[], position: number) {
  const i = Math.min(Math.floor(position), tiers.length - 2)
  const f = position - i
  const a = tiers[i]
  const b = tiers[i + 1]
  return {
    views: Math.round(a.views + (b.views - a.views) * f),
    price: Math.round(a.price + (b.price - a.price) * f),
  }
}

const amount = new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 })

/** Symbol rendered separately so it can carry its own fallback stack. */
function Naira() {
  return <span className="naira">₦</span>
}

const plain = new Intl.NumberFormat('en-NG')

function compactViews(views: number) {
  if (views >= 1_000_000) {
    const m = views / 1_000_000
    return `${m % 1 === 0 ? m : m.toFixed(1)}M`
  }
  return `${Math.round(views / 1000)}K`
}

function Calculator() {
  const [tiers, setTiers] = useState<Tier[]>(FALLBACK_TIERS)
  // Opens on the 1M tier — a realistic starting campaign rather than the floor.
  const [position, setPosition] = useState(3)

  useEffect(() => {
    const base = import.meta.env.VITE_API_URL
    if (!base) return

    /*
     * The product apps set NEXT_PUBLIC_API_URL with the /api prefix already on
     * it (see Fontend/apps/web/.env.local), so accept either form here rather
     * than 404-ing into the fallback table over a trailing path segment.
     */
    const root = String(base).replace(/\/+$/, '')
    const url = /\/api$/.test(root)
      ? `${root}/campaigns/pricing`
      : `${root}/api/campaigns/pricing`

    const controller = new AbortController()

    fetch(url, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!Array.isArray(data?.tiers) || data.tiers.length < 2) return
        const clean = data.tiers
          .filter((t: Tier) => Number(t?.views) > 0 && Number(t?.price) > 0)
          .map((t: Tier) => ({ views: Number(t.views), price: Number(t.price) }))
          .sort((a: Tier, b: Tier) => a.views - b.views)
        if (clean.length >= 2) setTiers(clean)
      })
      // Keeping the bundled table is a perfectly good outcome here.
      .catch(() => {})

    return () => controller.abort()
  }, [])

  const max = tiers.length - 1
  const clamped = Math.min(position, max)
  const { views, price } = useMemo(
    () => atPosition(tiers, clamped),
    [tiers, clamped],
  )
  const perView = price / views

  return (
    <section
      data-section="calculator"
      className="relative bg-night px-5 py-24 text-paper md:px-10 md:py-32"
    >
      <div className="mx-auto w-full max-w-7xl">
        <p data-calc="reveal" className="stamp text-paper/45">
          What it costs
        </p>
        <h2
          data-calc="reveal"
          className="mt-4 max-w-[20ch] font-display text-[2rem] font-semibold leading-[1.04] tracking-[-0.03em] md:text-[3rem]"
        >
          Move the slider. That is the price.
        </h2>
        <p
          data-calc="reveal"
          className="mt-5 max-w-[54ch] text-[1rem] leading-[1.7] text-paper/70"
        >
          Campaigns are priced by the scale you choose, and the rate improves as
          the campaign gets bigger. You see the figure here before you fund
          anything.
        </p>

        <div
          data-calc="reveal"
          className="mt-12 grid gap-10 rounded-2xl border border-paper/15 p-7 md:mt-16 md:grid-cols-[1.1fr_0.9fr] md:gap-14 md:p-12"
        >
          {/* ── The control ─────────────────────────────────── */}
          <div>
            <label
              htmlFor="views-slider"
              className="stamp block text-paper/45"
            >
              Target views
            </label>

            <output
              htmlFor="views-slider"
              aria-live="polite"
              className="mt-4 block font-display text-[2.75rem] font-semibold leading-none tracking-[-0.04em] tabular-nums md:text-[4rem]"
            >
              {plain.format(views)}
            </output>

            <input
              id="views-slider"
              type="range"
              min={0}
              max={max}
              step={0.01}
              value={clamped}
              onChange={(e) => setPosition(Number(e.target.value))}
              aria-valuetext={`${plain.format(views)} views, ${amount.format(
                price,
              )} naira`}
              className="ep-slider mt-8 w-full"
            />

            <div className="mt-3 flex justify-between font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-paper/40">
              <span>{compactViews(tiers[0].views)}</span>
              <span>{compactViews(tiers[max].views)}</span>
            </div>
          </div>

          {/* ── The quote ───────────────────────────────────── */}
          <div className="md:border-l md:border-paper/15 md:pl-14">
            <p className="stamp text-amber">You pay upfront</p>
            <p
              aria-live="polite"
              className="mt-4 font-display text-[2.25rem] font-semibold leading-none tracking-[-0.04em] tabular-nums md:text-[3.25rem]"
            >
              <Naira />
              {amount.format(price)}
            </p>

            <dl className="mt-8 border-t border-paper/15 text-[0.875rem]">
              <div className="flex justify-between gap-4 border-b border-paper/15 py-3">
                <dt className="text-paper/55">Effective rate</dt>
                <dd className="tabular-nums text-paper">
                  <Naira />
                  {perView.toFixed(2)} per view
                </dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-paper/55">Payments</dt>
                <dd className="text-paper">One, before the campaign starts</dd>
              </div>
            </dl>

            <a
              href={`${APP}/create-account`}
              target="_blank"
              rel="noopener noreferrer"
              className="springy mt-8 inline-block rounded-full bg-amber px-6 py-3.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-white"
            >
              Start a campaign
            </a>
          </div>
        </div>

        <p
          data-calc="reveal"
          className="mt-6 max-w-[68ch] text-[0.875rem] leading-[1.65] text-paper/50"
        >
          This is a single upfront fee for running the campaign. It is not
          conditional on results and it is not held against delivery. What each
          creator earns is a separate flow, paid on views verified through
          platform APIs. Final pricing is confirmed in the app before you fund.
        </p>
      </div>
    </section>
  )
}

export default Calculator
