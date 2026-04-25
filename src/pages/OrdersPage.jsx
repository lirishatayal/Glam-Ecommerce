import { Link, useNavigate } from 'react-router-dom'

const MOCK_ORDERS = [
  {
    id: 'GLM87654321',
    date: 'Apr 22, 2026',
    status: 'Out for Delivery',
    statusColor: 'text-orange-500 bg-orange-50',
    total: 129.99,
    items: [
      { title: 'Fjallraven - Foldsack No. 1 Backpack', image: 'https://fakestoreapi.com/img/81fAn0X5zhL._AC_UL640_FMwebp_QL65_.jpg', price: 109.95, qty: 1 },
      { title: 'Mens Casual Premium Slim Fit T-Shirts', image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg', price: 22.3, qty: 1 },
    ],
  },
  {
    id: 'GLM12345678',
    date: 'Apr 18, 2026',
    status: 'Delivered',
    statusColor: 'text-green-600 bg-green-50',
    total: 55.99,
    items: [
      { title: 'Mens Cotton Jacket', image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg', price: 55.99, qty: 1 },
    ],
  },
  {
    id: 'GLM99887766',
    date: 'Apr 10, 2026',
    status: 'Delivered',
    statusColor: 'text-green-600 bg-green-50',
    total: 319.95,
    items: [
      { title: 'WD 2TB Elements Portable External Hard Drive', image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg', price: 64.0, qty: 1 },
      { title: 'Silicon Power 256GB SSD', image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg', price: 109.0, qty: 1 },
    ],
  },
]

const TIMELINE = ['Order Placed', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered']

export default function OrdersPage() {
  const navigate = useNavigate()
  return (
    <main className="pt-[104px] md:pt-[116px] min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-sm text-gray-500 mt-1">{MOCK_ORDERS.length} orders placed</p>
        </div>

        <div className="space-y-4">
          {MOCK_ORDERS.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200 animate-fade-in"
            >
              {/* Order header */}
              <div
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-gray-50 cursor-pointer"
                onClick={() => navigate(`/orders/${order.id}`)}
              >
                <div className="flex flex-wrap gap-x-6 gap-y-1">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Order ID</p>
                    <p className="text-sm font-bold text-gray-800">#{order.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Placed on</p>
                    <p className="text-sm font-medium text-gray-700">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Total</p>
                    <p className="text-sm font-bold text-gray-900">${order.total.toFixed(2)}</p>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${order.statusColor}`}>
                  {order.status}
                </span>
              </div>

              {/* Items */}
              <div className="px-5 py-4">
                <div className="flex flex-col gap-3">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                        <img src={item.image} alt="" className="w-full h-full object-contain p-1.5" loading="lazy" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800 line-clamp-2 leading-snug">{item.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Qty: {item.qty} · ${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress tracker */}
              {order.status !== 'Delivered' && (
                <div className="px-5 pb-5">
                  <div className="overflow-x-auto scrollbar-hide">
                    <div className="flex items-center min-w-max gap-0">
                      {TIMELINE.map((t, i) => {
                        const activeIdx = TIMELINE.indexOf(order.status)
                        const done = i <= activeIdx
                        const current = i === activeIdx
                        return (
                          <div key={t} className="flex items-center">
                            <div className="flex flex-col items-center">
                              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                                done ? 'bg-pink-500 border-pink-500 text-white' : 'border-gray-200 text-gray-300'
                              } ${current ? 'ring-2 ring-pink-200' : ''}`}>
                                {done && i < activeIdx ? '✓' : i + 1}
                              </div>
                              <span className={`text-[10px] mt-1 text-center w-14 leading-tight ${done ? 'text-pink-500 font-medium' : 'text-gray-400'}`}>
                                {t}
                              </span>
                            </div>
                            {i < TIMELINE.length - 1 && (
                              <div className={`w-8 sm:w-12 h-0.5 mb-4 ${i < activeIdx ? 'bg-pink-500' : 'bg-gray-200'}`} />
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-2">
                {order.status === 'Delivered' ? (
                  <>
                    <button className="text-xs font-medium text-gray-600 hover:text-pink-500 transition-colors px-3 py-1.5 rounded-lg hover:bg-pink-50">
                      Rate & Review
                    </button>
                    <button className="text-xs font-medium text-gray-600 hover:text-pink-500 transition-colors px-3 py-1.5 rounded-lg hover:bg-pink-50">
                      Buy Again
                    </button>
                    <button className="text-xs font-medium text-gray-600 hover:text-pink-500 transition-colors px-3 py-1.5 rounded-lg hover:bg-pink-50">
                      Download Invoice
                    </button>
                  </>
                ) : (
                  <>
                    <button className="text-xs font-medium text-gray-600 hover:text-pink-500 transition-colors px-3 py-1.5 rounded-lg hover:bg-pink-50">
                      Track Order
                    </button>
                    <button className="text-xs font-medium text-red-400 hover:text-red-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50">
                      Cancel Order
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/products" className="btn-outline text-sm">
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  )
}
