import { createContext, useContext, useState, useCallback, useRef } from 'react'

const ToastContext = createContext(null)

const ICONS = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
  warning: '⚠',
}

const STYLES = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
  warning: 'bg-orange-500',
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timers = useRef({})

  const dismiss = useCallback((id) => {
    clearTimeout(timers.current[id])
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback(
    ({ message, type = 'success', duration = 3000 }) => {
      const id = Date.now().toString()
      setToasts((prev) => [...prev.slice(-4), { id, message, type }])
      timers.current[id] = setTimeout(() => dismiss(id), duration)
      return id
    },
    [dismiss]
  )

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast container */}
      <div
        aria-live="polite"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 items-center pointer-events-none w-full px-4 sm:w-auto sm:left-auto sm:right-6 sm:translate-x-0 sm:items-end"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-white text-sm font-medium shadow-2xl pointer-events-auto animate-slide-up max-w-xs sm:max-w-sm ${STYLES[t.type]}`}
          >
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold flex-shrink-0">
              {ICONS[t.type]}
            </span>
            <span className="flex-1">{t.message}</span>
            <button
              onClick={() => dismiss(t.id)}
              className="text-white/70 hover:text-white text-xs ml-1 flex-shrink-0"
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx
}
