import { Link } from 'react-router-dom'

/*
 * Also written to dist/404.html by the prerender step, which is what Vercel
 * serves for a path that does not exist. Before this the SPA rewrite answered
 * every path with a 200 and an empty shell.
 */
function NotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-5 py-32 text-center md:px-10">
      <p className="stamp text-ink-3">404</p>
      <h1 className="mt-4 max-w-[18ch] font-display text-[2rem] font-semibold leading-[1.05] tracking-[-0.03em] text-ink md:text-[3rem]">
        We could not find that page.
      </h1>
      <p className="mt-5 max-w-[46ch] text-[0.9375rem] leading-[1.65] text-ink-2 md:text-[1rem]">
        The link may be out of date. Everything about how EasilyPromote works is
        on the home page.
      </p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
        <Link
          to="/"
          className="springy rounded-full bg-ink px-6 py-3.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-paper"
        >
          Back to home
        </Link>
        <Link
          to="/terms"
          className="springy rounded-full border border-ink/20 px-6 py-3.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink"
        >
          Terms
        </Link>
        <Link
          to="/privacy"
          className="springy rounded-full border border-ink/20 px-6 py-3.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink"
        >
          Privacy
        </Link>
      </div>
    </section>
  )
}

export default NotFound
