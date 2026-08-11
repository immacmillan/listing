import { Link } from 'react-router-dom'
import { Film, ArrowRight } from 'lucide-react'

export default function FilmMediaCallout() {
  return (
    <section className="relative overflow-hidden my-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden">
          {/* Background image + dark gradient overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/pic1.jpg')" }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/60" />

          {/* Content */}
          <div className="relative px-6 py-10 sm:px-10 sm:py-14 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Left — copy */}
            <div className="md:col-span-2">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 mb-4">
                <Film size={14} className="text-yellow-300" />
                <span className="text-white text-xs font-semibold uppercase tracking-wider">
                  Film & Media Productions
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-3"
                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>
                Lights, camera,<br className="sm:hidden" /> action.
              </h2>
              <p className="text-white/85 text-sm sm:text-base leading-relaxed max-w-xl mb-6">
                Commercial shoots, videography, brand campaigns, and photo productions — the space
                offers 6,000 sq ft of varied aesthetics, natural light, and privacy. Proven track
                record with professional crews.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/commercial"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  View Our Commercial Work
                  <ArrowRight size={15} />
                </Link>
                <Link
                  to="/#contact-us"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Inquire for Production
                </Link>
              </div>
            </div>

            {/* Right — stats/trust indicators */}
            <div className="hidden md:block">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Sq Ft', value: '6,000' },
                  { label: 'Unique Rooms', value: '15+' },
                  { label: 'Parking', value: 'Ample' },
                  { label: 'Natural Light', value: 'All Day' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-lg px-4 py-3 text-center">
                    <div className="text-white font-bold text-lg leading-none">{stat.value}</div>
                    <div className="text-white/70 text-xs mt-1 uppercase tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
