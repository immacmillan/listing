import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Inquire from './pages/Inquire.jsx'
import Booking from './pages/Booking.jsx'
import Guidebook from './pages/Guidebook.jsx'


function App() {
 return (
   <BrowserRouter>
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