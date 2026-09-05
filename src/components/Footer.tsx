import { Link } from 'react-router-dom'

const APP = 'https://app.easilypromote.com'

function Footer() {
  return (
    <footer
      data-section="footer"
      className="border-t border-rule px-7 py-12 md:px-14 md:py-16"
    >
      <div className="relative w-full">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-[34ch]">
            <div className="flex items-center gap-2.5">
              <img src="/logo-mark%201.svg" alt="" className="h-6 w-auto" />
              <span className="font-display text-[1rem] font-semibold tracking-[-0.02em] text-ink">
                EasilyPromote
              </span>
            </div>
            <p className="mt-4 text-[0.875rem] leading-[1.6] text-ink-2">
              A performance marketing marketplace connecting Nigerian businesses
              with content creators.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:gap-16">
            <div>
              <p className="stamp text-ink-3">Platform</p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href={`${APP}/create-account`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nudge inline-block text-[0.875rem] text-ink-2"
                  >
                    Start a campaign
                  </a>
                </li>
                <li>
                  <a
                    href={`${APP}/create-account`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nudge inline-block text-[0.875rem] text-ink-2"
                  >
                    Earn as a creator
                  </a>
                </li>
                <li>
                  <a
                    href={`${APP}/login`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nudge inline-block text-[0.875rem] text-ink-2"
                  >
                    Sign in
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="stamp text-ink-3">Company</p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <Link to="/about" className="nudge inline-block text-[0.875rem] text-ink-2">
                    About us
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:easilypromote@gmail.com"
                    className="nudge inline-block text-[0.875rem] text-ink-2"
                  >
                    easilypromote@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/easilypromote?igsh=MWprbXVjNHQ3YzM2dw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nudge inline-block text-[0.875rem] text-ink-2"
                  >
                    @easilypromote
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="stamp text-ink-3">Legal</p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <Link to="/terms" className="nudge inline-block text-[0.875rem] text-ink-2">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="nudge inline-block text-[0.875rem] text-ink-2">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-3">
            © {new Date().getFullYear()} EasilyPromote
          </p>
          <p className="max-w-[56ch] font-mono text-[0.6875rem] uppercase leading-[1.7] tracking-[0.12em] text-ink-3 sm:text-right">
            Easily Promote &middot; CAC BN 9726778 &middot; A6 Stellar, Lightwell
            Garden Estate, Dan Suleiman Street, Utako, Abuja, Nigeria
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
