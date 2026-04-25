import { CATEGORY_META } from '../../services/productService'

const RATINGS = [4, 3, 2, 1]

const ALL_CATEGORIES = Object.keys(CATEGORY_META)

export default function FiltersSidebar({
  priceRange,
  setPriceRange,
  selectedRating,
  setSelectedRating,
  selectedCategories,
  toggleCategory,
  resetFilters,
  resultCount,
  onClose,
}) {
  const hasFilters =
    priceRange[0] > 0 ||
    priceRange[1] < 1000 ||
    selectedRating > 0 ||
    selectedCategories.length > 0

  return (
    <aside className="bg-white rounded-2xl border border-gray-100 p-5 h-fit sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-bold text-gray-900 text-lg">Filters</h2>
          {resultCount !== undefined && (
            <p className="text-xs text-gray-500 mt-0.5">{resultCount} products</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-pink-500 font-semibold hover:underline"
            >
              Clear all
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden text-gray-400 hover:text-gray-600 ml-1"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Category
        </h3>
        <div className="space-y-2">
          {ALL_CATEGORIES.map((cat) => {
            const meta = CATEGORY_META[cat]
            return (
              <label
                key={cat}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="w-4 h-4 rounded border-gray-300 text-pink-500 focus:ring-pink-400 cursor-pointer"
                />
                <span className="text-sm text-gray-600 group-hover:text-pink-500 transition-colors capitalize flex items-center gap-1.5">
                  <span>{meta.emoji}</span> {meta.label}
                </span>
              </label>
            )
          })}
        </div>
      </div>

      <hr className="border-gray-100 mb-5" />

      {/* Price Range */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Price Range
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-medium text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            className="w-full h-1.5 rounded-full appearance-none bg-pink-200 accent-pink-500 cursor-pointer"
          />
          <div className="flex gap-2">
            {[50, 100, 300, 500].map((v) => (
              <button
                key={v}
                onClick={() => setPriceRange([0, v])}
                className={`flex-1 text-xs py-1 rounded-lg border transition-colors ${
                  priceRange[1] === v && priceRange[0] === 0
                    ? 'bg-pink-500 text-white border-pink-500'
                    : 'border-gray-200 text-gray-600 hover:border-pink-300'
                }`}
              >
                ≤${v}
              </button>
            ))}
          </div>
        </div>
      </div>

      <hr className="border-gray-100 mb-5" />

      {/* Rating */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Min Rating
        </h3>
        <div className="space-y-2">
          {RATINGS.map((r) => (
            <label key={r} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="rating"
                checked={selectedRating === r}
                onChange={() => setSelectedRating(selectedRating === r ? 0 : r)}
                className="w-4 h-4 text-pink-500 focus:ring-pink-400 cursor-pointer"
              />
              <span className="flex items-center gap-1 text-sm text-gray-600 group-hover:text-pink-500 transition-colors">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < r ? 'text-yellow-400' : 'text-gray-200'}>★</span>
                ))}
                <span className="ml-1 text-xs text-gray-400">& up</span>
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  )
}
