import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useSheets } from './sheets'

function ContactMenu() {
  const { activeSheet, openSheet } = useSheets()
  const open = activeSheet === 'contact'
  const panelRef = useRef<HTMLDivElement>(null)

  const navLink =
    'nudge inline-block font-mono text-[0.6875rem] uppercase tracking-[0.14em]'

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    if (open) {
      gsap.fromTo(
        panel,
        { opacity: 0, y: -6 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
      )
    }
  }, [open])

  return (
    <li className="relative">
      <button
        type="button"
        data-sheet-trigger
        data-chrome
        data-chrome-muted
        onClick={() => openSheet('contact')}
        aria-expanded={open}
        className={navLink + (open ? ' is-active' : '')}
      >
        Contact Us
      </button>

      <div className="hidden md:block">
        <div
          className={`absolute left-1/2 top-full z-50 mt-3 w-60 -translate-x-1/2 ${
            open ? '' : 'pointer-events-none invisible'
          }`}
        >
          <div
            ref={panelRef}
            className="rounded-2xl border border-stone-200 bg-white p-2"
          >
            <a
              href="mailto:easilypromote@gmail.com"
              onClick={() => openSheet('contact')}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-stone-700"
            >
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-600">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              easilypromote@gmail.com
            </a>

            <a
              href="https://www.instagram.com/easilypromote?igsh=MWprbXVjNHQ3YzM2dw=="
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => openSheet('contact')}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-stone-700"
            >
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-600">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </span>
              @easilypromote
            </a>
          </div>
        </div>
      </div>
    </li>
  )
}

export default ContactMenu
