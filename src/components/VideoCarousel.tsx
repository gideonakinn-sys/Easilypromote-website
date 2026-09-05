import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const videos = import.meta.glob('/src/assets/videos/*.{mp4,webm}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const slideUrls = shuffle(Object.values(videos))

/**
 * `strip` — a standalone band of clips.
 * `fill`  — fills its parent edge to edge, used as the hero card's content.
 */
type Variant = 'strip' | 'fill'

function VideoCarousel({ variant = 'strip' }: { variant?: Variant }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const scrollTweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track || slideUrls.length === 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let debounce: ReturnType<typeof setTimeout>

    const start = () => {
      const half = track.scrollWidth / 2
      if (half <= 0) return

      const currentX = (gsap.getProperty(track, 'x') as number) || 0
      const safeX = ((currentX % half) + half) % half - half

      scrollTweenRef.current?.kill()
      gsap.set(track, { x: safeX })

      scrollTweenRef.current = gsap.to(track, {
        x: `-=${half}`,
        duration: 30,
        ease: 'none',
        repeat: -1,
        onRepeat() {
          gsap.set(track, { x: safeX })
        },
      })
    }

    start()

    const observer = new ResizeObserver(() => {
      clearTimeout(debounce)
      debounce = setTimeout(start, 250)
    })
    observer.observe(track)

    return () => {
      scrollTweenRef.current?.kill()
      observer.disconnect()
      clearTimeout(debounce)
    }
  }, [])

  const handleEnter = () => {
    scrollTweenRef.current?.pause()
  }

  const handleLeave = () => {
    scrollTweenRef.current?.play()
  }

  if (slideUrls.length === 0) {
    return (
      <div className="flex w-full items-center justify-center rounded-3xl border border-dashed border-rule bg-raised px-5 py-16">
        <p className="stamp text-ink-3">Run npm run optimize-videos to populate</p>
      </div>
    )
  }

  const sources = slideUrls.concat(slideUrls)
  const fill = variant === 'fill'

  return (
    <div
      data-reveal="carousel"
      className={
        fill
          ? 'h-full w-full overflow-hidden'
          : 'w-full overflow-hidden rounded-2xl bg-ink/[0.04] py-2.5'
      }
    >
      <div
        ref={trackRef}
        className={
          fill
            ? 'flex h-full w-max'
            : 'flex h-44 w-max gap-2 md:h-64'
        }
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {sources.map((src, i) => (
          <video
            key={`${src}-${i}`}
            src={src}
            aria-hidden="true"
            className={
              fill
                ? 'h-full w-auto flex-shrink-0 object-cover'
                : 'h-full w-auto flex-shrink-0 rounded-xl object-cover'
            }
            autoPlay
            muted
            loop
            playsInline
            preload={fill && i >= slideUrls.length ? 'metadata' : 'auto'}
          />
        ))}
      </div>
    </div>
  )
}

export default VideoCarousel
