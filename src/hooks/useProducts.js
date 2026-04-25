import { useState, useEffect, useCallback } from 'react'
import { productService } from '../services/productService'

export function useProducts(category = null) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = category
        ? await productService.getProductsByCategory(category)
        : await productService.getAllProducts()
      setProducts(data)
    } catch (err) {
      setError(err.message || 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }, [category])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return { products, loading, error, refetch: fetchProducts }
}

export function useProduct(id) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    productService
      .getProductById(id)
      .then(setProduct)
      .catch((err) => setError(err.message || 'Failed to load product'))
      .finally(() => setLoading(false))
  }, [id])

  return { product, loading, error }
}

export function useCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    productService
      .getAllCategories()
      .then(setCategories)
      .catch(() => setCategories([]))
      .finally(() => setLoading(false))
  }, [])

  return { categories, loading }
}
