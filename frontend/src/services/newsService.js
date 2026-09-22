import axios from 'axios';
import { APP_CONFIG } from '@/utils';
import { mockAdapter } from '@/mocks';

const api = axios.create({
  baseURL: APP_CONFIG.API_BASE_URL,
  headers: { Accept: 'application/json' },
});

export const newsService = {
  async getNews(params = {}) {
    if (APP_CONFIG.IS_MOCK_MODE) return mockAdapter.getNews(params);

    const { data: res } = await api.get('/news', { params });
    return {
      success: true,
      data: res.data ?? res,
      meta: res.meta ?? { total: res.length ?? 0, hasMore: false },
    };
  },

  async getNewsById(id) {
    if (APP_CONFIG.IS_MOCK_MODE) return mockAdapter.getNewsById(id);
    const { data: res } = await api.get(`/news/${id}`);
    return { success: true, data: res.data ?? res };
  },

  async getCategories() {
    if (APP_CONFIG.IS_MOCK_MODE) return mockAdapter.getCategories();
    const { data: res } = await api.get('/categories');
    return { success: true, data: res.data ?? res };
  },

  async getTrending() {
    if (APP_CONFIG.IS_MOCK_MODE) return mockAdapter.getTrending();
    const { data: res } = await api.get('/news/trending');
    return { success: true, data: res.data ?? res };
  },
};
