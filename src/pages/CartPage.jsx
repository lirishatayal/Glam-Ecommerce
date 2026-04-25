import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { computeDiscount } from '../services/productService'
import { EmptyState } from '../components/common/ErrorUI'

export default function CartPage() {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart()
  const navigate = useNavigate()

  const totalMrp = cartItems.reduce((sum, item) => {
    const { mrp } = computeDiscount(item)
    return sum + mrp * item.quantity
  }, 0)

  const savings = (totalMrp - cartTotal).toFixed(2)
  const deliveryFee = cartTotal >= 499 ? 0 : 49
  const finalTotal = cartTotal + deliveryFee

  if (cartItems.length === 0) {
    return (
      <main className="pt-[104px] md:pt-[116px] min-h-screen">
        <EmptyState
          title="Your bag is empty"
          description="Looks like you haven't added anything yet. Explore our products!"
          action={() => navigate('/products')}
          actionLabel="Start Shopping"
        />
      </main>
    )
  }

  return (
    <main className="pt-[104px] md:pt-[116px] min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Bag</h1>
            <p className="text-sm text-gray-500 mt-0.5">{cartItems.length} item{cartItems.length > 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={clearCart}
            className="text-sm text-red-400 hover:text-red-600 font-medium transition-colors"
          >
            Clear all
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-3">
            {cartItems.map((item) => {
              const { mrp } = computeDiscount(item)
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 hover:shadow-md transition-shadow duration-200 animate-fade-in"
                >
                  {/* Image */}
                  <Link to={`/products/${item.id}`} className="flex-shrink-0">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-pink-500 font-semibold uppercase mb-0.5 capitalize">
                      {item.category}
                    </p>
                    <Link to={`/products/${item.id}`}>
                      <h3 className="text-sm font-medium text-gray-800 line-clamp-2 hover:text-pink-500 transition-colors">
                        {item.title}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-base font-bold text-gray-900">${item.price}</span>
                      <span className="text-xs text-gray-400 line-through">${mrp}</span>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1.5 text-gray-500 hover:bg-gray-100 transition-colors"
                        >
                          −
                        </button>
                        <span className="px-4 py-1.5 text-sm font-semibold text-gray-800 border-x border-gray-200 min-w-[40px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1.5 text-gray-500 hover:bg-gray-100 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id, item.title)}
                          className="text-gray-300 hover:text-red-400 transition-colors"
                          aria-label="Remove item"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Continue shopping */}
            <Link
              to="/products"
              className="flex items-center gap-2 text-sm text-pink-500 font-medium hover:text-pink-600 transition-colors mt-2"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>MRP ({cartItems.length} items)</span>
                  <span>${totalMrp.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Product Discount</span>
                  <span>− ${savings}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className={deliveryFee === 0 ? 'text-green-600 font-medium' : ''}>
                    {deliveryFee === 0 ? 'FREE' : `$${deliveryFee}`}
                  </span>
                </div>
                {deliveryFee > 0 && (
                  <p className="text-xs text-orange-500 bg-orange-50 rounded-lg px-3 py-2">
                    Add ${(499 - cartTotal).toFixed(2)} more to get FREE delivery!
                  </p>
                )}
              </div>

              <div className="border-t border-gray-100 my-4" />

              <div className="flex justify-between font-bold text-lg text-gray-900 mb-5">
                <span>Total Amount</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>

              <p className="text-xs text-green-600 font-medium text-center mb-4">
                🎉 You&apos;re saving ${savings} on this order!
              </p>

              {/* Promo code */}
              <div className="flex gap-2 mb-5">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="flex-1 input-base text-sm"
                />
                <button className="px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 transition-colors">
                  Apply
                </button>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="btn-primary w-full py-3.5 text-base"
              >
                Proceed to Checkout
              </button>

              {/* Payment badges */}
              <div className="flex items-center justify-center gap-3 mt-4">
                {['💳', '🏦', '📱', '💵'].map((icon) => (
                  <span key={icon} className="text-xl">{icon}</span>
                ))}
              </div>
              <p className="text-center text-xs text-gray-400 mt-1">Secure checkout</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
