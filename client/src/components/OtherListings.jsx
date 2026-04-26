import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const configurations = [
  {
    id: 1,
    title: '5-Bedroom Configuration',
    subtitle: '5 Bed · 3 Bath · 4,500 sqft',
    description: 'Budget-friendly option, still flush with luxury amenities and sophisticated living. Full private home, 3 floors of living space, and private 2-car garage.',
    photos: [
      { src: '/assets/otherlisting1.jpg', alt: 'Exterior front of house' },
      { src: '/assets/otherlisting2.jpg', alt: 'Backyard with pond and golf course' },
      { src: '/assets/otherlisting3.jpg', alt: '1 of 4 guest bedrooms' },
      { src: '/assets/otherlisting4.jpg', alt: 'Primary bedroom ensuite bath' },
    ],
  },
  {
    id: 2,
    title: '1-Bedroom Suite',
    subtitle: '1 Bed · 1 Bath · 1,500+ sqft',
    description: 'Private space with plenty of extras — spa-like ensuite bath, UV Cedar Sauna, Game Room, Surround Sound multimedia setup, record player, living room, and private kitchen.',
    photos: [
      { src: '/assets/otherlisting5.jpg', alt: 'Primary suite with surround sound' },
      { src: '/assets/otherlisting6.jpg', alt: 'Primary suite alternate view' },
      { src: '/assets/otherlisting7.jpg', alt: 'Ensuite bath view 1' },
      { src: '/assets/otherlisting8.jpg', alt: 'Ensuite bath view 2' },
    ],
  },
]

function PhotoCarousel({ photos }) {
  const [index, setIndex] = useState(0)
  const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length)
  const next = () => setIndex((i) => (i + 1) % photos.length)

  return (
    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 group">
      <img
        src={photos[index].src}
        alt={photos[index].alt}
        className="w-full h-full object-cover transition-opacity duration-300"
      />
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
        aria-label="Previous photo"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
        aria-label="Next photo"
      >
        <ChevronRight size={16} />
      </button>
      {/* Dot indicators */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${i === index ? 'bg-white w-3' : 'bg-white/60'}`}
            aria-label={`Go to photo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function OtherListings() {
  return (
    <section id="listings" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Other configurations available</h2>
      <p className="text-gray-500 text-sm mb-8">Same property, flexible layouts to fit your group size and budget.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {configurations.map((config) => (
          <div key={config.id} className="group">
            <PhotoCarousel photos={config.photos} />
            <div className="mt-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{config.title}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{config.subtitle}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">{config.description}</p>
              <a
                href="#contact-us"
                className="inline-block mt-3 text-sm font-semibold text-forest-800 underline hover:text-forest-600 transition-colors"
              >
                Inquire about this configuration →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
