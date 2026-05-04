import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'


export default function Navbar() {
 const [scrolled, setScrolled] = useState(false)
 const [menuOpen, setMenuOpen] = useState(false)
 const { pathname } = useLocation()


 // On non-home pages (no hero image), always use the solid/scrolled style
 const isHome = pathname === '/'
 const useDark = !isHome || scrolled


 useEffect(() => {
   const onScroll = () => setScrolled(window.scrollY > 60)
   window.addEventListener('scroll', onScroll)
   return () => window.removeEventListener('scroll', onScroll)
 }, [])


 const navLinks = [
   { label: 'Home', href: '/' },
   { label: 'Gallery', href: '/#gallery' },
   { label: 'Amenities', href: '/#amenities' },
   { label: 'Listings', href: '/#listings' },
   { label: 'Guidebook', href: '/guidebook' },
   { label: 'Contact', href: '/#contact-us' },
 ]


 return (
   <header
     className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
       useDark ? 'bg-white shadow-md' : 'bg-transparent'
     }`}
   >
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <div className="flex items-center justify-between h-16">
         {/* Logo */}
         <Link
           to="/"
           className={`text-lg font-bold tracking-tight transition-colors ${
             useDark ? 'text-forest-800' : 'text-white'
           }`}
           style={{ fontFamily: 'Inter, sans-serif' }}
         >
           Luxe Listings
         </Link>


         {/* Desktop nav */}
         <nav className="hidden md:flex items-center gap-6">
           {navLinks.map((link) => (
             link.href.startsWith('#') ? (
               <a
                 key={link.label}
                 href={link.href}
                 className={`text-sm font-medium transition-colors hover:text-forest-500 ${
                   useDark ? 'text-gray-700' : 'text-white/90'
                 }`}
               >
                 {link.label}
               </a>
             ) : (
               <Link
                 key={link.label}
                 to={link.href}
                 className={`text-sm font-medium transition-colors hover:text-forest-500 ${
                   useDark ? 'text-gray-700' : 'text-white/90'
                 }`}
               >
                 {link.label}
               </Link>
             )
           ))}
           <a
             href="/#contact-us"
             className="ml-2 px-4 py-2 rounded-lg bg-forest-800 text-white text-sm font-semibold hover:bg-forest-700 transition-colors"
           >
             Inquire Now
           </a>
         </nav>


         {/* Mobile hamburger */}
         <button
           className={`md:hidden p-2 rounded-md transition-colors ${
             useDark ? 'text-gray-700' : 'text-white'
           }`}
           onClick={() => setMenuOpen(!menuOpen)}
           aria-label="Toggle menu"
         >
           {menuOpen ? <X size={22} /> : <Menu size={22} />}
         </button>
       </div>
     </div>


     {/* Mobile menu */}
     {menuOpen && (
       <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
         <nav className="flex flex-col px-4 py-3 gap-1">
           {navLinks.map((link) => (
             <a
               key={link.label}
               href={link.href}
               onClick={() => setMenuOpen(false)}
               className="py-2 px-3 rounded-md text-sm font-medium text-gray-700 hover:bg-forest-50 hover:text-forest-800 transition-colors"
             >
               {link.label}
             </a>
           ))}
           <a
             href="/#contact-us"
             onClick={() => setMenuOpen(false)}
             className="mt-2 py-2 px-3 rounded-lg bg-forest-800 text-white text-sm font-semibold text-center hover:bg-forest-700 transition-colors"
           >
             Inquire Now
           </a>
         </nav>
       </div>
     )}
   </header>
 )
}
