import StaticPageLayout, { InfoCard, SectionHeading } from '../../components/common/StaticPageLayout'
import { Link } from 'react-router-dom'

const RETURNABLE = [
  'Clothing & Apparel (unused, tags intact)',
  'Electronics (sealed / unopened)',
  'Accessories & Jewellery',
  'Home & Lifestyle products',
  'Footwear (in original box)',
]

const NON_RETURNABLE = [
  'Opened beauty, cosmetics & skincare products',
  'Fragrances & perfumes (opened)',
  'Innerwear, swimwear & socks',
  'Customised or personalised items',
  'Products marked "Non-Returnable" on listing',
  'Items damaged due to misuse',
]

export default function ReturnsPage() {
  return (
    <StaticPageLayout
      title="Returns & Refunds"
      subtitle="We want you to love every purchase. If something isn't right, we make it easy to return."
      breadcrumb={[{ label: 'Returns & Refunds' }]}
      heroColor="from-green-50 to-emerald-50"
    >
      {/* Highlights */}
      <div className="grid sm:grid-cols-3 gap-4 mb-12">
        <InfoCard icon="📅" title="15-Day Returns">Easy returns within 15 days of delivery for most products.</InfoCard>
        <InfoCard icon="🔄" title="Free Pickup">We arrange a free pickup from your doorstep — no trips to the courier.</InfoCard>
        <InfoCard icon="💰" title="Fast Refunds">Refunds processed in 5–7 business days after product verification.</InfoCard>
      </div>

      <div className="space-y-8">
        {/* How to return */}
        <section>
          <SectionHeading>How to Initiate a Return</SectionHeading>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            {[
              { step: '1', title: 'Go to My Orders', desc: 'Log in to your account and navigate to "My Orders" from the top menu.' },
              { step: '2', title: 'Select the Item', desc: 'Find the order and click "Return Item" next to the product you wish to return.' },
              { step: '3', title: 'Choose a Reason', desc: 'Select a reason for return: wrong item, damaged product, size issue, change of mind, etc.' },
              { step: '4', title: 'Schedule Pickup', desc: 'Choose a convenient date and time. Our partner courier will collect the item from your address.' },
              { step: '5', title: 'Pack the Item', desc: 'Ensure the item is in original packaging with all accessories, tags, and invoice included.' },
              { step: '6', title: 'Get Refund', desc: 'Once we verify the returned item, your refund is processed within 5–7 business days.' },
            ].map((s) => (
              <div key={s.step} className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">{s.step}</div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{s.title}</p>
                  <p className="text-sm text-gray-600 mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Eligible / Not eligible */}
        <section>
          <SectionHeading>What Can Be Returned?</SectionHeading>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-2xl border border-green-100 p-5">
              <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2"><span>✅</span> Eligible for Return</h3>
              <ul className="space-y-2">
                {RETURNABLE.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-green-700">
                    <span className="flex-shrink-0">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 rounded-2xl border border-red-100 p-5">
              <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2"><span>❌</span> Not Eligible for Return</h3>
              <ul className="space-y-2">
                {NON_RETURNABLE.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-red-700">
                    <span className="flex-shrink-0">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Refund methods */}
        <section>
          <SectionHeading>Refund Methods & Timelines</SectionHeading>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-green-50 border-b border-green-100">
                <tr>
                  {['Payment Method', 'Refund To', 'Timeline'].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ['Credit / Debit Card', 'Original card', '5–7 business days'],
                  ['UPI / Net Banking', 'Original account', '3–5 business days'],
                  ['Glam Wallet', 'Glam Wallet', 'Within 24 hours'],
                  ['Cash on Delivery', 'Bank transfer / Wallet', '5–7 business days'],
                ].map(([method, to, time]) => (
                  <tr key={method} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-gray-800">{method}</td>
                    <td className="px-5 py-3.5 text-gray-600">{to}</td>
                    <td className="px-5 py-3.5 text-gray-600">{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Damages */}
        <section>
          <SectionHeading>Received a Damaged or Wrong Item?</SectionHeading>
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              If you received a damaged, defective, or wrong item, please contact us within <strong>48 hours</strong> of delivery with:
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              {['Your Order ID', 'Clear photos of the product and packaging', 'A brief description of the issue'].map((item) => (
                <li key={item} className="flex gap-2"><span className="text-orange-500">→</span> {item}</li>
              ))}
            </ul>
            <p className="text-sm text-gray-700 mt-4">
              We will arrange an immediate replacement or full refund — your choice.
            </p>
            <Link to="/contact" className="inline-block mt-4 btn-primary text-sm">Report an Issue</Link>
          </div>
        </section>
      </div>
    </StaticPageLayout>
  )
}
