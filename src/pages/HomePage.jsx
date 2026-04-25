import { useProducts } from '../hooks/useProducts'
import HeroCarousel from '../components/home/HeroCarousel'
import CategoryGrid from '../components/home/CategoryGrid'
import FeaturedProducts from '../components/home/FeaturedProducts'
import PromoBanners from '../components/home/PromoBanners'
import RecentlyViewed from '../components/home/RecentlyViewed'

export default function HomePage() {
  const { products, loading, error, refetch } = useProducts()

  const topRated = [...products].sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
  const electronics = products.filter((p) => p.category === 'electronics')
  const fashion = products.filter(
    (p) => p.category === "women's clothing" || p.category === "men's clothing"
  )

  return (
    <main className="pt-[104px] md:pt-[116px]">
      <HeroCarousel />
      <CategoryGrid />
      <PromoBanners />

      <FeaturedProducts
        products={topRated}
        loading={loading}
        error={error}
        onRetry={refetch}
        title="Top Rated Products"
        subtitle="Loved by thousands of customers"
      />

      <div className="bg-gray-50">
        <FeaturedProducts
          products={electronics}
          loading={loading}
          error={error}
          onRetry={refetch}
          title="Electronics Deals"
          subtitle="Best prices on gadgets & tech"
        />
      </div>

      <FeaturedProducts
        products={fashion}
        loading={loading}
        error={error}
        onRetry={refetch}
        title="Fashion Picks"
        subtitle="Trending styles for him & her"
      />

      <div className="bg-gray-50">
        <RecentlyViewed />
      </div>
    </main>
  )
}
