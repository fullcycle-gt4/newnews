import axios from 'axios';
import { APP_CONFIG } from '@/utils';
import { mockAdapter } from '@/mocks';

/**
 * User Data Service layer.
 * Encapsulates HTTP communication with user-related endpoints.
 * Toggles between mock data and real API based on IS_MOCK_MODE config.
 */
const api = axios.create({
  baseURL: APP_CONFIG.API_BASE_URL,
  headers: { Accept: 'application/json' },
});

export const userService = {
  /**
   * Fetches the authenticated user's profile data.
   * @returns {{ success: boolean, data: Object }}
   */
  async getUserProfile() {
    if (APP_CONFIG.IS_MOCK_MODE) return mockAdapter.getUserProfile();
    const { data: res } = await api.get('/user/profile');
    return { success: true, data: res.data ?? res };
  },

  /**
   * Fetches the authenticated user's notifications list.
   * @returns {{ success: boolean, data: Array }}
   */
  async getUserNotifications() {
    if (APP_CONFIG.IS_MOCK_MODE) return mockAdapter.getUserNotifications();
    const { data: res } = await api.get('/user/notifications');
    return { success: true, data: res.data ?? res };
  },
};
