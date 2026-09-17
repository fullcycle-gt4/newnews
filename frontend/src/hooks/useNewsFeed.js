import { useState, useEffect, useMemo, useCallback } from 'react'
import { newsService } from '../services/newsService.js'
import { APP_CONFIG } from '../utils/config.js'

export function useNewsFeed({ navSelectedCategory, searchQuery, bookmarkedArticleIds }) {
  const [categories, setCategories] = useState(['Todos'])
  const [navItems, setNavItems] = useState([])
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [articlesList, setArticlesList] = useState([])
  const [heroArticle, setHeroArticle] = useState(null)
  const [page, setPage] = useState(1)
  const [hasMoreArticles, setHasMoreArticles] = useState(false)
  const [error, setError] = useState(null)
  const [loadingState, setLoadingState] = useState({ initial: true, more: false })

  // Effect: Fetch dynamic categories & navigation items from newsService
  useEffect(() => {
    let isMounted = true
    async function loadMetaData() {
      try {
        const res = await newsService.getCategories()
        if (isMounted && res.success) {
          if (res.data) setCategories(res.data)
          if (res.navItems) setNavItems(res.navItems)
        }
      } catch (err) {
        console.error('Erro ao carregar categorias dinâmicas:', err)
      }
    }
    loadMetaData()
    return () => {
      isMounted = false
    }
  }, [])

  const validCategoriesSet = useMemo(() => {
    const set = new Set(navItems.map((item) => item.category).filter(Boolean))
    categories.forEach((cat) => set.add(cat))
    return set
  }, [navItems, categories])

  const isSavedTabActive = navSelectedCategory === 'salvos'
  const effectiveCategory = isSavedTabActive
    ? 'Salvos'
    : validCategoriesSet.has(navSelectedCategory)
    ? navSelectedCategory
    : activeCategory

  const cleanQuery = searchQuery.trim()
  const isDefaultFeed = effectiveCategory === 'Todos' && !cleanQuery && !isSavedTabActive

  const fetchArticlesPage = useCallback(
    async (targetPage, isLoadMore = false, signal) => {
      setLoadingState((prev) => ({
        initial: !isLoadMore,
        more: isLoadMore,
      }))
      if (!isLoadMore) setError(null)

      try {
        const res = await newsService.getNews({
          category: isSavedTabActive ? 'Todos' : effectiveCategory,
          query: cleanQuery,
          page: targetPage,
          limit: APP_CONFIG.DEFAULT_PAGE_LIMIT,
        })

        if (signal?.aborted) return

        if (res.success) {
          const list = res.data

          setArticlesList((prev) => (isLoadMore ? [...prev, ...list] : list))
          setPage(targetPage)
          setHasMoreArticles(res.meta?.hasMore ?? false)

          if (!isLoadMore && isDefaultFeed) {
            const trending = await newsService.getTrending()
            if (!signal?.aborted) {
              setHeroArticle(trending.data || list[0])
            }
          }
        }
      } catch (err) {
        if (!signal?.aborted) {
          setError(err.message || 'Erro ao carregar as notícias.')
        }
      } finally {
        if (!signal?.aborted) {
          setLoadingState({ initial: false, more: false })
        }
      }
    },
    [effectiveCategory, cleanQuery, isSavedTabActive, isDefaultFeed]
  )

  useEffect(() => {
    const controller = new AbortController()
    fetchArticlesPage(1, false, controller.signal)
    return () => controller.abort()
  }, [fetchArticlesPage])

  const displayArticles = useMemo(() => {
    if (isSavedTabActive) {
      return articlesList.filter((a) => bookmarkedArticleIds.has(a.id))
    }
    return articlesList
  }, [articlesList, isSavedTabActive, bookmarkedArticleIds])

  const shouldShowHero = Boolean(isDefaultFeed && heroArticle)

  const gridArticles = useMemo(
    () => (shouldShowHero ? displayArticles.filter((a) => a.id !== heroArticle.id) : displayArticles),
    [displayArticles, heroArticle, shouldShowHero]
  )

  const searchResultsSummary = useMemo(() => {
    const count = displayArticles.length
    if (cleanQuery) return `${count} resultado${count !== 1 ? 's' : ''} para "${cleanQuery}"`
    if (isSavedTabActive) return `${count} artigo${count !== 1 ? 's' : ''} salvo${count !== 1 ? 's' : ''}`
    return null
  }, [cleanQuery, isSavedTabActive, displayArticles.length])

  return {
    categories,
    navItems,
    articlesList,
    gridArticles,
    heroArticle,
    isLoading: loadingState.initial,
    isLoadingMore: loadingState.more,
    error,
    page,
    hasMoreArticles,
    isSavedTabActive,
    effectiveCategory,
    shouldShowHero,
    searchResultsSummary,
    setActiveCategory,
    reloadNewsFeed: () => fetchArticlesPage(1, false),
    loadMoreArticles: () => fetchArticlesPage(page + 1, true),
  }
}