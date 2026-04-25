import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white px-4">
      <div className="text-center animate-fade-in">
        <p className="text-8xl mb-4">🛍️</p>
        <h1 className="text-6xl font-extrabold text-pink-500 mb-3">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Page not found</h2>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link to="/" className="btn-primary text-base">
          Back to Home
        </Link>
      </div>
    </main>
  )
}
