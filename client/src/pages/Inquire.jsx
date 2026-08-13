import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import API_BASE from '../lib/api.js'
import { trackEmailInput, flushEmailCapture } from '../lib/tracking.js'

export default function Inquire() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitStatus, setSubmitStatus] = useState(null)

  const validate = () => {
    const e = {}
    if (!formData.name.trim()) e.name = 'Name is required'
    if (!formData.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Enter a valid email'
    if (!formData.message.trim()) e.message = 'Message is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: undefined }))
    if (e.target.name === 'email') trackEmailInput('inquire-page', { ...formData, email: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitStatus('loading')
    try {
      await axios.post(`${API_BASE}/inquiries`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        reason: 'Inquiry',
        message: formData.message,
      })
      setSubmitStatus('success')
    } catch {
      setSubmitStatus('error')
    }
  }

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-lg border text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-forest-600 transition-colors ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
    }`

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-lg">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors">
            ← Back to listing
          </Link>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <h1 className="text-xl font-bold text-gray-900 mb-1">Send an inquiry</h1>
            <p className="text-sm text-gray-500 mb-6">5236 Malta Street, Denver CO — we&apos;ll respond within 24 hours.</p>

            {submitStatus === 'success' ? (
              <div className="text-center py-6">
                <div className="text-4xl mb-3">✅</div>
                <h2 className="font-semibold text-gray-900 mb-1">Message sent!</h2>
                <p className="text-sm text-gray-500 mb-4">We&apos;ll be in touch within 24 hours.</p>
                <Link to="/" className="text-sm text-forest-700 underline hover:text-forest-900">
                  Back to listing
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input id="name" name="name" type="text" placeholder="Jane Smith"
                    value={formData.name} onChange={handleChange} className={inputClass('name')} />
                  {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input id="email" name="email" type="email" placeholder="jane@example.com"
                    value={formData.email} onChange={handleChange}
                    onBlur={() => flushEmailCapture('inquire-page', formData)}
                    className={inputClass('email')} />
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                    Phone <span className="text-gray-400 font-normal normal-case">(optional)</span>
                  </label>
                  <input id="phone" name="phone" type="tel" placeholder="(303) 555-0100"
                    value={formData.phone} onChange={handleChange} className={inputClass('phone')} />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea id="message" name="message" rows={5}
                    placeholder="Tell us about your dates, group size, or any questions..."
                    value={formData.message} onChange={handleChange}
                    maxLength={2500} className={inputClass('message')} />
                  <div className="flex justify-between mt-1">
                    {errors.message ? <p className="text-xs text-red-600">{errors.message}</p> : <span />}
                    <p className="text-xs text-gray-400">{formData.message.length}/2500</p>
                  </div>
                </div>

                {submitStatus === 'error' && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                    Something went wrong. Please try again.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className="w-full py-3 bg-forest-800 hover:bg-forest-700 disabled:bg-forest-400 text-white font-semibold rounded-xl transition-colors text-sm"
                >
                  {submitStatus === 'loading' ? 'Sending…' : 'Send Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
