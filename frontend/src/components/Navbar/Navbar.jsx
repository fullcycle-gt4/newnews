import { useState, useRef, useEffect } from 'react';

import {
  IconMenu2,
  IconNews,
  IconSearch,
  IconSun,
  IconMoon,
  IconBell,
  IconChevronDown,
  IconUser,
  IconSettings,
  IconDoorExit,
  IconX,
} from '@tabler/icons-react';

import {
  useUserStore,
  useThemeStore,
  useNavigationStore,
  useToastStore,
} from '@/stores';

import { TOAST_MESSAGES } from '@/utils';

import './Navbar.css';

import { useNavigate } from 'react-router-dom';

export default function Navbar({ onToggleMobileSidebar }) {
  const navigate = useNavigate();

  // ==================================================
  // USUÁRIO
  // ==================================================

  // Pega o usuário logado
  const user = useUserStore((state) => state.user);

  // Pega a função de logout
  const logout = useUserStore((state) => state.logout);

  // ==================================================
  // NOTIFICAÇÕES
  // ==================================================

  const notifications = useUserStore(
    (state) => state.notifications,
  );

  // ==================================================
  // TEMA
  // ==================================================

  const isDarkMode = useThemeStore(
    (state) => state.isDarkMode,
  );

  const toggleDarkMode = useThemeStore(
    (state) => state.toggleDarkMode,
  );

  // ==================================================
  // PESQUISA
  // ==================================================

  const searchQuery = useNavigationStore(
    (state) => state.searchQuery,
  );

  const setSearchQuery = useNavigationStore(
    (state) => state.setSearchQuery,
  );

  // ==================================================
  // TOAST
  // ==================================================

  const showToastNotification = useToastStore(
    (state) => state.showToastNotification,
  );

  // ==================================================
  // CONTROLA MENU DE NOTIFICAÇÕES
  // ==================================================

  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);

  // ==================================================
  // CONTROLA MENU DO USUÁRIO
  // ==================================================

  const [isUserDropdownOpen, setIsUserDropdownOpen] =
    useState(false);

  // ==================================================
  // REFERÊNCIA DO MENU DE NOTIFICAÇÕES
  // ==================================================

  const notificationContainerRef = useRef(null);

  // ==================================================
  // REFERÊNCIA DO MENU DO USUÁRIO
  // ==================================================

  const userContainerRef = useRef(null);

  // ==================================================
  // FECHA OS MENUS AO CLICAR FORA
  // ==================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationContainerRef.current &&
        !notificationContainerRef.current.contains(event.target)
      ) {
        setIsNotificationDropdownOpen(false);
      }

      if (
        userContainerRef.current &&
        !userContainerRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside,
      );
    };
  }, []);

  // ==================================================
  // TROCA O TEMA
  // ==================================================

  const handleToggleTheme = () => {
    const nextMode = !isDarkMode;

    toggleDarkMode();

    const toastConfig = nextMode
      ? TOAST_MESSAGES.DARK_MODE_ON
      : TOAST_MESSAGES.DARK_MODE_OFF;

    showToastNotification(
      toastConfig.message,
      toastConfig.type,
      toastConfig.icon,
    );
  };

  // ==================================================
  // QUANTIDADE DE NOTIFICAÇÕES
  // ==================================================

  const unreadCount = notifications.length;

  // ==================================================
  // RENDERIZAÇÃO
  // ==================================================

  return (
    <nav
      className="navbar flex-shrink-0 border-bottom bg-body ps-3 pe-3 pe-md-4 py-3 shadow-sm position-relative"
      style={{ zIndex: 1030 }}
    >
      <div className="container-fluid px-0 d-flex align-items-center justify-content-between">

        {/* ================================================== */}
        {/* ESQUERDA - MENU + LOGO */}
        {/* ================================================== */}

        <div className="d-flex align-items-center gap-2">

          {/* Botão menu mobile */}
          <button
            type="button"
            className="btn btn-outline-secondary d-md-none border-0 p-2"
            onClick={onToggleMobileSidebar}
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebarOffcanvas"
            aria-controls="sidebarOffcanvas"
            aria-label="Abrir menu"
          >
            <IconMenu2 size={20} />
          </button>

          {/* Logo */}
          <button
            type="button"
            className="navbar-brand btn btn-link d-flex align-items-center gap-2 m-0 p-0 text-body text-decoration-none fw-bold"
            onClick={() => navigate('/')}
            aria-label="Ir para a página inicial do New News"
          >
            <div
              className="d-flex align-items-center justify-content-center rounded-3 bg-primary text-white shadow-sm"
              style={{
                width: 36,
                height: 36,
                flexShrink: 0,
              }}
            >
              <IconNews size={20} />
            </div>

            <span className="fs-5 tracking-tight">
              NEW <span className="text-primary">NEWS</span>
            </span>
          </button>
        </div>

        {/* ================================================== */}
        {/* CENTRO - PESQUISA */}
        {/* ================================================== */}

        <div
          className="flex-grow-1 mx-3 d-none d-sm-block"
          style={{ maxWidth: 460 }}
        >
          <div className="input-group input-group-sm rounded-pill overflow-hidden border bg-body-tertiary">

            <span className="input-group-text bg-transparent border-0 pe-1 text-muted">
              <IconSearch size={15} />
            </span>

            <input
              type="text"
              className="form-control bg-transparent border-0 shadow-none ps-2 py-2"
              placeholder="Buscar notícias, assuntos, categorias..."
              aria-label="Buscar notícias, assuntos ou categorias"
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
            />

            {/* Botão limpar pesquisa */}
            {searchQuery && (
              <button
                type="button"
                className="btn btn-sm btn-link text-muted pe-3 text-decoration-none"
                onClick={() => setSearchQuery('')}
                aria-label="Limpar busca"
              >
                <IconX size={14} />
              </button>
            )}

          </div>
        </div>

        {/* ================================================== */}
        {/* DIREITA */}
        {/* ================================================== */}

        <div className="d-flex align-items-center gap-2">

          {/* ================================================== */}
          {/* DARK MODE */}
          {/* ================================================== */}

          <button
            type="button"
            className="btn btn-outline-secondary btn-sm rounded-pill d-flex align-items-center gap-1 px-3 py-1.5"
            onClick={handleToggleTheme}
            aria-label={
              isDarkMode
                ? 'Alternar para modo claro'
                : 'Alternar para modo escuro'
            }
            title={
              isDarkMode
                ? 'Modo claro'
                : 'Modo escuro'
            }
          >
            {isDarkMode ? (
              <IconSun size={16} />
            ) : (
              <IconMoon size={16} />
            )}

            <span>
              {isDarkMode ? 'Light' : 'Dark'}
            </span>
          </button>

          {/* ================================================== */}
          {/* SE ESTIVER LOGADO */}
          {/* ================================================== */}

          {user ? (
            <>
              {/* ============================================ */}
              {/* NOTIFICAÇÕES */}
              {/* ============================================ */}

              <div
                className="position-relative"
                ref={notificationContainerRef}
              >
                <button
                  type="button"
                  className="btn btn-light rounded-circle p-2 position-relative d-flex align-items-center justify-content-center"
                  style={{
                    width: 38,
                    height: 38,
                  }}
                  aria-label="Notificações"
                  aria-expanded={
                    isNotificationDropdownOpen
                  }
                  onClick={() =>
                    setIsNotificationDropdownOpen(
                      (prev) => !prev,
                    )
                  }
                >
                  <IconBell size={18} />

                  {/* Bolinha vermelha */}
                  {unreadCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-2 border-white rounded-circle">
                      <span className="visually-hidden">
                        Notificações não lidas
                      </span>
                    </span>
                  )}
                </button>

                {/* Dropdown das notificações */}
                {isNotificationDropdownOpen && (
                  <div
                    className="dropdown-menu dropdown-menu-end show shadow-lg rounded-3 border-0 mt-2 p-0"
                    style={{
                      width:
                        'min(320px, calc(100vw - 2rem))',
                      right: 0,
                    }}
                  >
                    <div className="p-3 border-bottom d-flex align-items-center justify-content-between bg-body-tertiary">

                      <span className="fw-semibold small">
                        Últimas Notificações
                      </span>

                      <span className="badge text-bg-primary rounded-pill">
                        {unreadCount} nova
                        {unreadCount !== 1
                          ? 's'
                          : ''}
                      </span>

                    </div>

                    <div
                      className="list-group list-group-flush"
                      style={{
                        maxHeight: 280,
                        overflowY: 'auto',
                      }}
                    >
                      {notifications.length === 0 ? (
                        <div className="p-3 text-center text-muted small">
                          Nenhuma notificação recente
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className="list-group-item list-group-item-action p-3 border-bottom"
                          >
                            <div className="d-flex align-items-center justify-content-between mb-1">

                              <span
                                className="badge bg-primary-subtle text-primary border border-primary-subtle"
                                style={{
                                  fontSize: '0.65rem',
                                }}
                              >
                                {notif.category}
                              </span>

                              <small
                                className="text-muted"
                                style={{
                                  fontSize: '0.75rem',
                                }}
                              >
                                {notif.timeAgo}
                              </small>

                            </div>

                            <p className="mb-0 small fw-medium text-truncate">
                              {notif.title}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* ============================================ */}
              {/* MENU DO USUÁRIO */}
              {/* ============================================ */}

              <div
                className="position-relative navbar-user-dropdown-wrapper"
                ref={userContainerRef}
              >
                <button
                  id="btn-user-dropdown"
                  type="button"
                  className="btn btn-link text-decoration-none d-flex align-items-center gap-2 p-1 text-reset border-0 shadow-none"
                  aria-expanded={isUserDropdownOpen}
                  aria-label="Menu do usuário"
                  onClick={() =>
                    setIsUserDropdownOpen(
                      (prev) => !prev,
                    )
                  }
                >

                  {/* Avatar */}
                  <div
                    className="rounded-circle bg-secondary-subtle text-emphasis-secondary d-flex align-items-center justify-content-center fw-semibold fs-6 shadow-sm"
                    style={{
                      width: 38,
                      height: 38,
                      flexShrink: 0,
                    }}
                  >
                    {user?.avatarInitial || 'U'}
                  </div>

                  {/* Nome */}
                  <span className="fw-semibold small text-body d-none d-sm-inline">
                    {user?.firstName}
                  </span>

                  {/* Seta */}
                  <IconChevronDown
                    size={14}
                    className="text-secondary ms-1"
                    style={{
                      transition:
                        'transform 0.2s ease-in-out',

                      transform:
                        isUserDropdownOpen
                          ? 'rotate(180deg)'
                          : 'rotate(0deg)',
                    }}
                  />
                </button>

                {/* Dropdown do usuário */}
                {isUserDropdownOpen && (
                  <ul
                    className="dropdown-menu dropdown-menu-end show shadow-lg rounded-3 border-0 mt-2 py-2"
                    style={{
                      width: 220,
                      right: 0,
                    }}
                  >

                    {/* Dados do usuário */}
                    <li className="px-3 py-2 border-bottom mb-1 bg-body-tertiary">

                      <div className="fw-bold text-body small">
                        {user?.name}
                      </div>

                      <div
                        className="text-muted text-truncate"
                        style={{
                          fontSize: '0.75rem',
                        }}
                      >
                        {user?.email}
                      </div>

                    </li>

                    {/* Meu perfil */}
                    <li>
                      <button
                        type="button"
                        className="dropdown-item d-flex align-items-center gap-2 py-2 small"
                        onClick={() => {
                          setIsUserDropdownOpen(false);

                          navigate(
                            '/config?section=profile',
                          );
                        }}
                      >
                        <IconUser size={16} />

                        Meu Perfil
                      </button>
                    </li>

                    {/* Configurações */}
                    <li>
                      <button
                        type="button"
                        className="dropdown-item d-flex align-items-center gap-2 py-2 small"
                        onClick={() => {
                          setIsUserDropdownOpen(false);

                          navigate(
                            '/config?section=settings',
                          );
                        }}
                      >
                        <IconSettings size={16} />

                        Configurações
                      </button>
                    </li>

                    <li>
                      <hr className="dropdown-divider my-1" />
                    </li>

                    {/* ======================================== */}
                    {/* SAIR */}
                    {/* ======================================== */}

                    <li>
                      <button
                        type="button"
                        className="dropdown-item text-danger d-flex align-items-center gap-2 py-2 small"
                        onClick={() => {
                          // Fecha o menu
                          setIsUserDropdownOpen(false);

                          // Remove o usuário
                          logout();

                          // Volta para a tela inicial
                          navigate('/');

                          // Mostra mensagem
                          const toast =
                            TOAST_MESSAGES.SESSION_ENDED;

                          showToastNotification(
                            toast.message,
                            toast.type,
                            toast.icon,
                          );
                        }}
                      >
                        <IconDoorExit size={16} />

                        Sair
                      </button>
                    </li>

                  </ul>
                )}

              </div>
            </>
          ) : (

            /* ================================================== */
            /* VISITANTE */
            /* ================================================== */

            <>
              {/* Entrar */}
              <button
                type="button"
                className="btn btn-outline-primary btn-sm rounded-pill px-3"
                onClick={() => navigate('/login')}
              >
                Entrar
              </button>

              {/* Cadastrar */}
              <button
                type="button"
                className="btn btn-primary btn-sm rounded-pill px-3"
                onClick={() =>
                  navigate('/register')
                }
              >
                Cadastrar
              </button>
            </>

          )}

        </div>

      </div>
    </nav>
  );
}