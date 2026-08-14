import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import LegalLayout from '../components/LegalLayout'
import type { PrivacyBlock } from '../data/privacy'
import { privacyMeta, privacySections } from '../data/privacy'

const TITLE_WORDS = ['Privacy', 'Policy']

function RichText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g)

  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-stone-900">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  )
}

function PrivacyBlock({ block }: { block: PrivacyBlock }) {
  switch (block.type) {
    case 'heading':
      return (
        <h3 className="mt-8 text-[14px] font-semibold tracking-[-0.01em] text-stone-900 md:text-base">
          {block.text}
        </h3>
      )
    case 'paragraph':
      return (
        <p className="mt-5 text-[13px] font-medium leading-[1.6] tracking-[-0.01em] text-stone-600">
          <RichText text={block.text ?? ''} />
        </p>
      )
    case 'list': {
      const ListTag = block.ordered ? 'ol' : 'ul'
      return (
        <ListTag
          className={`mt-5 space-y-2 ${block.ordered ? 'list-decimal pl-5' : 'list-disc pl-5'}`}
        >
          {block.items?.map((item, i) => (
            <li
              key={i}
              className="text-[13px] font-medium leading-[1.6] tracking-[-0.01em] text-stone-600"
            >
              <RichText text={item} />
            </li>
          ))}
        </ListTag>
      )
    }
    case 'table':
      return (
        <div className="mt-5 overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                {block.headers?.map((header) => (
                  <th
                    key={header}
                    className="border-b border-stone-300 pb-2 pr-4 text-[13px] font-semibold tracking-[-0.01em] text-stone-900"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows?.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`border-b border-stone-200 py-2.5 pr-4 align-top text-[13px] leading-[1.6] ${
                        j === 0
                          ? 'font-semibold tracking-[-0.01em] text-stone-900'
                          : 'font-medium tracking-[-0.01em] text-stone-600'
                      }`}
                    >
                      <RichText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    default:
      return null
  }
}

function Privacy() {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('[data-reveal="word"]', {
        yPercent: 110,
        opacity: 0,
        duration: 0.85,
        ease: 'power4.out',
        stagger: 0.05,
      }).from(
        '[data-reveal="intro"]',
        { y: 18, opacity: 0, duration: 0.7 },
        '-=0.4',
      )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <LegalLayout>
      <div ref={rootRef} className="max-w-2xl text-left">
        <h1 className="max-w-2xl text-[28px] font-medium leading-[1.1] tracking-tighter text-stone-900 md:text-[36px]">
          {TITLE_WORDS.map((word, i) => (
            <span
              key={i}
              className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom"
            >
              <span
                data-reveal="word"
                className="inline-block will-change-transform"
              >
                {word}
              </span>
              {i < TITLE_WORDS.length - 1 ? '\u00A0' : ''}
            </span>
          ))}
        </h1>

        <p
          data-reveal="intro"
          className="mt-4 text-[14px] font-medium leading-[1.6] tracking-[-0.01em] text-stone-600"
        >
          How EasilyPromote collects, uses, and protects your information.
        </p>
        <p className="mt-2 text-xs font-medium tracking-[-0.01em] text-stone-500">
          {privacyMeta.effective}
        </p>

        <div className="mt-12">
          {privacySections.map((section) => (
            <section key={section.number} className="mt-10 md:mt-12">
              <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-stone-900 md:text-base">
                {section.number}. {section.title}
              </h2>
              <div>
                {section.blocks.map((block, i) => (
                  <PrivacyBlock key={i} block={block} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </LegalLayout>
  )
}

export default Privacy
