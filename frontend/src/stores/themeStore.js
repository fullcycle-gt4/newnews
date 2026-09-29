import { create } from 'zustand';

/**
 * Global theme store (Zustand).
 * Manages the dark/light mode state, persists the preference to localStorage,
 * and syncs the Bootstrap data-bs-theme attribute on the document root.
 */
export const useThemeStore = create((set) => {
  /**
   * Reads the initial theme preference from localStorage.
   * Falls back to the system preference via matchMedia.
   * @returns {boolean} true for dark mode, false for light mode
   */
  const getInitialTheme = () => {
    try {
      const savedTheme = localStorage.getItem('nn_theme');
      if (savedTheme !== null) return savedTheme === 'dark';
      return (
        window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
      );
    } catch {
      return false;
    }
  };

  const initialTheme = getInitialTheme();

  // Apply the initial theme to the document root immediately
  document.documentElement.setAttribute(
    'data-bs-theme',
    initialTheme ? 'dark' : 'light',
  );

  return {
    // Current dark mode state
    isDarkMode: initialTheme,

    /**
     * Toggles between dark and light mode.
     * Updates the DOM attribute and persists the choice to localStorage.
     */
    toggleDarkMode: () =>
      set((state) => {
        const newTheme = !state.isDarkMode;
        document.documentElement.setAttribute(
          'data-bs-theme',
          newTheme ? 'dark' : 'light',
        );
        try {
          localStorage.setItem('nn_theme', newTheme ? 'dark' : 'light');
        } catch {}
        return { isDarkMode: newTheme };
      }),
  };
});
