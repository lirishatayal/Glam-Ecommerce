import { useNavigate } from 'react-router-dom'
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed'
import ProductCard from '../common/ProductCard'

export default function RecentlyViewed() {
  const { items, clear } = useRecentlyViewed()
  const navigate = useNavigate()

  if (items.length === 0) return null

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="section-title">Recently Viewed</h2>
          <p className="text-gray-500 text-sm mt-1">Pick up where you left off</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={clear}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            Clear
          </button>
          <button
            onClick={() => navigate('/products')}
            className="text-sm font-semibold text-pink-500 hover:text-pink-600 transition-colors whitespace-nowrap"
          >
            View all →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 animate-fade-in">
        {items.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
