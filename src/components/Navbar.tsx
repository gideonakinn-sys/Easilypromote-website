import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import WaitlistDrawer from './WaitlistDrawer'

function Navbar() {
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!waitlistOpen) return

    const handlePointerDown = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setWaitlistOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setWaitlistOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [waitlistOpen])

  const toggleWaitlist = () => setWaitlistOpen((open) => !open)

  const waitlistButtonClass =
    'rounded-full border border-stone-100 bg-brand px-5 py-2.5 text-sm font-semibold text-stone-900'

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-40 bg-stone-50/90 px-5 py-5 backdrop-blur-sm md:px-10 md:py-6"
    >
      <nav className="relative mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-3 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-0">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src="/logo-mark%201.svg"
                alt="Easily Promote logo"
                className="h-8 w-auto"
              />
              <span className="text-sm font-semibold tracking-[-0.01em] text-stone-900 md:text-base">
                Easily Promote
              </span>
            </Link>

            <button
              type="button"
              onClick={toggleWaitlist}
              aria-expanded={waitlistOpen}
              className={`${waitlistButtonClass} md:hidden`}
            >
              Join waitlist
            </button>
          </div>

          <ul className="flex items-center justify-center gap-4 sm:gap-8 md:justify-self-center">
            <li>
              <a
                href="#"
                className="text-xs font-medium tracking-[-0.01em] text-stone-600 md:text-sm"
              >
                Creators
              </a>
            </li>
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
              <a
                href="#"
                className="text-xs font-medium tracking-[-0.01em] text-stone-600 md:text-sm"
              >
                Contact Us
              </a>
            </li>
          </ul>

          <button
            type="button"
            onClick={toggleWaitlist}
            aria-expanded={waitlistOpen}
            className={`${waitlistButtonClass} hidden md:inline-block md:justify-self-end`}
          >
            Join waitlist
          </button>
        </div>

        <WaitlistDrawer open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
      </nav>
    </header>
  )
}

export default Navbar
