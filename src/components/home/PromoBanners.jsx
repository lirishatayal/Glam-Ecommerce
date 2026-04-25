import { useNavigate } from 'react-router-dom'

const PROMOS = [
  {
    id: 1,
    tag: 'Limited Time',
    title: 'Beauty Essentials',
    subtitle: 'Up to 30% off on top picks',
    bg: 'bg-gradient-to-br from-pink-500 to-rose-400',
    path: '/products',
    emoji: '💄',
  },
  {
    id: 2,
    tag: 'Free Delivery',
    title: 'Orders above ₹499',
    subtitle: 'Across all categories',
    bg: 'bg-gradient-to-br from-purple-500 to-indigo-500',
    path: '/products',
    emoji: '🚚',
  },
  {
    id: 3,
    tag: 'New Season',
    title: 'Summer Collection',
    subtitle: 'Fresh styles just dropped',
    bg: 'bg-gradient-to-br from-orange-400 to-pink-500',
    path: "/products?category=women's clothing",
    emoji: '☀️',
  },
]

const TRUST_BADGES = [
  { emoji: '🚚', title: 'Free Delivery', sub: 'On orders ₹499+' },
  { emoji: '↩️', title: 'Easy Returns', sub: '15-day return policy' },
  { emoji: '🔒', title: 'Secure Payments', sub: '100% safe & encrypted' },
  { emoji: '🏷️', title: 'Best Prices', sub: 'Guaranteed lowest price' },
]

export default function PromoBanners() {
  const navigate = useNavigate()

  return (
    <>
      {/* Promo cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PROMOS.map((p) => (
            <button
              key={p.id}
              onClick={() => navigate(p.path)}
              className={`${p.bg} rounded-2xl p-5 text-left hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold text-white/70 uppercase tracking-widest">
                    {p.tag}
                  </span>
                  <h3 className="text-white text-xl font-bold mt-1">{p.title}</h3>
                  <p className="text-white/80 text-sm mt-0.5">{p.subtitle}</p>
                  <span className="inline-block mt-3 text-xs font-semibold text-white bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors">
                    Shop Now →
                  </span>
                </div>
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {p.emoji}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Trust badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {TRUST_BADGES.map((b) => (
            <div
              key={b.title}
              className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-4 hover:border-pink-200 hover:shadow-md transition-all duration-200"
            >
              <span className="text-2xl flex-shrink-0">{b.emoji}</span>
              <div>
                <p className="text-sm font-semibold text-gray-800">{b.title}</p>
                <p className="text-xs text-gray-500">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
