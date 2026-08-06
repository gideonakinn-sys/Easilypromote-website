# Easily Promote — Waitlist Landing Page

Single-page waitlist site (hero section) for Easily Promote. Built with Vite + React + TypeScript + Tailwind CSS v4, styled against `designsystem.md`.

## Getting started

```bash
npm install
npm run dev
```

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Oxlint |

## Structure

```
src/
├── components/Hero.tsx   # Hero section + waitlist form
├── App.tsx
└── index.css             # Tailwind import + design tokens
```

The waitlist form is frontend-only for now (name + email with client-side validation and a success state). It will be wired to a backend/service when the site evolves into the full marketing site.

Note: the design system references Motterdam for headings; it's not available on a public CDN, so `font-motterdam` currently falls back to Rethink Sans. Drop the font file in later and update the `@theme` entry when available.
