import { useState } from 'react'
import { X, ChevronLeft, ChevronRight, Grid2x2 } from 'lucide-react'

const photos = [
  { id: 1, src: '/assets/pic1.jpg', alt: 'Cozy Formal Living Room with Gas Fireplace, Board games, Oriental rugs, and local/foreign art' },
  { id: 2, src: '/assets/pic2.jpg', alt: 'Lake and golf green views from the built-in gas stovetop' },
  { id: 3, src: '/assets/pic3.jpg', alt: 'Full Gourmet Kitchen with Lake Views, Double Oven, Walk-in Pantry' },
  { id: 4, src: '/assets/pic4.jpg', alt: 'Large Glass Dining Table with a View, seats 10' },
  { id: 5, src: '/assets/pic5.jpg', alt: 'High-End Joola Ping Pong Table with robot server' },
  { id: 6, src: '/assets/pic6.jpg', alt: 'Second Floor Landing with Pond, Course & Side Yard view' },
  { id: 7, src: '/assets/pic7.jpg', alt: 'Peregrine Falcon perched on a gorgeous fall morning from the loft' },
  { id: 8, src: '/assets/pic8.jpg', alt: 'Backyard and pond after recent snowfall, viewed from kitchen' },
  { id: 9, src: '/assets/pic9.jpg', alt: 'Spa-like bathroom with Rainfall shower, Smart Mirror & Toilet' },
  { id: 10, src: '/assets/pic10.jpg', alt: 'Gaming & Exercise Room — UV Sauna, Foosball, Airhockey, Workout Equipment' },
]

export default function Gallery() {
  const [modalOpen, setModalOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const openModal = (index) => {
    setActiveIndex(index)
    setModalOpen(true)
  }

  const prev = () => setActiveIndex((i) => (i - 1 + photos.length) % photos.length)
  const next = () => setActiveIndex((i) => (i + 1) % photos.length)

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
    if (e.key === 'Escape') setModalOpen(false)
  }

  return (
    <section id="gallery" className="scroll-mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Grid: full-width single image on mobile, Airbnb 1+4 grid on sm+ */}
      <div className="relative rounded-2xl overflow-hidden">
        {/* Mobile: single hero image only */}
        <div className="block sm:hidden">
          <button
            className="relative w-full aspect-[4/3] overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-600"
            onClick={() => openModal(0)}
            aria-label={`View photo: ${photos[0].alt}`}
          >
            <img
              src={photos[0].src}
              alt={photos[0].alt}
              className="w-full h-full object-cover"
            />
          </button>
        </div>

        {/* Desktop: 1 large hero + 4 thumbnails */}
        <div className="hidden sm:grid grid-cols-4 grid-rows-2 gap-2 h-[480px] sm:h-[520px]">
          <button
            className="col-span-2 row-span-2 relative overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-600"
            onClick={() => openModal(0)}
            aria-label={`View photo: ${photos[0].alt}`}
          >
            <img
              src={photos[0].src}
              alt={photos[0].alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </button>
          {photos.slice(1, 5).map((photo, i) => (
            <button
              key={photo.id}
              className="relative overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-600"
              onClick={() => openModal(i + 1)}
              aria-label={`View photo: ${photo.alt}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </button>
          ))}
        </div>

        {/* Show all photos button */}
        <button
          onClick={() => openModal(0)}
          className="absolute bottom-4 right-4 flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 text-sm font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors"
        >
          <Grid2x2 size={15} />
          Show all {photos.length} photos
        </button>
      </div>

      {/* Modal lightbox */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onKeyDown={handleKeyDown}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          ref={(el) => el?.focus()}
        >
          {/* Close */}
          <button
            onClick={() => setModalOpen(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close gallery"
          >
            <X size={24} />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {activeIndex + 1} / {photos.length}
          </div>

          {/* Prev */}
          <button
            onClick={prev}
            className="absolute left-4 text-white/80 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Previous photo"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Image */}
          <div className="max-w-5xl max-h-[85vh] mx-8 sm:mx-16 flex flex-col items-center gap-3">
            <img
              src={photos[activeIndex].src}
              alt={photos[activeIndex].alt}
              className="max-h-[75vh] max-w-full object-contain rounded-lg"
            />
            <p className="text-white/70 text-sm text-center px-4">{photos[activeIndex].alt}</p>
          </div>

          {/* Next */}
          <button
            onClick={next}
            className="absolute right-4 text-white/80 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Next photo"
          >
            <ChevronRight size={28} />
          </button>

          {/* Thumbnail strip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-2">
            {photos.map((photo, i) => (
              <button
                key={photo.id}
                onClick={() => setActiveIndex(i)}
                className={`flex-shrink-0 w-14 h-10 rounded overflow-hidden border-2 transition-all ${
                  i === activeIndex ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                aria-label={`Go to photo ${i + 1}`}
              >
                <img src={photo.src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
