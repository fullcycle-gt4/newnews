import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ToastContainer from '@/components/ToastContainer';
import { newsService } from '@/services/newsService';
import { useToastStore, useBookmarksStore } from '@/stores';
import {
  IconArrowLeft,
  IconClock,
  IconUser,
  IconShare,
  IconBookmark,
} from '@tabler/icons-react';
import './NewsPage.css';

export default function NewsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const articleId = searchParams.get('id');

  const [article, setArticle] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const showToast = useToastStore((state) => state.showToastNotification);
  const { bookmarkedArticleIds, toggleArticleBookmark, markArticleAsRead } =
    useBookmarksStore();

  useEffect(() => {
    if (!articleId) {
      setError('Nenhuma notícia foi selecionada.');
      setIsLoading(false);
      return;
    }

    async function fetchArticleData() {
      try {
        setIsLoading(true);
        setError(null);

        const res = await newsService.getNewsById(articleId);
        setArticle(res.data);
        markArticleAsRead(Number(articleId));

        // Carrega notícias relacionadas
        const newsListRes = await newsService.getNews({ limit: 4 });
        const filteredRelated = (newsListRes.data || [])
          .filter((item) => Number(item.id) !== Number(articleId))
          .slice(0, 3);
        setRelatedNews(filteredRelated);
      } catch (err) {
        setError('Não foi possível carregar os detalhes desta notícia.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchArticleData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [articleId, markArticleAsRead]);

  const handleShare = () => {
    const currentUrl = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      showToast(
        'Link da notícia copiado para a área de transferência!',
        'success',
        '🔗',
      );
    } else {
      showToast(`Compartilhando: ${article.title}`, 'info', '📢');
    }
  };

  const isBookmarked = article ? bookmarkedArticleIds.has(Number(article.id)) : false;

  return (
    <div className="min-vh-100 d-flex flex-column bg-body">
      <Navbar />

      <main className="container-xl py-4 flex-grow-1">
        {/* Botão de navegação superior */}
        <button
          onClick={() => navigate('/')}
          className="btn btn-link text-decoration-none text-body p-0 mb-4 d-inline-flex align-items-center gap-2 fw-semibold nav-back-btn"
        >
          <IconArrowLeft size={20} />
          <span>Voltar para o feed</span>
        </button>

        {/* Estado de Carregamento */}
        {isLoading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Carregando notícia...</span>
            </div>
          </div>
        )}

        {/* Estado de Erro */}
        {error && (
          <div className="alert alert-warning text-center my-4 rounded-3 p-4">
            <p className="mb-3 fw-semibold">{error}</p>
            <button
              className="btn btn-primary rounded-pill px-4"
              onClick={() => navigate('/')}
            >
              Voltar para o Feed
            </button>
          </div>
        )}

        {/* Conteúdo Principal da Notícia */}
        {!isLoading && !error && article && (
          <div className="row g-4 lg-g-5">
            {/* Coluna Principal (Artigo) */}
            <article className="col-12 col-lg-8">
              {/* Imagem de Capa com Badge da Categoria */}
              <div className="position-relative mb-4 overflow-hidden rounded-4 article-cover-wrapper">
                <img
                  src={article.image}
                  alt={article.title}
                  className="img-fluid w-100 object-fit-cover article-cover-img"
                />
                <span
                  className={`badge bg-${article.badgeBg || 'primary'} position-absolute bottom-0 start-0 m-3 px-3 py-2 rounded-pill fs-6 shadow-sm`}
                >
                  {article.category}
                </span>
              </div>

              {/* Cabeçalho da Notícia */}
              <header className="mb-4">
                <h1 className="fw-bold mb-3 article-title">{article.title}</h1>
                <p className="lead text-secondary mb-3 article-summary">
                  {article.summary}
                </p>

                {/* Metadados e Ações */}
                <div className="d-flex flex-wrap align-items-center justify-content-between py-3 border-top border-bottom gap-3 article-meta-bar">
                  <div className="d-flex flex-wrap align-items-center gap-3 text-secondary small">
                    <span className="d-inline-flex align-items-center gap-1">
                      <IconClock size={18} className="text-muted" />
                      <time>{article.publishedTimeAgo || 'Há 2 horas'}</time>
                    </span>
                    <span className="d-inline-flex align-items-center gap-1">
                      <IconUser size={18} className="text-muted" />
                      <span>Por {article.author || 'Redação NewsHub'}</span>
                    </span>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <button
                      onClick={() => toggleArticleBookmark(article.id)}
                      className={`btn btn-sm ${isBookmarked ? 'btn-primary' : 'btn-outline-secondary'} rounded-pill d-inline-flex align-items-center gap-1`}
                      title={isBookmarked ? 'Remover dos salvos' : 'Salvar notícia'}
                    >
                      <IconBookmark
                        size={16}
                        fill={isBookmarked ? 'currentColor' : 'none'}
                      />
                      <span>{isBookmarked ? 'Salvo' : 'Salvar'}</span>
                    </button>

                    <button
                      onClick={handleShare}
                      className="btn btn-sm btn-outline-secondary rounded-pill d-inline-flex align-items-center gap-1"
                    >
                      <IconShare size={16} />
                      <span>Compartilhar</span>
                    </button>
                  </div>
                </div>
              </header>

              {/* Corpo da Notícia */}
              <section className="article-body-content">
                {Array.isArray(article.content) ? (
                  article.content.map((paragraph, index) => (
                    <p key={index} className="mb-3 fs-5 lh-base">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="mb-3 fs-5 lh-base">{article.summary}</p>
                )}
              </section>
            </article>

            {/* Coluna Lateral - Notícias Relacionadas */}
            <aside className="col-12 col-lg-4">
              <div className="sticky-lg-top" style={{ top: '90px' }}>
                <h2 className="h5 fw-bold mb-3 pb-2 border-bottom">
                  Notícias relacionadas
                </h2>

                <div className="d-flex flex-column gap-3">
                  {relatedNews.map((item) => (
                    <article
                      key={item.id}
                      onClick={() => navigate(`/news?id=${item.id}`)}
                      className="card border-0 shadow-sm rounded-3 overflow-hidden related-card cursor-pointer"
                    >
                      <div className="card-body p-3 d-flex gap-3 align-items-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="rounded-3 object-fit-cover related-thumb"
                        />
                        <div className="d-flex flex-column justify-content-between min-w-0">
                          <span
                            className={`badge bg-${item.badgeBg || 'primary'} bg-opacity-10 text-${item.badgeBg || 'primary'} align-self-start mb-1 rounded-pill`}
                          >
                            {item.category}
                          </span>
                          <h3 className="h6 fw-semibold mb-1 text-truncate-2 text-body">
                            {item.title}
                          </h3>
                          <span className="text-secondary small d-inline-flex align-items-center gap-1">
                            <IconClock size={14} />
                            {item.publishedTimeAgo}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>

      <ToastContainer />
    </div>
  );
}
