const ROWS = [
  {
    label: 'Finding creators',
    ours: 'Creators browse your campaign in the storefront and claim slots themselves.',
    diy: 'Cold DMs, one creator at a time, most never reply.',
    agency: 'A fixed roster you did not pick.',
    highlight: false,
  },
  {
    label: 'Seeing content before it is public',
    ours: 'Every submission needs your approval before it can be published.',
    diy: 'You ask nicely and hope.',
    agency: 'Usually reviewed by the agency, not by you.',
    highlight: true,
  },
  {
    label: 'Counting views',
    ours: 'Read from platform APIs and shown against the campaign.',
    diy: 'Screenshots the creator sends you.',
    agency: 'A report at the end of the month.',
    highlight: false,
  },
  {
    label: 'Paying creators',
    ours: 'Handled by EasilyPromote, per creator, on verified views.',
    diy: 'Individual transfers you chase and reconcile yourself.',
    agency: 'Bundled inside the retainer.',
    highlight: false,
  },
  {
    label: 'What you pay',
    ours: 'One upfront fee to run the campaign, set before it starts.',
    diy: 'Whatever each creator negotiates, every time.',
    agency: 'A monthly retainer, plus creator costs.',
    highlight: false,
  },
  {
    label: 'Who the post comes from',
    ours: 'The creator’s own account, to their own audience.',
    diy: 'The same, once you have coordinated it.',
    agency: 'The same, at a markup.',
    highlight: false,
  },
]

function Compare() {
  return (
    <section
      data-section="compare"
      className="relative px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto w-full max-w-7xl">
        <p className="stamp text-ink-3">The alternatives</p>
        <h2 className="mt-4 max-w-[22ch] font-display text-[2rem] font-semibold leading-[1.04] tracking-[-0.03em] text-ink md:text-[3rem]">
          Compared with the two things you would otherwise do.
        </h2>

        <div
          data-compare="scroll"
          className="mt-10 overflow-x-auto rounded-2xl border border-rule md:mt-14"
        >
          <table className="w-full min-w-[52rem] border-collapse text-left">
            <thead>
              <tr className="bg-raised">
                <th className="w-[18%] px-5 py-4" />
                <th className="w-[30%] border-l border-rule bg-amber-soft px-5 py-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-amber">
                  EasilyPromote
                </th>
                <th className="w-[26%] border-l border-rule px-5 py-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-3">
                  Doing it yourself
                </th>
                <th className="w-[26%] border-l border-rule px-5 py-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-3">
                  Hiring an agency
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr
                  key={row.label}
                  data-compare="row"
                  className="border-t border-rule"
                >
                  <th
                    scope="row"
                    className="px-5 py-5 align-top font-mono text-[0.6875rem] uppercase leading-[1.5] tracking-[0.1em] text-ink-2"
                  >
                    {row.label}
                  </th>
                  <td
                    className={`border-l border-rule px-5 py-5 align-top text-[0.875rem] leading-[1.6] text-ink ${
                      row.highlight ? 'bg-amber-soft/60' : 'bg-raised/60'
                    }`}
                  >
                    {row.highlight ? (
                      <span className="stamp mb-2 block text-seal">Only here</span>
                    ) : null}
                    {row.ours}
                  </td>
                  <td className="border-l border-rule px-5 py-5 align-top text-[0.875rem] leading-[1.6] text-ink-3">
                    {row.diy}
                  </td>
                  <td className="border-l border-rule px-5 py-5 align-top text-[0.875rem] leading-[1.6] text-ink-3">
                    {row.agency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-3 md:hidden">
          Scroll the table sideways
        </p>
      </div>
    </section>
  )
}

export default Compare
