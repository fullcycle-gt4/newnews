import { create } from 'zustand'
import { useToastStore } from './toastStore.js'
import { TOAST_MESSAGES } from '@/utils'

export const useBookmarksStore = create((set, get) => {
  const getInitialSet = (key) => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? new Set(JSON.parse(saved)) : new Set()
    } catch {
      return new Set()
    }
  }

  return {
    readArticleIds: getInitialSet('nn_read_ids'),
    bookmarkedArticleIds: getInitialSet('nn_bookmark_ids'),

    markArticleAsRead: (articleId) => set((state) => {
      const nextSet = new Set([...state.readArticleIds, articleId])
      try { localStorage.setItem('nn_read_ids', JSON.stringify(Array.from(nextSet))) } catch {}
      return { readArticleIds: nextSet }
    }),

    toggleArticleBookmark: (articleId) => {
      let isBookmarked = false
      set((state) => {
        const nextSet = new Set(state.bookmarkedArticleIds)
        if (nextSet.has(articleId)) {
          isBookmarked = true
          nextSet.delete(articleId)
        } else {
          isBookmarked = false
          nextSet.add(articleId)
        }
        try { localStorage.setItem('nn_bookmark_ids', JSON.stringify(Array.from(nextSet))) } catch {}
        return { bookmarkedArticleIds: nextSet }
      })

      const toastConfig = isBookmarked ? TOAST_MESSAGES.BOOKMARK_REMOVED : TOAST_MESSAGES.BOOKMARK_ADDED
      useToastStore.getState().showToastNotification(toastConfig.message, toastConfig.type, toastConfig.icon)
    }
  }
})
