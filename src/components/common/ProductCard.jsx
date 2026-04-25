import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useUser } from '../../context/UserContext'
import { computeDiscount } from '../../services/productService'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { toggleWishlist, isWishlisted } = useUser()
  const [imgLoaded, setImgLoaded] = useState(false)
  const [added, setAdded] = useState(false)

  const { mrp, discountPct } = computeDiscount(product)
  const wishlisted = isWishlisted(product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
  }

  return (
    <Link
      to={`/products/${product.id}`}
      className="group card flex flex-col overflow-hidden border border-gray-100 hover:border-pink-200"
    >
      {/* Image area */}
      <div className="relative bg-gray-50 overflow-hidden aspect-square">
        {!imgLoaded && (
          <div className="absolute inset-0 skeleton" />
        )}
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Discount badge */}
        <span className="absolute top-2 left-2 discount-badge">
          {discountPct}% OFF
        </span>

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
            wishlisted
              ? 'bg-pink-500 text-white scale-110'
              : 'bg-white text-gray-400 opacity-0 group-hover:opacity-100 hover:text-pink-500'
          }`}
        >
          <svg className="w-4 h-4" fill={wishlisted ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </button>

        {/* Quick add overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 text-sm font-semibold tracking-wide transition-all duration-200 ${
              added
                ? 'bg-green-500 text-white'
                : 'bg-pink-500 hover:bg-pink-600 text-white'
            }`}
          >
            {added ? '✓ Added to Bag' : '+ Add to Bag'}
          </button>
        </div>
      </div>

      {/* Product info */}
      <div className="p-3 flex flex-col flex-1">
        <p className="text-xs text-pink-500 font-semibold uppercase tracking-wide mb-1 capitalize">
          {product.category}
        </p>
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 flex-1 leading-snug mb-2">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center gap-0.5 bg-green-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">
            <span>{product.rating?.rate?.toFixed(1)}</span>
            <span>★</span>
          </div>
          <span className="text-xs text-gray-400">({product.rating?.count})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="price-tag">${product.price}</span>
          <span className="original-price">${mrp}</span>
        </div>
      </div>
    </Link>
  )
}
