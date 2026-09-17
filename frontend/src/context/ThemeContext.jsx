import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('nn_theme')
      if (savedTheme !== null) return savedTheme === 'dark'
      return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
    } catch {
      return false
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', isDarkMode ? 'dark' : 'light')
    try {
      localStorage.setItem('nn_theme', isDarkMode ? 'dark' : 'light')
    } catch {
      // Ignora restrições de privacidade
    }
  }, [isDarkMode])

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev)

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme deve ser utilizado dentro de um ThemeProvider')
  }
  return context
}
