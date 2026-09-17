import { useEffect, useMemo, useRef } from 'react'
import {
  IconBookmark,
  IconBookmarkFilled,
  IconShare,
  IconX,
  IconExternalLink,
} from '@tabler/icons-react'
import './ArticleModal.css'

export default function ArticleModal({ article, isBookmarked, onToggleBookmark, onClose, onShare }) {
  const closeButtonRef = useRef(null)

  useEffect(() => {
    const previouslyFocusedElement = document.activeElement
    closeButtonRef.current?.focus()

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === 'function') {
        previouslyFocusedElement.focus()
      }
    }
  }, [onClose])

  const formattedPublishedDate = useMemo(() => {
    if (!article?.publishedAt) return new Date().toLocaleDateString('pt-BR')
    return new Date(article.publishedAt).toLocaleDateString('pt-BR')
  }, [article])

  if (!article) return null

  const contentParagraphs = Array.isArray(article.content)
    ? article.content
    : [article.content || article.summary]

  return (
    <div className="nn-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-article-title">
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
              type="button"
              className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: 34, height: 34 }}
              onClick={() => onToggleBookmark?.(article.id)}
              title={isBookmarked ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
              aria-label="Favoritar"
            >
              {isBookmarked ? <IconBookmarkFilled size={16} /> : <IconBookmark size={16} />}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: 34, height: 34 }}
              onClick={() => onShare?.(article)}
              title="Compartilhar notícia"
              aria-label="Compartilhar"
            >
              <IconShare size={16} />
            </button>
            <button
              ref={closeButtonRef}
              type="button"
              className="btn-close ms-2"
              onClick={onClose}
              aria-label="Fechar modal"
            />
          </div>
        </div>

        <div className="nn-modal-body">
          {article.image && <img src={article.image} alt={article.title} className="nn-modal-cover" />}

          <h1 id="modal-article-title" className="nn-modal-title">
            {article.title}
          </h1>

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
              <p key={`${index}-${paragraph.slice(0, 15)}`} className="nn-modal-paragraph">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
            <span className="text-secondary" style={{ fontSize: '0.75rem' }}>
              Publicado em {formattedPublishedDate}
            </span>
            {article.url ? (
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm rounded-pill px-3 d-inline-flex align-items-center gap-1"
              >
                Ler fonte original <IconExternalLink size={14} />
              </a>
            ) : (
              <button
                type="button"
                className="btn btn-primary btn-sm rounded-pill px-3 d-inline-flex align-items-center gap-1"
                onClick={() => onShare?.(article)}
              >
                Compartilhar matéria <IconShare size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
