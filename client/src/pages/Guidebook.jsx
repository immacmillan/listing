import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { Utensils, Car, Leaf, Sparkles } from 'lucide-react'

const categories = [
  {
    id: 'restaurants',
    label: 'Restaurants & Cafes',
    icon: <Utensils size={20} />,
    color: 'bg-orange-50 border-orange-200 text-orange-700',
    iconBg: 'bg-orange-100 text-orange-600',
    items: [
      {
        icon: '🍗',
        label: "Dave's Hot Chicken",
        detail: '~5 min drive',
        description: "Nashville-style hot chicken that's taken Denver by storm. Order the sliders or tenders and pick your heat level carefully — the \"Extra Hot\" is no joke. Expect a line on weekends but it moves fast.",
      },
      {
        icon: '🌮',
        label: 'El Pollo Loco',
        detail: '~5 min drive',
        description: 'Flame-grilled chicken done right. Great for a quick, affordable meal for a large group. The pollo bowls and burritos are crowd favorites.',
      },
      {
        icon: '🌯',
        label: 'Chipotle',
        detail: '~5 min drive',
        description: 'Reliable, fast, and easy to feed a crowd. Order ahead in the app for group pickup — burrito bowls and the build-your-own taco setup work well for larger parties with different diets.',
      },
      {
        icon: '🍜',
        label: 'Pho 95 Noodle House',
        detail: '~8 min drive',
        description: "Highly rated Vietnamese restaurant beloved by locals. The pho broth is rich and deeply flavored, and the spring rolls are excellent. One of the best bowls of pho in the Denver metro area.",
      },
      {
        icon: '🍕',
        label: "Beau Jo's Colorado Pizza",
        detail: '~20 min drive',
        description: "A Colorado institution since 1973. Famous for their mountain pies — thick, braided-crust pizzas loaded with toppings. The honey-drizzled crust is a Colorado tradition. Worth the drive to Idaho Springs for the full experience.",
      },
      {
        icon: '🥩',
        label: 'Copper Table — Gaylord Rockies',
        detail: '~8 min drive',
        description: "Upscale Colorado cuisine inside the Gaylord Rockies Resort. Standouts include the duck mole, rotisserie chicken, and prime rib eye. Great for a special occasion dinner without going all the way downtown.",
      },
      {
        icon: '🔥',
        label: 'Annette — Stanley Marketplace',
        detail: '~15 min drive',
        description: "Wood-fired American restaurant inside Stanley Marketplace. One of Denver's most acclaimed neighborhood restaurants. The menu changes seasonally — everything from the wood-fired oven is exceptional. Reservations recommended.",
      },
      {
        icon: '🌿',
        label: 'Garden + Grain — Gaylord Rockies',
        detail: '~8 min drive',
        description: "Farm-to-table seasonal kitchen inside the Gaylord Rockies. Fresh, locally sourced ingredients with a Colorado flair. Great for breakfast or a lighter lunch.",
      },
      {
        icon: '☕',
        label: 'Dazbog Coffee',
        detail: '~5 min drive',
        description: "Denver's beloved local coffee chain, founded by Russian immigrants. Rich, bold espresso drinks and a cozy atmosphere. A great morning stop before heading out to explore.",
      },
      {
        icon: '🛒',
        label: 'Sprouts Farmers Market',
        detail: '~5 min drive',
        description: 'The closest full grocery store. Excellent fresh produce, organic options, a solid deli counter, and a great bulk section. Perfect for stocking the kitchen before a longer stay.',
      },
      {
        icon: '🛒',
        label: 'Costco',
        detail: '~10 min drive',
        description: 'Ideal for large groups stocking up on food, drinks, and supplies. Gas station on-site with some of the best prices in the area.',
      },
    ],
  },
  {
    id: 'nature',
    label: 'Nature & Excursions',
    icon: <Leaf size={20} />,
    color: 'bg-forest-50 border-forest-200 text-forest-800',
    iconBg: 'bg-forest-100 text-forest-700',
    items: [
      {
        icon: '⛳',
        label: 'Green Valley Ranch Golf Course',
        detail: '<1 min drive',
        description: "Championship 18-hole public course literally steps from the property. Stunning views of the Front Range. Book tee times in advance on weekends — it fills up fast. Affordable rates compared to most Denver-area courses.",
      },
      {
        icon: '🦬',
        label: 'Rocky Mountain Arsenal National Wildlife Refuge',
        detail: '~10 min drive',
        description: "One of the largest urban wildlife refuges in the US at 15,000 acres. Home to free-roaming bison, white-tailed deer, bald eagles, coyotes, and prairie dogs. Free entry, open year-round. The auto tour route is great for families. Sunrise and sunset visits are magical.",
      },
      {
        icon: '🏀',
        label: 'Basketball Court',
        detail: '~3 min walk',
        description: 'Full outdoor basketball court in the neighborhood. Great for a pickup game or shooting around. Lights available in the evening.',
      },
      {
        icon: '🌳',
        label: 'Neighborhood Park & Playground',
        detail: '~3 min walk',
        description: 'Well-maintained community park with playground equipment, open green space, and walking paths. Perfect for kids or a morning walk.',
      },
      {
        icon: '⛷️',
        label: 'Loveland Ski Resort',
        detail: '~80 min drive',
        description: "One of Colorado's most affordable and underrated ski areas. No resort fees, no frills — just great skiing. Excellent for all skill levels and significantly less crowded than the big-name resorts. Often has the earliest opening and latest closing dates in Colorado.",
      },
      {
        icon: '⛷️',
        label: 'A-Basin / Keystone',
        detail: '~95 min drive',
        description: "Two resorts close together on the same pass. A-Basin (Arapahoe Basin) is legendary for late-season skiing — sometimes open into June. Keystone is great for families and night skiing. Both offer stunning high-alpine terrain.",
      },
      {
        icon: '⛷️',
        label: 'Breckenridge Ski Resort',
        detail: '~110 min drive',
        description: "One of Colorado's most iconic ski destinations. Five peaks, 187 trails, and a charming Victorian-era Main Street with great restaurants and shops. Worth the drive for a full day or overnight trip.",
      },
      {
        icon: '⛷️',
        label: 'Vail Ski Resort',
        detail: '~120 min drive',
        description: "World-class skiing with the legendary Back Bowls — 2,700 acres of open bowl skiing unlike anything else in the US. Best suited for intermediate to advanced skiers. The village is beautiful for an après-ski dinner.",
      },
    ],
  },
  {
    id: 'colorado',
    label: 'Uniquely Colorado Experiences',
    icon: <Sparkles size={20} />,
    color: 'bg-purple-50 border-purple-200 text-purple-700',
    iconBg: 'bg-purple-100 text-purple-600',
    items: [
      {
        icon: '🏔️',
        label: "Pikes Peak — America's Mountain",
        detail: '~1.5 hr drive',
        description: "One of Colorado's most iconic landmarks at 14,115 feet. Drive or take the Cog Railway to the summit for breathtaking 360° views. The Pikes Peak Highway is open year-round (weather permitting). The summit visitor center has the famous high-altitude donuts — a must.",
      },
      {
        icon: '⛏️',
        label: 'Idaho Springs & Clear Creek Canyon',
        detail: '~45 min drive',
        description: "A charming historic mining town nestled in the Rockies. Great for a day trip — explore the old gold mines, grab lunch on Miner Street, and stop at Beau Jo's for Colorado-style mountain pizza. The drive through Clear Creek Canyon on I-70 is stunning.",
      },
      {
        icon: '🧗',
        label: 'Via Ferrata — Rocky Mountain National Park',
        detail: '~1.5 hr drive',
        description: "Via Ferrata (Italian for 'iron road') is a guided mountain climbing experience using fixed iron rungs and cables bolted into the rock face. No prior climbing experience needed. Several operators run guided trips in RMNP and Estes Park. An unforgettable adventure for groups.",
      },
      {
        icon: '🏔️',
        label: 'Snowmobiling',
        detail: '~1.5-2 hr drive',
        description: "Colorado has some of the best snowmobiling terrain in North America. Grand Lake, Leadville, and Steamboat Springs all offer guided tours through pristine backcountry. A full-day snowmobile trip is one of the most exhilarating winter experiences available.",
      },
      {
        icon: '♨️',
        label: 'Hot Springs',
        detail: '~2-3 hr drive',
        description: "Colorado has dozens of natural and developed hot springs. Standouts include Strawberry Park Hot Springs in Steamboat (rustic, clothing-optional after dark), Glenwood Hot Springs (world's largest mineral hot spring pool), and Mount Princeton Hot Springs near Buena Vista. Perfect for après-ski recovery.",
      },
      {
        icon: '🦌',
        label: 'Rocky Mountain National Park',
        detail: '~1.5 hr drive',
        description: "One of the most visited national parks in the US for good reason. Trail Ridge Road is the highest continuous paved road in the US. Elk are everywhere in fall. Hiking options range from easy lakeside strolls to challenging 14er summits. Reserve entry passes in advance during peak season (May-Oct).",
      },
      {
        icon: '🌊',
        label: 'White Water Rafting — Clear Creek',
        detail: '~45 min drive',
        description: "Clear Creek near Idaho Springs offers some of the most accessible white water rafting in Colorado. Class III-IV rapids make it exciting without being extreme. Several outfitters run half-day trips — great for groups and no experience required.",
      },
      {
        icon: '🎸',
        label: 'Red Rocks Amphitheatre',
        detail: '~35 min drive',
        description: "One of the most iconic concert venues in the world, carved into natural red sandstone formations. Even if there's no show, the park is open daily for hiking and the views are spectacular. The morning yoga sessions are a Denver tradition.",
      },
    ],
  },
  {
    id: 'logistics',
    label: 'Logistics & Business',
    icon: <Car size={20} />,
    color: 'bg-blue-50 border-blue-200 text-blue-700',
    iconBg: 'bg-blue-100 text-blue-600',
    items: [
      {
        icon: '✈️',
        label: 'Denver International Airport (DIA)',
        detail: '~12 min drive',
        description: "One of the largest airports in the US by land area. Served by all major carriers with direct flights to most US cities and many international destinations. Rideshare pickup is well-organized on Level 5 of the terminal. Easy access via I-70 — no toll roads required.",
      },
      {
        icon: '🏨',
        label: 'Gaylord Rockies Convention Center',
        detail: '~8 min drive',
        description: "A massive resort and convention complex that hosts some of the largest conferences in the Mountain West. If you're attending an event there, this property is one of the closest and most comfortable alternatives to the on-site hotel. ICE! at Gaylord is a popular holiday attraction.",
      },
      {
        icon: '🏙️',
        label: 'Downtown Denver',
        detail: '~25 min drive',
        description: "Denver's vibrant urban core. LoDo (Lower Downtown) has the best restaurants and nightlife. Coors Field for Rockies games, Ball Arena for Nuggets and Avalanche. The 16th Street Mall is a pedestrian promenade with shops and restaurants. RiNo (River North) is the arts and brewery district.",
      },
      {
        icon: '🏬',
        label: 'Stanley Marketplace',
        detail: '~15 min drive',
        description: "A converted 1950s airplane hangar now home to 50+ local shops, restaurants, breweries, and a climbing gym. One of Denver's most unique destinations. Don't miss Rosenberg's Bagels, Annette, Comida, and Infinite Monkey Theorem winery.",
      },
      {
        icon: '🚗',
        label: 'Hertz Car Rental',
        detail: '~10 min drive',
        description: 'Convenient location near DIA corridor. Good availability of standard and premium vehicles.',
      },
      {
        icon: '🚗',
        label: 'Avis Car Rental',
        detail: '~10 min drive',
        description: 'Multiple locations near the airport and Aurora. Reliable option for longer rentals.',
      },
      {
        icon: '🚗',
        label: 'Budget Car Rental',
        detail: '~10 min drive',
        description: 'Affordable rates near DIA. Good for groups needing multiple vehicles.',
      },
      {
        icon: '🚗',
        label: 'Enterprise Car Rental',
        detail: '~10 min drive',
        description: 'One of the most accessible locations in the area. Offers pickup service from the property.',
      },
      {
        icon: '🚗',
        label: 'National Car Rental',
        detail: '~10 min drive',
        description: 'Premium option near DIA with a wide fleet selection. Emerald Club members can skip the counter.',
      },
    ],
  },
]

export default function Guidebook() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-4 transition-colors">
              ← Back to listing
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Neighborhood Guidebook</h1>
            <p className="text-gray-500 max-w-2xl">
              Everything you need to know about the area around The Malta Residence — from the coffee shop around the corner to world-class ski resorts and uniquely Colorado adventures.
            </p>
          </div>

          {/* Quick facts bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {[
              { label: 'Airport', value: '12 min' },
              { label: 'Golf Course', value: '<1 min' },
              { label: 'Wildlife Refuge', value: '10 min' },
              { label: 'Ski Resorts', value: '80+ min' },
            ].map((fact) => (
              <div key={fact.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                <p className="text-xl font-bold text-forest-800">{fact.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{fact.label}</p>
              </div>
            ))}
          </div>

          {/* Categories */}
          <div className="space-y-12">
            {categories.map((cat) => (
              <div key={cat.id}>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold mb-5 ${cat.color}`}>
                  {cat.icon}
                  {cat.label}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {cat.items.map((item) => (
                    <div key={item.label} className="bg-white border border-gray-200 rounded-xl p-5 flex gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-lg ${cat.iconBg}`}>
                        {item.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{item.detail}</span>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom nav */}
          <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-forest-800 hover:underline"
            >
              ← Back to listing
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
            >
              ↑ Back to top
            </button>
          </div>
          <div className="mt-12 p-6 bg-forest-800 rounded-2xl text-center">
            <p className="text-white font-semibold mb-1">Have questions about the area?</p>
            <p className="text-forest-200 text-sm mb-4">We're happy to give personalized recommendations for your stay.</p>
            <a
              href="/#contact-us"
              className="inline-block px-6 py-2.5 bg-white text-forest-800 font-semibold rounded-lg text-sm hover:bg-forest-50 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
