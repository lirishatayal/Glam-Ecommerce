import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useProduct, useProducts } from '../hooks/useProducts'
import { useCart } from '../context/CartContext'
import { useUser } from '../context/UserContext'
import { computeDiscount } from '../services/productService'
import { useRecentlyViewed } from '../hooks/useRecentlyViewed'
import ProductCard from '../components/common/ProductCard'
import { ProductDetailSkeleton } from '../components/common/LoadingSkeleton'
import ErrorUI from '../components/common/ErrorUI'
import ImageZoomModal from '../components/product/ImageZoomModal'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { product, loading, error } = useProduct(id)
  const { products } = useProducts()
  const { addToCart } = useCart()
  const { toggleWishlist, isWishlisted } = useUser()
  const { addProduct: addToRecentlyViewed } = useRecentlyViewed()

  const [selectedImg, setSelectedImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [zoomOpen, setZoomOpen] = useState(false)
  const [added, setAdded] = useState(false)
  const [tab, setTab] = useState('description')

  // Track as recently viewed once product loads
  useEffect(() => {
    if (product) addToRecentlyViewed(product)
  }, [product, addToRecentlyViewed])

  if (loading) return <div className="pt-[104px] md:pt-[116px]"><ProductDetailSkeleton /></div>
  if (error || !product) return (
    <div className="pt-[104px] md:pt-[116px]">
      <ErrorUI message={error} onRetry={() => navigate(0)} />
    </div>
  )

  const { mrp, discountPct } = computeDiscount(product)
  const wishlisted = isWishlisted(product.id)
  const savings = (mrp - product.price).toFixed(2)

  // Fake multiple images from the same product image
  const images = [product.image, product.image, product.image, product.image]

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleBuyNow = () => {
    handleAddToCart()
    navigate('/cart')
  }

  return (
    <main className="pt-[104px] md:pt-[116px] min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav className="flex items-center gap-2 text-xs text-gray-500">
          <Link to="/" className="hover:text-pink-500 transition-colors">Home</Link>
          <span>›</span>
          <Link to="/products" className="hover:text-pink-500 transition-colors">Products</Link>
          <span>›</span>
          <Link
            to={`/products?category=${encodeURIComponent(product.category)}`}
            className="hover:text-pink-500 transition-colors capitalize"
          >
            {product.category}
          </Link>
          <span>›</span>
          <span className="text-gray-800 font-medium truncate max-w-[180px]">{product.title}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 animate-fade-in">
          {/* Image gallery */}
          <div className="space-y-4">
            <div
              className="relative bg-gray-50 rounded-3xl overflow-hidden aspect-square group cursor-zoom-in"
              onClick={() => setZoomOpen(true)}
              title="Click to zoom"
            >
              <img
                src={images[selectedImg]}
                alt={product.title}
                className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-3 right-3 bg-white/80 rounded-full px-2.5 py-1 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                🔍 Zoom
              </div>
              {/* Discount overlay */}
              <span className="absolute top-4 left-4 discount-badge text-sm px-2.5 py-1">
                {discountPct}% OFF
              </span>
              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full shadow-md flex items-center justify-center transition-all duration-200 ${
                  wishlisted ? 'bg-pink-500 text-white' : 'bg-white text-gray-400 hover:text-pink-500'
                }`}
              >
                <svg className="w-5 h-5" fill={wishlisted ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </button>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  className={`aspect-square rounded-xl overflow-hidden bg-gray-50 border-2 transition-all duration-200 ${
                    selectedImg === i ? 'border-pink-500 shadow-md' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain p-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="space-y-5">
            {/* Category + title */}
            <div>
              <Link
                to={`/products?category=${encodeURIComponent(product.category)}`}
                className="text-xs font-bold text-pink-500 uppercase tracking-widest hover:underline capitalize"
              >
                {product.category}
              </Link>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2 leading-tight">
                {product.title}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-green-600 text-white text-sm font-bold px-2.5 py-1 rounded-lg">
                <span>{product.rating?.rate?.toFixed(1)}</span>
                <span>★</span>
              </div>
              <span className="text-sm text-gray-500">{product.rating?.count} reviews</span>
              <span className="text-sm text-green-600 font-medium">● In Stock</span>
            </div>

            {/* Price */}
            <div className="bg-pink-50 rounded-2xl p-4 border border-pink-100">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-gray-900">${product.price}</span>
                <span className="text-lg text-gray-400 line-through">${mrp}</span>
                <span className="discount-badge text-sm px-2 py-0.5">{discountPct}% OFF</span>
              </div>
              <p className="text-green-600 text-sm font-medium mt-1">
                You save ${savings} on this order
              </p>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 text-gray-500 hover:bg-gray-100 transition-colors text-lg font-medium"
                >
                  −
                </button>
                <span className="px-5 py-2 text-sm font-semibold text-gray-800 border-x border-gray-200 min-w-[48px] text-center">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="px-4 py-2 text-gray-500 hover:bg-gray-100 transition-colors text-lg font-medium"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-6 rounded-full font-semibold text-sm transition-all duration-200 border-2 ${
                  added
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white'
                }`}
              >
                {added ? '✓ Added to Bag' : '🛍️ Add to Bag'}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 btn-primary py-3"
              >
                Buy Now
              </button>
            </div>

            {/* Wishlist + Share */}
            <div className="flex items-center gap-4 text-sm">
              <button
                onClick={() => toggleWishlist(product)}
                className={`flex items-center gap-1.5 font-medium transition-colors ${
                  wishlisted ? 'text-pink-500' : 'text-gray-500 hover:text-pink-500'
                }`}
              >
                <span>{wishlisted ? '💖' : '🤍'}</span>
                {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </button>
              <span className="text-gray-200">|</span>
              <button className="flex items-center gap-1.5 text-gray-500 hover:text-pink-500 font-medium transition-colors">
                🔗 Share
              </button>
            </div>

            {/* Delivery info */}
            <div className="bg-gray-50 rounded-2xl p-4 space-y-2.5 border border-gray-100">
              {[
                { emoji: '🚚', text: 'Free delivery on orders above ₹499' },
                { emoji: '↩️', text: '15-day easy return & exchange' },
                { emoji: '🔒', text: '100% authentic products guaranteed' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2.5 text-sm text-gray-600">
                  <span>{item.emoji}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div>
              <div className="flex border-b border-gray-200">
                {['description', 'details', 'reviews'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                      tab === t
                        ? 'border-pink-500 text-pink-500'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="py-4">
                {tab === 'description' && (
                  <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
                )}
                {tab === 'details' && (
                  <div className="space-y-2">
                    {[
                      ['Category', product.category],
                      ['Brand', 'Glam Essentials'],
                      ['SKU', `GLM-${product.id.toString().padStart(4, '0')}`],
                      ['Availability', 'In Stock'],
                    ].map(([k, v]) => (
                      <div key={k} className="flex gap-4 text-sm">
                        <span className="text-gray-500 w-24 flex-shrink-0">{k}</span>
                        <span className="text-gray-800 font-medium capitalize">{v}</span>
                      </div>
                    ))}
                  </div>
                )}
                {tab === 'reviews' && (
                  <div className="space-y-3">
                    {[
                      { name: 'Priya S.', stars: 5, text: 'Absolutely love this product! Great quality and fast delivery.' },
                      { name: 'Ananya R.', stars: 4, text: 'Good value for money. Would recommend to friends.' },
                      { name: 'Kavita M.', stars: 5, text: 'Exceeded my expectations. Will buy again!' },
                    ].map((r) => (
                      <div key={r.name} className="bg-gray-50 rounded-xl p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold text-gray-800">{r.name}</span>
                          <span className="text-yellow-400 text-sm">{'★'.repeat(r.stars)}</span>
                        </div>
                        <p className="text-sm text-gray-600">{r.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="section-title mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Image zoom modal */}
      {zoomOpen && (
        <ImageZoomModal
          src={images[selectedImg]}
          alt={product.title}
          images={images}
          selectedIdx={selectedImg}
          onSelect={setSelectedImg}
          onClose={() => setZoomOpen(false)}
        />
      )}
    </main>
  )
}
