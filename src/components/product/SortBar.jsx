export default function SortBar({ sortBy, setSortBy, SORT_OPTIONS, count, onFilterToggle }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
      <div className="flex items-center gap-2">
        {/* Mobile filter toggle */}
        <button
          onClick={onFilterToggle}
          className="md:hidden flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:border-pink-300 hover:text-pink-500 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591L15.75 12.5v5.25a2.25 2.25 0 0 1-1.08 1.927l-3 1.8A.75.75 0 0 1 10.5 21v-8.5L3.659 7.41A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
          </svg>
          Filters
        </button>

        {count !== undefined && (
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-900">{count}</span> products found
          </p>
        )}
      </div>

      {/* Sort dropdown */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-500 font-medium whitespace-nowrap">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent cursor-pointer hover:border-pink-300 transition-colors"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
