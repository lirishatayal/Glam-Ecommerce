import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useToast } from './ToastContext'

const UserContext = createContext(null)

function getInitialUser() {
  try {
    const stored = localStorage.getItem('glam_user')
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

function getInitialWishlist() {
  try {
    const stored = localStorage.getItem('glam_wishlist')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(getInitialUser)
  const [wishlist, setWishlist] = useState(getInitialWishlist)
  const { toast } = useToast()

  useEffect(() => {
    localStorage.setItem('glam_user', JSON.stringify(user))
  }, [user])

  useEffect(() => {
    localStorage.setItem('glam_wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const login = useCallback((userData) => {
    setUser(userData)
    toast({ message: `Welcome back, ${userData.name.split(' ')[0]}! 👋`, type: 'success' })
  }, [toast])

  const logout = useCallback(() => {
    setUser(null)
    toast({ message: 'Signed out successfully', type: 'info' })
  }, [toast])

  const toggleWishlist = useCallback((product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === product.id)
      if (exists) {
        toast({ message: 'Removed from wishlist', type: 'info' })
        return prev.filter((p) => p.id !== product.id)
      }
      toast({ message: '💖 Added to wishlist!', type: 'success' })
      return [...prev, product]
    })
  }, [toast])

  const isWishlisted = useCallback((id) => wishlist.some((p) => p.id === id), [wishlist])

  return (
    <UserContext.Provider value={{ user, login, logout, wishlist, toggleWishlist, isWishlisted }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used inside UserProvider')
  return ctx
}
