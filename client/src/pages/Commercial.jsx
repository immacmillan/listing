import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { Film, Camera, Sun, Car, Zap, Home, ArrowRight } from 'lucide-react'

// Placeholder video data — replace with real embeds later
const videos = [
  {
    id: 1,
    title: 'Brand Campaign',
    description: 'Lifestyle brand commercial shot across kitchen, living room, and backyard.',
    thumbnail: '/assets/pic3.jpg',
    year: '2025',
  },
  {
    id: 2,
    title: 'Product Launch',
    description: 'Multi-room product videography featuring the primary suite and spa bath.',
    thumbnail: '/assets/pic9.jpg',
    year: '2025',
  },
  {
    id: 3,
    title: 'Fashion Editorial',
    description: 'Photo and video editorial utilizing natural light throughout the main level.',
    thumbnail: '/assets/pic1.jpg',
    year: '2024',
  },
  {
    id: 4,
    title: 'Short Film',
    description: 'Independent short film shot over three days across the entire property.',
    thumbnail: '/assets/pic10.jpg',
    year: '2024',
  },
]

const specs = [
  { icon: <Home size={18} />, label: 'Total Space', value: '6,000 sq ft across 3 floors' },
  { icon: <Camera size={18} />, label: 'Shoot-Ready Rooms', value: '15+ distinct spaces' },
  { icon: <Sun size={18} />, label: 'Natural Light', value: 'Full day, east & west exposure' },
  { icon: <Car size={18} />, label: 'Parking', value: '2-car garage + ample street' },
  { icon: <Zap size={18} />, label: 'Power', value: 'Multiple circuits, standard 120V' },
  { icon: <Film size={18} />, label: 'Aesthetic Range', value: 'Modern, rustic, luxe, sporty' },
]

export default function Commercial() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1">

        {/* ── Hero ── */}
        <section className="relative w-full h-[50vh] min-h-[400px] flex items-end">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/hero2.jpg')" }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 mb-4">
              <Film size={14} className="text-yellow-300" />
              <span className="text-white text-xs font-semibold uppercase tracking-wider">
                Commercial & Film Productions
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-3"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>
              A space that earns<br /> its close-up.
            </h1>
            <p className="text-white/90 text-base sm:text-lg max-w-2xl font-medium"
              style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
              6,000 sq ft of varied, shoot-ready aesthetics in Denver — ready for your next commercial, campaign, or production.
            </p>
          </div>
        </section>

        {/* ── Pitch ── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Built for production.</h2>
            <p className="text-gray-600 leading-relaxed">
              From intimate closeups in the primary suite to wide interior shots of the open kitchen and great room,
              The Malta Residence has hosted commercial shoots, product videography, brand campaigns, and independent films.
              The property offers privacy, flexibility, and enough distinct rooms to shoot an entire day without
              relocation.
            </p>
          </div>
        </section>

        {/* ── Video grid ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Recent work</h2>
          <p className="text-sm text-gray-500 mb-8">Selected productions filmed on the property.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {videos.map((video) => (
              <div key={video.id} className="group cursor-pointer">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <div className="w-0 h-0 border-l-[18px] border-l-gray-900 border-y-[12px] border-y-transparent ml-1.5" />
                    </div>
                  </div>
                  {/* Video placeholder label */}
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded uppercase tracking-wider font-semibold">
                    Coming Soon
                  </div>
                </div>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{video.title}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{video.description}</p>
                  </div>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full flex-shrink-0 mt-1">
                    {video.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Specs ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Production specs</h2>
          <p className="text-sm text-gray-500 mb-8">Practical info for location scouts and producers.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {specs.map((spec) => (
              <div key={spec.label} className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-xl">
                <div className="w-9 h-9 rounded-lg bg-forest-50 flex items-center justify-center text-forest-700 flex-shrink-0">
                  {spec.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">{spec.label}</p>
                  <p className="text-sm text-gray-800 font-medium mt-0.5">{spec.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Also on Peerspace ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gradient-to-r from-forest-50 to-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-2">
                  Also Available on Peerspace
                </p>
                <p className="text-lg font-semibold text-gray-900 mb-1">Book by the hour for shoots</p>
                <p className="text-sm text-gray-600">
                  For hourly bookings with instant confirmation, visit our Peerspace listing.
                  For anything beyond a few hours or custom arrangements, reach out directly for the best rate.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="relative rounded-2xl overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/assets/pic4.jpg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 to-black/60" />
            <div className="relative px-6 py-10 sm:px-10 sm:py-14">
              <div className="max-w-2xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  Ready to book a production?
                </h2>
                <p className="text-white/85 mb-6 leading-relaxed">
                  Share your shoot details — crew size, dates, release requirements, power needs — and we'll
                  get back to you within 24 hours with availability and a custom rate.
                </p>
                <Link
                  to="/#contact-us"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm"
                >
                  Send a Production Inquiry
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom nav */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200">
            <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-forest-800 hover:underline">
              ← Back to listing
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
            >
              ↑ Back to top
            </button>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
