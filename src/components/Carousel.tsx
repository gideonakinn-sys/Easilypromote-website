import { useCallback, useEffect, useRef, useState } from 'react'

const images = import.meta.glob(
  '/src/assets/carousel/*.{jpg,jpeg,png,webp,avif}',
  {
    eager: true,
    import: 'default',
  },
) as Record<string, string>

const slideUrls = Object.values(images)

const AUTOPLAY_MS = 4000

function Carousel() {
  const [current, setCurrent] = useState(0)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const slideCount = slideUrls.length

  const goTo = (index: number) => {
    setCurrent((index + slideCount) % slideCount)
    resetTimer()
  }

  const resetTimer = useCallback(() => {
    if (timer.current) clearInterval(timer.current)
    if (slideCount < 2) return
    timer.current = setInterval(() => {
      setCurrent((index) => (index + 1) % slideCount)
    }, AUTOPLAY_MS)
  }, [slideCount])

  useEffect(() => {
    resetTimer()
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [resetTimer])

  if (slideCount === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-3xl border border-dashed border-stone-300 bg-stone-100 p-8">
        <p className="text-xs font-medium tracking-[-0.01em] text-stone-400">
          Drop images into src/assets/carousel/ to populate this space
        </p>
      </div>
    )
  }

  return (
    <div className="relative flex h-full w-full items-center overflow-hidden rounded-3xl bg-stone-100">
      {slideUrls.map((url, index) => (
        <img
          key={url}
          src={url}
          alt={`Easily Promote showcase ${index + 1}`}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {slideCount > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => goTo(current - 1)}
            className="absolute left-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Next image"
            onClick={() => goTo(current + 1)}
            className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
            {slideUrls.map((url, index) => (
              <button
                key={url}
                type="button"
                aria-label={`Go to image ${index + 1}`}
                onClick={() => goTo(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === current ? 'w-5 bg-stone-900' : 'w-1.5 bg-stone-300'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Carousel
