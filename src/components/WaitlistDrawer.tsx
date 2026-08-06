import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface WaitlistDrawerProps {
  open: boolean
  onClose: () => void
}

function WaitlistDrawer({ open, onClose }: WaitlistDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})
  const [submitted, setSubmitted] = useState(false)

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors: { name?: string; email?: string } = {}
    if (!name.trim()) {
      nextErrors.name = 'Please enter your name'
    }
    if (!email.trim()) {
      nextErrors.email = 'Please enter your email'
    } else if (!EMAIL_REGEX.test(email.trim())) {
      nextErrors.email = 'Enter a valid email address'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitted(true)
    window.setTimeout(onClose, 1600)
  }

  return (
    <div
      ref={drawerRef}
      className="absolute right-5 top-full z-50 mt-3 w-[calc(100%-2.5rem)] max-w-[340px] overflow-hidden rounded-[28px] border border-stone-100 bg-white p-6 md:right-10"
      style={{ height: 0 }}
    >
      <div ref={contentRef}>
        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand">
              <svg
                className="h-5 w-5 text-stone-900"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <p className="text-sm font-semibold text-stone-900">
              You&apos;re on the list{name.trim() ? `, ${name.trim().split(' ')[0]}` : ''}.
            </p>
            <p className="text-xs font-medium leading-relaxed tracking-[-0.01em] text-stone-500">
              We&apos;ll be in touch when we go live.
            </p>
          </div>
        ) : (
          <form className="flex flex-col gap-3" onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-1.5">
              <input
                type="text"
                autoComplete="name"
                placeholder="Your name"
                aria-label="Your name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value)
                  if (errors.name) setErrors({ ...errors, name: undefined })
                }}
                className="w-full rounded-full border border-stone-200 bg-white px-4 py-3 text-sm font-medium transition-colors placeholder-stone-300 focus:border-stone-400 focus:outline-none focus:ring-0"
              />
              {errors.name && (
                <span className="pl-4 text-[10px] font-medium text-red-600">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <input
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-label="Your email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  if (errors.email) setErrors({ ...errors, email: undefined })
                }}
                className="w-full rounded-full border border-stone-200 bg-white px-4 py-3 text-sm font-medium transition-colors placeholder-stone-300 focus:border-stone-400 focus:outline-none focus:ring-0"
              />
              {errors.email && (
                <span className="pl-4 text-[10px] font-medium text-red-600">
                  {errors.email}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="mt-1 w-full rounded-full border border-stone-100 bg-brand px-4 py-3 text-sm font-semibold text-stone-900"
            >
              Join waitlist
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default WaitlistDrawer
