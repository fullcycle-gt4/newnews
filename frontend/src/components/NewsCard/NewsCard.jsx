import './NewsCard.css'

// Reusable SVG Icons
const BookmarkIcon = ({ isActive }) => (
  <svg width="15" height="15" fill={isActive ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
  </svg>
)

const ClockIcon = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const ArrowIcon = () => (
  <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="ms-1">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
  </svg>
)

export default function NewsCard({ article, isRead, isBookmarked, onSelectArticle, onToggleBookmark }) {
  if (!article) return null

  const handleKeyDown = (e) => e.key === 'Enter' && onSelectArticle?.(article)

  const handleBookmark = (e) => {
    e.stopPropagation()
    onToggleBookmark?.(article.id)
  }

  const bookmarkLabel = isBookmarked ? 'Remover dos favoritos' : 'Salvar nos favoritos'

  return (
    <article
      id={`news-card-${article.id}`}
      className={`card h-100 border news-card shadow-sm overflow-hidden ${isRead ? 'news-card--read' : ''}`}
      onClick={() => onSelectArticle?.(article)}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="news-card-img-wrapper overflow-hidden">
        <button
          type="button"
          className={`news-card-bookmark-btn ${isBookmarked ? 'is-active' : ''}`}
          onClick={handleBookmark}
          aria-label={bookmarkLabel}
          title={bookmarkLabel}
        >
          <BookmarkIcon isActive={isBookmarked} />
        </button>
        <img src={article.image} alt={article.title} className="news-card-img w-100 h-100 object-fit-cover" loading="lazy" />
      </div>

      <div className="card-body d-flex flex-column pb-2">
        <div className="d-flex align-items-center gap-2 mb-2">
          <span className={`badge text-bg-${article.badgeBg || 'primary'} align-self-start`}>{article.category}</span>
          {isRead && <span className="badge text-bg-secondary badge-read align-self-start">✓ Lido</span>}
        </div>

        <h2 className="card-title news-card-title fw-bold mb-2">{article.title}</h2>
        <p className="card-text text-secondary news-card-summary mb-3">{article.summary}</p>

        <div className="d-flex align-items-center justify-content-between mt-auto">
          <div className="d-flex align-items-center gap-1 text-secondary news-card-time">
            <ClockIcon />
            <span>{article.publishedTimeAgo || 'Recente'}</span>
          </div>
          <span className="btn btn-link btn-sm news-card-action p-0">
            Ler mais <ArrowIcon />
          </span>
        </div>
      </div>
    </article>
  )
}

export function HeroCard({ article, onSelectArticle }) {
  if (!article) return null

  const handleSelect = () => onSelectArticle?.(article)

  return (
    <div
      id="hero-card"
      className="hero-card rounded-4 overflow-hidden position-relative mb-4"
      onClick={handleSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleSelect()}
    >
      <img src={article.image} alt={article.title} className="w-100 h-100 object-fit-cover" loading="eager" />
      <div className="hero-overlay position-absolute bottom-0 start-0 w-100 p-4 d-flex flex-column justify-content-end">
        <span className={`badge text-bg-${article.badgeBg || 'primary'} align-self-start mb-2`}>
          {article.category}
        </span>
        <h2 className="text-white fw-bold mb-2 hero-card-title">{article.title}</h2>
        <p className="text-white text-opacity-75 mb-3 d-none d-sm-block hero-card-summary">
          {article.summary}
        </p>
        <div className="d-flex align-items-center gap-3">
          <span className="text-white text-opacity-50 news-card-time">
            {article.publishedTimeAgo || 'Recente'}
          </span>
          <button
            type="button"
            className="btn btn-light btn-sm rounded-pill fw-semibold px-3"
            onClick={(e) => {
              e.stopPropagation()
              handleSelect()
            }}
          >
            Ler mais
          </button>
        </div>
      </div>
    </div>
  )
}

export function NewsSkeleton({ skeletonCount = 6, shouldShowHero = false }) {
  return (
    <>
      {shouldShowHero && (
        <div className="hero-card rounded-4 overflow-hidden mb-4 p-4 border d-flex flex-column justify-content-end">
          <div className="nn-skeleton-box mb-2 skeleton-badge" />
          <div className="nn-skeleton-box mb-2 skeleton-title" />
          <div className="nn-skeleton-box mb-3 skeleton-sub" />
          <div className="d-flex align-items-center gap-3">
            <div className="nn-skeleton-box skeleton-time" />
            <div className="nn-skeleton-box skeleton-btn" />
          </div>
        </div>
      )}

      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        {Array.from({ length: skeletonCount }, (_, index) => (
          <div key={index} className="col">
            <div className="card h-100 border shadow-sm">
              <div className="nn-skeleton-box w-100 skeleton-img" />
              <div className="card-body d-flex flex-column p-3">
                <div className="nn-skeleton-box mb-2 skeleton-badge" />
                <div className="nn-skeleton-box mb-2 skeleton-title-sm" />
                <div className="nn-skeleton-box mb-3 skeleton-text" />
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <div className="nn-skeleton-box skeleton-meta" />
                  <div className="nn-skeleton-box skeleton-meta" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}