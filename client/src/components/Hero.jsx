import { Star } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative w-full h-[55vh] min-h-[420px] flex items-end">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-top"
        style={{ backgroundImage: "url('/assets/hero2.jpg')" }}
        role="img"
        aria-label="Aerial view of 5236 Malta Street, Denver"
      />
      {/* Gradient overlay — strong dark scrim at bottom for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="flex items-end justify-between gap-6">

          {/* Left — main copy */}
          <div className="max-w-2xl">
          {/* Location + trust badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-3 py-1">
              <Star size={13} className="text-yellow-400 fill-yellow-400" />
              <span className="text-white text-xs font-medium">Green Valley Ranch, Denver CO</span>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-3 py-1">
              <span className="text-xs">⭐</span>
              <span className="text-white text-xs font-medium">Airbnb Guest Favorite</span>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-3 py-1">
              <span className="text-xs">🏅</span>
              <span className="text-white text-xs font-medium">Vrbo Premier Host</span>
            </div>
          </div>

          <h1
            className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-3"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
          >
            Retreat into Refined<br />Denver Living
          </h1>
          <p
            className="text-white/90 text-lg mb-6 font-medium"
            style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}
          >
            Comfort and Access — Ski, Hike, Explore, or Relax and Unwind
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-4 mb-8">
            {[
              { value: '7', label: 'Bedrooms' },
              { value: '4', label: 'Full Baths' },
              { value: '6,000', label: 'sq ft' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/15 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
                <div className="text-white font-bold text-lg leading-none">{stat.value}</div>
                <div className="text-white/75 text-xs mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a
              href="#contact-us"
              className="px-6 py-3 bg-forest-800 hover:bg-forest-700 text-white font-semibold rounded-lg transition-colors text-sm"
            >
              Inquire Now
            </a>
            <a
              href="#gallery"
              className="px-6 py-3 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-lg transition-colors text-sm"
            >
              View Photos
            </a>
          </div>
        </div>

          {/* Right — guest quote snippet, links to testimonials section */}
          <a
            href="#testimonials"
            className="hidden lg:block flex-shrink-0 max-w-xs group"
            aria-label="Read guest reviews"
          >
            <div className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-4 transition-colors">
              <p className="text-white text-sm font-medium leading-snug italic">
                "This place was absolutely perfect for our group…"
              </p>
              <p className="text-white/80 text-sm font-medium leading-snug italic mt-2">
                "This was the best Vrbo property our family has ever rented…"
              </p>
              <p className="text-white/50 text-xs mt-3 group-hover:text-white/80 transition-colors underline underline-offset-2">
                Read all guest reviews →
              </p>
            </div>
          </a>

        </div>
      </div>
    </section>
  )
}
