import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar, { SidebarOffcanvas } from '@/components/Sidebar';
import ToastContainer from '@/components/ToastContainer';
import NewsCard, { HeroCard, NewsSkeleton } from '@/components/NewsCard';
import ArticleModal from '@/components/ArticleModal';
import EmptyState from '@/components/EmptyState';
import { useNewsFeed } from '@/hooks';
import {
  useUserStore,
  useNavigationStore,
  useBookmarksStore,
  useToastStore,
  selectNavCategory,
} from '@/stores';
import { getTimeBasedGreeting, formatCurrentDateTime } from '@/utils';
import './HomePage.css';

export default function HomePage() {
  const user = useUserStore((state) => state.user);
  const navSelectedCategory = useNavigationStore(selectNavCategory);
  const debouncedSearchQuery = useNavigationStore(
    (state) => state.debouncedSearchQuery,
  );
  const clearSearch = useNavigationStore((state) => state.clearSearch);
  const readArticleIds = useBookmarksStore((state) => state.readArticleIds);
  const bookmarkedArticleIds = useBookmarksStore(
    (state) => state.bookmarkedArticleIds,
  );
  const markArticleAsRead = useBookmarksStore(
    (state) => state.markArticleAsRead,
  );
  const toggleArticleBookmark = useBookmarksStore(
    (state) => state.toggleArticleBookmark,
  );
  const showToastNotification = useToastStore(
    (state) => state.showToastNotification,
  );

  const [selectedArticleDetail, setSelectedArticleDetail] = useState(null);

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
  });

  const handleOpenArticleModal = (article) => {
    setSelectedArticleDetail(article);
    markArticleAsRead(article.id);
  };

  const handleShareArticleLink = (article) => {
    const shareUrl = article.url || window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      showToastNotification('Link da notícia copiado!', 'success', '🔗');
    } else {
      showToastNotification(`Compartilhando: ${article.title}`, 'info', '📢');
    }
  };

  const searchQuery = debouncedSearchQuery;
  const isDefaultCategory =
    effectiveCategory === 'Todos' && !searchQuery.trim() && !isSavedTabActive;

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

          {/* Search Results Summary */}
          {searchResultsSummary && (
            <p className="text-secondary mb-3 small">
              {searchResultsSummary}
              {searchQuery.trim() && (
                <button
                  className="btn btn-link btn-sm p-0 ms-2 align-baseline small"
                  onClick={clearSearch}
                >
                  Limpar
                </button>
              )}
            </p>
          )}

          {/* Error State */}
          {error && (
            <div
              className="alert alert-danger rounded-3 d-flex align-items-center justify-content-between my-4"
              role="alert"
            >
              <div>
                <strong>⚠️ Falha de Conexão:</strong> {error}
              </div>
              <button
                className="btn btn-outline-danger btn-sm rounded-pill"
                onClick={reloadNewsFeed}
              >
                Tentar novamente
              </button>
            </div>
          )}

          {/* Main Content */}
          {isLoading ? (
            <NewsSkeleton
              skeletonCount={6}
              shouldShowHero={isDefaultCategory}
            />
          ) : (
            <section aria-label="Lista de notícias">
              {shouldShowHero && (
                <HeroCard
                  article={heroArticle}
                  onSelectArticle={handleOpenArticleModal}
                />
              )}

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
                      <button
                        className="btn btn-outline-primary rounded-pill px-4"
                        disabled={isLoadingMore}
                        onClick={loadMoreArticles}
                      >
                        {isLoadingMore
                          ? 'Carregando...'
                          : 'Carregar mais notícias'}
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
  );
}
