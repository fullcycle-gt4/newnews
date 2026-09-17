import { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Sidebar, { SidebarOffcanvas } from '../../components/Sidebar/Sidebar.jsx'
import ToastContainer from '../../components/ToastContainer/ToastContainer.jsx'
import { useNewsFeed } from '../../hooks/useNewsFeed.js'
import { useUser } from '../../context/UserContext.jsx'
import { useNavigation } from '../../context/NavigationContext.jsx'
import { useBookmarks } from '../../context/BookmarksContext.jsx'
import { useToast } from '../../context/ToastContext.jsx'
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter.jsx'
import NewsCard, { HeroCard, NewsSkeleton } from '../../components/NewsCard/NewsCard.jsx'
import ArticleModal from '../../components/ArticleModal/ArticleModal.jsx'
import EmptyState from '../../components/EmptyState/EmptyState.jsx'
import { getTimeBasedGreeting, formatCurrentDateTime } from '../../utils/dateUtils.js'
import './HomePage.css'

export default function HomePage() {
  const { user } = useUser()
  const { navSelectedCategory, debouncedSearchQuery, clearSearch } = useNavigation()
  const { readArticleIds, bookmarkedArticleIds, markArticleAsRead, toggleArticleBookmark } = useBookmarks()
  const { showToastNotification } = useToast()

  const [selectedArticleDetail, setSelectedArticleDetail] = useState(null)

  const {
    categories,
    gridArticles,
    heroArticle,
    isLoading,
    isLoadingMore,
    error,
    hasMoreArticles,
    isSavedTabActive,
    effectiveCategory,
    shouldShowHero,
    searchResultsSummary,
    setActiveCategory,
    reloadNewsFeed,
    loadMoreArticles,
  } = useNewsFeed({
    navSelectedCategory,
    searchQuery: debouncedSearchQuery,
    bookmarkedArticleIds,
  })

  const handleOpenArticleModal = (article) => {
    setSelectedArticleDetail(article)
    markArticleAsRead(article.id)
  }

  const handleShareArticleLink = (article) => {
    const shareUrl = article.url || window.location.href
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl)
      showToastNotification('Link da notícia copiado!', 'success', '🔗')
    } else {
      showToastNotification(`Compartilhando: ${article.title}`, 'info', '📢')
    }
  }

  const searchQuery = debouncedSearchQuery
  const isDefaultCategory = effectiveCategory === 'Todos' && !searchQuery.trim() && !isSavedTabActive

  return (
    <div className="vh-100 d-flex flex-column overflow-hidden">
      <Navbar />
      <SidebarOffcanvas />

      <div className="d-flex flex-grow-1 min-vh-0 overflow-hidden">
        <Sidebar />

        <main id="home-page" className="flex-grow-1 p-4 overflow-y-auto h-100">
          {/* Header Section */}
          <header className="mb-4">
            <h1 className="fw-bold mb-1 fs-4">
              {getTimeBasedGreeting()}, {user?.firstName || 'Usuário'}! 👋
            </h1>
            <p className="text-secondary mb-0 small">
              {formatCurrentDateTime()} • Confira o que está acontecendo hoje
            </p>
          </header>

          {/* Category Filter */}
          {!isSavedTabActive && (
            <CategoryFilter categories={categories} activeCategory={effectiveCategory} onSelectCategory={setActiveCategory} />
          )}

          {/* Search Results Summary */}
          {searchResultsSummary && (
            <p className="text-secondary mb-3 small">
              {searchResultsSummary}
              {searchQuery.trim() && (
                <button className="btn btn-link btn-sm p-0 ms-2 align-baseline small" onClick={clearSearch}>
                  Limpar
                </button>
              )}
            </p>
          )}

          {/* Error State */}
          {error && (
            <div className="alert alert-danger rounded-3 d-flex align-items-center justify-content-between my-4" role="alert">
              <div>
                <strong>⚠️ Falha de Conexão:</strong> {error}
              </div>
              <button className="btn btn-outline-danger btn-sm rounded-pill" onClick={reloadNewsFeed}>
                Tentar novamente
              </button>
            </div>
          )}

          {/* Main Content */}
          {isLoading ? (
            <NewsSkeleton skeletonCount={6} shouldShowHero={isDefaultCategory} />
          ) : (
            <section aria-label="Lista de notícias">
              {shouldShowHero && <HeroCard article={heroArticle} onSelectArticle={handleOpenArticleModal} />}

              {gridArticles.length === 0 ? (
                <EmptyState
                  searchQuery={searchQuery.trim()}
                  isSavedTabActive={isSavedTabActive}
                  category={effectiveCategory}
                  onClearSearch={clearSearch}
                  onResetCategory={() => setActiveCategory('Todos')}
                />
              ) : (
                <>
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                    {gridArticles.map((article) => (
                      <div key={article.id} className="col">
                        <NewsCard
                          article={article}
                          isRead={readArticleIds.has(article.id)}
                          isBookmarked={bookmarkedArticleIds.has(article.id)}
                          onSelectArticle={handleOpenArticleModal}
                          onToggleBookmark={toggleArticleBookmark}
                        />
                      </div>
                    ))}
                  </div>

                  {hasMoreArticles && !isSavedTabActive && (
                    <div className="text-center mt-4 pt-2">
                      <button className="btn btn-outline-primary rounded-pill px-4" disabled={isLoadingMore} onClick={loadMoreArticles}>
                        {isLoadingMore ? 'Carregando...' : 'Carregar mais notícias'}
                      </button>
                    </div>
                  )}
                </>
              )}
            </section>
          )}

          {/* Modal */}
          {selectedArticleDetail && (
            <ArticleModal
              article={selectedArticleDetail}
              isBookmarked={bookmarkedArticleIds.has(selectedArticleDetail.id)}
              onToggleBookmark={toggleArticleBookmark}
              onShare={handleShareArticleLink}
              onClose={() => setSelectedArticleDetail(null)}
            />
          )}
        </main>
      </div>

      <ToastContainer />
    </div>
  )
}