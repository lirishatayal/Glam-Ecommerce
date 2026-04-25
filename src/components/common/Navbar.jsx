import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useUser } from '../../context/UserContext'
import { useProducts } from '../../hooks/useProducts'
import { useSearch } from '../../hooks/useSearch'

const NAV_LINKS = [
  { label: 'Skincare', path: '/products?category=skincare' },
  { label: 'Makeup', path: '/products?category=makeup' },
  { label: 'Electronics', path: '/products?category=electronics' },
  { label: "Women's", path: "/products?category=women's clothing" },
  { label: "Men's", path: "/products?category=men's clothing" },
  { label: 'Jewellery', path: '/products?category=jewelery' },
]

export default function Navbar() {
  const { cartCount } = useCart()
  const { user, logout, wishlist } = useUser()
  const navigate = useNavigate()
  const location = useLocation()
  const { products } = useProducts()
  const { query, setQuery, results } = useSearch(products)

  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const searchRef = useRef(null)
  const userMenuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
    setSearchFocused(false)
    setQuery('')
  }, [location.pathname, setQuery])

  useEffect(() => {
    function handleClickOutside(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`)
      setSearchFocused(false)
    }
  }

  const handleProductClick = (id) => {
    navigate(`/products/${id}`)
    setSearchFocused(false)
    setQuery('')
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      {/* Top announcement bar */}
      <div className="bg-pink-500 text-white text-xs text-center py-1.5 px-4 font-medium tracking-wide">
        🎉 FREE DELIVERY on orders above ₹499 &nbsp;|&nbsp; Use code{' '}
        <span className="font-bold underline">GLAM20</span> for 20% off
      </div>

      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 text-2xl font-extrabold text-pink-500 tracking-tight select-none"
          >
            glam<span className="text-gray-800">.</span>
          </Link>

          {/* Search bar — desktop */}
          <div ref={searchRef} className="hidden sm:flex flex-1 max-w-xl relative">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  placeholder="Search for products, brands, categories..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent focus:bg-white transition-all duration-200"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => { setQuery(''); setSearchFocused(false) }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </form>

            {/* Search suggestions dropdown */}
            {searchFocused && query.length > 1 && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-fade-in">
                {results.slice(0, 5).length > 0 ? (
                  <>
                    <p className="text-xs text-gray-400 px-4 pt-3 pb-1 font-medium">PRODUCTS</p>
                    {results.slice(0, 5).map((p) => (
                      <button
                        key={p.id}
                        onClick={() => handleProductClick(p.id)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-pink-50 text-left transition-colors"
                      >
                        <img
                          src={p.image}
                          alt=""
                          className="w-10 h-10 object-contain rounded-lg bg-gray-50"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">{p.title}</p>
                          <p className="text-xs text-pink-500 font-semibold">${p.price}</p>
                        </div>
                      </button>
                    ))}
                    <button
                      onClick={handleSearchSubmit}
                      className="w-full text-center text-sm text-pink-500 font-medium py-3 border-t border-gray-100 hover:bg-pink-50 transition-colors"
                    >
                      See all results for &quot;{query}&quot;
                    </button>
                  </>
                ) : (
                  <p className="text-sm text-gray-500 px-4 py-4">No products found for &quot;{query}&quot;</p>
                )}
              </div>
            )}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1 sm:gap-2 ml-auto sm:ml-0">
            {/* Search icon mobile */}
            <button
              className="sm:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => navigate('/products')}
              aria-label="Search"
            >
              <SearchIcon className="w-5 h-5 text-gray-600" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="hidden sm:flex relative p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Wishlist"
            >
              <HeartIcon className="w-5 h-5 text-gray-600" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length > 9 ? '9+' : wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Cart"
            >
              <CartIcon className="w-5 h-5 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-fade-in">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {/* User menu */}
            <div ref={userMenuRef} className="relative">
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex items-center gap-1.5 p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Account"
              >
                <UserIcon className="w-5 h-5 text-gray-600" />
                {user && (
                  <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-[80px] truncate">
                    {user.name?.split(' ')[0]}
                  </span>
                )}
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-fade-in">
                  {user ? (
                    <>
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <Link to="/orders" className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-pink-50 text-gray-700 transition-colors">
                        📦 My Orders
                      </Link>
                      <Link to="/wishlist" className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-pink-50 text-gray-700 transition-colors">
                        💖 Wishlist
                      </Link>
                      <button
                        onClick={() => { logout(); setUserMenuOpen(false) }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-red-50 text-red-500 transition-colors border-t border-gray-100"
                      >
                        🚪 Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-pink-50 text-gray-700 font-medium transition-colors"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-pink-50 text-pink-500 font-semibold transition-colors border-t border-gray-100"
                      >
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <span className="text-lg leading-none">✕</span>
              ) : (
                <MenuIcon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Category nav links — desktop */}
        <nav className="hidden md:flex items-center gap-1 pb-2 border-t border-gray-100 pt-1.5 -mx-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-full transition-all duration-150"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/products"
            className="ml-auto px-3 py-1 text-sm font-semibold text-pink-500 hover:bg-pink-50 rounded-full transition-all duration-150"
          >
            All Products →
          </Link>
        </nav>
      </div>

      {/* Mobile menu drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-slide-up">
          {/* Mobile search */}
          <div className="px-4 py-3">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
            </form>
          </div>
          <nav className="px-4 pb-4 grid grid-cols-2 gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className="px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-pink-500 hover:bg-pink-50 rounded-xl transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/products"
              className="col-span-2 mt-1 px-3 py-2.5 text-sm font-semibold text-pink-500 bg-pink-50 rounded-xl text-center"
            >
              All Products
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

function SearchIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="11" cy="11" r="8" />
      <path strokeLinecap="round" d="m21 21-4.35-4.35" />
    </svg>
  )
}

function CartIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    </svg>
  )
}

function HeartIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  )
}

function UserIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  )
}

function MenuIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  )
}
