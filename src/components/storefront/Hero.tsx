import { useCallback, useEffect, useRef, useState } from 'react'
import { AUTOPLAY_MS, LANDING_SLIDES } from '../../data/landingSlides'

type HeroProps = {
  onCategorySelect: (filter: string) => void
}

export function Hero({ onCategorySelect }: HeroProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const onChange = () => setReduceMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (paused || reduceMotion) return
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % LANDING_SLIDES.length)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(t)
  }, [paused, reduceMotion, index])

  const last = LANDING_SLIDES.length - 1
  const slide = LANDING_SLIDES[index]

  const goShop = useCallback(
    (cat?: string) => {
      if (cat) onCategorySelect(cat)
      document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
    },
    [onCategorySelect],
  )

  return (
    <section className="border-b border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div
          className="relative min-h-[280px] overflow-hidden rounded-lg border border-zinc-200 shadow-md sm:min-h-[360px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={(e) => {
            touchStartX.current = e.targetTouches[0].clientX
          }}
          onTouchEnd={(e) => {
            const start = touchStartX.current
            touchStartX.current = null
            if (start == null) return
            const dx = e.changedTouches[0].clientX - start
            if (dx < -48) setIndex((i) => (i === last ? 0 : i + 1))
            if (dx > 48) setIndex((i) => (i === 0 ? last : i - 1))
          }}
        >
            <div
              key={slide.image + index}
              className={`absolute inset-0 bg-cover bg-center ${reduceMotion ? '' : 'animate-landing-kenburns'}`}
              style={{
                backgroundImage: `url('${slide.image}')`,
                animationPlayState: paused || reduceMotion ? 'paused' : 'running',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/88 via-zinc-900/5 to-zinc-900/25" />

            <div
              key={index}
              className={`pointer-events-none absolute bottom-0 left-0 right-0 h-1 origin-left bg-brand-400/90 ${reduceMotion || paused ? 'hidden' : ''}`}
              style={{
                animation: reduceMotion || paused ? 'none' : `landing-progress ${AUTOPLAY_MS}ms linear forwards`,
              }}
            />

            <div className="relative flex h-full min-h-[280px] flex-col justify-center px-6 py-10 sm:min-h-[360px] sm:px-10 lg:max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-300">
                {slide.eyebrow}
              </p>
              <h1 className="mt-2 font-extrabold uppercase leading-tight tracking-tight text-white text-3xl sm:text-4xl lg:text-5xl">
                {slide.title}
              </h1>
              <p className="mt-3 text-xl font-bold uppercase text-brand-300 sm:text-2xl">
                {slide.subtitle}
              </p>
              <div className="pointer-events-auto mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => goShop('All')}
                  className="inline-flex items-center justify-center bg-brand-600 px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg transition hover:bg-brand-700"
                >
                  Shop now
                </button>
                {slide.categoryFilter ? (
                  <button
                    type="button"
                    onClick={() => goShop(slide.categoryFilter)}
                    className="inline-flex items-center justify-center border-2 border-white/90 bg-white/10 px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-white backdrop-blur-sm transition hover:bg-white/20"
                  >
                    This aisle
                  </button>
                ) : null}
              </div>
            </div>

            <button
              type="button"
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 text-brand-800 shadow-md transition hover:bg-white"
              aria-label="Previous slide"
              onClick={() => setIndex((i) => (i === 0 ? last : i - 1))}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 text-brand-800 shadow-md transition hover:bg-white"
              aria-label="Next slide"
              onClick={() => setIndex((i) => (i === last ? 0 : i + 1))}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {LANDING_SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition ${i === index ? 'w-6 bg-brand-400' : 'w-2 bg-white/50 hover:bg-white/80'}`}
                />
              ))}
            </div>
        </div>
      </div>
    </section>
  )
}
