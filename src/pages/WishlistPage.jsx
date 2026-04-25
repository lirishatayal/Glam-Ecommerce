import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import ProductCard from '../components/common/ProductCard'
import { EmptyState } from '../components/common/ErrorUI'

export default function WishlistPage() {
  const { wishlist } = useUser()
  const navigate = useNavigate()

  return (
    <main className="pt-[104px] md:pt-[116px] min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Wishlist 💖</h1>
          <p className="text-sm text-gray-500 mt-1">
            {wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}
          </p>
        </div>

        {wishlist.length === 0 ? (
          <EmptyState
            title="Your wishlist is empty"
            description="Save your favourite products here and shop them anytime!"
            action={() => navigate('/products')}
            actionLabel="Explore Products"
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 animate-fade-in">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
