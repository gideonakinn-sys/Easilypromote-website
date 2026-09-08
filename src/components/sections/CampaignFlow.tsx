import { useState } from 'react'
import AnimatedTabs from '../ui/animated-tabs'
import clipBrief from '../../assets/videos/vid-1.mp4'
import clipGoal from '../../assets/videos/vid-2.mp4'
import clipScale from '../../assets/videos/vid-3.mp4'
import clipReach from '../../assets/videos/vid-4.mp4'
import clipResult from '../../assets/videos/vid-5.mp4'

const APP = 'https://app.easilypromote.com'

interface Tab {
  label: string
  title: string
  description: string
  clip: string
}

const TABS: Tab[] = [
  {
    label: 'The Brief',
    title: 'Create Your Campaign Instruction',
    description:
      'Start by telling us what makes your product unique. Write a clear, creative brief or campaign listing that outlines your brand voice, key messaging, and any content guidelines. This is your blueprint—it ensures every creator knows exactly what you expect from day one.',
    clip: clipBrief,
  },
  {
    label: 'The Goal',
    title: 'Set Your Campaign Objective',
    description:
      'What does success look like for you? Choose your primary goal—whether it\u2019s driving more streams, boosting app downloads, increasing product sales, growing brand awareness, or generating website traffic. Your objective shapes how we match you with the right creators and how we measure performance.',
    clip: clipGoal,
  },
  {
    label: 'The Scale',
    title: 'Choose Your Creator Count',
    description:
      'Decide how many creators you want to join your campaign. Whether you\u2019re testing with a small group of 10 niche creators or scaling up to hundreds for maximum reach, you stay in full control. More creators mean more organic touchpoints and a wider net for your product.',
    clip: clipScale,
  },
  {
    label: 'The Reach',
    title: 'Define Your Target Views & Platforms',
    description:
      'Set the total number of views and the specific platforms you want your campaign to hit—whether it\u2019s TikTok, Instagram, YouTube, or a mix. We\u2019ll work backwards to ensure the combined creator audience meets your reach targets, so you\u2019re never left guessing if you\u2019ll hit your numbers.',
    clip: clipReach,
  },
  {
    label: 'The Result',
    title: 'Review, Approve & Track',
    description:
      'Once creators deliver their content, you get full approval rights. Reject anything that misses the mark, approve what represents your brand, and track real-time engagement, audience feedback, and campaign performance from a single dashboard.',
    clip: clipResult,
  },
]

function CampaignFlow() {
  const [activeLabel, setActiveLabel] = useState(TABS[0].label)
  const activeTab = TABS.find((tab) => tab.label === activeLabel) ?? TABS[0]
  const activeIndex = TABS.findIndex((tab) => tab.label === activeLabel)

  return (
    <section
      data-section="campaign-flow"
      className="relative px-5 py-20 md:px-10 md:py-24"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-semibold text-ink-3">How it works</p>
          <h2 className="max-w-[18ch] font-display text-[2rem] font-semibold leading-[1.04] tracking-[-0.03em] text-ink md:text-[3rem]">
            Five moves, from brief to verified results.
          </h2>
        </div>

        <div data-flow="tabs" className="mt-10 flex justify-center">
          <AnimatedTabs
            idPrefix="flow"
            tabs={TABS.map(({ label }) => ({ label }))}
            activeTab={activeLabel}
            setActiveTab={setActiveLabel}
          />
        </div>

        <div
          data-flow="panel"
          role="tabpanel"
          id={`flow-panel-${activeIndex}`}
          aria-labelledby={`flow-tab-${activeIndex}`}
          className="mt-10 flex flex-col justify-center rounded-[2rem] border border-rule bg-raised p-6 md:min-h-[70svh] md:p-12"
        >
          <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
            <div className="flex flex-col items-start gap-5">
              <h3 className="font-display text-[1.5rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink md:text-[2rem]">
                {activeTab.title}
              </h3>
              <p className="text-[0.9375rem] leading-[1.7] text-ink-2 md:text-[1rem]">
                {activeTab.description}
              </p>
              <a
                href={`${APP}/create-account`}
                target="_blank"
                rel="noopener noreferrer"
                className="springy mt-1 inline-block rounded-full bg-brand px-6 py-3 text-sm font-semibold tracking-[-0.01em] text-stone-900"
              >
                Start a campaign
              </a>
            </div>

            <div className="flex items-center justify-center md:justify-end">
              <video
                key={activeTab.label}
                src={activeTab.clip}
                className="h-56 w-56 rounded-2xl object-cover md:h-80 md:w-80 md:rounded-[1.75rem]"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
                tabIndex={-1}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CampaignFlow