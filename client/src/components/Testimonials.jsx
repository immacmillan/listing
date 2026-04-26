import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, Star, UserRound, User } from 'lucide-react'

const reviews = [
  {
    id: 1,
    name: 'Lisa',
    source: 'Airbnb',
    rating: 5,
    gender: 'female',
    text: 'Imran was easy to communicate with 😊 His home was clean, spacious for the 15 of us, fully furnished and conveniently located near the conference we were attending. The amenities were too many to list and wish we had more time to enjoy the games room, movie area and fire pit overlooking the lake!',
  },
  {
    id: 2,
    name: 'Farrah',
    source: 'Airbnb',
    rating: 5,
    gender: 'female',
    text: 'I booked the house for a company meeting before a conference at the Gaylord. The house was perfect for our needs. Close to the conference, great kitchen for cooking, and plenty of space. I would definitely book again next time we have an event in Denver!',
  },
  {
    id: 3,
    name: 'Geetha',
    source: 'Airbnb',
    rating: 5,
    gender: 'female',
    text: 'Our stay was amazing! The house was clean, spacious, and exactly like the photos. Check-in was smooth, communication was quick, and every small detail was taken care of. We would definitely stay here again. Host was very responsive and helpful.',
  },
  {
    id: 4,
    name: 'Susan',
    source: 'Airbnb',
    rating: 5,
    gender: 'female',
    text: "Our group of seven had an amazing get together at Imran's place. We loved that there were seven bedrooms so we each had our own. Everything about the home was convenient and comfortable. Imran was the consummate host and completely responsive to any question or request we had. Thank you, Imran, for sharing your beautiful home with us, and we hope to visit you again the next time we are in Denver.",
  },
  {
    id: 5,
    name: 'Thomas',
    source: 'Vrbo',
    rating: 5,
    gender: 'male',
    text: "This place was absolutely perfect for our group. My co-ed softball team traveled from Washington State for a tournament in Aurora. Imran's home was the perfect fit for the 9 of us who stayed there (plenty of room for more). Very spacious, room for everyone, clean, comfy, many amenities and so much more. Imran was very responsive and communicated well. He was the perfect host! 10 out of 10.",
  },
  {
    id: 6,
    name: 'Ally',
    source: 'Vrbo',
    rating: 5,
    gender: 'female',
    text: "We had a wonderfully comfortable stay and can't recommend this beautiful property enough. The kitchen is fully equipped, the linens are clean, and there's ample space for our family. Check-in and check-out were effortless, and the host was fantastic. We would love to return!",
  },
]

const SOURCE_COLORS = {
  Airbnb: 'bg-rose-50 text-rose-600 border-rose-100',
  Vrbo:   'bg-blue-50 text-blue-600 border-blue-100',
}

function Avatar({ gender }) {
  const Icon = gender === 'female' ? UserRound : User
  const bg = gender === 'female' ? 'bg-pink-50 border-pink-100 text-pink-400'
           : gender === 'male'   ? 'bg-blue-50 border-blue-100 text-blue-400'
           : 'bg-gray-100 border-gray-200 text-gray-400'
  return (
    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border ${bg}`}>
      <Icon size={24} />
    </div>
  )
}

function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef(null)

  const prev = () => setActive((i) => (i - 1 + reviews.length) % reviews.length)
  const next = () => setActive((i) => (i + 1) % reviews.length)

  // Auto-advance every 6 seconds unless paused
  useEffect(() => {
    if (paused) return
    intervalRef.current = setInterval(next, 6000)
    return () => clearInterval(intervalRef.current)
  }, [paused, active])

  const review = reviews[active]

  return (
    <section id="testimonials" className="scroll-mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">What guests are saying</h2>
          <p className="text-sm text-gray-500 mt-2">
            ⭐ 5.0 on Airbnb · 10/10 on Vrbo · 10/10 on Booking.com
          </p>
        </div>
        {/* Nav arrows */}
        <div className="flex gap-2 self-start sm:self-auto">
          <button
            onClick={() => { prev(); setPaused(true) }}
            className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Previous review"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => { next(); setPaused(true) }}
            className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Next review"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Card */}
      <div
        className="relative bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm min-h-[220px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Quote mark */}
        <span className="absolute top-5 right-6 text-6xl text-gray-100 font-serif leading-none select-none" aria-hidden>
          "
        </span>

        <div className="flex items-start gap-4">
          {/* Avatar */}
          <Avatar gender={review.gender} />

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-semibold text-gray-900 text-sm">{review.name}</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${SOURCE_COLORS[review.source]}`}>
                {review.source}
              </span>
            </div>
            <StarRating count={review.rating} />
          </div>
        </div>

        <p className="mt-4 text-gray-600 text-sm leading-relaxed relative z-10">
          "{review.text}"
        </p>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-4">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => { setActive(i); setPaused(true) }}
            className={`rounded-full transition-all duration-300 ${
              i === active
                ? 'w-5 h-2 bg-forest-700'
                : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>

      {/* Review count summary */}
      <p className="text-center text-xs text-gray-400 mt-3">
        {active + 1} of {reviews.length} reviews
      </p>
    </section>
  )
}
