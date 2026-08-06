import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useSheets } from './sheets'

function ContactSheet() {
  const { activeSheet, closeSheet } = useSheets()
  const open = activeSheet === 'contact'
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    if (overlayRef.current) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    }
    if (panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.4, ease: 'power3.out' },
      )
    }
  }, [open])

  return (
    <div className="md:hidden">
      <div
        ref={overlayRef}
        onClick={closeSheet}
        className={`fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm ${
          open ? '' : 'pointer-events-none invisible'
        }`}
      />
      <div
        ref={panelRef}
        className={`fixed bottom-0 left-0 right-0 z-50 rounded-t-[28px] bg-white px-4 pb-6 pt-3 ${
          open ? '' : 'pointer-events-none invisible'
        }`}
        data-sheet-root
      >
        <div className="mx-auto mb-4 h-1 w-10 flex-shrink-0 rounded-full bg-stone-300" />
        <div className="mx-auto w-full max-w-md">
          <div className="flex flex-col gap-2">
            <a
              href="mailto:easilypromote@gmail.com"
              onClick={closeSheet}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-stone-700"
            >
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-600">
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
              onClick={closeSheet}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-stone-700"
            >
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-600">
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
    </div>
  )
}

export default ContactSheet
