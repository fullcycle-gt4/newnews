import { createContext, useContext, useState, useEffect } from 'react'
import { userService } from '../services/userService.js'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [isLoadingUser, setIsLoadingUser] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadUserData() {
      try {
        const [profileRes, notifRes] = await Promise.all([
          userService.getUserProfile(),
          userService.getUserNotifications(),
        ])

        if (isMounted) {
          if (profileRes.success) setUser(profileRes.data)
          if (notifRes.success) setNotifications(notifRes.data)
        }
      } catch (err) {
        console.error('Erro ao carregar dados do usuário:', err)
      } finally {
        if (isMounted) setIsLoadingUser(false)
      }
    }

    loadUserData()
    return () => {
      isMounted = false
    }
  }, [])

  const handleDismissNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <UserContext.Provider
      value={{
        user,
        notifications,
        isLoadingUser,
        dismissNotification: handleDismissNotification,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser deve ser utilizado dentro de um UserProvider')
  }
  return context
}
