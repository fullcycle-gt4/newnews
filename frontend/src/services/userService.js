/**
 * Serviço de Usuário e Notificações (Facade).
 */

import { APP_CONFIG } from '../utils/config.js'
import { mockAdapter } from './mockData.js'

async function fetchApi(endpoint) {
  const res = await fetch(`${APP_CONFIG.API_BASE_URL}${endpoint}`, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`Erro na API (${res.status})`)
  return res.json()
}

export const userService = {
  async getUserProfile() {
    if (APP_CONFIG.IS_MOCK_MODE) return mockAdapter.getUserProfile()
    const res = await fetchApi('/user/profile')
    return { success: true, data: res.data ?? res }
  },

  async getUserNotifications() {
    if (APP_CONFIG.IS_MOCK_MODE) return mockAdapter.getUserNotifications()
    const res = await fetchApi('/user/notifications')
    return { success: true, data: res.data ?? res }
  },
}
