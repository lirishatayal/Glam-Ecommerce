import { useParams, Link } from 'react-router-dom'

// Simulated order DB — in production this would be a real API call
const ORDERS_DB = {
  'GLM87654321': {
    id: 'GLM87654321',
    placedOn: 'Apr 22, 2026, 10:34 AM',
    estimatedDelivery: 'Apr 27, 2026',
    status: 'Out for Delivery',
    statusColor: 'text-orange-500 bg-orange-50',
    paymentMethod: 'UPI (Google Pay)',
    address: { name: 'Demo User', line: '42, MG Road, Bengaluru', city: 'Bengaluru', state: 'Karnataka', pincode: '560001', phone: '9876543210' },
    carrier: 'BlueDart Express',
    trackingId: 'BD9934521187',
    items: [
      { id: 1, title: 'Fjallraven - Foldsack No. 1 Backpack', image: 'https://fakestoreapi.com/img/81fAn0X5zhL._AC_UL640_FMwebp_QL65_.jpg', price: 109.95, qty: 1 },
      { id: 2, title: 'Mens Casual Premium Slim Fit T-Shirts', image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg', price: 22.3, qty: 1 },
    ],
    subtotal: 132.25,
    discount: 18.10,
    delivery: 0,
    total: 114.15,
    timeline: [
      { label: 'Order Placed', date: 'Apr 22, 10:34 AM', done: true, desc: 'Your order was placed and payment confirmed.' },
      { label: 'Order Confirmed', date: 'Apr 22, 11:02 AM', done: true, desc: 'Seller confirmed and started packing.' },
      { label: 'Packed & Shipped', date: 'Apr 23, 3:15 PM', done: true, desc: 'Handed to BlueDart Express — Tracking: BD9934521187.' },
      { label: 'In Transit', date: 'Apr 25, 8:00 AM', done: true, desc: 'Package at Bengaluru sorting hub.' },
      { label: 'Out for Delivery', date: 'Apr 27, 9:30 AM', done: true, current: true, desc: 'Your package is out for delivery today!' },
      { label: 'Delivered', date: 'Expected by 8 PM', done: false, desc: 'Awaiting delivery.' },
    ],
  },
  'GLM12345678': {
    id: 'GLM12345678',
    placedOn: 'Apr 18, 2026, 2:15 PM',
    estimatedDelivery: 'Apr 21, 2026',
    status: 'Delivered',
    statusColor: 'text-green-600 bg-green-50',
    paymentMethod: 'Credit Card (HDFC)',
    address: { name: 'Demo User', line: '15, Linking Road, Bandra West', city: 'Mumbai', state: 'Maharashtra', pincode: '400050', phone: '9876543210' },
    carrier: 'Delhivery',
    trackingId: 'DL8812344556',
    items: [
      { id: 3, title: 'Mens Cotton Jacket', image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg', price: 55.99, qty: 1 },
    ],
    subtotal: 68.40,
    discount: 12.41,
    delivery: 0,
    total: 55.99,
    timeline: [
      { label: 'Order Placed', date: 'Apr 18, 2:15 PM', done: true, desc: 'Order placed successfully.' },
      { label: 'Order Confirmed', date: 'Apr 18, 2:30 PM', done: true, desc: 'Payment and stock confirmed.' },
      { label: 'Packed & Shipped', date: 'Apr 19, 10:00 AM', done: true, desc: 'Shipped via Delhivery.' },
      { label: 'In Transit', date: 'Apr 20, 6:00 AM', done: true, desc: 'In transit — Mumbai hub.' },
      { label: 'Out for Delivery', date: 'Apr 21, 10:15 AM', done: true, desc: 'Out for delivery.' },
      { label: 'Delivered', date: 'Apr 21, 4:42 PM', done: true, desc: 'Delivered successfully. Signed by: Demo User.' },
    ],
  },
}

export default function OrderDetailPage() {
  const { id } = useParams()
  const order = ORDERS_DB[id]

  if (!order) {
    return (
      <main className="pt-[104px] md:pt-[116px] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-3">🔍</p>
          <h1 className="text-xl font-bold text-gray-800 mb-2">Order not found</h1>
          <p className="text-gray-500 text-sm mb-5">We couldn&apos;t find order #{id}.</p>
          <Link to="/orders" className="btn-primary">Back to Orders</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-[104px] md:pt-[116px] min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link to="/" className="hover:text-pink-500 transition-colors">Home</Link>
          <span>›</span>
          <Link to="/orders" className="hover:text-pink-500 transition-colors">My Orders</Link>
          <span>›</span>
          <span className="text-gray-800 font-medium">#{order.id}</span>
        </nav>

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order #{order.id}</h1>
            <p className="text-sm text-gray-500 mt-0.5">Placed on {order.placedOn}</p>
          </div>
          <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${order.statusColor}`}>
            {order.status}
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-5">
            {/* Live tracking */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                <span className="text-pink-500">📦</span> Delivery Timeline
              </h2>
              <div>
                {order.timeline.map((event, i) => (
                  <div key={event.label} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 flex-shrink-0 z-10 transition-all ${
                        event.current
                          ? 'bg-pink-500 border-pink-500 text-white ring-4 ring-pink-100'
                          : event.done
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'bg-white border-gray-200 text-gray-400'
                      }`}>
                        {event.done && !event.current ? '✓' : i + 1}
                      </div>
                      {i < order.timeline.length - 1 && (
                        <div className={`w-0.5 h-10 ${event.done ? 'bg-green-300' : 'bg-gray-200'}`} />
                      )}
                    </div>
                    <div className="pb-8 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className={`text-sm font-semibold ${
                          event.current ? 'text-pink-500' : event.done ? 'text-gray-800' : 'text-gray-400'
                        }`}>
                          {event.label}
                        </p>
                        {event.current && (
                          <span className="text-xs bg-pink-100 text-pink-500 px-2 py-0.5 rounded-full font-medium animate-pulse-soft">
                            Live
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{event.date}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{event.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carrier info */}
              <div className="mt-2 pt-4 border-t border-gray-100 flex flex-wrap gap-4 text-xs text-gray-500">
                <span>🚚 {order.carrier}</span>
                <span>· Tracking: <span className="font-mono text-gray-700">{order.trackingId}</span></span>
              </div>
            </div>

            {/* Order items */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-4">Items in this Order</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <Link to={`/products/${item.id}`} className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gray-50 rounded-xl border border-gray-100 overflow-hidden hover:opacity-80 transition-opacity">
                        <img src={item.image} alt="" className="w-full h-full object-contain p-1.5" loading="lazy" />
                      </div>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/products/${item.id}`}>
                        <p className="text-sm font-medium text-gray-800 hover:text-pink-500 transition-colors line-clamp-2">
                          {item.title}
                        </p>
                      </Link>
                      <p className="text-xs text-gray-500 mt-0.5">Qty: {item.qty}</p>
                      <p className="text-sm font-bold text-gray-900 mt-0.5">${item.price}</p>
                    </div>
                    {order.status === 'Delivered' && (
                      <button className="text-xs text-pink-500 font-medium hover:underline self-start mt-1 whitespace-nowrap">
                        Write Review
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* Price summary */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-4">Price Details</h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>MRP Total</span><span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Discount</span><span>− ${order.discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className={order.delivery === 0 ? 'text-green-600 font-medium' : ''}>
                    {order.delivery === 0 ? 'FREE' : `$${order.delivery}`}
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-2.5 flex justify-between font-bold text-gray-900">
                  <span>Total Paid</span><span>${order.total.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                <p>💳 {order.paymentMethod}</p>
              </div>
            </div>

            {/* Delivery address */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-3">Delivery Address</h3>
              <div className="text-sm text-gray-600 space-y-0.5">
                <p className="font-semibold text-gray-800">{order.address.name}</p>
                <p>{order.address.line}</p>
                <p>{order.address.city}, {order.address.state} — {order.address.pincode}</p>
                <p className="mt-1">📱 {order.address.phone}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-2">
              <h3 className="font-bold text-gray-900 mb-3">Actions</h3>
              {order.status === 'Delivered' ? (
                <>
                  <button className="w-full text-sm font-medium text-gray-700 hover:text-pink-500 hover:bg-pink-50 py-2 px-3 rounded-xl text-left transition-colors">
                    📥 Download Invoice
                  </button>
                  <button className="w-full text-sm font-medium text-gray-700 hover:text-pink-500 hover:bg-pink-50 py-2 px-3 rounded-xl text-left transition-colors">
                    🔄 Buy Again
                  </button>
                  <button className="w-full text-sm font-medium text-gray-700 hover:text-pink-500 hover:bg-pink-50 py-2 px-3 rounded-xl text-left transition-colors">
                    ↩️ Return / Exchange
                  </button>
                </>
              ) : (
                <>
                  <button className="w-full text-sm font-medium text-gray-700 hover:text-pink-500 hover:bg-pink-50 py-2 px-3 rounded-xl text-left transition-colors">
                    📞 Contact Support
                  </button>
                  <button className="w-full text-sm font-medium text-red-500 hover:bg-red-50 py-2 px-3 rounded-xl text-left transition-colors">
                    ❌ Cancel Order
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Link to="/orders" className="inline-flex items-center gap-2 text-sm text-pink-500 font-medium hover:text-pink-600 transition-colors">
            ← Back to all orders
          </Link>
        </div>
      </div>
    </main>
  )
}
