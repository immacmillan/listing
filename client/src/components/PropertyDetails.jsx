import { useState, useEffect, useRef } from 'react'
import { MapPin, Users, BedDouble, Bath, Maximize2, ChevronDown, ChevronUp } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'
import axios from 'axios'
import API_BASE from '../lib/api.js'
import { useModuleEngagement } from '../lib/tracking.js'

const ALL_AMENITIES = [
  { icon: '🛁', label: 'Jacuzzi Tub' },
  { icon: '🚿', label: 'Rainfall Shower' },
  { icon: '📺', label: 'Multimedia Center' },
  { icon: '🏓', label: 'Ping Pong' },
  { icon: '🔥', label: '2 Gas Fireplaces' },
  { icon: '🏡', label: 'Balcony' },
  { icon: '🎮', label: 'Gaming Friendly' },
  { icon: '💻', label: 'Standing Desks' },
  { icon: '🛏️', label: 'Tempurpedic Mattresses' },
  { icon: '🍖', label: 'BBQ Smoker & Grill' },
  { icon: '💧', label: 'Lake View' },
  { icon: '⛰️', label: 'Mountain View' },
  { icon: '⚽', label: 'Foosball Table' },
  { icon: '🏒', label: 'Air Hockey Table' },
  { icon: '♨️', label: 'UV Cedar Sauna' },
]

export default function PropertyDetails() {
  const [showAllAmenities, setShowAllAmenities] = useState(false)
  const [showFullDesc, setShowFullDesc] = useState(false)

  const visibleAmenities = showAllAmenities ? ALL_AMENITIES : ALL_AMENITIES.slice(0, 8)

  const shortDesc = `Welcome to the best kept secret in Green Valley Ranch — comfortable, spacious, and ample privacy at The Malta Residence, with lake views spanning kitchen and living room, and into the primary bedroom & balcony.`
  const fullDesc = `Welcome to the best kept secret in Green Valley Ranch — comfortable, spacious, and ample privacy at The Malta Residence, with lake views spanning kitchen and living room, and into the primary bedroom & balcony. Available fully furnished, you can take in the Rocky Mountains from upstairs, or try out the UV Sauna & Spa-like downstairs bath. Something for everyone, with gaming, multimedia, cozy nooks, jacuzzi tub, and high-end finishes abundant. This gorgeous Denver home is well suited for families or groups (private or business) who appreciate refined amenities and well-appointed living.

Guests will enjoy activities in and around Denver — Skiing the Rockies, Hiking at the nearby Rocky Mountain Arsenal National Wildlife Refuge (3 mi), or Golfing at Green Valley Ranch Greens (on-site). Gaylord Convention Center is 1.5 mi away, and Denver International Airport (DIA) is just 4.3 mi — a 15 min drive.`

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left column — details */}
        <div className="lg:col-span-2 space-y-8">

          {/* Title + location */}
          <div className="border-b border-gray-200 pb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              The Malta Residence
            </h1>
            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
              <MapPin size={14} />
              <span>Green Valley Ranch, Denver CO 80249</span>
            </div>

            {/* Quick stats row */}
            <div className="flex flex-wrap items-center gap-4 mt-4">
              {[
                { icon: <BedDouble size={16} />, label: '7 bedrooms' },
                { icon: <Bath size={16} />, label: '4 full baths' },
                { icon: <Maximize2 size={16} />, label: '6,000 sq ft' },
                { icon: <Users size={16} />, label: 'Sleeps up to 18', highlight: true },
              ].map((s) => (
                <div
                  key={s.label}
                  className={
                    s.highlight
                      ? 'flex items-center gap-1.5 text-orange-800 text-sm font-semibold bg-orange-50 border border-orange-200 rounded-full px-3 py-1'
                      : 'flex items-center gap-1.5 text-gray-700 text-sm font-medium'
                  }
                >
                  <span className={s.highlight ? 'text-orange-600' : 'text-forest-700'}>{s.icon}</span>
                  {s.label}
                </div>
              ))}
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3">
            {[
              { emoji: '⭐', platform: 'Airbnb', badge: 'Guest Favorite', rating: '5.0 Star Rating', meta: '36 reviews · Top 5%' },
              { emoji: '🏅', platform: 'Vrbo', badge: 'Premier Host', rating: 'Rated 10/10 by 15+ groups', meta: 'Top 1%' },
              { emoji: '🌟', platform: 'Booking.com', badge: 'Exceptional', rating: '10/10 Perfect Rating' },
            ].map((b) => (
              <div key={b.badge} className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 w-[calc(50%-6px)] sm:flex-1 sm:w-auto sm:max-w-[250px]">
                <span className="text-3xl leading-none">{b.emoji}</span>
                <div>
                  <p className="text-xs text-gray-500 font-medium">{b.platform}</p>
                  <p className="text-sm font-bold text-gray-900 leading-tight">{b.badge}</p>
                  <p className="text-xs font-bold text-gray-800 mt-0.5">{b.rating}</p>
                  {b.meta && <p className="text-xs text-gray-500">{b.meta}</p>}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing note */}
          <div className="flex items-center gap-3 p-4 bg-forest-50 border border-forest-200 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-forest-800 flex items-center justify-center text-white text-lg flex-shrink-0">
              🏡
            </div>
            <div>
              <p className="text-sm font-semibold text-forest-900">Flexible Pricing Available</p>
              <p className="text-sm text-forest-700">
                Daily · Weekly · Monthly · Events —{' '}
                <a href="#contact-us" className="font-semibold underline hover:text-forest-900 transition-colors">
                  inquire for rates
                </a>
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">About this space</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {showFullDesc ? fullDesc : shortDesc}
            </p>
            <button
              onClick={() => setShowFullDesc(!showFullDesc)}
              className="mt-3 flex items-center gap-1 text-sm font-semibold text-gray-900 underline hover:text-forest-800 transition-colors"
            >
              {showFullDesc ? 'Show less' : 'Show more'}
              {showFullDesc ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>
          </div>

          {/* Amenities */}
          <div id="amenities" className="scroll-mt-20 border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">What this place offers</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {visibleAmenities.map((a) => (
                <div key={a.label} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50">
                  <span className="text-xl">{a.icon}</span>
                  <span className="text-sm text-gray-700">{a.label}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowAllAmenities(!showAllAmenities)}
              className="mt-4 px-5 py-2.5 border border-gray-900 rounded-lg text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
            >
              {showAllAmenities
                ? 'Show fewer amenities'
                : `Show all ${ALL_AMENITIES.length} amenities`}
            </button>
          </div>

          {/* Available for events callout */}
          <div className="flex items-start gap-4 p-5 bg-amber-50 border border-amber-200 rounded-xl">
            <span className="text-2xl">🎉</span>
            <div>
              <p className="font-semibold text-amber-900">Available for Events</p>
              <p className="text-sm text-amber-800 mt-0.5">
                Corporate retreats, private celebrations, and group gatherings welcome.{' '}
                <a href="#contact-us" className="underline font-medium hover:text-amber-900">
                  Contact us to discuss your event.
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right column — booking card */}
        <div className="lg:col-span-1">
          <BookingCard />
        </div>
      </div>
    </section>
  )
}

function BookingCard() {
  const [range, setRange]       = useState({ from: undefined, to: undefined })
  const [guests, setGuests]     = useState(1)
  const [calOpen, setCalOpen]   = useState(false)
  const [blockedRanges, setBlockedRanges] = useState([])
  const cardRef = useRef(null)

  // Notify host when a visitor plays with this widget for 5+ seconds
  const engagement = useModuleEngagement('pricing-card', () => ({
    checkIn:  range.from ? range.from.toISOString().split('T')[0] : '',
    checkOut: range.to   ? range.to.toISOString().split('T')[0]   : '',
    guests:   String(guests),
  }))

  // Fetch availability on mount
  useEffect(() => {
    axios.get(`${API_BASE}/availability`)
      .then((res) => setBlockedRanges(res.data.blockedRanges || []))
      .catch(() => {})
  }, [])

  // Close calendar when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setCalOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const disabledDays = [
    { before: new Date() },
    ...blockedRanges.map((r) => ({ from: new Date(r.start), to: new Date(r.end) })),
  ]

  const fmt = (d) => d ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : null

  const handleReserve = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (range.from) params.set('checkIn',  range.from.toISOString().split('T')[0])
    if (range.to)   params.set('checkOut', range.to.toISOString().split('T')[0])
    params.set('guests', guests)
    window.location.href = `/booking?${params.toString()}`
  }

  return (
    <div ref={cardRef} {...engagement} className="sticky top-20 border border-gray-200 rounded-2xl shadow-lg p-6 bg-white">
      <div className="mb-4">
        <p className="text-lg font-semibold text-gray-900">Inquire for pricing</p>
        <p className="text-sm text-gray-500">Daily · Weekly · Monthly · Events</p>
      </div>

      <form onSubmit={handleReserve}>
        {/* Date selector — opens inline calendar */}
        <button
          type="button"
          onClick={() => setCalOpen(!calOpen)}
          className="w-full border border-gray-300 rounded-xl overflow-hidden mb-3 text-left hover:border-gray-400 transition-colors"
        >
          <div className="grid grid-cols-2 divide-x divide-gray-300">
            <div className="p-3">
              <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Check-in</p>
              <p className={`text-sm mt-0.5 ${range.from ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                {fmt(range.from) || 'Add date'}
              </p>
            </div>
            <div className="p-3">
              <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Check-out</p>
              <p className={`text-sm mt-0.5 ${range.to ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                {fmt(range.to) || 'Add date'}
              </p>
            </div>
          </div>
        </button>

        {/* Inline calendar popover */}
        {calOpen && (
          <div className="border border-gray-200 rounded-xl overflow-hidden mb-3 bg-white flex justify-center w-full">
            <div className="w-full overflow-x-auto">
              <DayPicker
                mode="range"
                selected={range}
                onSelect={(r) => {
                  setRange(r || { from: undefined, to: undefined })
                  if (r?.from && r?.to) setCalOpen(false)
                }}
                disabled={disabledDays}
                excludeDisabled
                numberOfMonths={1}
                showOutsideDays={false}
              />
            </div>
          </div>
        )}

        {/* Guests */}
        <div className="border border-gray-300 rounded-xl p-3 mb-3">
          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">Guests</p>
          <input
            type="number"
            value={guests}
            min={1}
            max={50}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full text-sm text-gray-800 bg-transparent focus:outline-none"
            aria-label="Number of guests"
          />
        </div>

        <button
          type="submit"
          className="block w-full text-center py-3 bg-forest-800 hover:bg-forest-700 text-white font-semibold rounded-xl transition-colors text-sm"
        >
          Reserve / Inquire
        </button>
      </form>

      <p className="text-center text-xs text-gray-400 mt-3">You won&apos;t be charged yet</p>

      <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
        {[
          { label: 'Nightly rate', value: 'Contact for pricing' },
          { label: 'Booking type', value: 'Daily · Weekly · Monthly' },
          { label: 'Min. stay', value: 'Flexible' },
        ].map((row) => (
          <div key={row.label} className="flex justify-between text-sm">
            <span className="text-gray-600">{row.label}</span>
            <span className="text-gray-900 font-medium">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
