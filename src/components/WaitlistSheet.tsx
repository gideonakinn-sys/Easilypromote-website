import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useSheets } from './sheets'
import WaitlistForm from './WaitlistForm'

function WaitlistSheet() {
  const { activeSheet, closeSheet } = useSheets()
  const open = activeSheet === 'waitlist'
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
          <WaitlistForm key={String(open)} onSuccess={closeSheet} />
        </div>
      </div>
    </div>
  )
}

export default WaitlistSheet
