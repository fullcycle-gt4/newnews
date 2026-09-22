import { create } from 'zustand';
import { newsService } from '@/services';

export const useNavigationStore = create((set, get) => ({
  activeNavId: 'inicio',
  searchQuery: '',
  debouncedSearchQuery: '',
  navigationItems: [],

  setActiveNavId: (id) => set({ activeNavId: id }),
  setSearchQuery: (query) => {
    set({ searchQuery: query });
    // In Context, there was a debounce logic in useEffect. We can do it simple here or in the component.
    // It's cleaner to handle debounce here using a timeout, just like Context did.
    const state = get();
    if (state.debounceTimer) clearTimeout(state.debounceTimer);
    const timer = setTimeout(() => {
      set({ debouncedSearchQuery: query });
    }, 500); // APP_CONFIG.DEBOUNCE_SEARCH_MS
    set({ debounceTimer: timer });
  },
  clearSearch: () => set({ searchQuery: '', debouncedSearchQuery: '' }),

  loadNavigation: async () => {
    try {
      const res = await newsService.getCategories();
      if (res.success && res.navItems) {
        set({ navigationItems: res.navItems });
      }
    } catch (err) {
      console.error('Erro ao carregar itens de navegação:', err);
    }
  },
}));

export const selectNavCategory = (state) => {
  if (state.activeNavId === 'salvos') return 'salvos';
  const activeNavItem = state.navigationItems.find(
    (item) => item.id === state.activeNavId,
  );
  return activeNavItem?.category ?? null;
};
