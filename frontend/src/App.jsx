import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import { NavigationProvider } from './context/NavigationContext.jsx'
import { BookmarksProvider } from './context/BookmarksContext.jsx'
import HomePage from './pages/Home/HomePage.jsx'

export default function App() {
  return (
    <ErrorBoundary>
      <UserProvider>
        <ThemeProvider>
          <ToastProvider>
            <NavigationProvider>
              <BookmarksProvider>
                <HomePage />
              </BookmarksProvider>
            </NavigationProvider>
          </ToastProvider>
        </ThemeProvider>
      </UserProvider>
    </ErrorBoundary>
  )
}
