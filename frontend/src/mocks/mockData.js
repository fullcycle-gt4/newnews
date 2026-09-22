/**
 * Adaptador e Fixtures MOCK isoladas para execução frontend-only.
 * Fica estritamente contido na camada de serviços.
 */

import { APP_CONFIG } from '@/utils'

export const NAVIGATION_ITEMS = [
  { icon: '🏠', label: 'Início', id: 'inicio', category: null },
  { icon: '⚽', label: 'Futebol', id: 'futebol', category: 'Futebol' },
  { icon: '🏅', label: 'Esportes', id: 'esportes', category: 'Esportes' },
  { icon: '💻', label: 'Tecnologia', id: 'tecnologia', category: 'Tecnologia' },
  { icon: '🎮', label: 'Games', id: 'games', category: 'Games' },
  { icon: '🍔', label: 'Comida', id: 'comida', category: 'Comida' },
  { icon: '🎬', label: 'Entretenimento', id: 'entretenimento', category: 'Entretenimento' },
  { icon: '🎵', label: 'Música', id: 'musica', category: 'Música' },
  { icon: '🏛️', label: 'Política', id: 'politica', category: 'Política' },
  { icon: '📈', label: 'Economia', id: 'economia', category: 'Economia' },
  { icon: '🇧🇷', label: 'Brasil', id: 'brasil', category: 'Brasil' },
  { icon: '🌍', label: 'Mundo', id: 'mundo', category: 'Mundo' },
]

export const NEWS_CATEGORIES = [
  'Todos', 'Futebol', 'Tecnologia', 'Política', 'Economia', 'Mundo', 'Games', 'Entretenimento',
]

export const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'Seleção Brasileira confirma novos convocados', timeAgo: '12m atrás', category: 'Futebol' },
  { id: 2, title: 'Nova IA com capacidade de raciocínio avançado', timeAgo: '1h atrás', category: 'Tecnologia' },
  { id: 3, title: 'Bolsa de valores encerra o dia em alta', timeAgo: '6h atrás', category: 'Economia' },
]

export const MOCK_USER_PROFILE = {
  id: 101,
  name: 'Thais Oliveira',
  firstName: 'Thais',
  email: 'thais@example.com',
  avatarInitial: 'T',
  role: 'Assinante Premium',
}

export const MOCK_NEWS_ARTICLES = [
  {
    id: 1,
    category: 'Futebol',
    badgeBg: 'success',
    title: 'Seleção Brasileira confirma convocação para as Eliminatórias com novos talentos da base',
    summary: 'Com surpresas na lista, o técnico anuncia chamados inéditos vindos das categorias de base, prometendo renovar o estilo de jogo da equipe canarinha nas próximas rodadas das Eliminatórias da Copa do Mundo.',
    image: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=800&h=450&fit=crop&auto=format',
    publishedTimeAgo: 'Há 12 minutos',
    publishedAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    author: 'Redação Esportes',
    source: 'Portal New News',
    readTime: '4 min de leitura',
    isHero: true,
  },
  {
    id: 2,
    category: 'Tecnologia',
    badgeBg: 'primary',
    title: 'Nova IA promete revolucionar a forma como trabalhamos',
    summary: 'Modelo de linguagem da OpenAI apresenta capacidade de raciocínio avançado e execução de tarefas complexas de forma autônoma.',
    image: 'https://images.unsplash.com/photo-1674027444485-cec3da58eef4?w=480&h=260&fit=crop&auto=format',
    publishedTimeAgo: 'Há 1 hora',
    publishedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    author: 'Tecnologia & Inovação',
    source: 'Tech Trends',
    readTime: '3 min de leitura',
  },
  {
    id: 3,
    category: 'Política',
    badgeBg: 'danger',
    title: 'Congresso discute novo pacote de medidas econômicas',
    summary: 'Proposta visa reduzir o déficit fiscal e estimular o crescimento com cortes de gastos e novas fontes de receita.',
    image: 'https://images.unsplash.com/photo-1614610741181-2bce5e06976d?w=480&h=260&fit=crop&auto=format',
    publishedTimeAgo: 'Há 2 horas',
    publishedAt: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    author: 'Política Nacional',
    source: 'New News Brasília',
    readTime: '5 min de leitura',
  },
  {
    id: 4,
    category: 'Comida',
    badgeBg: 'warning',
    title: 'Hambúrguer artesanal: 5 receitas fáceis para fazer em casa',
    summary: 'Do smash burger ao blend especial, aprenda a montar combinações irresistíveis com ingredientes simples e acessíveis.',
    image: 'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?w=480&h=260&fit=crop&auto=format',
    publishedTimeAgo: 'Há 3 horas',
    publishedAt: new Date(Date.now() - 180 * 60 * 1000).toISOString(),
    author: 'Gastronomia',
    source: 'Sabores da Cidade',
    readTime: '6 min de leitura',
  },
  {
    id: 5,
    category: 'Games',
    badgeBg: 'secondary',
    title: 'Lançamentos de jogos em novembro: veja os principais títulos',
    summary: 'Novembro chega com grandes títulos para PS5, Xbox e PC. Confira a lista completa e as datas de lançamento.',
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=480&h=260&fit=crop&auto=format',
    publishedTimeAgo: 'Há 4 horas',
    publishedAt: new Date(Date.now() - 240 * 60 * 1000).toISOString(),
    author: 'Mundo Gamer',
    source: 'Game World',
    readTime: '4 min de leitura',
  },
  {
    id: 6,
    category: 'Entretenimento',
    badgeBg: 'danger',
    title: 'Filme brasileiro conquista a crítica internacional em festival europeu',
    summary: 'Produção independente nacional recebeu críticas elogiosas em festival europeu e entra na disputa por prêmios internacionais.',
    image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=480&h=260&fit=crop&auto=format',
    publishedTimeAgo: 'Há 5 horas',
    publishedAt: new Date(Date.now() - 300 * 60 * 1000).toISOString(),
    author: 'Cinema & Arte',
    source: 'Cine Journal',
    readTime: '3 min de leitura',
  },
  {
    id: 7,
    category: 'Economia',
    badgeBg: 'success',
    title: 'Bolsa fecha em alta após dados positivos da inflação',
    summary: 'O Ibovespa encerrou o pregão em alta de 1,3% puxado pelo otimismo com os dados de inflação abaixo do esperado pelo mercado.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=480&h=260&fit=crop&auto=format',
    publishedTimeAgo: 'Há 6 horas',
    publishedAt: new Date(Date.now() - 360 * 60 * 1000).toISOString(),
    author: 'Mercado Financeiro',
    source: 'Valor Hoje',
    readTime: '4 min de leitura',
  },
  {
    id: 8,
    category: 'Música',
    badgeBg: 'info',
    title: 'Artista brasileira anuncia turnê mundial com paradas na Europa e América do Norte',
    summary: 'Após o sucesso do último álbum, a cantora confirma datas em 18 países e promete show histórico no Maracanã em março.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=480&h=260&fit=crop&auto=format',
    publishedTimeAgo: 'Há 7 horas',
    publishedAt: new Date(Date.now() - 420 * 60 * 1000).toISOString(),
    author: 'Cultura & Shows',
    source: 'Beat Magazine',
    readTime: '3 min de leitura',
  },
  {
    id: 9,
    category: 'Brasil',
    badgeBg: 'warning',
    title: 'Governo lança programa de habitação com 500 mil novas unidades',
    summary: 'Iniciativa prevê investimentos de R$ 40 bilhões nos próximos quatro anos, priorizando famílias de baixa renda nas regiões Norte e Nordeste.',
    image: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=480&h=260&fit=crop&auto=format',
    publishedTimeAgo: 'Há 8 horas',
    publishedAt: new Date(Date.now() - 480 * 60 * 1000).toISOString(),
    author: 'Redação Brasil',
    source: 'Portal New News',
    readTime: '5 min de leitura',
  },
  {
    id: 10,
    category: 'Mundo',
    badgeBg: 'primary',
    title: 'Cúpula climática define metas ambiciosas para redução de carbono até 2035',
    summary: 'Líderes de 120 países assinam acordo histórico comprometendo corte de 50% nas emissões de CO₂ na próxima década.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=480&h=260&fit=crop&auto=format',
    publishedTimeAgo: 'Há 9 horas',
    publishedAt: new Date(Date.now() - 540 * 60 * 1000).toISOString(),
    author: 'Internacional',
    source: 'Global News',
    readTime: '4 min de leitura',
  },
  {
    id: 11,
    category: 'Esportes',
    badgeBg: 'success',
    title: 'Atleta brasileira conquista ouro no atletismo e bate recorde sul-americano',
    summary: 'Nos 400 metros com barreiras, a velocista cruzou a linha com tempo de 52s03, superando o recorde que durava 14 anos.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=480&h=260&fit=crop&auto=format',
    publishedTimeAgo: 'Há 10 horas',
    publishedAt: new Date(Date.now() - 600 * 60 * 1000).toISOString(),
    author: 'Redação Esportes',
    source: 'Portal New News',
    readTime: '3 min de leitura',
  },
  {
    id: 12,
    category: 'Futebol',
    badgeBg: 'success',
    title: 'Flamengo negocia com estrela europeia e aguarda resposta sobre transferência',
    summary: 'O Rubro-Negro carioca apresentou proposta de dois anos ao meia-atacante que atua na Bundesliga, com salário recorde para o futebol brasileiro.',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=480&h=260&fit=crop&auto=format',
    publishedTimeAgo: 'Há 11 horas',
    publishedAt: new Date(Date.now() - 660 * 60 * 1000).toISOString(),
    author: 'Futebol Nacional',
    source: 'Esporte Hoje',
    readTime: '4 min de leitura',
  },
]

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const ARTICLES = MOCK_NEWS_ARTICLES.map((article) => ({
  ...article,
  content: [
    `${article.summary}`,
    'De acordo com especialistas da área, os recentes acontecimentos representam um marco importante e abrem espaço para novas discussões no setor.',
    'As partes envolvidas continuam monitorando o cenário de perto para implementar os ajustes necessários de maneira ágil e eficiente.',
  ],
}))

export const mockAdapter = {
  async getNews({ category = 'Todos', query = '', page = 1, limit = APP_CONFIG.DEFAULT_PAGE_LIMIT } = {}) {
    if (APP_CONFIG.MOCK_DELAY_MS > 0) await delay(APP_CONFIG.MOCK_DELAY_MS)

    let filtered = ARTICLES
    if (category && category !== 'Todos') {
      filtered = filtered.filter((a) => a.category.toLowerCase() === category.toLowerCase())
    }
    if (query?.trim()) {
      const q = query.trim().toLowerCase()
      filtered = filtered.filter(
        (a) => a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)
      )
    }
    const total = filtered.length
    const totalPages = Math.ceil(total / limit) || 1
    const items = filtered.slice((page - 1) * limit, page * limit)

    return {
      success: true,
      data: items,
      meta: { total, page, limit, totalPages, hasMore: page < totalPages },
    }
  },

  async getNewsById(id) {
    if (APP_CONFIG.MOCK_DELAY_MS > 0) await delay(APP_CONFIG.MOCK_DELAY_MS)
    const article = ARTICLES.find((a) => Number(a.id) === Number(id))
    if (!article) throw new Error(`Notícia id ${id} não encontrada`)
    return { success: true, data: article }
  },

  async getCategories() {
    if (APP_CONFIG.MOCK_DELAY_MS > 0) await delay(APP_CONFIG.MOCK_DELAY_MS)
    return { success: true, data: NEWS_CATEGORIES, navItems: NAVIGATION_ITEMS }
  },

  async getTrending() {
    if (APP_CONFIG.MOCK_DELAY_MS > 0) await delay(APP_CONFIG.MOCK_DELAY_MS)
    const hero = ARTICLES.find((a) => a.isHero) || ARTICLES[0]
    return { success: true, data: hero }
  },

  async getUserProfile() {
    if (APP_CONFIG.MOCK_DELAY_MS > 0) await delay(APP_CONFIG.MOCK_DELAY_MS)
    return { success: true, data: MOCK_USER_PROFILE }
  },

  async getUserNotifications() {
    if (APP_CONFIG.MOCK_DELAY_MS > 0) await delay(APP_CONFIG.MOCK_DELAY_MS)
    return { success: true, data: MOCK_NOTIFICATIONS }
  },
}
