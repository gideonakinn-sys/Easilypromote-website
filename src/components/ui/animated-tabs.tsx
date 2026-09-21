import { useLayoutEffect, useRef, type KeyboardEvent } from 'react'
import { gsap } from '../../lib/motion'

export interface AnimatedTab {
  label: string
}

interface AnimatedTabsProps {
  tabs: AnimatedTab[]
  activeTab: string
  setActiveTab: (label: string) => void
  idPrefix?: string
  className?: string
}

/**
 * A tab bar with a black pill sliding behind the active tab.
 *
 * The framer-motion `layoutId` effect, driven by GSAP instead so the project
 * stays dependency-free: the pill tweens its left/width to the target button
 * on change and re-measures on resize. Roving-tabindex + arrow key support
 * keep it keyboard-operable (WAI-ARIA tabs pattern).
 */
function AnimatedTabs({
  tabs,
  activeTab,
  setActiveTab,
  idPrefix = 'tabs',
  className = '',
}: AnimatedTabsProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLSpanElement>(null)
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([])
  const initialised = useRef(false)

  useLayoutEffect(() => {
    const track = trackRef.current
    const pill = pillRef.current
    if (!track || !pill) return

    const index = tabs.findIndex((t) => t.label === activeTab)
    const target = buttonRefs.current[index]
    if (!target) return

    // Snap onto the opening tab without motion, slide on every change after.
    const snap = !initialised.current
    initialised.current = true
    const movePill = (duration: number) =>
      gsap.to(pill, {
        left: target.offsetLeft,
        width: target.offsetWidth,
        duration,
        ease: 'power3.out',
        overwrite: 'auto',
      })

    movePill(snap ? 0 : 0.4)

    // On narrow screens the track scrolls sideways; keep the active tab in view.
    if (!snap && track.scrollWidth > track.clientWidth) {
      track.scrollTo({
        left: target.offsetLeft - (track.clientWidth - target.offsetWidth) / 2,
        behavior: 'smooth',
      })
    }

    const onResize = () => {
      const t = buttonRefs.current[tabs.findIndex((tab) => tab.label === activeTab)]
      if (!pill || !t) return
      gsap.to(pill, {
        left: t.offsetLeft,
        width: t.offsetWidth,
        duration: 0.3,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      gsap.killTweensOf(pill)
    }
  }, [activeTab, tabs])

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = tabs.findIndex((tab) => tab.label === activeTab)
    let next = -1

    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length
    else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = tabs.length - 1
    else return

    event.preventDefault()
    const label = tabs[next].label
    setActiveTab(label)
    buttonRefs.current[next]?.focus()
  }

  return (
    <div
      ref={trackRef}
      role="tablist"
      aria-label="How a campaign works"
      onKeyDown={onKeyDown}
      className={`no-scrollbar relative inline-flex max-w-full items-center overflow-x-auto rounded-full border border-stone-200 bg-white p-1 ${className}`}
    >
      <span
        ref={pillRef}
        aria-hidden="true"
        className="absolute inset-y-1 w-0 rounded-full bg-stone-900"
      />
      {tabs.map((tab, i) => {
        const active = tab.label === activeTab
        return (
          <button
            key={tab.label}
            ref={(el) => {
              buttonRefs.current[i] = el
            }}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${i}`}
            aria-selected={active}
            aria-controls={`${idPrefix}-panel-${i}`}
            tabIndex={active ? 0 : -1}
            onClick={() => setActiveTab(tab.label)}
            className={`relative z-10 shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-[0.8125rem] font-semibold sm:px-4 sm:text-sm tracking-[-0.01em] transition-colors md:px-6 ${
              active ? 'text-white' : 'text-ink-2'
            }`}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

export default AnimatedTabs