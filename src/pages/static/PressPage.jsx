import StaticPageLayout from '../../components/common/StaticPageLayout'

const PRESS_RELEASES = [
  {
    date: 'Apr 10, 2026',
    title: 'Glam Raises ₹500 Crore in Series C Funding Led by Sequoia Capital India',
    excerpt: 'The funds will be used to expand into 10 new Indian cities, launch same-day delivery in Tier 2 cities, and invest heavily in AI-powered personalisation.',
    tag: 'Funding',
    tagColor: 'bg-green-100 text-green-700',
  },
  {
    date: 'Mar 18, 2026',
    title: 'Glam Crosses 2 Million Customers Milestone in Under 4 Years',
    excerpt: 'Beauty-tech startup Glam announced it has surpassed the 2 million active customer mark, driven by strong growth in women\'s fashion and skincare categories.',
    tag: 'Milestone',
    tagColor: 'bg-pink-100 text-pink-700',
  },
  {
    date: 'Feb 5, 2026',
    title: 'Glam Launches Glam Elite — India\'s First AI-Curated Beauty Subscription',
    excerpt: 'Glam Elite uses machine learning to personalise a monthly beauty box based on your skin type, preferences, and past purchase history.',
    tag: 'Product Launch',
    tagColor: 'bg-blue-100 text-blue-700',
  },
  {
    date: 'Jan 22, 2026',
    title: 'Glam Partners with 50 New International Brands for 2026',
    excerpt: 'The partnerships include global beauty giants and indie brands from the UK, South Korea, and Japan — bringing exclusive international products to Indian customers.',
    tag: 'Partnership',
    tagColor: 'bg-purple-100 text-purple-700',
  },
]

const COVERAGE = [
  { outlet: 'Economic Times', headline: '"Glam is India\'s answer to Sephora"', logo: '📰' },
  { outlet: 'TechCrunch', headline: '"The startup making beauty accessible"', logo: '💻' },
  { outlet: 'Vogue India', headline: '"Our favourite beauty destination of 2025"', logo: '👗' },
  { outlet: 'Forbes India', headline: '"30 Under 30: Anika Sharma, Glam CEO"', logo: '🏆' },
  { outlet: 'Mint', headline: '"Glam\'s ₹500 Cr bet on beauty-tech"', logo: '📊' },
  { outlet: 'YourStory', headline: '"From ₹50K to ₹500 Cr: The Glam Story"', logo: '🚀' },
]

export default function PressPage() {
  return (
    <StaticPageLayout
      title="Press & Media"
      subtitle="Latest news, press releases, and media coverage about Glam."
      breadcrumb={[{ label: 'Press' }]}
      heroColor="from-gray-50 to-slate-50"
    >
      {/* Media kit */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 mb-12 text-white">
        <div className="text-5xl">📦</div>
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-xl font-bold mb-1">Download Media Kit</h2>
          <p className="text-gray-300 text-sm">Brand logos, product images, founder photos, fact sheet, and company guidelines.</p>
        </div>
        <button className="btn-outline border-white text-white hover:bg-white hover:text-gray-900 whitespace-nowrap">
          Download Kit ↓
        </button>
      </div>

      {/* Press contact */}
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-bold text-gray-900 mb-3">📧 Press Enquiries</h3>
          <p className="text-sm text-gray-600">For interviews, quotes, or media collaboration:</p>
          <p className="text-pink-500 font-semibold mt-1">press@glam.in</p>
          <p className="text-sm text-gray-500 mt-1">Response within 4 business hours</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-bold text-gray-900 mb-3">📞 PR Contact</h3>
          <p className="text-sm text-gray-600">Sneha Kapoor — Head of Communications</p>
          <p className="text-pink-500 font-semibold mt-1">sneha.kapoor@glam.in</p>
          <p className="text-sm text-gray-500 mt-1">+91 98765 43210</p>
        </div>
      </div>

      {/* Press releases */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Press Releases</h2>
        <div className="space-y-4">
          {PRESS_RELEASES.map((pr) => (
            <div key={pr.title} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${pr.tagColor}`}>{pr.tag}</span>
                <span className="text-xs text-gray-400">{pr.date}</span>
              </div>
              <h3 className="font-bold text-gray-900 group-hover:text-pink-500 transition-colors mb-2">{pr.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{pr.excerpt}</p>
              <span className="text-xs text-pink-500 font-semibold mt-2 inline-block">Read more →</span>
            </div>
          ))}
        </div>
      </section>

      {/* Media coverage */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-5">As Seen In</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {COVERAGE.map((c) => (
            <div key={c.outlet} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow text-center">
              <div className="text-3xl mb-2">{c.logo}</div>
              <p className="font-bold text-gray-800 text-sm">{c.outlet}</p>
              <p className="text-xs text-gray-500 mt-1 italic">{c.headline}</p>
            </div>
          ))}
        </div>
      </section>
    </StaticPageLayout>
  )
}
