import { useState, useEffect, useCallback } from 'react'

const KEY = 'glam_recently_viewed'
const MAX = 8

function getStored() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function useRecentlyViewed() {
  const [items, setItems] = useState(getStored)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items))
  }, [items])

  const addProduct = useCallback((product) => {
    setItems((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id)
      return [product, ...filtered].slice(0, MAX)
    })
  }, [])

  const clear = useCallback(() => setItems([]), [])

  return { items, addProduct, clear }
}
