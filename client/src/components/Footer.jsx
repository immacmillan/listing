export default function Footer() {
 return (
   <footer className="bg-gray-900 text-gray-400 py-10">
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
         <div>
           <p className="text-white font-semibold text-sm">Luxe Listings LLP</p>
           <p className="text-xs mt-0.5">5236 Malta Street, Denver CO 80249</p>
         </div>
         <div className="flex gap-6 text-xs">
           <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
           <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
           <a href="#contact-us" className="hover:text-white transition-colors">Contact</a>
         </div>
       </div>
       <div className="mt-6 pt-6 border-t border-gray-800 text-center text-xs">
         © 2026 Luxe Listings LLP — All rights reserved.
         <div className="mt-2 text-gray-500">
           <a href="tel:7204321203" className="hover:text-white transition-colors">📞 (720) 432-1203</a>
           <span className="mx-2">·</span>
           <a href="mailto:stay@5236malta.com" className="hover:text-white transition-colors">✉️ stay@5236malta.com</a>
         </div>
       </div>
     </div>
   </footer>
 )
}
