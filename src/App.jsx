import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext'
import { CartProvider } from './context/CartContext'
import { UserProvider } from './context/UserContext'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import ScrollToTop from './components/common/ScrollToTop'
import ProtectedRoute from './components/common/ProtectedRoute'
import { ProductGridSkeleton } from './components/common/LoadingSkeleton'

const HomePage = lazy(() => import('./pages/HomePage'))
const ProductListingPage = lazy(() => import('./pages/ProductListingPage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const SignupPage = lazy(() => import('./pages/SignupPage'))
const WishlistPage = lazy(() => import('./pages/WishlistPage'))
const OrdersPage = lazy(() => import('./pages/OrdersPage'))
const OrderDetailPage = lazy(() => import('./pages/OrderDetailPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

// Static / footer pages
const FAQPage = lazy(() => import('./pages/static/FAQPage'))
const ShippingPolicyPage = lazy(() => import('./pages/static/ShippingPolicyPage'))
const ReturnsPage = lazy(() => import('./pages/static/ReturnsPage'))
const TrackOrderPage = lazy(() => import('./pages/static/TrackOrderPage'))
const ContactPage = lazy(() => import('./pages/static/ContactPage'))
const AboutPage = lazy(() => import('./pages/static/AboutPage'))
const CareersPage = lazy(() => import('./pages/static/CareersPage'))
const PressPage = lazy(() => import('./pages/static/PressPage'))
const BlogPage = lazy(() => import('./pages/static/BlogPage'))
const AffiliatePage = lazy(() => import('./pages/static/AffiliatePage'))
const PrivacyPolicyPage = lazy(() => import('./pages/static/LegalPage').then(m => ({ default: m.PrivacyPolicyPage })))
const TermsPage = lazy(() => import('./pages/static/LegalPage').then(m => ({ default: m.TermsPage })))
const CookiePolicyPage = lazy(() => import('./pages/static/LegalPage').then(m => ({ default: m.CookiePolicyPage })))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-32 pb-10 px-4">
      <div className="w-full max-w-7xl">
        <ProductGridSkeleton count={8} />
      </div>
    </div>
  )
}

function AppLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <UserProvider>
        <CartProvider>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Auth pages — full-screen, no nav/footer */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Main app with shared layout */}
              <Route path="/" element={<AppLayout><HomePage /></AppLayout>} />
              <Route path="/products" element={<AppLayout><ProductListingPage /></AppLayout>} />
              <Route path="/products/:id" element={<AppLayout><ProductDetailPage /></AppLayout>} />
              <Route path="/cart" element={<AppLayout><CartPage /></AppLayout>} />
              <Route path="/checkout" element={<AppLayout><ProtectedRoute><CheckoutPage /></ProtectedRoute></AppLayout>} />
              <Route path="/wishlist" element={<AppLayout><ProtectedRoute><WishlistPage /></ProtectedRoute></AppLayout>} />
              <Route path="/orders" element={<AppLayout><ProtectedRoute><OrdersPage /></ProtectedRoute></AppLayout>} />
              <Route path="/orders/:id" element={<AppLayout><ProtectedRoute><OrderDetailPage /></ProtectedRoute></AppLayout>} />

              {/* Help pages */}
              <Route path="/faq" element={<AppLayout><FAQPage /></AppLayout>} />
              <Route path="/shipping-policy" element={<AppLayout><ShippingPolicyPage /></AppLayout>} />
              <Route path="/returns" element={<AppLayout><ReturnsPage /></AppLayout>} />
              <Route path="/track-order" element={<AppLayout><TrackOrderPage /></AppLayout>} />
              <Route path="/contact" element={<AppLayout><ContactPage /></AppLayout>} />

              {/* Company pages */}
              <Route path="/about" element={<AppLayout><AboutPage /></AppLayout>} />
              <Route path="/careers" element={<AppLayout><CareersPage /></AppLayout>} />
              <Route path="/press" element={<AppLayout><PressPage /></AppLayout>} />
              <Route path="/blog" element={<AppLayout><BlogPage /></AppLayout>} />
              <Route path="/affiliate" element={<AppLayout><AffiliatePage /></AppLayout>} />

              {/* Legal pages */}
              <Route path="/privacy-policy" element={<AppLayout><PrivacyPolicyPage /></AppLayout>} />
              <Route path="/terms" element={<AppLayout><TermsPage /></AppLayout>} />
              <Route path="/cookies" element={<AppLayout><CookiePolicyPage /></AppLayout>} />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </CartProvider>
      </UserProvider>
    </ToastProvider>
  )
}
