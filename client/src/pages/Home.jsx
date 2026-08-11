import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import Gallery from '../components/Gallery.jsx'
import PropertyDetails from '../components/PropertyDetails.jsx'
import OtherListings from '../components/OtherListings.jsx'
import FilmMediaCallout from '../components/FilmMediaCallout.jsx'
import Attractions from '../components/Attractions.jsx'
import Testimonials from '../components/Testimonials.jsx'
import VideoWalkthrough from '../components/VideoWalkthrough.jsx'
import ContactForm from '../components/ContactForm.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Gallery />
        <PropertyDetails />
        <OtherListings />
        <FilmMediaCallout />
        <Attractions />
        <Testimonials />
        <VideoWalkthrough />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
