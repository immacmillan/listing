import { useState } from 'react'
import axios from 'axios'
import API_BASE from '../lib/api.js'


export default function ContactForm() {
 const [formData, setFormData] = useState({
   name: '',
   email: '',
   phone: '',
   reason: '',
   message: '',
 })
 const [errors, setErrors] = useState({})
 const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | 'loading'


 const validate = () => {
   const e = {}
   if (!formData.name.trim()) e.name = 'Name is required'
   if (!formData.email.trim()) e.email = 'Email is required'
   else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Enter a valid email'
   if (!formData.reason) e.reason = 'Please select a reason'
   if (!formData.message.trim()) e.message = 'Message is required'
   else if (formData.message.length > 2500) e.message = 'Message cannot exceed 2500 characters'
   setErrors(e)
   return Object.keys(e).length === 0
 }


 const handleChange = (e) => {
   setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
   // Clear error on change
   if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: undefined }))
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
       reason: formData.reason,
       message: formData.message,
     })
     setSubmitStatus('success')
     setFormData({ name: '', email: '', phone: '', reason: '', message: '' })
   } catch {
     setSubmitStatus('error')
   }
 }


 const inputClass = (field) =>
   `w-full px-4 py-3 rounded-lg border text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-forest-600 transition-colors ${
     errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
   }`


 return (
   <section id="contact-us" className="scroll-mt-20 bg-forest-800 py-16">
     <div className="max-w-2xl mx-auto px-4 sm:px-6">
       <div className="text-center mb-8">
         <h2 className="text-2xl font-bold text-white mb-2">Get in touch</h2>
         <p className="text-forest-200 text-sm">
           Questions about availability, pricing, or events? We&apos;ll get back to you within 24 hours.
           Or reach us directly at{' '}
           <a href="mailto:stay@5236malta.com" className="text-white underline hover:text-forest-100">stay@5236malta.com</a>
           {' '}or{' '}
           <a href="tel:7204321203" className="text-white underline hover:text-forest-100">(720) 432-1203</a>.
         </p>
       </div>


       {submitStatus === 'success' ? (
         <div className="bg-white rounded-2xl p-8 text-center">
           <div className="text-4xl mb-3">✅</div>
           <h3 className="text-lg font-semibold text-gray-900 mb-1">Message sent!</h3>
           <p className="text-gray-500 text-sm">We&apos;ll be in touch within 24 hours.</p>
           <button
             onClick={() => setSubmitStatus(null)}
             className="mt-4 text-sm text-forest-700 underline hover:text-forest-900"
           >
             Send another message
           </button>
         </div>
       ) : (
         <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 space-y-4" noValidate>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div>
               <label htmlFor="name" className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                 Full Name <span className="text-red-500">*</span>
               </label>
               <input
                 id="name" name="name" type="text"
                 placeholder="Jane Smith"
                 value={formData.name} onChange={handleChange}
                 className={inputClass('name')}
               />
               {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
             </div>


             <div>
               <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                 Email <span className="text-red-500">*</span>
               </label>
               <input
                 id="email" name="email" type="email"
                 placeholder="jane@example.com"
                 value={formData.email} onChange={handleChange}
                 className={inputClass('email')}
               />
               {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
             </div>
           </div>


           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div>
               <label htmlFor="phone" className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                 Phone <span className="text-gray-400 font-normal normal-case">(optional)</span>
               </label>
               <input
                 id="phone" name="phone" type="tel"
                 placeholder="(303) 555-0100"
                 value={formData.phone} onChange={handleChange}
                 className={inputClass('phone')}
               />
             </div>


             <div>
               <label htmlFor="reason" className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                 Inquiry Type <span className="text-red-500">*</span>
               </label>
               <select
                 id="reason" name="reason"
                 value={formData.reason} onChange={handleChange}
                 className={inputClass('reason')}
               >
                 <option value="">Select one</option>
                 <option value="Short-term Rental">Short-term Rental</option>
                 <option value="Mid-term Rental">Mid-term Rental</option>
                 <option value="Long-term Rental">Long-term Rental</option>
                 <option value="Corporate/Private Event">Corporate / Private Event</option>
                 <option value="Other">Other</option>
               </select>
               {errors.reason && <p className="mt-1 text-xs text-red-600">{errors.reason}</p>}
             </div>
           </div>


           <div>
             <label htmlFor="message" className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
               Message <span className="text-red-500">*</span>
             </label>
             <textarea
               id="message" name="message"
               placeholder="Tell us about your dates, group size, or any questions..."
               value={formData.message} onChange={handleChange}
               maxLength={2500}
               rows={5}
               className={inputClass('message')}
             />
             <div className="flex justify-between mt-1">
               {errors.message
                 ? <p className="text-xs text-red-600">{errors.message}</p>
                 : <span />}
               <p className="text-xs text-gray-400">{formData.message.length}/2500</p>
             </div>
           </div>


           {submitStatus === 'error' && (
             <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
               Something went wrong. Please try again or email us directly.
             </div>
           )}


           <button
             type="submit"
             disabled={submitStatus === 'loading'}
             className="w-full py-3 bg-forest-800 hover:bg-forest-700 disabled:bg-forest-400 text-white font-semibold rounded-xl transition-colors text-sm"
           >
             {submitStatus === 'loading' ? 'Sending…' : 'Send Message'}
           </button>


           <p className="text-center text-xs text-gray-400">
             We typically respond within 24 hours.
           </p>
         </form>
       )}
     </div>
   </section>
 )
}
