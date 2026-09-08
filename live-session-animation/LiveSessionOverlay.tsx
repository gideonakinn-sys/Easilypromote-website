import React, { useEffect, useRef, useState, useCallback } from 'react'

export interface TikTokVideoItem {
  id: number
  src: string
  creator: string
  initial: string
  avatarBg: string
  caption: string
  sound: string
  baseViews: number
  baseLikes: number
  commentsCount: string
  sharesCount: string
  comments: Array<{
    user: string
    text: string
    likes: string
  }>
}

const DEFAULT_VIDEOS: TikTokVideoItem[] = [
  {
    id: 0,
    src: '/src/assets/videos/vid-14.mp4',
    creator: '@.revishaan',
    initial: 'R',
    avatarBg: 'linear-gradient(135deg, #f43f5e, #fb7185)',
    caption: "every student in south africa needs this app... it's free ofc! 📲 Download now on iOS & Android #studentlife #productivity",
    sound: 'Original Sound - @.revishaan',
    baseViews: 142800,
    baseLikes: 34200,
    commentsCount: '1.4K',
    sharesCount: '8.9K',
    comments: [
      { user: 'ayanda_m', text: 'Wait this is actually 100% free??? 😭', likes: '342' },
      { user: 'jordan.dev', text: 'Downloaded yesterday, literally saved my semester 🙌', likes: '519' },
      { user: 'sipho_rsa', text: 'Every student in SA needs this on their phone fr 💯', likes: '1.1K' },
      { user: 'chloe.studies', text: 'Where has this been all year?! Downloading rn 🔥', likes: '840' },
    ],
  },
  {
    id: 1,
    src: '/src/assets/videos/vid-1.mp4',
    creator: '@maya_creates',
    initial: 'M',
    avatarBg: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
    caption: "I tested 5 creator campaign platforms so you don't have to. EasilyPromote is on another level 🚀 #contentcreator #branddeals #creatorgrowth",
    sound: 'Trending Beats - EasilyPromote Viral',
    baseViews: 284500,
    baseLikes: 68100,
    commentsCount: '2.8K',
    sharesCount: '14.2K',
    comments: [
      { user: 'tyler_vlogs', text: 'Got my first campaign approval in 24 hours 🤯', likes: '920' },
      { user: 'sophia.ugc', text: 'The payout process is so fast compared to others 💸', likes: '1.4K' },
      { user: 'ben_media', text: 'Been using this for my brand, views are insane 📈', likes: '488' },
      { user: 'nina_style', text: 'Signing up right now thank you for sharing!! ✨', likes: '612' },
    ],
  },
  {
    id: 2,
    src: '/src/assets/videos/vid-2.mp4',
    creator: '@techwithsam',
    initial: 'S',
    avatarBg: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
    caption: 'How modern brands are getting millions of views without traditional agency fees 👀 #marketingtips #growthhacks #startups',
    sound: 'Tech Talk Daily - Original',
    baseViews: 95400,
    baseLikes: 21800,
    commentsCount: '980',
    sharesCount: '4.7K',
    comments: [
      { user: 'startup_sam', text: 'Agencies were charging us 10x for this lol 💀', likes: '745' },
      { user: 'elena_growth', text: 'Our campaign reached 500k views in 3 days!', likes: '1.2K' },
      { user: 'david_commerce', text: 'Can confirm, the ROI has been insane 💯', likes: '310' },
      { user: 'hannah.market', text: 'Does it work for niche DTC products too? 🤔', likes: '185' },
    ],
  },
  {
    id: 3,
    src: '/src/assets/videos/vid-3.mp4',
    creator: '@brandcollabs_hq',
    initial: 'B',
    avatarBg: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
    caption: 'Creators get paid per verified view, brands only pay for real delivery. No more guessing games 🎯 #creatorfund #influencermarketing',
    sound: 'EasilyPromote Anthem - LoFi',
    baseViews: 518700,
    baseLikes: 114200,
    commentsCount: '5.6K',
    sharesCount: '32.1K',
    comments: [
      { user: 'marcus_films', text: 'Finally a platform that pays based on actual verified views 👏', likes: '2.5K' },
      { user: 'zara.creative', text: 'Made more here in two weeks than all of last month 🙌', likes: '3.1K' },
      { user: 'kofi_digital', text: 'This is the future of influencer marketing fr 🚀', likes: '1.8K' },
      { user: 'brand_ops', text: 'Game changer for our Q4 product launches ✨', likes: '940' },
    ],
  },
]

const HEART_COLORS = ['#f43f5e', '#ec4899', '#a855f7', '#38bdf8', '#fbbf24', '#ef4444']

function formatCompactNumber(num: number): string {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M'
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K'
  return num.toLocaleString()
}

interface TikTokFeedOverlayProps {
  items?: TikTokVideoItem[]
  autoSwipeIntervalMs?: number
  className?: string
}

export function LiveSessionOverlay({
  items = DEFAULT_VIDEOS,
  autoSwipeIntervalMs = 5000,
  className = '',
}: TikTokFeedOverlayProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [views, setViews] = useState(items[0].baseViews)
  const [likes, setLikes] = useState(items[0].baseLikes)
  const [viewDelta, setViewDelta] = useState<number | null>(null)
  const [activeComments, setActiveComments] = useState<Array<{ id: number; user: string; text: string; likes: string }>>([])
  const [floatingHearts, setFloatingHearts] = useState<Array<{ id: number; color: string; size: number; sway: number; rotMid: number; rotEnd: number; duration: number }>>([])
  const [tapBursts, setTapBursts] = useState<Array<{ id: number; x: number; y: number; color: string; rot: number }>>([])

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const commentIndexRef = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentItem = items[currentIndex]

  // Switch slides
  const goToSlide = useCallback(
    (newIdx: number) => {
      let target = newIdx
      if (target >= items.length) target = 0
      if (target < 0) target = items.length - 1

      // Pause old video
      videoRefs.current[currentIndex]?.pause()

      setCurrentIndex(target)
      const nextItem = items[target]
      setViews(nextItem.baseViews)
      setLikes(nextItem.baseLikes)
      setActiveComments([])
      commentIndexRef.current = 0

      // Play new video
      const newVid = videoRefs.current[target]
      if (newVid) {
        newVid.currentTime = 0
        newVid.play().catch(() => {})
      }
    },
    [currentIndex, items],
  )

  // Auto-swipe 5s timer
  useEffect(() => {
    const startTime = performance.now()
    const frame = requestAnimationFrame(function tick(now) {
      const elapsed = now - startTime
      if (elapsed >= autoSwipeIntervalMs) {
        goToSlide(currentIndex + 1)
      } else {
        requestAnimationFrame(tick)
      }
    })

    return () => cancelAnimationFrame(frame)
  }, [currentIndex, autoSwipeIntervalMs, goToSlide])

  // Spawn dynamic comment
  useEffect(() => {
    const spawnComment = () => {
      const c = currentItem.comments[commentIndexRef.current % currentItem.comments.length]
      commentIndexRef.current += 1
      const id = Date.now() + Math.random()

      setActiveComments((prev) => [...prev.slice(-1), { ...c, id }])
      setTimeout(() => {
        setActiveComments((prev) => prev.filter((item) => item.id !== id))
      }, 4000)
    }

    spawnComment()
    const interval = setInterval(spawnComment, 2600)
    return () => clearInterval(interval)
  }, [currentItem])

  // Tap Burst
  const spawnTapBurst = useCallback((x: number, y: number) => {
    const id = Date.now() + Math.random()
    const color = HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)]
    const rot = Math.random() * 30 - 15

    setTapBursts((prev) => [...prev.slice(-10), { id, x, y, color, rot }])
    setLikes((l) => l + 1)

    setTimeout(() => {
      setTapBursts((prev) => prev.filter((b) => b.id !== id))
    }, 750)
  }, [])

  // Floating Heart
  const spawnFloatingHeart = useCallback(() => {
    const id = Date.now() + Math.random()
    const color = HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)]
    const size = 18 + Math.floor(Math.random() * 18)
    const sway = Math.random() * 60 - 30
    const rotMid = Math.random() * 30 - 15
    const rotEnd = Math.random() * 40 - 20
    const duration = 2.0 + Math.random() * 0.8

    setFloatingHearts((prev) => [
      ...prev.slice(-18),
      { id, color, size, sway, rotMid, rotEnd, duration },
    ])

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== id))
    }, duration * 1000)
  }, [])

  // Floating hearts stream
  useEffect(() => {
    const timer = setInterval(() => {
      spawnFloatingHeart()
    }, 350)
    return () => clearInterval(timer)
  }, [spawnFloatingHeart])

  // Organic views increment
  useEffect(() => {
    const timer = setInterval(() => {
      const delta = Math.floor(Math.random() * 95) + 30
      setViews((v) => v + delta)
      setViewDelta(delta)
      setTimeout(() => setViewDelta(null), 1000)
    }, 2500)
    return () => clearInterval(timer)
  }, [])

  // Click on container
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    spawnTapBurst(x, y)
    spawnFloatingHeart()
  }

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className={`relative aspect-[9/16] w-full max-w-sm select-none overflow-hidden rounded-[2.5rem] bg-black shadow-2xl cursor-pointer ${className}`}
    >
      {/* Top Views Pill */}
      <div className="pointer-events-none absolute inset-x-4 top-4 z-28 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/75 px-3 py-1 backdrop-blur-md shadow-lg">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-blue-600 shadow-[0_0_8px_rgba(14,165,233,0.5)]">
            <svg className="h-3 w-3 stroke-white fill-none stroke-2" viewBox="0 0 24 24">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <div className="flex items-baseline gap-1 font-mono text-xs font-extrabold text-white">
            <span>{formatCompactNumber(views)}</span>
            {viewDelta && <span className="rounded bg-emerald-500/20 px-1 text-[9px] text-emerald-400">+{viewDelta}</span>}
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-slate-950/75 px-3 py-1 text-xs font-bold text-slate-200 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          EasilyPromote
        </div>
      </div>

      {/* Vertical Video Track */}
      <div
        className="absolute inset-0 flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: `translateY(-${currentIndex * 100}%)` }}
      >
        {items.map((item, idx) => (
          <div key={item.id} className="relative h-full w-full flex-shrink-0 bg-black">
            <video
              ref={(el) => {
                videoRefs.current[idx] = el
              }}
              src={item.src}
              loop
              playsInline
              muted
              autoPlay={idx === 0}
              className="absolute inset-0 h-full w-full object-cover pointer-events-none"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/85" />
          </div>
        ))}
      </div>

      {/* Pop-Up Ad Comments */}
      <div className="pointer-events-none absolute left-4 bottom-24 z-25 flex w-[74%] flex-col gap-2">
        {activeComments.map((c) => (
          <div
            key={c.id}
            className="flex items-start gap-2.5 rounded-2xl border border-white/15 bg-slate-950/85 p-2.5 backdrop-blur-md shadow-xl animate-in fade-in slide-in-from-bottom-3 duration-300"
          >
            <div
              className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold text-white shadow"
              style={{ background: currentItem.avatarBg }}
            >
              {c.user.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold text-slate-200">@{c.user}</span>
              <p className="text-[11px] text-slate-100 leading-snug">{c.text}</p>
            </div>
            <div className="flex flex-col items-center gap-0.5 text-rose-500">
              <svg className="h-3 w-3 fill-rose-500" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className="text-[8px] font-bold text-slate-400">{c.likes}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tap Bursts */}
      {tapBursts.map((b) => (
        <div key={b.id} className="pointer-events-none absolute z-25 -translate-x-1/2 -translate-y-1/2" style={{ left: `${b.x}px`, top: `${b.y}px` }}>
          <div className="absolute -inset-3 animate-ping rounded-full border-2 opacity-80" style={{ borderColor: b.color }} />
          <svg className="h-11 w-11 animate-bounce drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]" viewBox="0 0 24 24" fill={b.color} style={{ transform: `rotate(${b.rot}deg)` }}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}

      {/* Floating Hearts */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        {floatingHearts.map((h) => (
          <div
            key={h.id}
            className="absolute bottom-16 right-5 transition-all"
            style={{
              animation: `floatUp ${h.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
              ['--sway' as string]: `${h.sway}px`,
              ['--rot-mid' as string]: `${h.rotMid}deg`,
              ['--rot-end' as string]: `${h.rotEnd}deg`,
            }}
          >
            <svg width={h.size} height={h.size} viewBox="0 0 24 24" fill={h.color} style={{ filter: `drop-shadow(0 2px 6px ${h.color}88)` }}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        ))}
      </div>

      {/* TikTok Right Action Rail */}
      <div className="pointer-events-auto absolute right-3 bottom-6 z-28 flex flex-col items-center gap-3">
        <div className="relative mb-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-sm font-extrabold text-white" style={{ background: currentItem.avatarBg }}>
            {currentItem.initial}
          </div>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-black text-white">
            +
          </div>
        </div>

        <div className="flex flex-col items-center gap-0.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              if (!containerRef.current) return
              const rect = containerRef.current.getBoundingClientRect()
              spawnTapBurst(rect.width - 40, rect.height - 70)
              spawnFloatingHeart()
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 shadow-[0_4px_16px_rgba(225,29,72,0.5)] active:scale-90 transition-transform"
          >
            <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
          <span className="text-[10px] font-bold font-mono text-white drop-shadow">{formatCompactNumber(likes)}</span>
        </div>

        <div className="flex flex-col items-center gap-0.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 backdrop-blur-md">
            <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <span className="text-[10px] font-bold font-mono text-white drop-shadow">{currentItem.commentsCount}</span>
        </div>

        <div className="flex flex-col items-center gap-0.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 backdrop-blur-md">
            <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
          </div>
          <span className="text-[10px] font-bold font-mono text-white drop-shadow">{currentItem.sharesCount}</span>
        </div>
      </div>

      {/* Bottom Creator & Caption Info */}
      <div className="pointer-events-none absolute inset-x-4 bottom-4 z-28 pr-14">
        <div className="flex items-center gap-1 mb-0.5">
          <span className="text-xs font-extrabold text-white">{currentItem.creator}</span>
          <svg className="h-3 w-3 fill-cyan-400" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
        <p className="line-clamp-2 text-[11px] font-medium text-slate-200 drop-shadow mb-1">
          {currentItem.caption}
        </p>
        <div className="flex items-center gap-1.5 text-[10px] text-slate-300 font-semibold">
          <svg className="h-3 w-3 fill-slate-300" viewBox="0 0 24 24">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
          <span className="truncate">{currentItem.sound}</span>
        </div>
      </div>

      <style>{`
        @keyframes floatUp {
          0% { opacity: 0; transform: translate3d(0, 0, 0) scale(0.4) rotate(0deg); }
          10% { opacity: 0.95; transform: translate3d(calc(var(--sway) * 0.3), -35px, 0) scale(1.15) rotate(var(--rot-mid)); }
          40% { transform: translate3d(calc(var(--sway) * -0.7), -160px, 0) scale(1) rotate(calc(var(--rot-mid) * -0.8)); }
          70% { opacity: 0.85; transform: translate3d(var(--sway), -300px, 0) scale(0.95) rotate(var(--rot-end)); }
          100% { opacity: 0; transform: translate3d(calc(var(--sway) * -0.3), -440px, 0) scale(0.65) rotate(calc(var(--rot-end) * 1.5)); }
        }
      `}</style>
    </div>
  )
}

export default LiveSessionOverlay
