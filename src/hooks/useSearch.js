import { useState, useMemo } from 'react'

export function useSearch(products) {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    if (!query.trim()) return products
    const q = query.toLowerCase()
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    )
  }, [products, query])

  return { query, setQuery, results }
}
