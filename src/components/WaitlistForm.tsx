import { useState } from 'react'
import { joinWaitlist } from '../lib/api'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface WaitlistFormProps {
  onSuccess: () => void
}

function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string; submit?: string }>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors: { name?: string; email?: string; submit?: string } = {}
    if (!name.trim()) {
      nextErrors.name = 'Please enter your name or business name'
    }
    if (!email.trim()) {
      nextErrors.email = 'Please enter your email'
    } else if (!EMAIL_REGEX.test(email.trim())) {
      nextErrors.email = 'Enter a valid email address'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    try {
      await joinWaitlist({ name: name.trim(), email: email.trim() })
      setSubmitted(true)
      window.setTimeout(onSuccess, 1600)
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
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
          We&apos;ve sent a confirmation to your email. We&apos;ll be in touch when we go live.
        </p>
      </div>
    )
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-1.5">
        <input
          type="text"
          autoComplete="name"
          placeholder="Full name / Business name"
          aria-label="Full name or business name"
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

      {errors.submit && (
        <span className="rounded-xl bg-red-50 px-4 py-2 text-xs font-medium text-red-600">
          {errors.submit}
        </span>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-1 w-full rounded-full border border-stone-100 bg-brand px-4 py-3 text-sm font-semibold text-stone-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? 'Joining…' : 'Join waitlist'}
      </button>
    </form>
  )
}

export default WaitlistForm