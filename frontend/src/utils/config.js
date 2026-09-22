/**
 * Configurações e constantes utilitárias do New News.
 */

export const APP_CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  IS_MOCK_MODE: import.meta.env.VITE_USE_MOCK !== 'false',
  MOCK_DELAY_MS: Number(import.meta.env.VITE_MOCK_DELAY_MS) || 250,

  DEBOUNCE_SEARCH_MS: 250,
  TOAST_AUTO_DISMISS_MS: 4000,
  DEFAULT_PAGE_LIMIT: 12,
}

export const TOAST_MESSAGES = {
  DARK_MODE_ON: { message: 'Modo escuro ativado', type: 'info', icon: '🌙' },
  DARK_MODE_OFF: { message: 'Modo claro ativado', type: 'info', icon: '☀️' },
  BOOKMARK_ADDED: { message: 'Notícia salva nos seus favoritos!', type: 'success', icon: '🔖' },
  BOOKMARK_REMOVED: { message: 'Notícia removida dos salvos', type: 'info', icon: '🗑️' },
  LINK_COPIED: { message: 'Link da notícia copiado!', type: 'success', icon: '🔗' },
  SESSION_ENDED: { message: 'Sessão encerrada com sucesso', type: 'info', icon: '👋' },
}
