import { create } from 'zustand';
import { APP_CONFIG } from '@/utils';

/**
 * Global toast notification store (Zustand).
 * Manages a list of temporary toast messages displayed to the user.
 * Each toast auto-dismisses after a configured timeout.
 */
export const useToastStore = create((set, get) => ({
  // Active toast notifications currently visible on screen
  toastNotifications: [],

  // Internal map of toast IDs to their auto-dismiss timer IDs
  timers: new Map(),

  /**
   * Manually dismisses a toast by its ID and clears its auto-dismiss timer.
   * @param {number} notificationId - The ID of the toast to dismiss
   */
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

  /**
   * Adds a new toast notification and schedules its auto-dismissal.
   * @param {string} message - The text content of the toast
   * @param {'info'|'success'|'error'|'warning'} [type='info'] - The visual style of the toast
   * @param {string} [iconSymbol] - Optional emoji or icon to display in the toast
   */
  showToastNotification: (message, type = 'info', iconSymbol) => {
    const notificationId = Date.now() + Math.random();

    // Add the new toast to the list
    set((state) => ({
      toastNotifications: [
        ...state.toastNotifications,
        { id: notificationId, message, type, icon: iconSymbol },
      ],
    }));

    // Schedule auto-dismissal after the configured timeout
    const timerId = setTimeout(() => {
      get().dismissToast(notificationId);
    }, APP_CONFIG.TOAST_AUTO_DISMISS_MS);

    get().timers.set(notificationId, timerId);
  },
}));
