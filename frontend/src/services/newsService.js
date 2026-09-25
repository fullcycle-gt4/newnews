import axios from 'axios';
import { APP_CONFIG } from '@/utils';
import { mockAdapter } from '@/mocks';

/**
 * News Data Service layer.
 * Encapsulates HTTP communication with news endpoints.
 * Automatically toggles between local mock adapter data and remote REST API endpoints
 * based on application configuration.
 */
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

  /**
   * Fetches contextually related articles for a specified article ID.
   * Leverages dedicated `/news/:id/related` REST endpoint with a fallback mechanism
   * that queries category-filtered articles if the backend endpoint is unavailable.
   */
  async getRelatedNews(id, params = {}) {
    if (APP_CONFIG.IS_MOCK_MODE) return mockAdapter.getRelatedNews(id, params);

    const limit = params.limit || 3;
    try {
      const { data: res } = await api.get(`/news/${id}/related`, {
        params: { limit, ...params },
      });
      return { success: true, data: res.data ?? res };
    } catch {
      // Fallback strategy for REST backends without explicit /related route support
      const { data: articleRes } = await api.get(`/news/${id}`);
      const article = articleRes.data ?? articleRes;
      const { data: newsRes } = await api.get('/news', {
        params: { category: article?.category, limit: limit + 5 },
      });
      const list = newsRes.data ?? newsRes;
      const filtered = (Array.isArray(list) ? list : [])
        .filter((item) => Number(item.id) !== Number(id))
        .slice(0, limit);
      return { success: true, data: filtered };
    }
  },
};

