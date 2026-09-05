import { Link, NavLink, useLocation } from 'react-router-dom'
import ContactMenu from './ContactMenu'

const APP = 'https://app.easilypromote.com'

/**
 * The header sits at the top of the page, overlaying the hero rather than
 * occupying flow, and scrolls away with it. It recolours while a dark section
 * is beneath it (see `darkChapters` in lib/motion) — in practice, the hero.
 *
 * Colour on these elements is deliberately NOT set with Tailwind utilities:
 * utilities sit in a later cascade layer than the `[data-chrome-*]` rules and
 * would win, leaving dark ink on a dark ground. Defaults and dark-chapter
 * overrides both live in index.css instead.
 */
function Navbar() {
  const { pathname } = useLocation()
  const legalActive = pathname === '/terms' || pathname === '/privacy'

  const navLink = 'nudge inline-block font-mono text-[0.6875rem] uppercase tracking-[0.14em]'

  return (
    <header
      data-chrome
      className="absolute inset-x-0 top-0 z-40 px-7 py-4 md:px-14 md:py-5"
    >
      <nav data-sheet-root className="relative w-full">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/logo-mark%201.svg" alt="" className="h-7 w-auto" />
            <span
              data-chrome
              data-chrome-text
              className="font-display text-[1.0625rem] font-semibold tracking-[-0.02em]"
            >
              EasilyPromote
            </span>
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            <li>
              <NavLink
                to="/about"
                data-chrome
                data-chrome-muted
                className={({ isActive }) =>
                  `${navLink}${isActive ? ' is-active' : ''}`
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/terms"
                data-chrome
                data-chrome-muted
                className={`${navLink}${legalActive ? ' is-active' : ''}`}
              >
                Legal
              </NavLink>
            </li>
            <ContactMenu />
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={`${APP}/login`}
              target="_blank"
              rel="noopener noreferrer"
              className="springy hidden rounded-full border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold tracking-[-0.01em] text-stone-900 sm:inline-block"
            >
              Sign in
            </a>
            <a
              href={`${APP}/create-account`}
              target="_blank"
              rel="noopener noreferrer"
              className="springy inline-block rounded-full bg-brand px-5 py-2.5 text-sm font-semibold tracking-[-0.01em] text-stone-900"
            >
              Start a campaign
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
