/**
 * Serviço de Notícias do New News (Facade).
 * Consome mockAdapter em modo Mock ou chamadas HTTP em modo real.
 */

import { APP_CONFIG } from '../utils/config.js'
import { mockAdapter } from './mockData.js'

async function fetchApi(endpoint, params = {}) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
  ).toString()
  const url = `${APP_CONFIG.API_BASE_URL}${endpoint}${query ? `?${query}` : ''}`
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`Erro na API (${res.status})`)
  return res.json()
}

export const newsService = {
  async getNews(params = {}) {
    if (APP_CONFIG.IS_MOCK_MODE) return mockAdapter.getNews(params)

    const res = await fetchApi('/news', params)
    return {
      success: true,
      data: res.data ?? res,
      meta: res.meta ?? { total: res.length ?? 0, hasMore: false },
    }
  },

  async getNewsById(id) {
    if (APP_CONFIG.IS_MOCK_MODE) return mockAdapter.getNewsById(id)
    const res = await fetchApi(`/news/${id}`)
    return { success: true, data: res.data ?? res }
  },

  async getCategories() {
    if (APP_CONFIG.IS_MOCK_MODE) return mockAdapter.getCategories()
    const res = await fetchApi('/categories')
    return { success: true, data: res.data ?? res }
  },

  async getTrending() {
    if (APP_CONFIG.IS_MOCK_MODE) return mockAdapter.getTrending()
    const res = await fetchApi('/news/trending')
    return { success: true, data: res.data ?? res }
  },
}
