import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { Film, Mail, Phone, ArrowRight } from 'lucide-react'

/**
 * Splash placeholder for /commercial while the production portfolio
 * (video embeds) is being assembled. The full page lives in
 * Commercial.jsx — swap the route in App.jsx when it's ready.
 */
export default function CommercialComingSoon() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 relative flex items-center justify-center">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/hero2.jpg')" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/85" />

        {/* Content */}
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 mb-6">
            <Film size={14} className="text-yellow-300" />
            <span className="text-white text-xs font-semibold uppercase tracking-wider">
              Commercial & Film Productions
            </span>
          </div>

          <h1
            className="text-4xl sm:text-6xl font-bold text-white leading-tight mb-4"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
          >
            Coming Soon
          </h1>

          <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-3 font-medium">
            Our production portfolio is in the edit bay.
          </p>
          <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-10 max-w-xl mx-auto">
            The Malta Residence hosts commercial shoots, product videography, brand campaigns, and
            independent films — 6,000 sq ft of varied, shoot-ready aesthetics in Denver. For location
            details, availability, and rates, reach out directly.
          </p>

          {/* Contact — same as home page contact section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-10">
            <a
              href="mailto:stay@5236malta.com"
              className="inline-flex items-center gap-2 text-white underline underline-offset-4 hover:text-forest-100 transition-colors text-sm sm:text-base"
            >
              <Mail size={16} className="text-forest-300" aria-hidden="true" />
              stay@5236malta.com
            </a>
            <a
              href="tel:7204321203"
              className="inline-flex items-center gap-2 text-white underline underline-offset-4 hover:text-forest-100 transition-colors text-sm sm:text-base"
            >
              <Phone size={16} className="text-forest-300" aria-hidden="true" />
              (720) 432-1203
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/#contact-us"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm"
            >
              Send a Production Inquiry
              <ArrowRight size={15} />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-lg transition-colors text-sm"
            >
              ← Back to listing
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
