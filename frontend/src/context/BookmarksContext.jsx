import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useToast } from './ToastContext.jsx'
import { TOAST_MESSAGES } from '../utils/config.js'

const BookmarksContext = createContext(null)

export function BookmarksProvider({ children }) {
  const { showToastNotification } = useToast()

  const [readArticleIds, setReadArticleIds] = useState(() => {
    try {
      const savedReadIds = localStorage.getItem('nn_read_ids')
      return savedReadIds ? new Set(JSON.parse(savedReadIds)) : new Set()
    } catch {
      return new Set()
    }
  })

  const [bookmarkedArticleIds, setBookmarkedArticleIds] = useState(() => {
    try {
      const savedBookmarkIds = localStorage.getItem('nn_bookmark_ids')
      return savedBookmarkIds ? new Set(JSON.parse(savedBookmarkIds)) : new Set()
    } catch {
      return new Set()
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('nn_read_ids', JSON.stringify(Array.from(readArticleIds)))
    } catch {
      // Ignora restrições de privacidade
    }
  }, [readArticleIds])

  useEffect(() => {
    try {
      localStorage.setItem('nn_bookmark_ids', JSON.stringify(Array.from(bookmarkedArticleIds)))
    } catch {
      // Ignora restrições de privacidade
    }
  }, [bookmarkedArticleIds])

  const markArticleAsRead = useCallback((articleId) => {
    setReadArticleIds((prev) => new Set([...prev, articleId]))
  }, [])

  const toggleArticleBookmark = useCallback((articleId) => {
    let isBookmarked = false
    setBookmarkedArticleIds((prev) => {
      const nextSet = new Set(prev)
      if (nextSet.has(articleId)) {
        isBookmarked = true
        nextSet.delete(articleId)
      } else {
        isBookmarked = false
        nextSet.add(articleId)
      }
      return nextSet
    })

    const toastConfig = isBookmarked ? TOAST_MESSAGES.BOOKMARK_REMOVED : TOAST_MESSAGES.BOOKMARK_ADDED
    showToastNotification(toastConfig.message, toastConfig.type, toastConfig.icon)
  }, [showToastNotification])

  return (
    <BookmarksContext.Provider
      value={{
        readArticleIds,
        bookmarkedArticleIds,
        bookmarkedCount: bookmarkedArticleIds.size,
        markArticleAsRead,
        toggleArticleBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  )
}

export function useBookmarks() {
  const context = useContext(BookmarksContext)
  if (!context) {
    throw new Error('useBookmarks deve ser utilizado dentro de um BookmarksProvider')
  }
  return context
}
