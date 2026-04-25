import { useState, useMemo } from 'react'

const SORT_OPTIONS = [
  { value: 'default', label: 'Relevance' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating_desc', label: 'Top Rated' },
  { value: 'newest', label: 'Newest First' },
]

export function useFilters(products) {
  const [sortBy, setSortBy] = useState('default')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedRating, setSelectedRating] = useState(0)
  const [selectedCategories, setSelectedCategories] = useState([])

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  const resetFilters = () => {
    setSortBy('default')
    setPriceRange([0, 1000])
    setSelectedRating(0)
    setSelectedCategories([])
  }

  const filtered = useMemo(() => {
    let result = [...products]

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category))
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    )

    if (selectedRating > 0) {
      result = result.filter((p) => p.rating?.rate >= selectedRating)
    }

    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price_desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating_desc':
        result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
        break
      case 'newest':
        result.sort((a, b) => b.id - a.id)
        break
      default:
        break
    }

    return result
  }, [products, sortBy, priceRange, selectedRating, selectedCategories])

  return {
    filtered,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    selectedRating,
    setSelectedRating,
    selectedCategories,
    toggleCategory,
    resetFilters,
    SORT_OPTIONS,
  }
}
