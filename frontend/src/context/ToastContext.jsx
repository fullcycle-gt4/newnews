import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'
import { APP_CONFIG } from '../utils/config.js'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toastNotifications, setToastNotifications] = useState([])
  const timersRef = useRef(new Map())

  useEffect(() => {
    const activeTimers = timersRef.current
    return () => {
      activeTimers.forEach((timerId) => clearTimeout(timerId))
      activeTimers.clear()
    }
  }, [])

  const dismissToast = useCallback((notificationId) => {
    if (timersRef.current.has(notificationId)) {
      clearTimeout(timersRef.current.get(notificationId))
      timersRef.current.delete(notificationId)
    }
    setToastNotifications((prev) => prev.filter((t) => t.id !== notificationId))
  }, [])

  const showToastNotification = useCallback(
    (message, type = 'info', iconSymbol) => {
      const notificationId = Date.now() + Math.random()
      setToastNotifications((prev) => [...prev, { id: notificationId, message, type, icon: iconSymbol }])

      const timerId = setTimeout(() => {
        dismissToast(notificationId)
      }, APP_CONFIG.TOAST_AUTO_DISMISS_MS)

      timersRef.current.set(notificationId, timerId)
    },
    [dismissToast]
  )

  return (
    <ToastContext.Provider value={{ toastNotifications, showToastNotification, dismissToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast deve ser utilizado dentro de um ToastProvider')
  }
  return context
}
