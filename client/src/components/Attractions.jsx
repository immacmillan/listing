import { Plane, Building2, Trees, Flag, ShoppingCart, Coffee, Store, Mountain } from 'lucide-react'

const attractions = [
  { icon: <Plane size={18} />, label: 'Denver International Airport', detail: '~15 min drive' },
  { icon: <Building2 size={18} />, label: 'Gaylord Convention Center', detail: '~8 min drive' },
  { icon: <Building2 size={18} />, label: 'Downtown Denver', detail: '~25 min drive' },
  { icon: <Trees size={18} />, label: 'Rocky Mountain Arsenal Wildlife Refuge', detail: '~10 min drive' },
  { icon: <Flag size={18} />, label: 'Green Valley Ranch Golf Course', detail: '<1 min drive' },
  { icon: <Mountain size={18} />, label: 'Loveland Ski Resort', detail: '~80 min drive' },
  { icon: <Mountain size={18} />, label: 'A-Basin / Keystone', detail: '~95 min drive' },
  { icon: <Mountain size={18} />, label: 'Breckenridge Ski Resort', detail: '~110 min drive' },
  { icon: <Mountain size={18} />, label: 'Vail Ski Resort', detail: '~120 min drive' },
  { icon: <ShoppingCart size={18} />, label: 'Costco', detail: '~15 min drive' },
  { icon: <ShoppingCart size={18} />, label: 'Sprouts Grocery', detail: '~5 min drive' },
  { icon: <Coffee size={18} />, label: 'Dazbog Coffee', detail: '~5 min drive' },
  { icon: <Store size={18} />, label: 'Stanley Marketplace', detail: '~15 min drive' },
  { icon: <Store size={18} />, label: "Dave's Hot Chicken", detail: '~5 min drive' },
  { icon: <Store size={18} />, label: 'El Pollo Loco', detail: '~5 min drive' },
]

export default function Attractions() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Getting around</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {attractions.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-forest-50 flex items-center justify-center text-forest-700 flex-shrink-0">
              {item.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">{item.label}</p>
              <p className="text-xs text-gray-500">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
