import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useSearchParams } from 'react-router-dom'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

function isDateBlocked(date, blockedRanges) {
  return blockedRanges.some((range) => {
    const start = new Date(range.start)
    const end   = new Date(range.end)
    // end date in iCal is exclusive (checkout day), so don't block it
    return date >= start && date < end
  })
}

export default function Booking() {
  const [searchParams] = useSearchParams()

  const parseParam = (key) => {
    const val = searchParams.get(key)
    return val ? new Date(val) : undefined
  }

  const [range, setRange] = useState({
    from: parseParam('checkIn'),
    to:   parseParam('checkOut'),
  })
  const [guests, setGuests]         = useState(Number(searchParams.get('guests')) || 1)
  const [formData, setFormData]     = useState({ name: '', email: '', phone: '', bookingType: '', message: '' })
  const [errors, setErrors]         = useState({})
  const [submitStatus, setSubmitStatus] = useState(null)
  const [blockedRanges, setBlockedRanges]   = useState([])
  const [availabilityLoading, setAvailabilityLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/availability')
      .then((res) => setBlockedRanges(res.data.blockedRanges || []))
      .catch(() => console.warn('Could not load availability'))
      .finally(() => setAvailabilityLoading(false))
  }, [])

  const disabledDays = [
    { before: new Date() },
    ...blockedRanges.map((r) => ({ from: new Date(r.start), to: new Date(r.end) })),
  ]

  const toYMD = (date) => date ? date.toISOString().split('T')[0] : ''

  const validate = () => {
    const e = {}
    if (!formData.name.trim())  e.name  = 'Name is required'
    if (!formData.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Enter a valid email'
    if (!formData.bookingType)  e.bookingType = 'Please select a booking type'
    if (!range?.from)  e.checkIn  = 'Check-in date is required'
    if (!range?.to)    e.checkOut = 'Check-out date is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitStatus('loading')
    try {
      await axios.post('/api/bookings', {
        ...formData,
        checkIn:  toYMD(range.from),
        checkOut: toYMD(range.to),
        guests,
      })
      setSubmitStatus('success')
    } catch {
      setSubmitStatus('error')
    }
  }

  const inputCls = (field) =>
    `w-full px-4 py-3 rounded-lg border text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-forest-600 transition-colors ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
    }`

  const formatDate = (d) => d ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : null

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-24">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors">
            ← Back to listing
          </Link>

          {/* Property summary */}
          <div className="flex items-center gap-4 mb-6 p-4 bg-white rounded-xl border border-gray-200">
            <img src="/assets/pic1.jpg" alt="Denver Dream House" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-900 text-sm">Denver Dream House</p>
              <p className="text-xs text-gray-500">5236 Malta Street, Denver CO 80249</p>
              <p className="text-xs text-gray-500 mt-0.5">7 bed · 4 bath · 6,000 sq ft</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <h1 className="text-xl font-bold text-gray-900 mb-1">Request a booking</h1>
            <p className="text-sm text-gray-500 mb-6">We&apos;ll confirm availability and pricing within 24 hours.</p>

            {submitStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">🎉</div>
                <h2 className="text-lg font-bold text-gray-900 mb-2">Booking request sent!</h2>
                <p className="text-sm text-gray-500 mb-1">We&apos;ll review your request and respond within 24 hours.</p>
                <p className="text-sm text-gray-500 mb-6">Check your email for a confirmation.</p>
                <Link to="/" className="text-sm text-forest-700 underline hover:text-forest-900">Back to listing</Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input id="name" name="name" type="text" placeholder="Jane Smith"
                      value={formData.name} onChange={handleChange} className={inputCls('name')} />
                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input id="email" name="email" type="email" placeholder="jane@example.com"
                      value={formData.email} onChange={handleChange} className={inputCls('email')} />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                  </div>
                </div>

                {/* Phone + Booking type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                      Phone <span className="text-gray-400 font-normal normal-case">(optional)</span>
                    </label>
                    <input id="phone" name="phone" type="tel" placeholder="(303) 555-0100"
                      value={formData.phone} onChange={handleChange} className={inputCls('phone')} />
                  </div>
                  <div>
                    <label htmlFor="bookingType" className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                      Booking Type <span className="text-red-500">*</span>
                    </label>
                    <select id="bookingType" name="bookingType"
                      value={formData.bookingType} onChange={handleChange} className={inputCls('bookingType')}>
                      <option value="">Select type</option>
                      <option value="Daily Rental">Daily Rental</option>
                      <option value="Weekly Rental">Weekly Rental</option>
                      <option value="Monthly Rental">Monthly Rental</option>
                      <option value="Event">Event</option>
                    </select>
                    {errors.bookingType && <p className="mt-1 text-xs text-red-600">{errors.bookingType}</p>}
                  </div>
                </div>

                {/* Date picker */}
                <div>
                  <p className="text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                    Select Dates <span className="text-red-500">*</span>
                  </p>

                  {/* Selected range summary */}
                  <div className="flex gap-3 mb-3">
                    <div className={`flex-1 px-3 py-2 rounded-lg border text-sm ${errors.checkIn ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-gray-50'}`}>
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Check-in</p>
                      <p className={range?.from ? 'text-gray-900 font-medium' : 'text-gray-400'}>
                        {formatDate(range?.from) || 'Select date'}
                      </p>
                    </div>
                    <div className={`flex-1 px-3 py-2 rounded-lg border text-sm ${errors.checkOut ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-gray-50'}`}>
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Check-out</p>
                      <p className={range?.to ? 'text-gray-900 font-medium' : 'text-gray-400'}>
                        {formatDate(range?.to) || 'Select date'}
                      </p>
                    </div>
                  </div>
                  {(errors.checkIn || errors.checkOut) && (
                    <p className="mb-2 text-xs text-red-600">{errors.checkIn || errors.checkOut}</p>
                  )}

                  {/* Availability note */}
                  {availabilityLoading ? (
                    <p className="text-xs text-gray-400 mb-2">Loading availability...</p>
                  ) : blockedRanges.length > 0 ? (
                    <p className="text-xs text-amber-700 mb-2">⚠️ Greyed-out dates are unavailable.</p>
                  ) : (
                    <p className="text-xs text-green-700 mb-2">✅ All dates currently available.</p>
                  )}

                  {/* Calendar */}
                  <div className="border border-gray-200 rounded-xl overflow-hidden flex justify-center bg-white">
                    <DayPicker
                      mode="range"
                      selected={range}
                      onSelect={setRange}
                      disabled={disabledDays}
                      excludeDisabled
                      numberOfMonths={1}
                      showOutsideDays={false}
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="w-full sm:w-1/2">
                  <label htmlFor="guests" className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                    Number of Guests
                  </label>
                  <input id="guests" name="guests" type="number" min={1} max={50}
                    value={guests} onChange={(e) => setGuests(e.target.value)} className={inputCls('guests')} />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                    Additional Notes <span className="text-gray-400 font-normal normal-case">(optional)</span>
                  </label>
                  <textarea id="message" name="message" rows={4}
                    placeholder="Any special requests, questions about the space, event details..."
                    value={formData.message} onChange={handleChange}
                    maxLength={2500} className={inputCls('message')} />
                  <p className="text-xs text-gray-400 mt-1 text-right">{formData.message.length}/2500</p>
                </div>

                {submitStatus === 'error' && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                    Something went wrong. Please try again or contact us directly.
                  </div>
                )}

                <button type="submit" disabled={submitStatus === 'loading'}
                  className="w-full py-3 bg-forest-800 hover:bg-forest-700 disabled:bg-forest-400 text-white font-semibold rounded-xl transition-colors text-sm">
                  {submitStatus === 'loading' ? 'Sending request…' : 'Send Booking Request'}
                </button>

                <p className="text-center text-xs text-gray-400">
                  You won&apos;t be charged yet — we&apos;ll confirm availability and pricing first.
                </p>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
