import { useNavigate } from 'react-router-dom'

const CATEGORIES = [
  {
    id: 'electronics',
    label: 'Electronics',
    emoji: '💻',
    bg: 'from-blue-50 to-blue-100',
    border: 'border-blue-200',
    hover: 'hover:shadow-blue-200',
    text: 'text-blue-700',
    image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=200&q=80&fit=crop',
  },
  {
    id: "women's clothing",
    label: "Women's Fashion",
    emoji: '👗',
    bg: 'from-pink-50 to-pink-100',
    border: 'border-pink-200',
    hover: 'hover:shadow-pink-200',
    text: 'text-pink-700',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=200&q=80&fit=crop',
  },
  {
    id: "men's clothing",
    label: "Men's Fashion",
    emoji: '👔',
    bg: 'from-gray-50 to-gray-100',
    border: 'border-gray-200',
    hover: 'hover:shadow-gray-200',
    text: 'text-gray-700',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=200&q=80&fit=crop',
  },
  {
    id: 'jewelery',
    label: 'Jewellery',
    emoji: '💍',
    bg: 'from-yellow-50 to-yellow-100',
    border: 'border-yellow-200',
    hover: 'hover:shadow-yellow-200',
    text: 'text-yellow-700',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&q=80&fit=crop',
  },
  {
    id: 'skincare',
    label: 'Skincare',
    emoji: '✨',
    bg: 'from-rose-50 to-rose-100',
    border: 'border-rose-200',
    hover: 'hover:shadow-rose-200',
    text: 'text-rose-700',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200&q=80&fit=crop',
  },
  {
    id: 'new',
    label: 'New Arrivals',
    emoji: '🆕',
    bg: 'from-purple-50 to-purple-100',
    border: 'border-purple-200',
    hover: 'hover:shadow-purple-200',
    text: 'text-purple-700',
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=200&q=80&fit=crop',
  },
]

export default function CategoryGrid() {
  const navigate = useNavigate()

  const handleClick = (cat) => {
    if (cat.id === 'new' || cat.id === 'skincare') {
      navigate('/products')
    } else {
      navigate(`/products?category=${encodeURIComponent(cat.id)}`)
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="section-title">Shop by Category</h2>
          <p className="text-gray-500 text-sm mt-1">Find exactly what you&apos;re looking for</p>
        </div>
        <button
          onClick={() => navigate('/products')}
          className="text-sm font-semibold text-pink-500 hover:text-pink-600 transition-colors whitespace-nowrap"
        >
          See all →
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleClick(cat)}
            className={`group relative flex flex-col items-center rounded-2xl border ${cat.border} bg-gradient-to-b ${cat.bg} p-3 sm:p-4 hover:shadow-lg ${cat.hover} transition-all duration-300 hover:-translate-y-1`}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden mb-2 border-2 border-white shadow-sm group-hover:scale-105 transition-transform duration-300">
              <img
                src={cat.image}
                alt={cat.label}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <span className={`text-xs sm:text-sm font-semibold text-center leading-tight ${cat.text}`}>
              {cat.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
