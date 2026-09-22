import axios from 'axios';
import { APP_CONFIG } from '@/utils';
import { mockAdapter } from '@/mocks';

const api = axios.create({
  baseURL: APP_CONFIG.API_BASE_URL,
  headers: { Accept: 'application/json' },
});

export const userService = {
  async getUserProfile() {
    if (APP_CONFIG.IS_MOCK_MODE) return mockAdapter.getUserProfile();
    const { data: res } = await api.get('/user/profile');
    return { success: true, data: res.data ?? res };
  },

  async getUserNotifications() {
    if (APP_CONFIG.IS_MOCK_MODE) return mockAdapter.getUserNotifications();
    const { data: res } = await api.get('/user/notifications');
    return { success: true, data: res.data ?? res };
  },
};
