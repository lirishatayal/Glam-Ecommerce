import StaticPageLayout, { InfoCard } from '../../components/common/StaticPageLayout'

const TIERS = [
  { tier: 'Starter', commission: '5%', threshold: '0–10 sales/month', color: 'border-gray-200', badge: 'bg-gray-100 text-gray-700' },
  { tier: 'Silver', commission: '8%', threshold: '11–50 sales/month', color: 'border-blue-200', badge: 'bg-blue-100 text-blue-700' },
  { tier: 'Gold', commission: '12%', threshold: '51–200 sales/month', color: 'border-yellow-300', badge: 'bg-yellow-100 text-yellow-700' },
  { tier: 'Platinum', commission: '15%', threshold: '200+ sales/month', color: 'border-pink-400', badge: 'bg-pink-100 text-pink-700', featured: true },
]

const STEPS = [
  { num: '01', title: 'Sign Up Free', desc: 'Create your affiliate account in 2 minutes — no credit card, no hidden fees.' },
  { num: '02', title: 'Get Your Link', desc: 'Access your personalised dashboard and generate unique tracking links for any Glam product.' },
  { num: '03', title: 'Share & Earn', desc: 'Share your links on Instagram, YouTube, blog, WhatsApp — anywhere your audience is.' },
  { num: '04', title: 'Get Paid', desc: 'Commissions are credited monthly. Minimum payout is ₹500 via UPI, bank transfer, or Glam wallet.' },
]

export default function AffiliatePage() {
  return (
    <StaticPageLayout
      title="Affiliate Program"
      subtitle="Love Glam? Share it with your audience and earn up to 15% commission on every sale."
      breadcrumb={[{ label: 'Affiliate Program' }]}
      heroColor="from-amber-50 to-pink-50"
    >
      {/* Hero stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {[
          { value: '15%', label: 'Max Commission' },
          { value: '30 days', label: 'Cookie Window' },
          { value: '₹500', label: 'Min Payout' },
          { value: '50K+', label: 'Active Affiliates' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
            <p className="text-2xl font-extrabold text-pink-500">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Benefits */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Why Join Glam Affiliate?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: '💰', title: 'High Commissions', desc: 'Earn up to 15% commission — one of the highest in Indian beauty e-commerce.' },
            { icon: '🍪', title: '30-Day Cookie', desc: 'You earn even if a visitor buys up to 30 days after clicking your link.' },
            { icon: '📊', title: 'Real-Time Dashboard', desc: 'Track clicks, conversions, and earnings in your personalised affiliate dashboard.' },
            { icon: '🎨', title: 'Ready-Made Assets', desc: 'Access banners, product images, and copy templates to make promoting easy.' },
            { icon: '⚡', title: 'Instant Deep Links', desc: 'Generate links to any product, category, or sale page in one click.' },
            { icon: '🏆', title: 'Exclusive Bonuses', desc: 'Top affiliates get bonus payouts, early access to sales, and co-marketing opportunities.' },
          ].map((b) => (
            <InfoCard key={b.title} icon={b.icon} title={b.title}>{b.desc}</InfoCard>
          ))}
        </div>
      </section>

      {/* Commission tiers */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Commission Tiers</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TIERS.map((t) => (
            <div key={t.tier} className={`bg-white rounded-2xl border-2 p-5 relative ${t.color} ${t.featured ? 'shadow-lg shadow-pink-100' : ''}`}>
              {t.featured && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-xs font-bold px-3 py-0.5 rounded-full whitespace-nowrap">
                  Most Popular
                </span>
              )}
              <span className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full mb-3 ${t.badge}`}>{t.tier}</span>
              <p className="text-3xl font-extrabold text-gray-900 mb-1">{t.commission}</p>
              <p className="text-xs text-gray-500">commission</p>
              <p className="text-xs text-gray-400 mt-3 border-t border-gray-100 pt-3">{t.threshold}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">How It Works</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s) => (
            <div key={s.num} className="bg-white rounded-2xl border border-gray-100 p-5 relative">
              <div className="w-9 h-9 bg-pink-500 text-white rounded-xl flex items-center justify-center text-sm font-bold mb-3">{s.num}</div>
              <h3 className="font-bold text-gray-900 mb-1">{s.title}</h3>
              <p className="text-sm text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ideal for */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Ideal For</h2>
        <div className="flex flex-wrap gap-3">
          {['Beauty Bloggers', 'Instagram Influencers', 'YouTubers', 'Fashion Stylists', 'Skincare Enthusiasts', 'Deal & Coupon Sites', 'WhatsApp Groups', 'Anyone with an audience!'].map((label) => (
            <span key={label} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-pink-400 hover:text-pink-500 transition-colors cursor-default">
              {label}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-400 rounded-3xl p-8 sm:p-12 text-center text-white">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">Ready to Start Earning?</h2>
        <p className="text-white/80 mb-6 max-w-md mx-auto">Join 50,000+ affiliates already earning with Glam. It&apos;s free to join and takes less than 2 minutes.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="px-8 py-3 bg-white text-pink-600 font-bold rounded-full hover:bg-pink-50 transition-colors">
            Join Now — It&apos;s Free
          </button>
          <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors">
            affiliate@glam.in
          </button>
        </div>
      </div>
    </StaticPageLayout>
  )
}
