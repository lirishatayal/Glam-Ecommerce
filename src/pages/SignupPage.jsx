import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useUser } from '../context/UserContext'

export default function SignupPage() {
  const { login } = useUser()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from || '/'
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 6) e.password = 'Minimum 6 characters'
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match'
    if (!agreed) e.agreed = 'You must agree to the terms'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setTimeout(() => {
      login({ name: form.name, email: form.email, avatar: '' })
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
          <p className="text-gray-500 text-sm mt-2">Create your free account</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 animate-slide-up">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Join Glam ✨</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
              <input
                type="text"
                value={form.name}
                onChange={handleChange('name')}
                placeholder="Your name"
                className={`input-base ${errors.name ? 'border-red-400 focus:ring-red-300' : ''}`}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

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

            {/* Confirm */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm password</label>
              <input
                type="password"
                value={form.confirm}
                onChange={handleChange('confirm')}
                placeholder="Re-enter password"
                className={`input-base ${errors.confirm ? 'border-red-400 focus:ring-red-300' : ''}`}
              />
              {errors.confirm && <p className="text-xs text-red-500 mt-1">{errors.confirm}</p>}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => {
                    setAgreed(e.target.checked)
                    if (errors.agreed) setErrors((err) => ({ ...err, agreed: '' }))
                  }}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-pink-500 focus:ring-pink-400"
                />
                <span className="text-sm text-gray-600">
                  I agree to Glam&apos;s{' '}
                  <a href="#" className="text-pink-500 hover:underline">Terms of Service</a>{' '}
                  and{' '}
                  <a href="#" className="text-pink-500 hover:underline">Privacy Policy</a>
                </span>
              </label>
              {errors.agreed && <p className="text-xs text-red-500 mt-1">{errors.agreed}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-base"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-pink-500 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
