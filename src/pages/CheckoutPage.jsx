import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useUser } from '../context/UserContext'
import { useToast } from '../context/ToastContext'
import { computeDiscount } from '../services/productService'
import { EmptyState } from '../components/common/ErrorUI'

const STEPS = ['Address', 'Payment', 'Review', 'Confirm']

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', icon: '📱', desc: 'Google Pay, PhonePe, Paytm' },
  { id: 'card', label: 'Credit / Debit Card', icon: '💳', desc: 'Visa, Mastercard, Rupay' },
  { id: 'netbanking', label: 'Net Banking', icon: '🏦', desc: 'All major banks supported' },
  { id: 'cod', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when order arrives' },
]

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEPS.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                i < current
                  ? 'bg-pink-500 border-pink-500 text-white'
                  : i === current
                  ? 'border-pink-500 text-pink-500 bg-white'
                  : 'border-gray-200 text-gray-400 bg-white'
              }`}
            >
              {i < current ? '✓' : i + 1}
            </div>
            <span
              className={`text-xs mt-1 font-medium ${
                i <= current ? 'text-pink-500' : 'text-gray-400'
              }`}
            >
              {step}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`w-16 sm:w-24 h-0.5 mx-1 mb-5 transition-colors duration-300 ${
                i < current ? 'bg-pink-500' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const { user } = useUser()
  const { toast } = useToast()
  const navigate = useNavigate()

  const [step, setStep] = useState(0)
  const [placing, setPlacing] = useState(false)
  const [orderId, setOrderId] = useState(null)

  const [address, setAddress] = useState({
    name: user?.name || '',
    phone: '',
    pincode: '',
    addressLine: '',
    city: '',
    state: '',
    type: 'home',
  })

  const [addrErrors, setAddrErrors] = useState({})
  const [payMethod, setPayMethod] = useState('upi')
  const [upiId, setUpiId] = useState('')

  const totalMrp = cartItems.reduce((sum, item) => {
    const { mrp } = computeDiscount(item)
    return sum + mrp * item.quantity
  }, 0)
  const savings = (totalMrp - cartTotal).toFixed(2)
  const delivery = cartTotal >= 499 ? 0 : 49
  const finalTotal = cartTotal + delivery

  if (cartItems.length === 0 && !orderId) {
    return (
      <main className="pt-[104px] md:pt-[116px] min-h-screen">
        <EmptyState
          title="Nothing to checkout"
          description="Your cart is empty. Add some products first!"
          action={() => navigate('/products')}
          actionLabel="Shop Now"
        />
      </main>
    )
  }

  // ── Address validation ──────────────────────────────────────────
  const validateAddress = () => {
    const e = {}
    if (!address.name.trim()) e.name = 'Full name is required'
    if (!address.phone.trim()) e.phone = 'Phone number is required'
    else if (!/^\d{10}$/.test(address.phone.replace(/\s/g, ''))) e.phone = 'Enter valid 10-digit number'
    if (!address.pincode.trim()) e.pincode = 'Pincode is required'
    else if (!/^\d{6}$/.test(address.pincode)) e.pincode = 'Enter valid 6-digit pincode'
    if (!address.addressLine.trim()) e.addressLine = 'Address is required'
    if (!address.city.trim()) e.city = 'City is required'
    if (!address.state.trim()) e.state = 'State is required'
    return e
  }

  const handleAddrNext = () => {
    const errs = validateAddress()
    if (Object.keys(errs).length) { setAddrErrors(errs); return }
    setStep(1)
  }

  // ── Place order ─────────────────────────────────────────────────
  const handlePlaceOrder = () => {
    setPlacing(true)
    const id = 'GLM' + Date.now().toString().slice(-8)
    setTimeout(() => {
      setOrderId(id)
      clearCart()
      setPlacing(false)
      setStep(3)
      toast({ message: `Order #${id} placed successfully! 🎉`, type: 'success', duration: 5000 })
    }, 1800)
  }

  const addrField = (field) => (e) => {
    setAddress((a) => ({ ...a, [field]: e.target.value }))
    if (addrErrors[field]) setAddrErrors((err) => ({ ...err, [field]: '' }))
  }

  // ── Order Success Screen ─────────────────────────────────────────
  if (step === 3 && orderId) {
    return (
      <main className="pt-[104px] md:pt-[116px] min-h-screen bg-gray-50">
        <div className="max-w-lg mx-auto px-4 py-16 text-center animate-fade-in">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <span className="text-4xl">🎉</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h1>
            <p className="text-gray-500 mb-4">
              Your order has been confirmed and will be delivered in{' '}
              <span className="font-semibold text-gray-800">3–5 business days</span>.
            </p>
            <div className="bg-pink-50 border border-pink-100 rounded-2xl px-6 py-4 mb-6">
              <p className="text-xs text-gray-500 mb-1">Order ID</p>
              <p className="text-xl font-extrabold text-pink-500 tracking-widest">#{orderId}</p>
            </div>
            <div className="text-sm text-gray-600 mb-8 space-y-1">
              <p>📍 Delivering to: <span className="font-medium">{address.city}, {address.state}</span></p>
              <p>💳 Payment: <span className="font-medium capitalize">{payMethod === 'cod' ? 'Cash on Delivery' : PAYMENT_METHODS.find(p => p.id === payMethod)?.label}</span></p>
              <p>💰 Total paid: <span className="font-bold text-gray-900">${finalTotal.toFixed(2)}</span></p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/orders" className="btn-outline flex-1 text-center py-3">
                Track Order
              </Link>
              <Link to="/products" className="btn-primary flex-1 text-center py-3">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-[104px] md:pt-[116px] min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Checkout</h1>

        <StepIndicator current={step} />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left — form */}
          <div className="lg:col-span-2">
            {/* ── Step 0: Address ── */}
            {step === 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-fade-in">
                <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 bg-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center">1</span>
                  Delivery Address
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Full Name *" error={addrErrors.name}>
                    <input className={inputCls(addrErrors.name)} placeholder="Priya Sharma" value={address.name} onChange={addrField('name')} />
                  </Field>
                  <Field label="Phone Number *" error={addrErrors.phone}>
                    <input className={inputCls(addrErrors.phone)} placeholder="10-digit mobile" value={address.phone} onChange={addrField('phone')} maxLength={10} />
                  </Field>
                  <Field label="Pincode *" error={addrErrors.pincode}>
                    <input className={inputCls(addrErrors.pincode)} placeholder="6-digit pincode" value={address.pincode} onChange={addrField('pincode')} maxLength={6} />
                  </Field>
                  <Field label="City *" error={addrErrors.city}>
                    <input className={inputCls(addrErrors.city)} placeholder="Mumbai" value={address.city} onChange={addrField('city')} />
                  </Field>
                  <Field label="Address Line *" error={addrErrors.addressLine} className="sm:col-span-2">
                    <input className={inputCls(addrErrors.addressLine)} placeholder="House no, Street, Area" value={address.addressLine} onChange={addrField('addressLine')} />
                  </Field>
                  <Field label="State *" error={addrErrors.state}>
                    <input className={inputCls(addrErrors.state)} placeholder="Maharashtra" value={address.state} onChange={addrField('state')} />
                  </Field>
                </div>

                {/* Address type */}
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Address type</p>
                  <div className="flex gap-3">
                    {['home', 'work', 'other'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setAddress((a) => ({ ...a, type: t }))}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 capitalize ${
                          address.type === t
                            ? 'bg-pink-500 border-pink-500 text-white'
                            : 'border-gray-200 text-gray-600 hover:border-pink-300'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <Link to="/cart" className="btn-ghost text-sm">← Back to Cart</Link>
                  <button onClick={handleAddrNext} className="btn-primary px-8">
                    Continue to Payment →
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 1: Payment ── */}
            {step === 1 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-fade-in">
                <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 bg-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center">2</span>
                  Payment Method
                </h2>

                <div className="space-y-3 mb-6">
                  {PAYMENT_METHODS.map((m) => (
                    <label
                      key={m.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 ${
                        payMethod === m.id
                          ? 'border-pink-500 bg-pink-50'
                          : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={m.id}
                        checked={payMethod === m.id}
                        onChange={() => setPayMethod(m.id)}
                        className="w-4 h-4 text-pink-500 focus:ring-pink-400"
                      />
                      <span className="text-2xl">{m.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{m.label}</p>
                        <p className="text-xs text-gray-500">{m.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                {payMethod === 'upi' && (
                  <div className="mb-5 animate-fade-in">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">UPI ID</label>
                    <input
                      type="text"
                      placeholder="yourname@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="input-base"
                    />
                  </div>
                )}

                {payMethod === 'card' && (
                  <div className="space-y-3 mb-5 animate-fade-in">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Card Number</label>
                      <input type="text" placeholder="1234 5678 9012 3456" className="input-base" maxLength={19} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Expiry</label>
                        <input type="text" placeholder="MM/YY" className="input-base" maxLength={5} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">CVV</label>
                        <input type="password" placeholder="•••" className="input-base" maxLength={4} />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <button onClick={() => setStep(0)} className="btn-ghost text-sm">← Edit Address</button>
                  <button onClick={() => setStep(2)} className="btn-primary px-8">
                    Review Order →
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 2: Review ── */}
            {step === 2 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-fade-in">
                <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 bg-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center">3</span>
                  Review Your Order
                </h2>

                {/* Address summary */}
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Delivering to</p>
                      <p className="text-sm font-semibold text-gray-800">{address.name}</p>
                      <p className="text-sm text-gray-600">{address.addressLine}, {address.city}, {address.state} — {address.pincode}</p>
                      <p className="text-sm text-gray-500">📱 {address.phone}</p>
                    </div>
                    <button onClick={() => setStep(0)} className="text-xs text-pink-500 font-semibold hover:underline">Edit</button>
                  </div>
                </div>

                {/* Payment summary */}
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Payment</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {PAYMENT_METHODS.find((m) => m.id === payMethod)?.icon}{' '}
                        {PAYMENT_METHODS.find((m) => m.id === payMethod)?.label}
                      </p>
                    </div>
                    <button onClick={() => setStep(1)} className="text-xs text-pink-500 font-semibold hover:underline">Edit</button>
                  </div>
                </div>

                {/* Items summary */}
                <div className="space-y-3 mb-5">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-12 h-12 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                        <img src={item.image} alt="" className="w-full h-full object-contain p-1" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800 line-clamp-1">{item.title}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between">
                  <button onClick={() => setStep(1)} className="btn-ghost text-sm">← Edit Payment</button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={placing}
                    className="btn-primary px-8"
                  >
                    {placing ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Placing Order...
                      </span>
                    ) : '🛒 Place Order'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right — order summary */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>

              {/* Items */}
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto scrollbar-hide">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-12 h-12 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                      <img src={item.image} alt="" className="w-full h-full object-contain p-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-700 line-clamp-2 leading-snug">{item.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-semibold text-gray-900 whitespace-nowrap">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <hr className="border-gray-100 mb-3" />

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>MRP Total</span><span>${totalMrp.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Discount</span><span>− ${savings}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className={delivery === 0 ? 'text-green-600 font-medium' : ''}>
                    {delivery === 0 ? 'FREE' : `$${delivery}`}
                  </span>
                </div>
              </div>

              <hr className="border-gray-100 mb-3" />

              <div className="flex justify-between font-bold text-base text-gray-900 mb-5">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>

              {/* Place order button shown on review step */}
              {step === 2 && (
                <button
                  onClick={handlePlaceOrder}
                  disabled={placing}
                  className="btn-primary w-full py-3.5"
                >
                  {placing ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Placing Order...
                    </span>
                  ) : '🛒 Place Order'}
                </button>
              )}

              <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mt-3">
                <span>🔒</span> 100% Secure Checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function Field({ label, error, className = '', children }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}

function inputCls(error) {
  return `input-base ${error ? 'border-red-400 focus:ring-red-300' : ''}`
}
