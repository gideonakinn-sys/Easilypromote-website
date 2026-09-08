import { useEffect, useState } from 'react'
import ImageStreamHero from '../ui/image-stream-hero'
import clip1 from '../../assets/videos/vid-1.mp4'
import clip2 from '../../assets/videos/vid-2.mp4'
import clip3 from '../../assets/videos/vid-3.mp4'
import clip4 from '../../assets/videos/vid-4.mp4'
import clip5 from '../../assets/videos/vid-5.mp4'
import clip6 from '../../assets/videos/vid-6.mp4'
import clip7 from '../../assets/videos/vid-7.mp4'
import clip8 from '../../assets/videos/vid-8.mp4'
import clip9 from '../../assets/videos/vid-9.mp4'
import clip10 from '../../assets/videos/vid-10.mp4'
import clip11 from '../../assets/videos/vid-11.mp4'
import clip12 from '../../assets/videos/vid-12.mp4'
import clip13 from '../../assets/videos/vid-13.mp4'
import clip14 from '../../assets/videos/vid-14.mp4'

const CLIPS = [
  { src: clip1 },
  { src: clip2 },
  { src: clip3 },
  { src: clip4 },
  { src: clip5 },
  { src: clip6 },
  { src: clip7 },
  { src: clip8 },
  { src: clip9 },
  { src: clip10 },
  { src: clip11 },
  { src: clip12 },
  { src: clip13 },
  { src: clip14 },
]

function Showcase() {
  // Only mount the corridor on desktop — its dozen muted loops are real
  // decoding cost we don't want running behind a display:none on phones.
  const [isDesktop, setIsDesktop] = useState(() =>
    window.matchMedia('(min-width: 768px)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = (event: MediaQueryListEvent) => setIsDesktop(event.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <section data-section="showcase" className="relative py-20 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-semibold text-ink-3">Showcase</p>
          <h2 className="max-w-[18ch] font-display text-[2rem] font-semibold leading-[1.04] tracking-[-0.03em] text-ink md:text-[3rem]">
            Real content from real creators.
          </h2>
        </div>
      </div>

      {isDesktop ? (
        <ImageStreamHero
          images={CLIPS}
          cards={6}
          className="mt-4 h-[60vh] min-h-[28rem] w-full"
        />
      ) : (
        <div
          className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {CLIPS.map((clip, i) => (
            <div
              key={i}
              className="aspect-[3/4] w-[70vw] shrink-0 snap-center overflow-hidden rounded-2xl"
            >
              <video
                src={clip.src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Showcase