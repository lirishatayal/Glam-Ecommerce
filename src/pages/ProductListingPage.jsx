import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import { useFilters } from '../hooks/useFilters'
import { useSearch } from '../hooks/useSearch'
import ProductCard from '../components/common/ProductCard'
import FiltersSidebar from '../components/product/FiltersSidebar'
import SortBar from '../components/product/SortBar'
import { ProductGridSkeleton } from '../components/common/LoadingSkeleton'
import ErrorUI, { EmptyState } from '../components/common/ErrorUI'

export default function ProductListingPage() {
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')
  const searchParam = searchParams.get('search')

  const { products, loading, error, refetch } = useProducts()
  const { query, setQuery, results: searched } = useSearch(products)
  const {
    filtered,
    sortBy, setSortBy,
    priceRange, setPriceRange,
    selectedRating, setSelectedRating,
    selectedCategories, toggleCategory,
    resetFilters,
    SORT_OPTIONS,
  } = useFilters(searched)

  const [showFilters, setShowFilters] = useState(false)

  // Sync URL params to state
  useEffect(() => {
    if (searchParam) setQuery(searchParam)
    else setQuery('')
  }, [searchParam, setQuery])

  useEffect(() => {
    if (categoryParam) {
      const allCategories = ['electronics', "women's clothing", "men's clothing", 'jewelery']
      if (allCategories.includes(categoryParam)) {
        resetFilters()
        toggleCategory(categoryParam)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryParam])

  const handleFilterToggle = useCallback(() => setShowFilters((v) => !v), [])

  // Lock scroll when mobile filter is open
  useEffect(() => {
    document.body.style.overflow = showFilters ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [showFilters])

  const pageTitle = categoryParam
    ? categoryParam.replace(/\b\w/g, (c) => c.toUpperCase())
    : searchParam
    ? `Results for "${searchParam}"`
    : 'All Products'

  return (
    <main className="pt-[104px] md:pt-[116px] min-h-screen">
      {/* Page header */}
      <div className="bg-gradient-to-r from-pink-50 to-rose-50 border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{pageTitle}</h1>
          {!loading && (
            <p className="text-sm text-gray-500 mt-1">{filtered.length} products available</p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search bar */}
        <div className="mb-5">
          <div className="relative max-w-lg">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search within results..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-6">
          {/* Desktop filter sidebar */}
          <div className="hidden md:block w-60 flex-shrink-0">
            <FiltersSidebar
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              selectedCategories={selectedCategories}
              toggleCategory={toggleCategory}
              resetFilters={resetFilters}
              resultCount={filtered.length}
            />
          </div>

          {/* Products area */}
          <div className="flex-1 min-w-0">
            <SortBar
              sortBy={sortBy}
              setSortBy={setSortBy}
              SORT_OPTIONS={SORT_OPTIONS}
              count={filtered.length}
              onFilterToggle={handleFilterToggle}
            />

            {loading && <ProductGridSkeleton count={12} />}
            {error && <ErrorUI message={error} onRetry={refetch} />}

            {!loading && !error && filtered.length === 0 && (
              <EmptyState
                title="No products found"
                description="Try adjusting your filters or search terms."
                action={resetFilters}
                actionLabel="Clear Filters"
              />
            )}

            {!loading && !error && filtered.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-fade-in">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setShowFilters(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl md:hidden max-h-[85vh] overflow-y-auto animate-slide-up">
            <div className="p-1">
              <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto my-3" />
              <FiltersSidebar
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
                resetFilters={resetFilters}
                resultCount={filtered.length}
                onClose={() => setShowFilters(false)}
              />
            </div>
          </div>
        </>
      )}
    </main>
  )
}
