import { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { useToast } from './ToastContext'

const CartContext = createContext(null)

const ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QTY: 'UPDATE_QTY',
  CLEAR_CART: 'CLEAR_CART',
}

function cartReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_ITEM: {
      const existing = state.find((i) => i.id === action.payload.id)
      if (existing) {
        return state.map((i) =>
          i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...state, { ...action.payload, quantity: 1 }]
    }
    case ACTIONS.REMOVE_ITEM:
      return state.filter((i) => i.id !== action.payload)
    case ACTIONS.UPDATE_QTY:
      if (action.payload.qty < 1) return state.filter((i) => i.id !== action.payload.id)
      return state.map((i) =>
        i.id === action.payload.id ? { ...i, quantity: action.payload.qty } : i
      )
    case ACTIONS.CLEAR_CART:
      return []
    default:
      return state
  }
}

function getInitialCart() {
  try {
    const stored = localStorage.getItem('glam_cart')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [cartItems, dispatch] = useReducer(cartReducer, [], getInitialCart)
  const { toast } = useToast()

  useEffect(() => {
    localStorage.setItem('glam_cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = useCallback((product) => {
    dispatch({ type: ACTIONS.ADD_ITEM, payload: product })
    toast({ message: `"${product.title.slice(0, 30)}..." added to bag 🛍️`, type: 'success' })
  }, [toast])

  const removeFromCart = useCallback((id, title) => {
    dispatch({ type: ACTIONS.REMOVE_ITEM, payload: id })
    if (title) toast({ message: 'Item removed from bag', type: 'info' })
  }, [toast])

  const updateQuantity = useCallback((id, qty) => {
    dispatch({ type: ACTIONS.UPDATE_QTY, payload: { id, qty } })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_CART })
    toast({ message: 'Cart cleared', type: 'info' })
  }, [toast])

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0)
  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ cartItems, cartCount, cartTotal, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
