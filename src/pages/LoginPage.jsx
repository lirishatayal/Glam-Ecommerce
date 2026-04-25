import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useUser } from '../context/UserContext'

export default function LoginPage() {
  const { login } = useUser()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from || '/'
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.email) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 6) e.password = 'Minimum 6 characters'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setTimeout(() => {
      login({ name: 'Demo User', email: form.email, avatar: '' })
      setLoading(false)
      navigate(redirectTo)
    }, 1000)
  }

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors((err) => ({ ...err, [field]: '' }))
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="text-4xl font-extrabold text-pink-500 tracking-tight">
            glam<span className="text-gray-800">.</span>
          </Link>
          <p className="text-gray-500 text-sm mt-2">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 animate-slide-up">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Welcome back 👋</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <input
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                placeholder="you@example.com"
                className={`input-base ${errors.email ? 'border-red-400 focus:ring-red-300' : ''}`}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={handleChange('password')}
                placeholder="Min. 6 characters"
                className={`input-base ${errors.password ? 'border-red-400 focus:ring-red-300' : ''}`}
              />
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            {/* Forgot */}
            <div className="flex justify-end">
              <a href="#" className="text-xs text-pink-500 hover:underline font-medium">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-base relative"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-gray-400">or continue with</span>
            </div>
          </div>

          {/* Social logins */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '🔵', label: 'Google' },
              { icon: '🍎', label: 'Apple' },
            ].map((s) => (
              <button
                key={s.label}
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
              >
                <span>{s.icon}</span> {s.label}
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-pink-500 font-semibold hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
