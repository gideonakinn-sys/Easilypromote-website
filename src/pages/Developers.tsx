import { useState } from 'react'
import {
  APP_SETTINGS_URL,
  CODE_LABELS,
  CODE_SAMPLES,
  FAQ,
  FIELDS,
  FLOW_STEPS,
  QUICKSTART,
  RESPONSES,
  SAMPLE_REQUEST,
  TEST_VECTOR,
  VALIDATE_REASONS,
  VALIDATE_REQUEST,
  VALIDATE_RESPONSES,
  VALIDATE_SAMPLES,
  VALIDATE_URL,
  WEBHOOK_URL,
  type CodeLanguage,
} from '../data/referralWebhooks'

type Operation = 'validate' | 'conversion'

const OPERATION_LABELS: Record<Operation, string> = {
  validate: 'Check a code',
  conversion: 'Report a conversion',
}

// The theme's --font-mono is Rethink Sans for the stamps; code needs a real monospace.
const MONO = 'font-[ui-monospace,SFMono-Regular,Menlo,Consolas,monospace]'

const TOC = [
  { id: 'how-it-works', label: 'How it works' },
  { id: 'quickstart', label: 'Quickstart' },
  { id: 'signing', label: 'Signing requests' },
  { id: 'validate', label: 'Checking a code' },
  { id: 'request', label: 'Reporting a conversion' },
  { id: 'responses', label: 'Conversion responses' },
  { id: 'retries', label: 'Retries and duplicates' },
  { id: 'examples', label: 'Code examples' },
  { id: 'testing', label: 'Testing' },
  { id: 'faq', label: 'FAQ' },
]

function InlineCode({ children }: { children: string }) {
  return (
    <code className={`${MONO} rounded border border-rule [overflow-wrap:anywhere] bg-raised px-1.5 py-0.5 text-[0.85em] text-ink`}>
      {children}
    </code>
  )
}

function CodeBlock({ code, label }: { code: string; label: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-night">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="stamp text-ink-3">{label}</span>
        <button
          type="button"
          onClick={copy}
          className="rounded-full border border-white/20 px-3 py-1 text-[0.75rem] font-semibold text-paper"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="overflow-x-auto">
        <pre className={`${MONO} p-4 text-[0.8125rem] leading-[1.7] text-paper`}>{code}</pre>
      </div>
    </div>
  )
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 border-t border-rule pt-10 md:pt-12">
      <h2 id={`${id}-title`} className="text-[1.375rem] font-semibold tracking-[-0.02em] text-ink">
        {title}
      </h2>
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  )
}

function Prose({ children }: { children: React.ReactNode }) {
  return <p className="max-w-[65ch] text-[0.9375rem] leading-[1.65] text-ink-2">{children}</p>
}

function Developers() {
  const [language, setLanguage] = useState<CodeLanguage>('node')
  const [operation, setOperation] = useState<Operation>('validate')

  return (
    <div className="flex flex-1 flex-col px-5 pb-20 pt-28 md:px-10 md:pb-28 md:pt-36">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 md:flex-row md:gap-16">
        <nav aria-label="On this page" className="md:sticky md:top-28 md:h-fit md:w-56 md:shrink-0">
          <p className="stamp text-ink-3">On this page</p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 md:flex-col md:gap-0.5">
            {TOC.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="text-[0.875rem] font-semibold text-ink-2 md:block md:border-l-2 md:border-rule md:py-1.5 md:pl-4"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={APP_SETTINGS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="springy mt-6 inline-flex rounded-full bg-brand px-5 py-2.5 text-[0.875rem] font-semibold text-ink"
          >
            Open referral settings
          </a>
        </nav>

        <article className="min-w-0 max-w-3xl flex-1">
          <header className="pb-10">
            <p className="stamp text-amber">Developers · Referral webhooks</p>
            <h1 className="mt-4 text-balance text-[28px] font-medium leading-[1.1] tracking-tighter text-stone-900 md:text-[40px]">
              Report conversions from creator referral codes
            </h1>
            <p className="mt-5 max-w-[60ch] text-[1rem] leading-[1.65] text-ink-2">
              When someone signs up, installs, deposits or buys with a creator’s code, your server sends Easily Promote
              one signed HTTPS request. We match the code to the creator and credit them. No SDK, nothing in your
              sign-up flow, and no personal data.
            </p>
            <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-rule bg-rule sm:grid-cols-3">
              {[
                ['Method', 'POST, JSON body'],
                ['Authentication', 'Key ID + HMAC-SHA256'],
                ['Test mode', '"test": true'],
              ].map(([term, value]) => (
                <div key={term} className="bg-raised px-4 py-3">
                  <dt className="stamp text-ink-3">{term}</dt>
                  <dd className="mt-1 text-[0.9375rem] font-semibold text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </header>

          <div className="space-y-12 md:space-y-14">
            <Section id="how-it-works" title="How it works">
              <ol className="space-y-3">
                {FLOW_STEPS.map((step, i) => (
                  <li key={step.title} className="flex gap-4 rounded-2xl border border-rule bg-raised p-4">
                    <span
                      aria-hidden="true"
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-[0.8125rem] font-semibold text-paper"
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="stamp text-ink-3">{step.who}</p>
                      <p className="mt-1 text-[0.9375rem] font-semibold text-ink">{step.title}</p>
                      <p className="mt-1 text-[0.875rem] leading-[1.6] text-ink-2">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Prose>
                Referral tracking runs alongside a campaign’s views. Creators can start posting before your integration
                is live; conversions start counting as soon as you send them.
              </Prose>
            </Section>

            <Section id="quickstart" title="Quickstart">
              <ol className="list-decimal space-y-2.5 pl-5 text-[0.9375rem] leading-[1.6] text-ink-2 marker:font-semibold marker:text-ink">
                {QUICKSTART.map((step) => (
                  <li key={step} className="pl-1">
                    {step}
                  </li>
                ))}
              </ol>
            </Section>

            <Section id="signing" title="Signing requests">
              <Prose>
                Every request carries two headers. <InlineCode>X-EP-Key-Id</InlineCode> says which key signed it.{' '}
                <InlineCode>X-EP-Signature</InlineCode> proves the body came from you and hasn’t been changed or replayed.
              </Prose>
              <ol className="list-decimal space-y-2.5 pl-5 text-[0.9375rem] leading-[1.6] text-ink-2 marker:font-semibold marker:text-ink">
                <li className="pl-1">
                  Serialize the JSON body to a string. Sign and send that exact string — re-serializing after signing
                  changes the bytes and the signature will not match.
                </li>
                <li className="pl-1">
                  Take the current Unix time in seconds as <InlineCode>t</InlineCode>. It must be within 5 minutes of our
                  clock.
                </li>
                <li className="pl-1">
                  Compute HMAC-SHA256 of <InlineCode>{'${t}.${body}'}</InlineCode> using your secret, as lowercase hex.
                </li>
                <li className="pl-1">
                  Send <InlineCode>{'X-EP-Signature: t=<t>,v1=<hex>'}</InlineCode>.
                </li>
              </ol>

              <div className="rounded-2xl border border-rule bg-raised p-5">
                <p className="text-[0.9375rem] font-semibold text-ink">Check your implementation</p>
                <p className="mt-1 text-[0.875rem] leading-[1.6] text-ink-2">
                  Sign these values with your code. If you get the same signature, your signing is correct. This secret is
                  an example only and does not work against the API.
                </p>
                <dl className="mt-4 space-y-3">
                  {[
                    ['Secret', TEST_VECTOR.secret],
                    ['t', TEST_VECTOR.timestamp],
                    ['Body', TEST_VECTOR.body],
                    ['String to sign', TEST_VECTOR.signedString],
                    ['Expected v1', TEST_VECTOR.signature],
                  ].map(([term, value]) => (
                    <div key={term}>
                      <dt className="stamp text-ink-3">{term}</dt>
                      <dd className={`${MONO} mt-1 break-all text-[0.8125rem] text-ink`}>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Section>

            <Section id="validate" title="Checking a code">
              <Prose>
                When a user enters a referral code in your sign-up, checkout or deposit flow, ask us whether it’s valid
                before you accept it. You never load or sync creators’ codes — a code works the moment its creator joins
                a campaign. The endpoint is <InlineCode>{VALIDATE_URL}</InlineCode>.
              </Prose>
              <CodeBlock code={VALIDATE_REQUEST} label="HTTP" />
              <Prose>
                Sign it exactly like a conversion. A code check records nothing; report the conversion separately once it
                happens.
              </Prose>

              <div className="overflow-x-auto rounded-2xl border border-rule">
                <table className="w-full min-w-[640px] border-collapse text-left">
                  <caption className="sr-only">Code check responses</caption>
                  <thead className="bg-raised">
                    <tr>
                      {['Status', 'Body', 'What to do'].map((heading) => (
                        <th key={heading} scope="col" className="stamp border-b border-rule px-4 py-3 font-normal text-ink-3">
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {VALIDATE_RESPONSES.map((row) => (
                      <tr key={row.body} className="align-top">
                        <td className="border-b border-rule px-4 py-3">
                          <code className={`${MONO} text-[0.8125rem] font-semibold text-ink`}>{row.status}</code>
                        </td>
                        <td className="border-b border-rule px-4 py-3">
                          <code className={`${MONO} break-all text-[0.75rem] text-ink-2`}>{row.body}</code>
                        </td>
                        <td className="border-b border-rule px-4 py-3 text-[0.8125rem] leading-[1.6] text-ink-2">
                          {row.action}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <dl className="divide-y divide-rule rounded-2xl border border-rule bg-raised">
                {VALIDATE_REASONS.map((item) => (
                  <div key={item.reason} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:gap-6">
                    <dt className="sm:w-56 sm:shrink-0">
                      <code className={`${MONO} text-[0.8125rem] font-semibold text-ink`}>{item.reason}</code>
                    </dt>
                    <dd className="text-[0.875rem] leading-[1.6] text-ink-2">{item.meaning}</dd>
                  </div>
                ))}
              </dl>

              <div className="rounded-2xl border border-dashed border-amber bg-amber-soft p-4">
                <p className="text-[0.875rem] leading-[1.6] text-ink">
                  <span className="font-semibold">Don’t block sign-ups on this call.</span> Use a short timeout, around 3
                  seconds. If the check errors or times out, accept the code anyway and report the conversion as normal —
                  the conversion webhook rejects codes that were never valid.
                </p>
              </div>
            </Section>

            <Section id="request" title="Reporting a conversion">
              <Prose>
                Copy your exact URLs from Referral tracking settings in the app. In production the conversion endpoint is{' '}
                <InlineCode>{WEBHOOK_URL}</InlineCode>.
              </Prose>
              <CodeBlock code={SAMPLE_REQUEST} label="HTTP" />

              <div className="overflow-x-auto rounded-2xl border border-rule">
                <table className="w-full min-w-[640px] border-collapse text-left">
                  <caption className="sr-only">Request body fields</caption>
                  <thead className="bg-raised">
                    <tr>
                      {['Field', 'Type', 'Required', 'Description'].map((heading) => (
                        <th key={heading} scope="col" className="stamp border-b border-rule px-4 py-3 font-normal text-ink-3">
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {FIELDS.map((field) => (
                      <tr key={field.name} className="align-top">
                        <td className="border-b border-rule px-4 py-3">
                          <code className={`${MONO} text-[0.8125rem] font-semibold text-ink`}>{field.name}</code>
                        </td>
                        <td className="border-b border-rule px-4 py-3 text-[0.8125rem] text-ink-2">{field.type}</td>
                        <td className="border-b border-rule px-4 py-3 text-[0.8125rem] text-ink-2">
                          {field.required ? 'Yes' : 'No'}
                        </td>
                        <td className="border-b border-rule px-4 py-3 text-[0.8125rem] leading-[1.6] text-ink-2">
                          {field.description}
                          <span className={`${MONO} mt-1 block text-ink-3`}>e.g. {field.example}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="responses" title="Conversion responses">
              <Prose>
                Every response is JSON. A <InlineCode>200</InlineCode> means we have the event — including duplicates —
                so you can stop sending it.
              </Prose>
              <div className="overflow-x-auto rounded-2xl border border-rule">
                <table className="w-full min-w-[720px] border-collapse text-left">
                  <caption className="sr-only">Webhook responses</caption>
                  <thead className="bg-raised">
                    <tr>
                      {['Status', 'Body', 'Meaning', 'Retry?'].map((heading) => (
                        <th key={heading} scope="col" className="stamp border-b border-rule px-4 py-3 font-normal text-ink-3">
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {RESPONSES.map((row) => (
                      <tr key={`${row.status}-${row.body}`} className="align-top">
                        <td className="border-b border-rule px-4 py-3">
                          <code className={`${MONO} text-[0.8125rem] font-semibold text-ink`}>{row.status}</code>
                        </td>
                        <td className="border-b border-rule px-4 py-3">
                          <code className={`${MONO} break-all text-[0.75rem] text-ink-2`}>{row.body}</code>
                        </td>
                        <td className="border-b border-rule px-4 py-3 text-[0.8125rem] leading-[1.6] text-ink-2">
                          {row.meaning}
                        </td>
                        <td className="border-b border-rule px-4 py-3 text-[0.8125rem] text-ink-2">{row.retry}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="retries" title="Retries and duplicates">
              <Prose>
                Networks fail, so send events from a queue or background job rather than inside the user’s request.
              </Prose>
              <ul className="list-disc space-y-2.5 pl-5 text-[0.9375rem] leading-[1.6] text-ink-2 marker:text-ink-3">
                <li className="pl-1">
                  Retry timeouts, connection errors, <InlineCode>429</InlineCode> and <InlineCode>5xx</InlineCode> with
                  exponential backoff — for example after 1s, 2s, 4s, 8s — for up to 24 hours.
                </li>
                <li className="pl-1">
                  Keep the same <InlineCode>event_id</InlineCode> on every retry. If an earlier attempt did reach us, the
                  retry returns <InlineCode>ignored</InlineCode> and nothing is counted twice.
                </li>
                <li className="pl-1">
                  Re-sign each attempt with a fresh <InlineCode>t</InlineCode>; a signature older than 5 minutes is
                  rejected.
                </li>
                <li className="pl-1">
                  Don’t retry <InlineCode>400</InlineCode>, <InlineCode>401</InlineCode>, <InlineCode>404</InlineCode>{' '}
                  or <InlineCode>409</InlineCode> without changing something — the same request will fail the same way.
                </li>
              </ul>
            </Section>

            <Section id="examples" title="Code examples">
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Operation">
                {(Object.keys(OPERATION_LABELS) as Operation[]).map((op) => (
                  <button
                    key={op}
                    type="button"
                    role="radio"
                    aria-checked={operation === op}
                    onClick={() => setOperation(op)}
                    className={`rounded-full px-4 py-2 text-[0.8125rem] font-semibold ${
                      operation === op ? 'bg-brand text-ink' : 'border border-rule bg-raised text-ink-2'
                    }`}
                  >
                    {OPERATION_LABELS[op]}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Example language">
                {(Object.keys(CODE_LABELS) as CodeLanguage[]).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    role="tab"
                    id={`tab-${lang}`}
                    aria-selected={language === lang}
                    aria-controls="code-example-panel"
                    onClick={() => setLanguage(lang)}
                    className={`rounded-full px-4 py-2 text-[0.8125rem] font-semibold ${
                      language === lang ? 'bg-ink text-paper' : 'border border-rule bg-raised text-ink-2'
                    }`}
                  >
                    {CODE_LABELS[lang]}
                  </button>
                ))}
              </div>
              <div id="code-example-panel" role="tabpanel" aria-labelledby={`tab-${language}`}>
                <CodeBlock
                  code={operation === 'validate' ? VALIDATE_SAMPLES[language] : CODE_SAMPLES[language]}
                  label={`${CODE_LABELS[language]} · ${OPERATION_LABELS[operation]}`}
                />
              </div>
              <Prose>
                Store <InlineCode>EP_KEY_ID</InlineCode> and <InlineCode>EP_WEBHOOK_SECRET</InlineCode> as environment
                variables on your server. Both cURL examples are safe to run as-is: a code check records nothing, and the
                conversion example sends a test event.
              </Prose>
            </Section>

            <Section id="testing" title="Testing">
              <ul className="space-y-3">
                {[
                  {
                    title: 'Try requests from the app',
                    body: 'Referral tracking settings can check a code or send a test conversion for you. We sign the request with your key and run it through the real checks, so you can see a working exchange before writing any code.',
                  },
                  {
                    title: 'Send test events from your server',
                    body: 'Add "test": true to any request. We verify the key and signature, mark you Connected and tell you whether the code would match — without recording a conversion.',
                  },
                  {
                    title: 'Read the request log',
                    body: 'Recent requests in the app lists every signed request from the last 30 days with the status we returned and the reason for any rejection.',
                  },
                ].map((item) => (
                  <li key={item.title} className="rounded-2xl border border-rule bg-raised p-4">
                    <p className="text-[0.9375rem] font-semibold text-ink">{item.title}</p>
                    <p className="mt-1 text-[0.875rem] leading-[1.6] text-ink-2">{item.body}</p>
                  </li>
                ))}
              </ul>
              <div className="rounded-2xl border border-dashed border-amber bg-amber-soft p-4">
                <p className="text-[0.875rem] leading-[1.6] text-ink">
                  <span className="font-semibold">Getting 401 “Signature does not match”?</span> Check you signed the
                  exact body string you sent, used the secret (not the key ID), and wrote <InlineCode>t</InlineCode> in
                  seconds, not milliseconds. Compare against the test values under Signing requests.
                </p>
              </div>
            </Section>

            <Section id="faq" title="FAQ">
              <div className="divide-y divide-rule rounded-2xl border border-rule bg-raised">
                {FAQ.map((item) => (
                  <details key={item.q} className="group px-4 py-3">
                    <summary className="cursor-pointer list-none text-[0.9375rem] font-semibold text-ink">
                      <span className="flex items-center justify-between gap-4">
                        {item.q}
                        <span aria-hidden="true" className="text-ink-3 transition-transform group-open:rotate-45">
                          +
                        </span>
                      </span>
                    </summary>
                    <p className="mt-2 max-w-[65ch] text-[0.875rem] leading-[1.6] text-ink-2">{item.a}</p>
                  </details>
                ))}
              </div>
              <Prose>
                Stuck? Email <a className="font-semibold text-ink underline underline-offset-2" href="mailto:enquiry@easilypromote.com">enquiry@easilypromote.com</a>{' '}
                with the event_id and the response you received.
              </Prose>
            </Section>
          </div>
        </article>
      </div>
    </div>
  )
}

export default Developers
