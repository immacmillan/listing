import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'


const categories = [
 {
   label: 'Restaurants & Cafes',
   color: 'text-orange-600',
   dotColor: 'bg-orange-400',
   items: [
     { emoji: '🍗', label: "Dave's Hot Chicken", detail: '~5 min drive' },
     { emoji: '🌮', label: 'El Pollo Loco', detail: '~5 min drive' },
     { emoji: '🍜', label: 'Pho 95 Noodle House', detail: '~8 min drive' },
     { emoji: '🍕', label: "Beau Jo's Colorado Pizza", detail: '~20 min drive' },
     { emoji: '🥩', label: 'Copper Table — Gaylord Rockies', detail: '~8 min drive' },
     { emoji: '🔥', label: 'Annette — Stanley Marketplace', detail: '~15 min drive' },
     { emoji: '☕', label: 'Dazbog Coffee', detail: '~5 min drive' },
     { emoji: '🛒', label: 'Sprouts Farmers Market', detail: '~5 min drive' },
     { emoji: '🛒', label: 'Costco', detail: '~10 min drive' },
   ],
 },
 {
   label: 'Nature & Excursions',
   color: 'text-forest-700',
   dotColor: 'bg-forest-500',
   items: [
     { emoji: '⛳', label: 'Green Valley Ranch Golf Course', detail: '<1 min drive' },
     { emoji: '🦬', label: 'Rocky Mountain Arsenal Wildlife Refuge', detail: '~10 min drive' },
     { emoji: '🏀', label: 'Basketball Court', detail: '~3 min walk' },
     { emoji: '🌳', label: 'Neighborhood Park & Playground', detail: '~3 min walk' },
     { emoji: '⛷️', label: 'Loveland Ski Resort', detail: '~80 min drive' },
     { emoji: '⛷️', label: 'A-Basin / Keystone', detail: '~95 min drive' },
     { emoji: '⛷️', label: 'Breckenridge Ski Resort', detail: '~110 min drive' },
     { emoji: '⛷️', label: 'Vail Ski Resort', detail: '~120 min drive' },
   ],
 },
 {
   label: 'Logistics & Business',
   color: 'text-blue-600',
   dotColor: 'bg-blue-400',
   items: [
     { emoji: '✈️', label: 'Denver International Airport', detail: '~12 min drive' },
     { emoji: '🏨', label: 'Gaylord Convention Center', detail: '~8 min drive' },
     { emoji: '🏙️', label: 'Downtown Denver', detail: '~25 min drive' },
     { emoji: '🏬', label: 'Stanley Marketplace', detail: '~15 min drive' },
     { emoji: '🚗', label: 'Hertz / Avis / Budget / Enterprise', detail: '~10 min drive' },
   ],
 },
]


export default function Attractions() {
 return (
   <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-gray-200">
     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
       <div>
         <h2 className="text-xl font-semibold text-gray-900">Nearby Attractions & Getting Around</h2>
         <p className="text-sm text-gray-500 mt-1">Local highlights — see the full guidebook for descriptions, tips, and more Colorado experiences</p>
       </div>
       <Link
         to="/guidebook"
         className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-forest-800 text-forest-800 text-sm font-semibold hover:bg-forest-50 transition-colors flex-shrink-0"
       >
         Full Guidebook
         <ArrowRight size={15} />
       </Link>
     </div>


     <div className="space-y-7">
       {categories.map((cat) => (
         <div key={cat.label}>
           <div className={`flex items-center gap-2 mb-3 text-sm font-semibold uppercase tracking-wide ${cat.color}`}>
             <span className={`w-2 h-2 rounded-full ${cat.dotColor}`} />
             {cat.label}
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
             {cat.items.map((item) => (
               <div key={item.label} className="flex items-center gap-3">
                 <div className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-lg flex-shrink-0">
                   {item.emoji}
                 </div>
                 <div>
                   <p className="text-sm font-medium text-gray-800">{item.label}</p>
                   <p className="text-xs text-gray-500">{item.detail}</p>
                 </div>
               </div>
             ))}
           </div>
         </div>
       ))}
     </div>


     <div className="mt-6 pt-4 border-t border-gray-100">
       <Link
         to="/guidebook"
         className="text-sm text-forest-800 font-medium hover:underline inline-flex items-center gap-1"
       >
         Explore Pikes Peak, hot springs, via ferratas, snowmobiling & more Colorado experiences →
       </Link>
     </div>
   </section>
 )
}
