import axios from 'axios'

const BASE_URL = 'https://fakestoreapi.com'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

export const productService = {
  getAllProducts: async () => {
    const { data } = await api.get('/products')
    return data
  },

  getProductById: async (id) => {
    const { data } = await api.get(`/products/${id}`)
    return data
  },

  getProductsByCategory: async (category) => {
    const { data } = await api.get(`/products/category/${encodeURIComponent(category)}`)
    return data
  },

  getAllCategories: async () => {
    const { data } = await api.get('/products/categories')
    return data
  },
}

// Category display names + icons mapping
export const CATEGORY_META = {
  "electronics": { label: "Electronics", emoji: "💻", color: "from-blue-400 to-blue-600" },
  "jewelery": { label: "Jewellery", emoji: "💍", color: "from-yellow-400 to-yellow-600" },
  "men's clothing": { label: "Men's Fashion", emoji: "👔", color: "from-gray-500 to-gray-700" },
  "women's clothing": { label: "Women's Fashion", emoji: "👗", color: "from-pink-400 to-pink-600" },
}

// Compute discounted price (deterministic per product id)
export function computeDiscount(product) {
  const discountPct = 5 + (product.id * 7) % 40
  const mrp = +(product.price * (1 + discountPct / 100)).toFixed(2)
  return { mrp, discountPct }
}
