import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { newsService } from '../services/newsService.js'
import { APP_CONFIG } from '../utils/config.js'

const NavigationContext = createContext(null)

export function NavigationProvider({ children }) {
  const [activeNavId, setActiveNavId] = useState('inicio')
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [navigationItems, setNavigationItems] = useState([])

  useEffect(() => {
    let isMounted = true
    async function loadNavigation() {
      try {
        const res = await newsService.getCategories()
        if (isMounted && res.success && res.navItems) {
          setNavigationItems(res.navItems)
        }
      } catch (err) {
        console.error('Erro ao carregar itens de navegação:', err)
      }
    }
    loadNavigation()
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, APP_CONFIG.DEBOUNCE_SEARCH_MS)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const navSelectedCategory = useMemo(() => {
    if (activeNavId === 'salvos') return 'salvos'
    const activeNavItem = navigationItems.find((item) => item.id === activeNavId)
    return activeNavItem?.category ?? null
  }, [activeNavId, navigationItems])

  const clearSearch = () => setSearchQuery('')

  return (
    <NavigationContext.Provider
      value={{
        activeNavId,
        setActiveNavId,
        searchQuery,
        setSearchQuery,
        debouncedSearchQuery,
        clearSearch,
        navigationItems,
        navSelectedCategory,
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigation deve ser utilizado dentro de um NavigationProvider')
  }
  return context
}
