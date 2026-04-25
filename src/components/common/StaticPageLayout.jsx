import { Link } from 'react-router-dom'

export default function StaticPageLayout({ title, subtitle, breadcrumb, children, heroColor = 'from-pink-50 to-rose-50' }) {
  return (
    <main className="pt-[104px] md:pt-[116px] min-h-screen">
      {/* Hero header */}
      <div className={`bg-gradient-to-r ${heroColor} border-b border-pink-100`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {breadcrumb && (
            <nav className="flex items-center gap-2 text-xs text-gray-500 mb-4">
              <Link to="/" className="hover:text-pink-500 transition-colors">Home</Link>
              {breadcrumb.map((crumb, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span>›</span>
                  {crumb.path ? (
                    <Link to={crumb.path} className="hover:text-pink-500 transition-colors">{crumb.label}</Link>
                  ) : (
                    <span className="text-gray-800 font-medium">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">{title}</h1>
          {subtitle && <p className="text-gray-500 mt-2 max-w-xl text-sm sm:text-base">{subtitle}</p>}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {children}
      </div>
    </main>
  )
}

export function ProseSection({ children }) {
  return (
    <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4">
      {children}
    </div>
  )
}

export function SectionHeading({ children }) {
  return <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3 first:mt-0">{children}</h2>
}

export function InfoCard({ icon, title, children, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow duration-200 ${className}`}>
      {icon && <div className="text-3xl mb-3">{icon}</div>}
      {title && <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>}
      <div className="text-sm text-gray-600 leading-relaxed">{children}</div>
    </div>
  )
}
