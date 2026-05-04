import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home.jsx'
import Inquire from './pages/Inquire.jsx'
import Booking from './pages/Booking.jsx'
import Guidebook from './pages/Guidebook.jsx'


/**
* Handles scroll behavior on route change:
* - If the URL has a hash (e.g. /#amenities), wait briefly for the DOM
*   to render then scroll to that element smoothly.
* - Otherwise, scroll to the top of the new page.
*/
function ScrollManager() {
 const { pathname, hash } = useLocation()


 useEffect(() => {
   if (hash) {
     // Wait for DOM to be ready, then scroll to hash target
     const id = hash.slice(1)
     let attempts = 0
     const tryScroll = () => {
       const el = document.getElementById(id)
       if (el) {
         el.scrollIntoView({ behavior: 'smooth', block: 'start' })
       } else if (attempts < 20) {
         attempts++
         setTimeout(tryScroll, 50)
       }
     }
     tryScroll()
   } else {
     window.scrollTo(0, 0)
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
     </Routes>
   </BrowserRouter>
 )
}


export default App
