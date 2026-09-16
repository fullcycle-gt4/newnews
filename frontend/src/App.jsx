import { useState, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Sidebar, { SidebarOffcanvas } from './components/Sidebar/Sidebar.jsx'
import HomePage from './pages/Home/HomePage.jsx'
import ToastContainer from './components/ToastContainer/ToastContainer.jsx'
import { UserProvider } from './hooks/useUser.jsx'
import { newsService } from './services/newsService.js'
import { APP_CONFIG, TOAST_MESSAGES } from './utils/config.js'

function AppContent() {
  const [activeNavId, setActiveNavId] = useState('inicio')
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [toastNotifications, setToastNotifications] = useState([])
  const [navigationItems, setNavigationItems] = useState([])

  // Dynamic fetch of navigation items from backend/mock service
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

  // Persistent Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('nn_theme')
      if (savedTheme !== null) return savedTheme === 'dark'
      return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
    } catch {
      return false
    }
  })

  // Persistent Read Articles Set
  const [readArticleIds, setReadArticleIds] = useState(() => {
    try {
      const savedReadIds = localStorage.getItem('nn_read_ids')
      return savedReadIds ? new Set(JSON.parse(savedReadIds)) : new Set()
    } catch {
      return new Set()
    }
  })

  // Persistent Bookmarked Articles Set
  const [bookmarkedArticleIds, setBookmarkedArticleIds] = useState(() => {
    try {
      const savedBookmarkIds = localStorage.getItem('nn_bookmark_ids')
      return savedBookmarkIds ? new Set(JSON.parse(savedBookmarkIds)) : new Set()
    } catch {
      return new Set()
    }
  })

  // Effect: Sync Theme with DOM & LocalStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', isDarkMode ? 'dark' : 'light')
    try {
      localStorage.setItem('nn_theme', isDarkMode ? 'dark' : 'light')
    } catch {
      // Ignora restrições de privacidade
    }
  }, [isDarkMode])

  // Effect: Persist Read Article IDs
  useEffect(() => {
    try {
      localStorage.setItem('nn_read_ids', JSON.stringify(Array.from(readArticleIds)))
    } catch {
      // Ignora restrições de privacidade
    }
  }, [readArticleIds])

  // Effect: Persist Bookmark Article IDs
  useEffect(() => {
    try {
      localStorage.setItem('nn_bookmark_ids', JSON.stringify(Array.from(bookmarkedArticleIds)))
    } catch {
      // Ignora restrições de privacidade
    }
  }, [bookmarkedArticleIds])

  // Effect: Debounce Search Input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, APP_CONFIG.DEBOUNCE_SEARCH_MS)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Toast Notification System
  const showToastNotification = (message, type = 'info', iconSymbol) => {
    const notificationId = Date.now() + Math.random()
    setToastNotifications((prev) => [...prev, { id: notificationId, message, type, icon: iconSymbol }])
    setTimeout(() => {
      setToastNotifications((prev) => prev.filter((t) => t.id !== notificationId))
    }, APP_CONFIG.TOAST_AUTO_DISMISS_MS)
  }

  const handleDismissToast = (notificationId) => {
    setToastNotifications((prev) => prev.filter((t) => t.id !== notificationId))
  }

  // User Handlers
  const handleToggleDarkMode = () => {
    const nextMode = !isDarkMode
    setIsDarkMode(nextMode)
    const toastConfig = nextMode ? TOAST_MESSAGES.DARK_MODE_ON : TOAST_MESSAGES.DARK_MODE_OFF
    showToastNotification(toastConfig.message, toastConfig.type, toastConfig.icon)
  }

  const handleMarkArticleAsRead = (articleId) => {
    setReadArticleIds((prev) => new Set([...prev, articleId]))
  }

  const handleToggleArticleBookmark = (articleId) => {
    const isBookmarked = bookmarkedArticleIds.has(articleId)
    setBookmarkedArticleIds((prev) => {
      const nextSet = new Set(prev)
      if (isBookmarked) {
        nextSet.delete(articleId)
      } else {
        nextSet.add(articleId)
      }
      return nextSet
    })

    const toastConfig = isBookmarked ? TOAST_MESSAGES.BOOKMARK_REMOVED : TOAST_MESSAGES.BOOKMARK_ADDED
    showToastNotification(toastConfig.message, toastConfig.type, toastConfig.icon)
  }

  let navSelectedCategory = null
  if (activeNavId === 'salvos') {
    navSelectedCategory = 'salvos'
  } else {
    const activeNavItem = navigationItems.find((item) => item.id === activeNavId)
    navSelectedCategory = activeNavItem?.category ?? null
  }

  return (
    <div className="vh-100 d-flex flex-column overflow-hidden">
      <Navbar
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onShowToastNotification={showToastNotification}
      />

      <SidebarOffcanvas
        navigationItems={navigationItems}
        activeNavId={activeNavId}
        onSelectNavItem={setActiveNavId}
        bookmarkedArticlesCount={bookmarkedArticleIds.size}
      />

      <div className="d-flex flex-grow-1 min-vh-0 overflow-hidden">
        <Sidebar
          navigationItems={navigationItems}
          activeNavId={activeNavId}
          onSelectNavItem={setActiveNavId}
          bookmarkedArticlesCount={bookmarkedArticleIds.size}
        />
        <HomePage
          navSelectedCategory={navSelectedCategory}
          searchQuery={debouncedSearchQuery}
          onClearSearch={() => setSearchQuery('')}
          readArticleIds={readArticleIds}
          bookmarkedArticleIds={bookmarkedArticleIds}
          onMarkArticleAsRead={handleMarkArticleAsRead}
          onToggleArticleBookmark={handleToggleArticleBookmark}
          onShowToastNotification={showToastNotification}
        />
      </div>

      <ToastContainer toastNotifications={toastNotifications} onDismissToast={handleDismissToast} />
    </div>
  )
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  )
}
