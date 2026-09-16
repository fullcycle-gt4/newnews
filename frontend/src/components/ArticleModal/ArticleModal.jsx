import { useEffect, useMemo } from 'react'
import './ArticleModal.css'

export default function ArticleModal({ article, isBookmarked, onToggleBookmark, onClose, onShare }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const formattedPublishedDate = useMemo(() => {
    if (!article?.publishedAt) return new Date().toLocaleDateString('pt-BR')
    return new Date(article.publishedAt).toLocaleDateString('pt-BR')
  }, [article])

  if (!article) return null

  const contentParagraphs = Array.isArray(article.content) ? article.content : [article.content || article.summary]

  return (
    <div className="nn-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="nn-article-modal" onClick={(e) => e.stopPropagation()}>
        <div className="nn-modal-header">
          <div className="d-flex align-items-center gap-2">
            <span className={`badge text-bg-${article.badgeBg || 'primary'}`}>{article.category}</span>
            <span className="text-secondary" style={{ fontSize: '0.8rem' }}>
              {article.publishedTimeAgo || 'Recente'}
            </span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: 34, height: 34 }}
              onClick={() => onToggleBookmark?.(article.id)}
              title={isBookmarked ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
              aria-label="Favoritar"
            >
              <svg width="16" height="16" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
            <button
              className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: 34, height: 34 }}
              onClick={() => onShare?.(article)}
              title="Compartilhar notícia"
              aria-label="Compartilhar"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            <button className="btn-close ms-2" onClick={onClose} aria-label="Fechar modal" />
          </div>
        </div>

        <div className="nn-modal-body">
          {article.image && <img src={article.image} alt={article.title} className="nn-modal-cover" />}

          <h1 className="nn-modal-title">{article.title}</h1>

          <div className="d-flex align-items-center gap-3 mb-3 text-secondary" style={{ fontSize: '0.8rem' }}>
            <span>✍️ {article.author || 'Redação New News'}</span>
            <span>•</span>
            <span>🌐 {article.source || 'Portal New News'}</span>
          </div>

          <div className="border-top border-bottom py-3 mb-4">
            <p className="fw-medium mb-0" style={{ fontSize: '0.95rem', lineHeight: 1.5, opacity: 0.9 }}>
              {article.summary}
            </p>
          </div>

          <div className="article-full-text">
            {contentParagraphs.map((paragraph, index) => (
              <p key={index} className="nn-modal-paragraph">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
            <span className="text-secondary" style={{ fontSize: '0.75rem' }}>
              Publicado em {formattedPublishedDate}
            </span>
            <a
              href={article.url || '#'}
              target={article.url ? '_blank' : '_self'}
              rel="noopener noreferrer"
              onClick={(e) => {
                if (!article.url) {
                  e.preventDefault()
                  onShare?.(article)
                }
              }}
              className="btn btn-primary btn-sm rounded-pill px-3"
            >
              Ler fonte original ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
