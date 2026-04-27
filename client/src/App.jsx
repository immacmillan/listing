import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home.jsx'
import Inquire from './pages/Inquire.jsx'
import Booking from './pages/Booking.jsx'
import Guidebook from './pages/Guidebook.jsx'


function ScrollToTop() {
 const { pathname } = useLocation()
 useEffect(() => { window.scrollTo(0, 0) }, [pathname])
 return null
}


function App() {
 return (
   <BrowserRouter>
     <ScrollToTop />
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
