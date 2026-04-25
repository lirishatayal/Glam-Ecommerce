import StaticPageLayout, { InfoCard, SectionHeading } from '../../components/common/StaticPageLayout'
import { Link } from 'react-router-dom'

const ZONES = [
  { zone: 'Metro Cities', cities: 'Mumbai, Delhi, Bengaluru, Hyderabad, Chennai, Kolkata', standard: '2–3 days', express: 'Same day / Next day' },
  { zone: 'Tier 1 Cities', cities: 'Pune, Ahmedabad, Jaipur, Surat, Lucknow, Chandigarh', standard: '3–4 days', express: '1–2 days' },
  { zone: 'Tier 2 Cities', cities: 'Nagpur, Indore, Bhopal, Patna, Vadodara, Coimbatore', standard: '4–5 days', express: '2–3 days' },
  { zone: 'Rest of India', cities: 'All other serviceable pincodes', standard: '5–7 days', express: 'Not available' },
]

export default function ShippingPolicyPage() {
  return (
    <StaticPageLayout
      title="Shipping Policy"
      subtitle="Everything you need to know about how we deliver your orders safely and on time."
      breadcrumb={[{ label: 'Shipping Policy' }]}
      heroColor="from-blue-50 to-sky-50"
    >
      {/* Key highlights */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {[
          { icon: '🆓', title: 'Free Delivery', desc: 'On all orders above ₹499' },
          { icon: '⚡', title: 'Express Shipping', desc: 'Same day in metro cities' },
          { icon: '📦', title: 'Safe Packaging', desc: 'Tamper-proof, eco-friendly' },
          { icon: '🔍', title: 'Live Tracking', desc: 'Real-time order updates' },
        ].map((item) => (
          <InfoCard key={item.title} icon={item.icon} title={item.title}>{item.desc}</InfoCard>
        ))}
      </div>

      <div className="space-y-8">
        <section>
          <SectionHeading>Delivery Charges</SectionHeading>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-pink-50 border-b border-pink-100">
                <tr>
                  {['Order Value', 'Standard Delivery', 'Express Delivery'].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 text-gray-800 font-medium">Below ₹499</td>
                  <td className="px-5 py-3.5 text-gray-600">₹49</td>
                  <td className="px-5 py-3.5 text-gray-600">₹99–₹149</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 text-gray-800 font-medium">₹499 and above</td>
                  <td className="px-5 py-3.5 text-green-600 font-semibold">FREE</td>
                  <td className="px-5 py-3.5 text-gray-600">₹59–₹99</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 text-gray-800 font-medium">Glam Elite Members</td>
                  <td className="px-5 py-3.5 text-green-600 font-semibold">Always FREE</td>
                  <td className="px-5 py-3.5 text-green-600 font-semibold">50% off</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <SectionHeading>Estimated Delivery Times</SectionHeading>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[500px]">
                <thead className="bg-pink-50 border-b border-pink-100">
                  <tr>
                    {['Zone', 'Cities', 'Standard', 'Express'].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {ZONES.map((z) => (
                    <tr key={z.zone} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-gray-800 whitespace-nowrap">{z.zone}</td>
                      <td className="px-5 py-3.5 text-gray-500 text-xs">{z.cities}</td>
                      <td className="px-5 py-3.5 text-gray-700">{z.standard}</td>
                      <td className="px-5 py-3.5 text-gray-700">{z.express}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2 px-1">* Delivery times are estimates and may vary during peak seasons, holidays, or unforeseen circumstances.</p>
        </section>

        <section>
          <SectionHeading>Order Processing</SectionHeading>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            {[
              { step: '01', title: 'Order Placed', desc: 'You place your order and receive an instant confirmation email with your Order ID.' },
              { step: '02', title: 'Order Verified', desc: 'Our team verifies payment and product availability (usually within 1 hour).' },
              { step: '03', title: 'Packed & Dispatched', desc: 'Your order is carefully packed in eco-friendly packaging and handed to our delivery partner.' },
              { step: '04', title: 'Out for Delivery', desc: 'You receive an SMS/email when the package is out for delivery. Ensure someone is available to receive it.' },
              { step: '05', title: 'Delivered', desc: 'Package delivered! You will receive a delivery confirmation notification.' },
            ].map((s) => (
              <div key={s.step} className="flex gap-4">
                <div className="w-9 h-9 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{s.step}</div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{s.title}</p>
                  <p className="text-sm text-gray-600 mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading>Important Notes</SectionHeading>
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <ul className="space-y-3">
              {[
                'Orders placed after 2 PM may be dispatched on the next business day.',
                'Sundays and public holidays are not counted as business days.',
                'Delivery is not available to P.O. Boxes or military addresses.',
                'Glam is not responsible for delays caused by incorrect addresses provided by the customer.',
                'If a delivery attempt fails, our courier will try again the next business day.',
                'For high-value orders, a signature may be required at delivery.',
              ].map((note) => (
                <li key={note} className="flex gap-2 text-sm text-gray-600">
                  <span className="text-pink-400 flex-shrink-0 mt-0.5">•</span> {note}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <div className="mt-10 p-5 bg-pink-50 rounded-2xl border border-pink-100 flex flex-col sm:flex-row items-center gap-4">
        <span className="text-3xl">❓</span>
        <div className="flex-1 text-center sm:text-left">
          <p className="font-semibold text-gray-800">Have shipping questions?</p>
          <p className="text-sm text-gray-500">Our support team is ready to help.</p>
        </div>
        <Link to="/contact" className="btn-primary whitespace-nowrap">Contact Us</Link>
      </div>
    </StaticPageLayout>
  )
}
