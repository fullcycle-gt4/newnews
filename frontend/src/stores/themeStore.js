import { create } from 'zustand';

export const useThemeStore = create((set) => {
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
  document.documentElement.setAttribute(
    'data-bs-theme',
    initialTheme ? 'dark' : 'light',
  );

  return {
    isDarkMode: initialTheme,
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
