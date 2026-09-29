import { create } from 'zustand';
import { useToastStore } from './toastStore.js';
import { TOAST_MESSAGES } from '@/utils';

/**
 * Global bookmarks store (Zustand).
 * Persists read article IDs and bookmarked article IDs to localStorage,
 * so the state survives page reloads.
 */
export const useBookmarksStore = create((set, get) => {
  /**
   * Reads a Set of IDs from localStorage by key.
   * Returns an empty Set on error or if the key is missing.
   * @param {string} key - The localStorage key to read from
   * @returns {Set}
   */
  const getInitialSet = (key) => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  };

  return {
    // Set of article IDs that have been read
    readArticleIds: getInitialSet('nn_read_ids'),

    // Set of article IDs that are bookmarked
    bookmarkedArticleIds: getInitialSet('nn_bookmark_ids'),

    /**
     * Marks an article as read and persists the updated set to localStorage
     * @param {number|string} articleId - The ID of the article to mark as read
     */
    markArticleAsRead: (articleId) =>
      set((state) => {
        const nextSet = new Set([...state.readArticleIds, articleId]);
        try {
          localStorage.setItem('nn_read_ids', JSON.stringify(Array.from(nextSet)));
        } catch {}
        return { readArticleIds: nextSet };
      }),

    /**
     * Toggles the bookmark state for an article.
     * Persists the result to localStorage and shows a toast notification.
     * @param {number|string} articleId - The ID of the article to bookmark/unbookmark
     */
    toggleArticleBookmark: (articleId) => {
      let isBookmarked = false;
      set((state) => {
        const nextSet = new Set(state.bookmarkedArticleIds);
        if (nextSet.has(articleId)) {
          isBookmarked = true;
          nextSet.delete(articleId);
        } else {
          isBookmarked = false;
          nextSet.add(articleId);
        }
        try {
          localStorage.setItem('nn_bookmark_ids', JSON.stringify(Array.from(nextSet)));
        } catch {}
        return { bookmarkedArticleIds: nextSet };
      });

      // Show feedback toast after toggling
      const toastConfig = isBookmarked
        ? TOAST_MESSAGES.BOOKMARK_REMOVED
        : TOAST_MESSAGES.BOOKMARK_ADDED;
      useToastStore
        .getState()
        .showToastNotification(toastConfig.message, toastConfig.type, toastConfig.icon);
    },
  };
});
