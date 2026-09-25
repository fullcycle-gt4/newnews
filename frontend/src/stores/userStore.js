import { create } from 'zustand';
import { userService } from '@/services';

export const useUserStore = create((set) => ({
  user: null,
  notifications: [],
  isLoadingUser: true,

  loadUserData: async () => {
    try {
      const [profileRes, notifRes] = await Promise.all([
        userService.getUserProfile(),
        userService.getUserNotifications(),
      ]);
      set({
        user: profileRes.success ? profileRes.data : null,
        notifications: notifRes.success ? notifRes.data : [],
        isLoadingUser: false,
      });
    } catch (err) {
      console.error('Erro ao carregar dados do usuário:', err);
      set({ isLoadingUser: false });
    }
  },

  clearUser: () => set({ user: null }),

  dismissNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));
