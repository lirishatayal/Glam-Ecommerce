import { useEffect, useCallback } from 'react'

export default function ImageZoomModal({ src, alt, images, selectedIdx, onSelect, onClose }) {
  // Close on Escape key
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowRight') onSelect((i) => (i + 1) % images.length)
    if (e.key === 'ArrowLeft') onSelect((i) => (i - 1 + images.length) % images.length)
  }, [onClose, onSelect, images.length])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  return (
    <div
      className="fixed inset-0 z-[9998] bg-black/90 flex flex-col items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center text-lg transition-colors z-10"
        aria-label="Close zoom"
      >
        ✕
      </button>

      {/* Prev / Next arrows */}
      <button
        onClick={(e) => { e.stopPropagation(); onSelect((i) => (i - 1 + images.length) % images.length) }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center text-xl transition-colors"
        aria-label="Previous image"
      >
        ‹
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onSelect((i) => (i + 1) % images.length) }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center text-xl transition-colors"
        aria-label="Next image"
      >
        ›
      </button>

      {/* Main image */}
      <div
        className="max-w-3xl max-h-[80vh] w-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-[80vh] object-contain rounded-2xl bg-white p-4 shadow-2xl animate-fade-in"
        />
      </div>

      {/* Thumbnail strip */}
      <div
        className="flex gap-3 mt-4"
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
              i === selectedIdx ? 'border-pink-400 scale-105' : 'border-white/20 hover:border-white/60'
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-contain bg-white p-1" />
          </button>
        ))}
      </div>

      {/* Hint */}
      <p className="text-white/40 text-xs mt-3">Press ← → to navigate · ESC to close</p>
    </div>
  )
}
