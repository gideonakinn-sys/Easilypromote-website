import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

const LEGAL_LINKS = [
  { to: '/terms', label: 'Terms and Conditions' },
  { to: '/privacy', label: 'Privacy Policy' },
]

function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-1 flex-col px-5 pb-20 pt-10 md:px-10 md:pb-28 md:pt-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 md:flex-row md:gap-16">
        <nav className="flex w-full flex-row gap-6 border-b border-stone-200 md:sticky md:top-28 md:h-fit md:w-60 md:shrink-0 md:flex-col md:gap-1.5 md:border-b-0">
          {LEGAL_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `-mb-px border-b-2 pb-2.5 text-sm font-semibold transition-colors md:mb-0 md:border-b-0 md:border-l-2 md:pb-0 md:pl-4 md:py-2 ${
                  isActive
                    ? 'border-stone-900 text-stone-900 md:border-brand'
                    : 'border-transparent text-stone-500 md:border-transparent md:text-stone-600'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </main>
  )
}

export default LegalLayout
