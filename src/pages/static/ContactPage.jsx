import { useState } from 'react'
import StaticPageLayout, { InfoCard } from '../../components/common/StaticPageLayout'
import { useToast } from '../../context/ToastContext'

const TOPICS = [
  'Order Issue', 'Return / Refund', 'Payment Problem', 'Product Query',
  'Account Help', 'Delivery Issue', 'Cancel Order', 'Other',
]

export default function ContactPage() {
  const { toast } = useToast()
  const [form, setForm] = useState({ name: '', email: '', phone: '', topic: '', message: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.topic) e.topic = 'Please select a topic'
    if (!form.message.trim()) e.message = 'Please describe your issue'
    else if (form.message.trim().length < 20) e.message = 'Please provide more detail (min 20 chars)'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
      toast({ message: 'Message sent! We\'ll respond within 24 hours. 📬', type: 'success', duration: 5000 })
    }, 1500)
  }

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors((err) => ({ ...err, [field]: '' }))
  }

  return (
    <StaticPageLayout
      title="Contact Us"
      subtitle="We're here to help! Reach out and we'll get back to you as soon as possible."
      breadcrumb={[{ label: 'Contact Us' }]}
      heroColor="from-purple-50 to-pink-50"
    >
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact info */}
        <div className="space-y-4">
          <InfoCard icon="💬" title="Live Chat">
            Available 9 AM – 9 PM, 7 days a week. Fastest way to get help.
            <button className="mt-3 text-sm text-pink-500 font-semibold hover:underline block">Start Chat →</button>
          </InfoCard>
          <InfoCard icon="📞" title="Phone Support">
            <p>1800-123-GLAM (4526)</p>
            <p className="text-xs text-gray-400 mt-1">Toll-free · 9 AM – 9 PM IST</p>
          </InfoCard>
          <InfoCard icon="📧" title="Email Support">
            <p>support@glam.in</p>
            <p className="text-xs text-gray-400 mt-1">Response within 24 hours</p>
          </InfoCard>
          <InfoCard icon="🏢" title="Corporate Office">
            <p>Glam Beauty Pvt. Ltd.</p>
            <p className="text-xs text-gray-500 mt-1">12th Floor, Tower B, Prestige Tech Park, Bengaluru, Karnataka 560103</p>
          </InfoCard>

          {/* Social */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Follow Us</h3>
            <div className="flex gap-3">
              {[
                { icon: '📸', label: 'Instagram', handle: '@glambeauty' },
                { icon: '🐦', label: 'Twitter', handle: '@glamapp' },
              ].map((s) => (
                <a key={s.label} href="#" className="flex-1 bg-gray-50 hover:bg-pink-50 border border-gray-100 hover:border-pink-200 rounded-xl p-3 text-center transition-all duration-150">
                  <div className="text-xl mb-1">{s.icon}</div>
                  <p className="text-xs font-medium text-gray-700">{s.label}</p>
                  <p className="text-xs text-gray-400">{s.handle}</p>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="lg:col-span-2">
          {sent ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center animate-fade-in">
              <div className="text-5xl mb-4">📬</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h2>
              <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
                Thank you for reaching out. Our team will respond to your query within <strong>24 hours</strong>.
              </p>
              <p className="text-xs text-gray-400 mb-5">Reference: <span className="font-mono text-gray-600">SUP-{Date.now().toString().slice(-6)}</span></p>
              <button onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', topic: '', message: '' }) }} className="btn-outline">
                Send Another Message
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                    <input type="text" value={form.name} onChange={handleChange('name')} placeholder="Priya Sharma"
                      className={`input-base ${errors.name ? 'border-red-400 focus:ring-red-300' : ''}`} />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                    <input type="email" value={form.email} onChange={handleChange('email')} placeholder="you@email.com"
                      className={`input-base ${errors.email ? 'border-red-400 focus:ring-red-300' : ''}`} />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone <span className="text-gray-400 font-normal">(optional)</span></label>
                    <input type="tel" value={form.phone} onChange={handleChange('phone')} placeholder="10-digit mobile" className="input-base" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Topic *</label>
                    <select value={form.topic} onChange={handleChange('topic')}
                      className={`input-base cursor-pointer ${errors.topic ? 'border-red-400 focus:ring-red-300' : ''}`}>
                      <option value="">Select a topic</option>
                      {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errors.topic && <p className="text-xs text-red-500 mt-1">{errors.topic}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Message *</label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={handleChange('message')}
                    placeholder="Describe your issue in detail. Include your Order ID if relevant..."
                    className={`input-base resize-none ${errors.message ? 'border-red-400 focus:ring-red-300' : ''}`}
                  />
                  <div className="flex justify-between mt-1">
                    {errors.message ? <p className="text-xs text-red-500">{errors.message}</p> : <span />}
                    <p className="text-xs text-gray-400">{form.message.length}/500</p>
                  </div>
                </div>

                {/* File attachment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Attach Screenshot <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-200 hover:border-pink-300 rounded-xl p-4 text-center cursor-pointer transition-colors">
                    <p className="text-sm text-gray-500">📎 Drag & drop or <span className="text-pink-500 font-medium">browse file</span></p>
                    <p className="text-xs text-gray-400 mt-1">JPG, PNG, PDF up to 5 MB</p>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : '📤 Send Message'}
                </button>

                <p className="text-xs text-center text-gray-400">
                  We typically respond within 24 hours on business days.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </StaticPageLayout>
  )
}
