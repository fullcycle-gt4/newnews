import { create } from 'zustand';
import { APP_CONFIG } from '@/utils';

export const useToastStore = create((set, get) => ({
  toastNotifications: [],
  timers: new Map(),

  dismissToast: (notificationId) => {
    const state = get();
    if (state.timers.has(notificationId)) {
      clearTimeout(state.timers.get(notificationId));
      state.timers.delete(notificationId);
    }
    set({
      toastNotifications: state.toastNotifications.filter(
        (t) => t.id !== notificationId,
      ),
    });
  },

  showToastNotification: (message, type = 'info', iconSymbol) => {
    const notificationId = Date.now() + Math.random();
    set((state) => ({
      toastNotifications: [
        ...state.toastNotifications,
        { id: notificationId, message, type, icon: iconSymbol },
      ],
    }));

    const timerId = setTimeout(() => {
      get().dismissToast(notificationId);
    }, APP_CONFIG.TOAST_AUTO_DISMISS_MS);

    get().timers.set(notificationId, timerId);
  },
}));
