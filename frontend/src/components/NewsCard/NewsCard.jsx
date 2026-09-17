import { IconBookmark, IconBookmarkFilled, IconClock, IconChevronRight } from '@tabler/icons-react'
import './NewsCard.css'

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
          {isBookmarked ? <IconBookmarkFilled size={15} /> : <IconBookmark size={15} />}
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
            <IconClock size={13} />
            <span>{article.publishedTimeAgo || 'Recente'}</span>
          </div>
          <span className="btn btn-link btn-sm news-card-action p-0">
            Ler mais <IconChevronRight size={12} className="ms-1" />
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
        <div className="hero-card rounded-4 overflow-hidden mb-4 p-4 border d-flex flex-column justify-content-end placeholder-glow">
          <span className="placeholder col-2 rounded-pill mb-2" style={{ height: 20 }} />
          <span className="placeholder col-8 rounded mb-2" style={{ height: 32 }} />
          <span className="placeholder col-6 rounded mb-3" style={{ height: 18 }} />
          <div className="d-flex align-items-center gap-3">
            <span className="placeholder col-2 rounded" style={{ height: 16 }} />
            <span className="placeholder col-3 rounded-pill" style={{ height: 32 }} />
          </div>
        </div>
      )}

      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        {Array.from({ length: skeletonCount }, (_, index) => (
          <div key={index} className="col">
            <div className="card h-100 border shadow-sm placeholder-glow">
              <div className="placeholder w-100 rounded-top" style={{ height: 176 }} />
              <div className="card-body d-flex flex-column p-3">
                <span className="placeholder col-3 rounded-pill mb-2" style={{ height: 20 }} />
                <span className="placeholder col-10 rounded mb-2" style={{ height: 20 }} />
                <span className="placeholder col-8 rounded mb-3" style={{ height: 16 }} />
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <span className="placeholder col-3 rounded" style={{ height: 14 }} />
                  <span className="placeholder col-3 rounded" style={{ height: 14 }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}