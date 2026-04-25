import { useState } from 'react'
import StaticPageLayout from '../../components/common/StaticPageLayout'

const JOBS = [
  { id: 1, title: 'Senior Frontend Engineer', dept: 'Engineering', location: 'Bengaluru', type: 'Full-time', experience: '4–7 yrs', skills: ['React', 'TypeScript', 'Tailwind CSS', 'GraphQL'] },
  { id: 2, title: 'Backend Engineer (Node.js)', dept: 'Engineering', location: 'Bengaluru / Remote', type: 'Full-time', experience: '3–6 yrs', skills: ['Node.js', 'PostgreSQL', 'Redis', 'AWS'] },
  { id: 3, title: 'Product Manager — Growth', dept: 'Product', location: 'Bengaluru', type: 'Full-time', experience: '3–5 yrs', skills: ['Product Strategy', 'A/B Testing', 'Analytics', 'User Research'] },
  { id: 4, title: 'UX Designer', dept: 'Design', location: 'Bengaluru', type: 'Full-time', experience: '2–4 yrs', skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'] },
  { id: 5, title: 'Content & Beauty Editor', dept: 'Marketing', location: 'Mumbai / Remote', type: 'Full-time', experience: '2–4 yrs', skills: ['Beauty Knowledge', 'Copywriting', 'SEO', 'Social Media'] },
  { id: 6, title: 'Data Analyst', dept: 'Analytics', location: 'Bengaluru / Remote', type: 'Full-time', experience: '2–4 yrs', skills: ['SQL', 'Python', 'Tableau', 'Statistics'] },
  { id: 7, title: 'Supply Chain Executive', dept: 'Operations', location: 'Bengaluru', type: 'Full-time', experience: '1–3 yrs', skills: ['Logistics', 'Vendor Management', 'Excel', 'ERP'] },
  { id: 8, title: 'Customer Experience Associate', dept: 'Support', location: 'Remote', type: 'Full-time', experience: '0–2 yrs', skills: ['Communication', 'CRM', 'Problem Solving'] },
]

const DEPARTMENTS = ['All', ...new Set(JOBS.map((j) => j.dept))]

const PERKS = [
  { icon: '🏥', title: 'Health Insurance', desc: 'Comprehensive family health cover' },
  { icon: '🏠', title: 'Remote-Friendly', desc: 'Flexible hybrid work options' },
  { icon: '📚', title: 'Learning Budget', desc: '₹50K/year for courses & books' },
  { icon: '💰', title: 'ESOPs', desc: 'Own a piece of what you build' },
  { icon: '🍕', title: 'Free Lunch', desc: 'Daily catered meals at office' },
  { icon: '🧖', title: 'Glam Credits', desc: '₹5K/month on any Glam product' },
]

export default function CareersPage() {
  const [activeDept, setActiveDept] = useState('All')
  const [expandedJob, setExpandedJob] = useState(null)

  const filtered = activeDept === 'All' ? JOBS : JOBS.filter((j) => j.dept === activeDept)

  return (
    <StaticPageLayout
      title="Careers at Glam"
      subtitle="Join a fast-growing team that's redefining how India shops for beauty and fashion."
      breadcrumb={[{ label: 'Careers' }]}
      heroColor="from-violet-50 to-pink-50"
    >
      {/* Culture banner */}
      <div className="grid sm:grid-cols-3 gap-4 mb-12">
        {[
          { emoji: '🚀', heading: 'Move Fast', desc: 'We ship features weekly and iterate based on real user feedback.' },
          { emoji: '🧠', heading: 'Learn Constantly', desc: 'Every Glammer gets a personal learning budget and mentorship.' },
          { emoji: '🎯', heading: 'Own Your Work', desc: 'No micromanagement. You set goals, you own outcomes.' },
        ].map((c) => (
          <div key={c.heading} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">{c.emoji}</div>
            <h3 className="font-bold text-gray-900 mb-1">{c.heading}</h3>
            <p className="text-sm text-gray-500">{c.desc}</p>
          </div>
        ))}
      </div>

      {/* Perks */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Perks & Benefits</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {PERKS.map((p) => (
            <div key={p.title} className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 p-4 hover:border-pink-200 transition-colors">
              <span className="text-2xl">{p.icon}</span>
              <div>
                <p className="text-sm font-semibold text-gray-800">{p.title}</p>
                <p className="text-xs text-gray-500">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Job listings */}
      <section>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <h2 className="text-2xl font-bold text-gray-900">Open Positions ({filtered.length})</h2>
          <div className="flex flex-wrap gap-2">
            {DEPARTMENTS.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDept(d)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  activeDept === d ? 'bg-pink-500 border-pink-500 text-white' : 'border-gray-200 text-gray-600 hover:border-pink-300'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((job) => (
            <div key={job.id} className="bg-white rounded-2xl border border-gray-100 hover:border-pink-200 hover:shadow-md transition-all duration-200">
              <button
                onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                className="w-full flex flex-wrap items-center justify-between gap-3 p-5 text-left"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900">{job.title}</p>
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    <span className="text-xs text-pink-500 font-medium bg-pink-50 px-2 py-0.5 rounded-full">{job.dept}</span>
                    <span className="text-xs text-gray-500">📍 {job.location}</span>
                    <span className="text-xs text-gray-500">⏱ {job.type}</span>
                    <span className="text-xs text-gray-500">💼 {job.experience}</span>
                  </div>
                </div>
                <span className={`text-gray-400 transition-transform duration-200 flex-shrink-0 ${expandedJob === job.id ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {expandedJob === job.id && (
                <div className="px-5 pb-5 border-t border-gray-100 pt-4 animate-fade-in">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((s) => (
                      <span key={s} className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg font-medium">{s}</span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    We&apos;re looking for a talented {job.title} to join our {job.dept} team. You&apos;ll work closely with cross-functional teams to build products used by millions of Indians every day.
                  </p>
                  <button className="btn-primary text-sm px-6">Apply Now →</button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No roles match */}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-4xl mb-2">🔍</p>
            <p>No openings in this department right now.</p>
          </div>
        )}

        <div className="mt-8 bg-pink-50 rounded-2xl border border-pink-100 p-6 text-center">
          <p className="font-semibold text-gray-800 mb-1">Don&apos;t see a role that fits?</p>
          <p className="text-sm text-gray-500 mb-4">Send us your resume and we&apos;ll keep you in mind for future openings.</p>
          <button className="btn-outline text-sm">Send Open Application</button>
        </div>
      </section>
    </StaticPageLayout>
  )
}
