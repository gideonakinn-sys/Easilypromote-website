# Easily Promote — Waitlist Website

Marketing/waitlist site for Easily Promote, built with **Vite + React + TypeScript + Tailwind CSS v4**, styled against `designsystem.md`.

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

## Structure

```
src/
├── components/          # Navbar, Hero, sheets, waitlist form, carousel
├── pages/
│   ├── Home.tsx         # `/` — hero + video carousel + GSAP reveal
│   └── About.tsx        # `/about` — story content with GSAP reveal
├── App.tsx              # Router shell + SheetProvider
└── index.css            # Tailwind import + design tokens
```

Routing is handled by `react-router-dom` (`/` and `/about`).

## Video carousel

Drop raw clips into `public/videos/`, then run `npm run optimize-videos` to produce
web-ready 5-second loops (H.264, 480px max height, no audio) in `src/assets/videos/`.
The carousel picks up any `.mp4`/`.webm` there automatically.

> `scripts/ffmpeg.exe` and `public/videos/` are gitignored (large binaries/raw source).
> The optimize script uses the bundled `scripts/ffmpeg.exe` if present, otherwise falls
> back to a system `ffmpeg` on your PATH.

## Waitlist

The waitlist form (full name/business name + email) is frontend-only with client-side
validation and a success state — open via the navbar button (desktop dropdown) or the
hero button (mobile bottom sheet). It's ready to be wired to a backend/service later.

## Notes

- The design system references Motterdam for headings; it isn't bundled on a public CDN,
  so `font-motterdam` falls back to Rethink Sans. Drop the font file in and update the
  `@theme` entry when available.
