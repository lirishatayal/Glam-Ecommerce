import StaticPageLayout, { InfoCard } from '../../components/common/StaticPageLayout'
import { Link } from 'react-router-dom'

const STATS = [
  { value: '2M+', label: 'Happy Customers' },
  { value: '50K+', label: 'Products Listed' },
  { value: '500+', label: 'Brand Partners' },
  { value: '99.2%', label: 'Satisfaction Rate' },
]

const TEAM = [
  { name: 'Anika Sharma', role: 'Co-Founder & CEO', emoji: '👩‍💼', bio: 'Former beauty industry executive with 12 years of experience. Passionate about making premium beauty accessible to everyone.' },
  { name: 'Rohan Mehta', role: 'Co-Founder & CTO', emoji: '👨‍💻', bio: 'Ex-Amazon engineer who built scalable e-commerce platforms. Believes technology can transform the shopping experience.' },
  { name: 'Priya Nair', role: 'Chief Product Officer', emoji: '👩‍🎨', bio: 'Design thinking expert with a background in UX research. Obsessed with creating delightful customer journeys.' },
  { name: 'Vikram Joshi', role: 'Head of Operations', emoji: '👨‍🔧', bio: 'Supply chain expert who ensures every product reaches you in perfect condition, every time.' },
]

const VALUES = [
  { icon: '🌿', title: 'Sustainability', desc: 'We prioritise eco-friendly packaging and partner with brands that share our commitment to the planet.' },
  { icon: '✅', title: 'Authenticity', desc: 'Every single product on Glam is 100% genuine, sourced directly from brands and authorised distributors.' },
  { icon: '💡', title: 'Innovation', desc: 'We continuously invest in technology to make your shopping experience faster, smarter, and more personalised.' },
  { icon: '❤️', title: 'Customer First', desc: 'Every decision we make starts with one question: does this make our customer\'s life better?' },
  { icon: '🤝', title: 'Inclusivity', desc: 'Beauty is for everyone. We carry products for all skin tones, types, and budgets.' },
  { icon: '🔬', title: 'Expertise', desc: 'Our in-house beauty experts curate collections and provide personalised recommendations.' },
]

export default function AboutPage() {
  return (
    <StaticPageLayout
      title="About Glam"
      subtitle="We're on a mission to make beauty and fashion accessible, authentic, and joyful for everyone."
      breadcrumb={[{ label: 'About Us' }]}
      heroColor="from-pink-50 to-purple-50"
    >
      {/* Mission statement */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-400 rounded-3xl p-8 sm:p-12 text-center text-white mb-12">
        <p className="text-4xl mb-4">✨</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">Our Mission</h2>
        <p className="text-white/90 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          To democratise beauty and fashion — making premium products accessible to every Indian, regardless of where they live or what they earn.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
        {STATS.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5 text-center hover:shadow-md transition-shadow">
            <p className="text-3xl font-extrabold text-pink-500">{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Story */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Our Story</h2>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>
            Glam was born in 2021 in a small apartment in Bengaluru, where two friends — <strong>Anika</strong> and <strong>Rohan</strong> — were frustrated by the same problem: finding authentic beauty products online was a nightmare. Counterfeit products, unreliable sellers, and zero curation.
          </p>
          <p>
            They decided to build the platform they always wished existed — one that put the customer first in every way. Within 6 months of launch, Glam had 10,000 customers. Today, over 2 million people trust Glam for their beauty and fashion needs.
          </p>
          <p>
            We&apos;re proud to be one of India&apos;s fastest-growing beauty-tech startups, but we&apos;re just getting started. Our vision is to become the most trusted and loved beauty destination in Asia.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">What We Stand For</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {VALUES.map((v) => (
            <InfoCard key={v.title} icon={v.icon} title={v.title}>{v.desc}</InfoCard>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Meet the Team</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {TEAM.map((person) => (
            <div key={person.name} className="bg-white rounded-2xl border border-gray-100 p-5 flex gap-4 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                {person.emoji}
              </div>
              <div>
                <p className="font-bold text-gray-900">{person.name}</p>
                <p className="text-xs text-pink-500 font-semibold mb-1.5">{person.role}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{person.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-gray-50 rounded-2xl border border-gray-100 p-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
        <span className="text-4xl">🚀</span>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">Want to join our journey?</h3>
          <p className="text-sm text-gray-500 mt-1">We&apos;re always looking for talented people who share our passion.</p>
        </div>
        <Link to="/careers" className="btn-primary whitespace-nowrap">View Open Roles</Link>
      </div>
    </StaticPageLayout>
  )
}
