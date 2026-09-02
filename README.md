# EasilyPromote — marketing site

Marketing site for EasilyPromote, built with **Vite + React + TypeScript + Tailwind CSS v4**.

## Getting started

```bash
npm install
npm run dev
```

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check + production build (`tsc -b && vite build`) |
| `npm run preview` | Preview the production build |
| `npm run lint` | Oxlint |
| `npm run optimize-videos` | Compress raw videos in `public/videos/` → `src/assets/videos/` |

## Copy rules (non-negotiable)

The way money moves has to be described exactly, on every surface:

- A business pays EasilyPromote **a single upfront fee**. It is **not** escrow, and it is
  **not** conditional on results.
- Creators are paid **separately**, on views **verified through platform APIs**.
- These are **two independent flows**. Never write business payment as contingent on
  delivery, performance or verified views.
- The word **"escrow" is banned** — by the payment provider (Paystack) and by compliance.

Before shipping copy changes, run:

```bash
grep -rniE 'escrow|contingent|only pay|money.back|guarantee' src/
```

> Still outstanding: `src/data/privacy.ts` (and `EasilyPromote-Privacy-Policy.md`) describe
> campaign funds as "held in escrow and released only upon verified delivery". That is a
> legal document, so it has been flagged rather than rewritten.

## Design system

The marketing site has its own identity, distinct from the product app's
(`designsystem.md` documents the app, which still uses brand yellow and Rethink Sans).

**Dossier / insider file.** Stone ground, amber for actions, seal red for earned and
verified states.

| Token | Value | Role |
|---|---|---|
| `paper` | `#F5F5F4` | Default ground |
| `raised` | `#FAFAF9` | Cards |
| `manila` | `#E4D8C2` | Products chapter ground |
| `night` | `#1A1614` | Dark chapters (approval, closing) |
| `ink` / `ink-2` / `ink-3` | `#1C1917` / `#57534E` / `#A8A29E` | Text |
| `amber` | `#B8720A` | Actions |
| `seal` | `#8B3A2B` | Earned / verified |

Type: **Figtree** for display and body, **IBM Plex Mono** for labels and data.
One family carries the page, as Dazzed does on userank.com — Figtree is the closest
geometric variable sans available on Google Fonts. Headings run at 600.

### Root sizing

`html { font-size }` is set in `vw`, so every rem scales with the viewport instead of
stepping at breakpoints. `1rem = 16px` at a **1440** desktop frame and at a **393** mobile
frame — design to those canvases and divide by 16. Clamped at both ends.

### One easing token

`--ease-spring` is a 100-stop `linear()` spring that overshoots to 1.043 and settles.
Every hover uses `.springy` (transform only, 200ms). Nav links use `.nudge`
(a 4px shift, no colour change).

## Motion

`src/lib/motion.ts` owns GSAP + ScrollTrigger registration, Lenis smooth scroll, the
scroll lock, and the dark-chapter header contrast. `src/pages/Home.tsx` owns the
choreography in two readable functions:

- **`buildIntro()`** — the ~2.6s gated hero reveal, beat for beat from userank.com: the
  card punches in small and tilted while the footage inside it zooms the other way, copy
  enters from opposite edges with a deliberate overshoot, then the card opens to full
  bleed. The page cannot scroll until it lands
  (`body.is-preloading`). Held until `document.fonts.ready` so measured widths are real.
- **`buildScrollChoreography()`** — everything scroll-linked. First the handoff: the
  full-bleed hero card flies down and shrinks onto an empty slot sitting inside the
  approval headline, so the video ends up set between the lines of type while those lines
  rise around it (userank.com does the same between its hero and intro). Then the pinned
  four-card stack, the per-character read-along in the letter,
  section reveals, and the dark-chapter header flip.

Two ordering rules matter and are easy to break:

1. The step list gets `.is-stacked` **before any trigger is created**. Collapsing four
   cards into one grid cell removes ~3 viewport heights; triggers built before it measure
   a layout that no longer exists.
2. The pin carries `refreshPriority: 1`, and `darkChapters()` is called **last**, so both
   compute against the final document height.
3. The handoff timeline sets `duration: 1` in its defaults. GSAP's 0.5s default would
   land the card halfway down the hero and park it there for the rest of the scrub.

The card lands on `[data-approval="slot"]`, an empty box in the approval headline. Target
geometry is read from that slot and recomputed on refresh, so it holds at any viewport.
If motion is off the slot is hidden and the headline closes over it.

That hiding also happens under `.motion-failed`, which the inline failsafe in
`index.html` stamps when the motion module never boots. The failsafe checks for
`.motion-ready` first — Home.tsx sets it as soon as it takes ownership of the card. Drop
that guard and the failsafe fires on every load, hiding the card a few seconds in.

Deliberately **not** copied from the reference site: scroll hijacking. Scroll is linked,
never captured, so find-in-page, skimming and deep links keep working.

`prefers-reduced-motion` is respected throughout — Lenis is skipped, the intro is skipped,
and the step list stays a plain vertical column so all four steps are readable.

## Structure

```
src/
├── components/
│   ├── Navbar.tsx           # sits at page top over the hero, scrolls away
│   ├── HeroCard.tsx         # the travelling card, lives in the stage wrapper
│   ├── Hero.tsx             # hero copy; the card behind it is HeroCard
│   ├── VideoCarousel.tsx    # the clips; variant="fill" makes them the hero card
│   ├── Footer.tsx
│   └── sections/
│       ├── Approval.tsx     # the differentiator, dark chapter
│       ├── HowItWorks.tsx   # pinned four-card stack
│       ├── Products.tsx     # brand app / creator app, manila chapter
│       ├── Compare.tsx      # vs. doing it yourself, vs. an agency
│       ├── Calculator.tsx   # views→price slider, backed by /api/campaigns/pricing
│       ├── Letter.tsx       # founder voice, per-character read-along
│       ├── Faq.tsx          # objection handling
│       └── Closing.tsx      # dark chapter CTA
├── lib/motion.ts
├── pages/                   # Home, About, Terms, Privacy
└── index.css                # tokens, root sizing, easing, component classes
```

## Pricing calculator

`src/components/sections/Calculator.tsx` is a slider that quotes a campaign from a target
view count. It reads the tier table from **`GET /api/campaigns/pricing`**, which already
exists and is public (mounted above `protect` in `Backend/src/routes/campaigns.js`) — no
new endpoint was needed.

- Set **`VITE_API_URL`** to `https://api.easilypromote.com/api` to enable the fetch. The
  fetch accepts the value with or without the trailing `/api`, matching the product apps
  (which set `NEXT_PUBLIC_API_URL` with the prefix included). With it unset the slider
  still works from `FALLBACK_TIERS`, a copy of `TIER_PRICING`; the fetched table wins
  whenever it arrives.
- Add the marketing site's origin to the backend's **`CLIENT_URL`** allowlist, or the
  request is rejected by CORS and it silently keeps the bundled table.
- The slider interpolates views and price against the same fraction between the same two
  tiers, which is exactly what `getPriceForViews()` does — so the quote matches the real
  campaign cost rather than approximating it. Verified against the backend function at
  interpolated points (137K, 710K, 1.5M, 18.1M), all exact.
- `FALLBACK_TIERS` duplicates backend data. If pricing changes and `VITE_API_URL` is
  unset, this page goes stale — set the env var in production.

## Waiting on real content

- **`CAMPAIGN_FROM_PRICE`** in `src/components/sections/Faq.tsx` is `null`. Set it to the
  real starting price and the first FAQ answer switches to the concrete version. A named
  number is the single highest-value thing that can be added to this page.
- There is no logo wall, stat strip or customer testimonial section yet, because there is
  nothing true to put in them. Those slots belong after the comparison table and before
  the letter.

## Video carousel

Drop raw clips into `public/videos/`, then run `npm run optimize-videos` to produce
web-ready 5-second loops (H.264, 480px max height, no audio) in `src/assets/videos/`.
The carousel picks up any `.mp4`/`.webm` there automatically.

> `scripts/ffmpeg.exe` and `public/videos/` are gitignored (large binaries/raw source).
