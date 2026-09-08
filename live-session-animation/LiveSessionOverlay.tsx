import React, { useEffect, useRef, useState, useCallback } from 'react'

interface HeartItem {
  id: number
  color: string
  size: number
  sway: number
  rotMid: number
  rotEnd: number
  duration: number
}

interface TapBurstItem {
  id: number
  x: number
  y: number
  color: string
  rot: number
}

interface AdCommentItem {
  id: number
  user: string
  text: string
  likes: string
  avatarBg: string
}

interface AdEngagementOverlayProps {
  videoSrc?: string
  creatorTag?: string
  caption?: string
  initialViews?: number
  initialLikes?: number
  className?: string
}

const HEART_COLORS = [
  '#f43f5e', // Rose
  '#ec4899', // Pink
  '#a855f7', // Purple
  '#38bdf8', // Cyan
  '#fbbf24', // Amber
  '#ef4444', // Red
]

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #f43f5e, #e11d48)',
  'linear-gradient(135deg, #8b5cf6, #6d28d9)',
  'linear-gradient(135deg, #06b6d4, #0891b2)',
  'linear-gradient(135deg, #f59e0b, #d97706)',
  'linear-gradient(135deg, #10b981, #059669)',
]

const AD_COMMENTS_DATA = [
  { user: 'ayanda_m', text: 'Wait this is actually 100% free??? 😭', likes: '342' },
  { user: 'jordan.dev', text: 'Downloaded yesterday, literally saved my semester 🙌', likes: '519' },
  { user: 'sipho_rsa', text: 'Every student in SA needs this on their phone fr 💯', likes: '1.1K' },
  { user: 'chloe.studies', text: 'Where has this been all year?! Downloading rn 🔥', likes: '840' },
  { user: 'thabo_k', text: 'Sent to all my varsity group chats immediately 📲', likes: '298' },
  { user: 'kylie_za', text: 'Bro this made studying so much easier haha 👏', likes: '627' },
]

function formatCompactNumber(num: number): string {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M'
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K'
  return num.toLocaleString()
}

export function AdEngagementOverlay({
  videoSrc = '/src/assets/videos/vid-14.mp4',
  creatorTag = '@.revishaan',
  caption = "every student needs this app... it's free ofc! 📲 Download now on iOS & Android",
  initialViews = 142800,
  initialLikes = 34200,
  className = '',
}: AdEngagementOverlayProps) {
  const [views, setViews] = useState(initialViews)
  const [likes, setLikes] = useState(initialLikes)
  const [viewDelta, setViewDelta] = useState<number | null>(null)
  const [floatingHearts, setFloatingHearts] = useState<HeartItem[]>([])
  const [tapBursts, setTapBursts] = useState<TapBurstItem[]>([])
  const [comments, setComments] = useState<AdCommentItem[]>([])
  const commentIndexRef = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Floating heart spawn
  const spawnFloatingHeart = useCallback(() => {
    const id = Date.now() + Math.random()
    const color = HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)]
    const size = 20 + Math.floor(Math.random() * 18)
    const sway = Math.random() * 60 - 30
    const rotMid = Math.random() * 30 - 15
    const rotEnd = Math.random() * 40 - 20
    const duration = 2.0 + Math.random() * 1.0

    setFloatingHearts((prev) => [
      ...prev.slice(-20),
      { id, color, size, sway, rotMid, rotEnd, duration },
    ])

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== id))
    }, duration * 1000)
  }, [])

  // Tap burst spawn
  const spawnTapBurst = useCallback((x: number, y: number) => {
    const id = Date.now() + Math.random()
    const color = HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)]
    const rot = Math.random() * 30 - 15

    setTapBursts((prev) => [...prev.slice(-12), { id, x, y, color, rot }])
    setLikes((l) => l + 1)

    setTimeout(() => {
      setTapBursts((prev) => prev.filter((b) => b.id !== id))
    }, 750)
  }, [])

  // Spawn dynamic ad comment
  const spawnComment = useCallback(() => {
    const idx = commentIndexRef.current % AD_COMMENTS_DATA.length
    commentIndexRef.current += 1
    const raw = AD_COMMENTS_DATA[idx]
    const id = Date.now() + Math.random()
    const avatarBg = AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length]

    setComments((prev) => [...prev.slice(-1), { ...raw, id, avatarBg }])

    setTimeout(() => {
      setComments((prev) => prev.filter((c) => c.id !== id))
    }, 4500)
  }, [])

  // Comments interval
  useEffect(() => {
    spawnComment()
    const timer = setInterval(spawnComment, 3400)
    return () => clearInterval(timer)
  }, [spawnComment])

  // Floating hearts stream interval
  useEffect(() => {
    const timer = setInterval(() => {
      spawnFloatingHeart()
      if (Math.random() > 0.4) {
        setTimeout(spawnFloatingHeart, 120)
      }
    }, 340)
    return () => clearInterval(timer)
  }, [spawnFloatingHeart])

  // Automated simulated screen taps
  useEffect(() => {
    const timer = setInterval(() => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = rect.width * (0.3 + Math.random() * 0.4)
      const y = rect.height * (0.35 + Math.random() * 0.35)
      spawnTapBurst(x, y)
    }, 1200)
    return () => clearInterval(timer)
  }, [spawnTapBurst])

  // Views increasing loop
  useEffect(() => {
    const timer = setInterval(() => {
      const delta = Math.floor(Math.random() * 110) + 35
      setViews((v) => v + delta)
      setViewDelta(delta)
      setTimeout(() => setViewDelta(null), 1000)
    }, 2600)
    return () => clearInterval(timer)
  }, [])

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
      {/* Video */}
      <video
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
      />

      {/* Scrim */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

      {/* Top Bar: Surging Views Counter */}
      <div className="pointer-events-none absolute inset-x-4 top-4 z-20 flex items-center justify-between">
        <div className="flex items-center gap-2.5 rounded-full border border-white/15 bg-slate-950/75 px-3.5 py-1.5 backdrop-blur-md shadow-lg">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-blue-600 shadow-[0_0_10px_rgba(14,165,233,0.5)]">
            <svg className="h-3 w-3 stroke-white fill-none stroke-2" viewBox="0 0 24 24">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5 font-mono text-sm font-extrabold text-white">
              <span>{formatCompactNumber(views)}</span>
              {viewDelta && (
                <span className="rounded bg-emerald-500/20 px-1 text-[10px] text-emerald-400">
                  +{viewDelta}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-slate-950/75 px-3 py-1.5 text-xs font-bold text-slate-200 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          EasilyPromote
        </div>
      </div>

      {/* Dynamic Pop-Up Ad Comments Stream */}
      <div className="pointer-events-none absolute left-4 bottom-24 z-20 flex w-[76%] flex-col gap-2">
        {comments.map((c) => (
          <div
            key={c.id}
            className="flex items-start gap-2.5 rounded-2xl border border-white/15 bg-slate-950/85 p-2.5 backdrop-blur-md shadow-xl animate-in fade-in slide-in-from-bottom-3 duration-300"
          >
            <div
              className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-extrabold text-white shadow"
              style={{ background: c.avatarBg }}
            >
              {c.user.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-200">@{c.user}</span>
                <span className="rounded bg-white/10 px-1 text-[8px] font-semibold text-slate-400">Verified</span>
              </div>
              <p className="text-xs text-slate-100 leading-snug">{c.text}</p>
            </div>
            <div className="flex flex-col items-center gap-0.5 text-rose-500">
              <svg className="h-3.5 w-3.5 fill-rose-500" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className="text-[9px] font-bold text-slate-400">{c.likes}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tap Bursts */}
      {tapBursts.map((b) => (
        <div
          key={b.id}
          className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${b.x}px`, top: `${b.y}px` }}
        >
          <div
            className="absolute -inset-3 animate-ping rounded-full border-2 opacity-80"
            style={{ borderColor: b.color }}
          />
          <svg
            className="h-12 w-12 animate-bounce drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
            viewBox="0 0 24 24"
            fill={b.color}
            style={{ transform: `rotate(${b.rot}deg)` }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}

      {/* Floating Hearts */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
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
            <svg
              width={h.size}
              height={h.size}
              viewBox="0 0 24 24"
              fill={h.color}
              style={{ filter: `drop-shadow(0 2px 6px ${h.color}88)` }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        ))}
      </div>

      {/* Right Action Rail (Likes + Comments) */}
      <div className="pointer-events-auto absolute right-3.5 bottom-6 z-20 flex flex-col items-center gap-3.5">
        <div className="flex flex-col items-center gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              if (!containerRef.current) return
              const rect = containerRef.current.getBoundingClientRect()
              spawnTapBurst(rect.width - 40, rect.height - 70)
              spawnFloatingHeart()
            }}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 shadow-[0_4px_16px_rgba(225,29,72,0.5)] active:scale-90 transition-transform"
          >
            <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
          <span className="text-[11px] font-bold font-mono text-white drop-shadow">
            {formatCompactNumber(likes)}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 backdrop-blur-md">
            <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <span className="text-[11px] font-bold font-mono text-white drop-shadow">1.2K</span>
        </div>
      </div>

      {/* Bottom Ad Caption */}
      <div className="pointer-events-none absolute inset-x-4 bottom-5 z-20 pr-14">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-xs font-extrabold text-white">{creatorTag}</span>
          <svg className="h-3.5 w-3.5 fill-cyan-400" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
        <p className="line-clamp-2 text-xs font-medium text-slate-200 drop-shadow">
          {caption}
        </p>
      </div>

      <style>{`
        @keyframes floatUp {
          0% {
            opacity: 0;
            transform: translate3d(0, 0, 0) scale(0.4) rotate(0deg);
          }
          10% {
            opacity: 0.95;
            transform: translate3d(calc(var(--sway) * 0.3), -35px, 0) scale(1.15) rotate(var(--rot-mid));
          }
          40% {
            transform: translate3d(calc(var(--sway) * -0.7), -160px, 0) scale(1) rotate(calc(var(--rot-mid) * -0.8));
          }
          70% {
            opacity: 0.85;
            transform: translate3d(var(--sway), -300px, 0) scale(0.95) rotate(var(--rot-end));
          }
          100% {
            opacity: 0;
            transform: translate3d(calc(var(--sway) * -0.3), -440px, 0) scale(0.65) rotate(calc(var(--rot-end) * 1.5));
          }
        }
      `}</style>
    </div>
  )
}

export default AdEngagementOverlay
