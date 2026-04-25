import { Link } from 'react-router-dom'

const FOOTER_LINKS = {
  'Shop': [
    { label: 'All Products', path: '/products' },
    { label: 'Electronics', path: '/products?category=electronics' },
    { label: "Women's Fashion", path: "/products?category=women's clothing" },
    { label: "Men's Fashion", path: "/products?category=men's clothing" },
    { label: 'Jewellery', path: '/products?category=jewelery' },
  ],
  'Help': [
    { label: 'FAQ', path: '/faq' },
    { label: 'Shipping Policy', path: '/shipping-policy' },
    { label: 'Returns & Refunds', path: '/returns' },
    { label: 'Track Order', path: '/track-order' },
    { label: 'Contact Us', path: '/contact' },
  ],
  'Company': [
    { label: 'About Us', path: '/about' },
    { label: 'Careers', path: '/careers' },
    { label: 'Press', path: '/press' },
    { label: 'Blog', path: '/blog' },
    { label: 'Affiliate Program', path: '/affiliate' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      {/* Newsletter banner */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-400 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white text-xl font-bold">Get exclusive offers in your inbox</h3>
            <p className="text-pink-100 text-sm mt-0.5">Subscribe and save 15% on your first order</p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full sm:w-auto gap-2"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 sm:w-64 px-4 py-2.5 rounded-full text-sm text-gray-800 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-white text-pink-600 font-semibold rounded-full text-sm hover:bg-pink-50 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="text-3xl font-extrabold text-white tracking-tight">
              glam<span className="text-pink-400">.</span>
            </Link>
            <p className="text-sm mt-3 leading-relaxed text-gray-400">
              Your one-stop destination for beauty, skincare, fashion, and lifestyle products.
            </p>
            <div className="flex gap-3 mt-4">
              {['instagram', 'facebook', 'twitter', 'youtube'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 bg-gray-800 hover:bg-pink-500 rounded-full flex items-center justify-center transition-colors duration-200"
                  aria-label={s}
                >
                  <span className="text-sm">{socialEmoji(s)}</span>
                </a>
              ))}
            </div>
            {/* Payment icons */}
            <div className="flex flex-wrap gap-2 mt-5">
              {['💳 Visa', '🏦 UPI', '📱 Wallet', '🎁 COD'].map((p) => (
                <span
                  key={p}
                  className="text-xs bg-gray-800 text-gray-400 px-2.5 py-1 rounded-lg"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-400 hover:text-pink-400 transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p>© {new Date().getFullYear()} Glam. All rights reserved.</p>
            <span className="hidden sm:block text-gray-700">·</span>
            <p>
              Made with <span className="text-pink-400">♥</span> by{' '}
              <span className="text-pink-400 font-semibold tracking-wide">LIRISHA</span>
            </p>
          </div>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-pink-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-pink-400 transition-colors">Terms of Use</Link>
            <Link to="/cookies" className="hover:text-pink-400 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function socialEmoji(name) {
  const map = { instagram: '📸', facebook: '👍', twitter: '🐦', youtube: '▶️' }
  return map[name] || '🔗'
}
