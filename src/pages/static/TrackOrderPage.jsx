import { useState } from 'react'
import StaticPageLayout from '../../components/common/StaticPageLayout'

const MOCK_ORDER = {
  id: 'GLM87654321',
  date: 'Apr 22, 2026',
  estimatedDelivery: 'Apr 27, 2026',
  status: 'Out for Delivery',
  carrier: 'BlueDart Express',
  trackingId: 'BD9934521187',
  address: '42, MG Road, Bengaluru, Karnataka - 560001',
  item: {
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    image: 'https://fakestoreapi.com/img/81fAn0X5zhL._AC_UL640_FMwebp_QL65_.jpg',
    price: 109.95,
  },
  timeline: [
    { label: 'Order Placed', date: 'Apr 22, 10:34 AM', done: true, desc: 'Your order was successfully placed.' },
    { label: 'Order Confirmed', date: 'Apr 22, 11:02 AM', done: true, desc: 'Payment verified and order confirmed.' },
    { label: 'Packed & Shipped', date: 'Apr 23, 3:15 PM', done: true, desc: 'Order packed and handed to BlueDart Express.' },
    { label: 'In Transit', date: 'Apr 25, 8:00 AM', done: true, desc: 'Package in transit — Bengaluru hub.' },
    { label: 'Out for Delivery', date: 'Apr 27, 9:30 AM', done: true, current: true, desc: 'Package is out for delivery today.' },
    { label: 'Delivered', date: 'Expected Apr 27', done: false, desc: 'Awaiting delivery.' },
  ],
}

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('')
  const [email, setEmail] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTrack = (e) => {
    e.preventDefault()
    if (!orderId.trim()) { setError('Please enter an Order ID'); return }
    setError('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (orderId.toUpperCase() === 'GLM87654321' || orderId === '1') {
        setResult(MOCK_ORDER)
      } else {
        setResult(null)
        setError('No order found with that ID. Try "GLM87654321" for a demo.')
      }
    }, 1200)
  }

  return (
    <StaticPageLayout
      title="Track Your Order"
      subtitle="Enter your Order ID to get real-time updates on your delivery."
      breadcrumb={[{ label: 'Track Order' }]}
      heroColor="from-indigo-50 to-blue-50"
    >
      {/* Search form */}
      <div className="max-w-xl mx-auto mb-10">
        <form onSubmit={handleTrack} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Order ID *</label>
              <input
                type="text"
                placeholder="e.g. GLM87654321"
                value={orderId}
                onChange={(e) => { setOrderId(e.target.value); setError('') }}
                className="input-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="email"
                placeholder="Registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-base"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button type="submit" className="btn-primary w-full py-3" disabled={loading}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Tracking...
                </span>
              ) : '🔍 Track Order'}
            </button>
          </div>
          <p className="text-xs text-gray-400 text-center mt-3">Try Order ID: <button type="button" className="text-pink-500 font-medium" onClick={() => setOrderId('GLM87654321')}>GLM87654321</button> for a demo</p>
        </form>
      </div>

      {/* Result */}
      {result && (
        <div className="animate-fade-in space-y-6">
          {/* Order summary */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-gray-100">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Order ID</p>
                <p className="font-bold text-gray-900">#{result.id}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Ordered on</p>
                <p className="font-medium text-gray-700">{result.date}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Est. Delivery</p>
                <p className="font-medium text-gray-700">{result.estimatedDelivery}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-500">
                {result.status}
              </span>
            </div>

            {/* Item */}
            <div className="flex gap-3">
              <div className="w-16 h-16 bg-gray-50 rounded-xl border border-gray-100 overflow-hidden flex-shrink-0">
                <img src={result.item.image} alt="" className="w-full h-full object-contain p-1.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 line-clamp-2">{result.item.title}</p>
                <p className="text-sm text-gray-500 mt-0.5">${result.item.price}</p>
                <p className="text-xs text-gray-400 mt-1">📍 {result.address}</p>
              </div>
            </div>

            <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
              <span>🚚 {result.carrier}</span>
              <span>|</span>
              <span>Tracking: {result.trackingId}</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-5">Delivery Progress</h3>
            <div className="space-y-0">
              {result.timeline.map((event, i) => (
                <div key={event.label} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 flex-shrink-0 z-10 ${
                      event.current
                        ? 'bg-pink-500 border-pink-500 text-white ring-4 ring-pink-100'
                        : event.done
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'bg-white border-gray-200 text-gray-400'
                    }`}>
                      {event.done && !event.current ? '✓' : i + 1}
                    </div>
                    {i < result.timeline.length - 1 && (
                      <div className={`w-0.5 h-10 ${event.done ? 'bg-green-300' : 'bg-gray-200'}`} />
                    )}
                  </div>
                  <div className="pb-8 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className={`text-sm font-semibold ${event.current ? 'text-pink-500' : event.done ? 'text-gray-800' : 'text-gray-400'}`}>
                        {event.label}
                      </p>
                      {event.current && (
                        <span className="text-xs bg-pink-100 text-pink-500 px-2 py-0.5 rounded-full font-medium">Current</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{event.date}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{event.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </StaticPageLayout>
  )
}
