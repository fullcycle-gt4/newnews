import { create } from 'zustand';

import { userService } from '@/services';

export const useUserStore = create((set) => ({
  // ==========================================
  // USUÁRIO
  // ==========================================

  // null = visitante
  // objeto = usuário logado
  user: null,

  // ==========================================
  // CARREGAMENTO
  // ==========================================

  isLoadingUser: false,

  // ==========================================
  // NOTIFICAÇÕES
  // ==========================================

  notifications: [],

  // ==========================================
  // LOGIN
  // ==========================================

  login: (userData) => {
    set({
      user: userData,
    });
  },

  // ==========================================
  // LOGOUT
  // ==========================================

  logout: () => {
    set({
      user: null,
      notifications: [],
    });
  },

  // ==========================================
  // CARREGAR DADOS DO USUÁRIO
  // ==========================================

  loadUserData: async () => {
    set({
      isLoadingUser: true,
    });

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

      set({
        user: null,
        isLoadingUser: false,
      });
    }
  },

  // ==========================================
  // LIMPAR USUÁRIO
  // ==========================================

  clearUser: () => set({ user: null }),

  // ==========================================
  // FECHAR NOTIFICAÇÃO
  // ==========================================

  dismissNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id,
      ),
    })),
}));