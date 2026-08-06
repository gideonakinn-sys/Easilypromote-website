import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useSheets } from './sheets'
import WaitlistForm from './WaitlistForm'

function WaitlistDrawer() {
  const { activeSheet, closeSheet } = useSheets()
  const open = activeSheet === 'waitlist'
  const drawerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const drawer = drawerRef.current
    if (!drawer) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      drawer.style.height = open ? 'auto' : '0px'
      return
    }

    if (open) {
      gsap.fromTo(
        drawer,
        { height: 0, opacity: 0 },
        {
          height: 'auto',
          opacity: 1,
          duration: 0.45,
          ease: 'power2.out',
          onComplete: () => {
            if (contentRef.current) {
              gsap.fromTo(
                contentRef.current.children,
                { y: 10, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.35, stagger: 0.05, ease: 'power2.out' },
              )
            }
          },
        },
      )
    } else {
      gsap.to(drawer, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: 'power2.inOut',
      })
    }
  }, [open])

  return (
    <div className="hidden md:block">
      <div
        ref={drawerRef}
        className="absolute right-5 top-full z-50 mt-3 w-[calc(100%-2.5rem)] max-w-[340px] overflow-hidden rounded-[28px] border border-stone-100 bg-white p-6 shadow-[0px_5px_13px_-5px_rgba(0,0,0,0.07),0px_2px_4px_-1px_rgba(0,0,0,0.03)] md:right-10"
        style={{ height: 0 }}
      >
        <div ref={contentRef}>
          <WaitlistForm key={String(open)} onSuccess={closeSheet} />
        </div>
      </div>
    </div>
  )
}

export default WaitlistDrawer
