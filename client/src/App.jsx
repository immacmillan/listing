import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home.jsx'
import Inquire from './pages/Inquire.jsx'
import Booking from './pages/Booking.jsx'
import Guidebook from './pages/Guidebook.jsx'
import Commercial from './pages/Commercial.jsx'

/**
 * Handles scroll behavior on route change:
 * - If the URL has a hash (e.g. /#amenities), wait briefly for the DOM
 *   to render then scroll to that element smoothly.
 * - Otherwise, scroll to the top of the new page.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }

    const id = hash.slice(1)
    let cancelled = false
    let observer = null
    let finalTimeout = null

    const scrollToTarget = () => {
      if (cancelled) return
      const el = document.getElementById(id)
      if (el) {
        // Use 'auto' (instant) re-scrolls to avoid the jumpy animation
        // The first scroll will be smooth, follow-ups are instant corrections
        el.scrollIntoView({ behavior: 'auto', block: 'start' })
      }
    }

    // Wait for the target element to exist
    let attempts = 0
    const waitForElement = () => {
      if (cancelled) return
      const el = document.getElementById(id)
      if (el) {
        // First scroll with smooth behavior
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })

        // Watch for any layout changes and re-correct the scroll position
        // This handles TikTok embeds, image loads, etc. that shift the page
        observer = new ResizeObserver(() => {
          scrollToTarget()
        })
        observer.observe(document.body)

        // Stop watching after 5 seconds — by then everything should be loaded
        finalTimeout = setTimeout(() => {
          if (observer) {
            observer.disconnect()
            observer = null
          }
        }, 5000)
      } else if (attempts < 20) {
        attempts++
        setTimeout(waitForElement, 50)
      }
    }

    waitForElement()

    return () => {
      cancelled = true
      if (observer) observer.disconnect()
      if (finalTimeout) clearTimeout(finalTimeout)
    }
  }, [pathname, hash])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inquire" element={<Inquire />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/guidebook" element={<Guidebook />} />
        <Route path="/commercial" element={<Commercial />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
