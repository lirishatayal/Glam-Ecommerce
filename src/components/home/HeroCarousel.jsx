import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const SLIDES = [
  {
    id: 1,
    tag: 'New Arrivals',
    title: 'Discover Your\nPerfect Look',
    subtitle: 'Curated beauty & fashion picks for every style',
    cta: 'Shop Now',
    ctaPath: '/products',
    bg: 'from-pink-100 via-rose-50 to-white',
    accent: 'text-pink-500',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80&fit=crop',
    imageAlt: 'Beauty products',
  },
  {
    id: 2,
    tag: 'Up to 40% Off',
    title: "Women's Fashion\nSale is Live",
    subtitle: 'Exclusive deals on top brands — limited time only',
    cta: 'Explore Sale',
    ctaPath: "/products?category=women's clothing",
    bg: 'from-purple-100 via-pink-50 to-white',
    accent: 'text-purple-500',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80&fit=crop',
    imageAlt: "Women's fashion",
  },
  {
    id: 3,
    tag: 'Tech Deals',
    title: 'Latest Electronics\nat Best Prices',
    subtitle: 'Top brands, unbeatable prices — free delivery included',
    cta: 'Shop Electronics',
    ctaPath: '/products?category=electronics',
    bg: 'from-blue-100 via-sky-50 to-white',
    accent: 'text-blue-500',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80&fit=crop',
    imageAlt: 'Electronics',
  },
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const navigate = useNavigate()

  const goTo = useCallback((idx) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrent(idx)
    setTimeout(() => setIsTransitioning(false), 400)
  }, [isTransitioning])

  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo])
  const prev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  const slide = SLIDES[current]

  return (
    <div className={`relative w-full overflow-hidden bg-gradient-to-r ${slide.bg} transition-all duration-700`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
        <div className="flex flex-col-reverse sm:flex-row items-center gap-6 sm:gap-10">
          {/* Text content */}
          <div
            key={`text-${current}`}
            className="flex-1 text-center sm:text-left animate-slide-up"
          >
            <span className={`inline-block text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full bg-white/80 shadow-sm ${slide.accent}`}>
              {slide.tag}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight whitespace-pre-line mb-4">
              {slide.title}
            </h1>
            <p className="text-gray-500 text-sm sm:text-base mb-6 max-w-md mx-auto sm:mx-0">
              {slide.subtitle}
            </p>
            <div className="flex gap-3 justify-center sm:justify-start">
              <button
                onClick={() => navigate(slide.ctaPath)}
                className="btn-primary text-sm sm:text-base"
              >
                {slide.cta}
              </button>
              <button
                onClick={() => navigate('/products')}
                className="btn-outline text-sm sm:text-base"
              >
                View All
              </button>
            </div>
          </div>

          {/* Image */}
          <div
            key={`img-${current}`}
            className="flex-1 flex justify-center animate-fade-in"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-full bg-white/40 blur-3xl scale-90" />
              <img
                src={slide.image}
                alt={slide.imageAlt}
                className="relative w-full h-full object-cover rounded-3xl shadow-2xl"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-pink-500 transition-all duration-200 z-10"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-pink-500 transition-all duration-200 z-10"
        aria-label="Next slide"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-6 h-2 bg-pink-500'
                : 'w-2 h-2 bg-gray-300 hover:bg-pink-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
