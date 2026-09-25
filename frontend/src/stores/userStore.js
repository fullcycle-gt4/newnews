import { create } from 'zustand';
import { userService } from '@/services';

export const useUserStore = create((set) => ({
  // Usuário atualmente logado
  user: null,

  // Notificações do usuário
  notifications: [],

  // Indica se os dados do usuário ainda estão carregando
  isLoadingUser: true,

  // ==========================================
  // CARREGAR DADOS DO USUÁRIO
  // ==========================================
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

      set({
        isLoadingUser: false,
      });
    }
  },

  // ==========================================
  // SAIR DA CONTA
  // ==========================================
  logout: () => {
    set({
      user: null,
      notifications: [],
    });
  },

  // ==========================================
  // DISPENSAR NOTIFICAÇÃO
  // ==========================================
  dismissNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));
