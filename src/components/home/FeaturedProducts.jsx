import { useNavigate } from 'react-router-dom'
import ProductCard from '../common/ProductCard'
import { ProductGridSkeleton } from '../common/LoadingSkeleton'
import ErrorUI from '../common/ErrorUI'

export default function FeaturedProducts({ products, loading, error, onRetry, title = 'Featured Products', subtitle }) {
  const navigate = useNavigate()

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
        </div>
        <button
          onClick={() => navigate('/products')}
          className="text-sm font-semibold text-pink-500 hover:text-pink-600 transition-colors whitespace-nowrap mt-1"
        >
          View all →
        </button>
      </div>

      {loading && <ProductGridSkeleton count={8} />}
      {error && <ErrorUI message={error} onRetry={onRetry} />}

      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 animate-fade-in">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}
