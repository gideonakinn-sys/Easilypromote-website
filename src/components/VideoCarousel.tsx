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

function VideoCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const scrollTweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track || slideUrls.length === 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const halfWidth = track.scrollWidth / 2

    scrollTweenRef.current = gsap.to(track, {
      x: `-=${halfWidth}`,
      duration: 30,
      ease: 'none',
      repeat: -1,
      onRepeat() {
        gsap.set(track, { x: 0 })
      },
    })

    return () => {
      scrollTweenRef.current?.kill()
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
      <div className="flex w-full items-center justify-center rounded-3xl border border-dashed border-stone-300 bg-stone-100 px-5 py-16">
        <p className="text-xs font-medium tracking-[-0.01em] text-stone-500">
          Optimize your videos with npm run optimize-videos
        </p>
      </div>
    )
  }

  const sources = slideUrls.concat(slideUrls)

  return (
    <div
      data-reveal="carousel"
      className="mt-10 w-full overflow-x-hidden overflow-y-visible md:mt-14"
    >
      <div
        ref={trackRef}
        className="flex h-48 w-max gap-[8px] md:h-64"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {sources.map((src, i) => (
          <video
            key={`${src}-${i}`}
            src={src}
            className="h-full w-auto flex-shrink-0"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        ))}
      </div>
    </div>
  )
}

export default VideoCarousel
