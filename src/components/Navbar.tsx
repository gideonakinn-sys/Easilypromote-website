import { Link, NavLink } from 'react-router-dom'
import { useSheets } from './sheets'
import WaitlistDrawer from './WaitlistDrawer'
import ContactMenu from './ContactMenu'

function Navbar() {
  const { activeSheet, openSheet } = useSheets()
  const waitlistOpen = activeSheet === 'waitlist'

  const waitlistButtonClass =
    'rounded-full border border-stone-100 bg-brand px-5 py-2.5 text-sm font-semibold text-stone-900'

  return (
    <header className="sticky top-0 z-40 bg-stone-100/90 px-5 py-4 backdrop-blur-sm md:px-10 md:py-6">
      <nav data-sheet-root className="relative mx-auto w-full max-w-7xl">
        <div className="flex items-center justify-between gap-4 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-0">
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src="/logo-mark%201.svg"
              alt="Easily Promote logo"
              className="h-7 w-auto md:h-8"
            />
            <span className="hidden text-sm font-semibold tracking-[-0.01em] text-stone-900 md:inline md:text-base">
              Easily Promote
            </span>
          </Link>

          <ul className="flex items-center justify-center gap-5 sm:gap-8 md:justify-self-center">
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `text-xs tracking-[-0.01em] md:text-sm ${
                    isActive
                      ? 'font-semibold text-stone-900'
                      : 'font-medium text-stone-600'
                  }`
                }
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/terms"
                className={({ isActive }) =>
                  `text-xs tracking-[-0.01em] md:text-sm ${
                    isActive
                      ? 'font-semibold text-stone-900'
                      : 'font-medium text-stone-600'
                  }`
                }
              >
                Terms &amp; Conditions
              </NavLink>
            </li>
            <ContactMenu />
          </ul>

          <button
            type="button"
            data-sheet-trigger
            onClick={() => openSheet('waitlist')}
            aria-expanded={waitlistOpen}
            className={`${waitlistButtonClass} hidden md:inline-block md:justify-self-end`}
          >
            Join waitlist
          </button>
        </div>

        <WaitlistDrawer />
      </nav>
    </header>
  )
}

export default Navbar
