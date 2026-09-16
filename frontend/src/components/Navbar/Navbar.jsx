import { useState, useRef, useEffect } from 'react'
import { useUser } from '../../hooks/useUser.jsx'
import { TOAST_MESSAGES } from '../../utils/config.js'
import './Navbar.css'

export default function Navbar({
  isDarkMode,
  onToggleDarkMode,
  onToggleMobileSidebar,
  searchQuery,
  onSearchChange,
  onShowToastNotification,
}) {
  const { user, notifications } = useUser()
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)

  const notificationContainerRef = useRef(null)
  const userContainerRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationContainerRef.current &&
        !notificationContainerRef.current.contains(event.target)
      ) {
        setIsNotificationDropdownOpen(false)
      }
      if (
        userContainerRef.current &&
        !userContainerRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const unreadCount = notifications.length

  return (
    <nav
      className="navbar flex-shrink-0 border-bottom bg-body ps-3 pe-3 pe-md-4 py-3 shadow-sm position-relative"
      style={{ zIndex: 1030 }}
    >
      <div className="container-fluid px-0 d-flex align-items-center justify-content-between">
        {/* Left Section: Mobile Toggle & Brand */}
        <div className="d-flex align-items-center gap-2">
          <button
            className="btn btn-outline-secondary d-md-none border-0 p-2"
            onClick={onToggleMobileSidebar}
            aria-label="Abrir menu"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <a className="navbar-brand d-flex align-items-center gap-2 m-0 text-decoration-none fw-bold" href="#">
            <div
              className="d-flex align-items-center justify-content-center rounded-3 bg-primary text-white shadow-sm"
              style={{ width: 36, height: 36, flexShrink: 0 }}
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
              </svg>
            </div>
            <span className="fs-5 tracking-tight">
              NEW <span className="text-primary">NEWS</span>
            </span>
          </a>
        </div>

        {/* Center Search Bar */}
        <div className="flex-grow-1 mx-3 d-none d-sm-block" style={{ maxWidth: 460 }}>
          <div className="input-group input-group-sm rounded-pill overflow-hidden border bg-body-tertiary">
            <span className="input-group-text bg-transparent border-0 pe-1 text-muted">
              <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              className="form-control bg-transparent border-0 shadow-none ps-2 py-2"
              placeholder="Buscar notícias, assuntos, categorias..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
            {searchQuery && (
              <button
                className="btn btn-sm btn-link text-muted pe-3 text-decoration-none"
                onClick={() => onSearchChange?.('')}
                aria-label="Limpar busca"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right Controls */}
        <div className="d-flex align-items-center gap-2">
          {/* Dark Mode Toggle */}
          <button
            className="btn btn-outline-secondary btn-sm rounded-pill d-flex align-items-center gap-1 px-3 py-1.5"
            onClick={onToggleDarkMode}
            title={isDarkMode ? 'Modo claro' : 'Modo escuro'}
          >
            <span>{isDarkMode ? '☀️ Light' : '🌙 Dark'}</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="position-relative" ref={notificationContainerRef}>
            <button
              className="btn btn-light rounded-circle p-2 position-relative d-flex align-items-center justify-content-center"
              style={{ width: 38, height: 38 }}
              aria-label="Notificações"
              onClick={() => setIsNotificationDropdownOpen((prev) => !prev)}
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-2 border-white rounded-circle">
                  <span className="visually-hidden">Notificações não lidas</span>
                </span>
              )}
            </button>

            {isNotificationDropdownOpen && (
              <div
                className="dropdown-menu dropdown-menu-end show shadow-lg rounded-3 border-0 mt-2 p-0"
                style={{
                  width: 'min(320px, calc(100vw - 2rem))',
                  right: 0,
                }}
              >
                <div className="p-3 border-bottom d-flex align-items-center justify-content-between bg-body-tertiary">
                  <span className="fw-semibold small">Últimas Notificações</span>
                  <span className="badge text-bg-primary rounded-pill">
                    {unreadCount} nova{unreadCount !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="list-group list-group-flush" style={{ maxHeight: 280, overflowY: 'auto' }}>
                  {notifications.length === 0 ? (
                    <div className="p-3 text-center text-muted small">Nenhuma notificação recente</div>
                  ) : (
                    notifications.map((notif) => (
                      <div key={notif.id} className="list-group-item list-group-item-action p-3 border-bottom">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <span className="badge bg-primary-subtle text-primary border border-primary-subtle" style={{ fontSize: '0.65rem' }}>
                            {notif.category}
                          </span>
                          <small className="text-muted" style={{ fontSize: '0.75rem' }}>{notif.timeAgo}</small>
                        </div>
                        <p className="mb-0 small fw-medium text-truncate">{notif.title}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="position-relative" ref={userContainerRef}>
            <button
              id="btn-user-dropdown"
              className="btn btn-link text-decoration-none d-flex align-items-center gap-2 p-1 text-reset border-0 shadow-none"
              aria-expanded={isUserDropdownOpen}
              aria-label="Menu do usuário"
              onClick={() => setIsUserDropdownOpen((prev) => !prev)}
            >
              <div
                className="rounded-circle bg-secondary-subtle text-emphasis-secondary d-flex align-items-center justify-content-center fw-semibold fs-6 shadow-sm"
                style={{ width: 38, height: 38, flexShrink: 0 }}
              >
                {user?.avatarInitial || 'U'}
              </div>

              <span className="fw-semibold small text-body d-none d-sm-inline">
                {user?.firstName || 'Usuário'}
              </span>

              <svg
                width="12"
                height="12"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="text-secondary ms-1"
                style={{
                  transition: 'transform 0.2s ease-in-out',
                  transform: isUserDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </button>

            {isUserDropdownOpen && (
              <ul
                className="dropdown-menu dropdown-menu-end show shadow-lg rounded-3 border-0 mt-2 py-2"
                style={{
                  width: 220,
                  right: 0,
                }}
              >
                <li className="px-3 py-2 border-bottom mb-1 bg-body-tertiary">
                  <div className="fw-bold text-body small">{user?.name || 'Usuário'}</div>
                  <div className="text-muted text-truncate" style={{ fontSize: '0.75rem' }}>
                    {user?.email || 'usuario@exemplo.com'}
                  </div>
                </li>

                <li>
                  <a className="dropdown-item d-flex align-items-center gap-2 py-2 small" href="#profile">
                    <span>👤</span> Meu Perfil
                  </a>
                </li>
                <li>
                  <a className="dropdown-item d-flex align-items-center gap-2 py-2 small" href="#settings">
                    <span>⚙️</span> Configurações
                  </a>
                </li>
                <li>
                  <a className="dropdown-item d-flex align-items-center gap-2 py-2 small" href="#subscription">
                    <span>✨</span> {user?.role || 'Plano Premium'}
                  </a>
                </li>

                <li>
                  <hr className="dropdown-divider my-1" />
                </li>

                <li>
                  <button
                    className="dropdown-item text-danger d-flex align-items-center gap-2 py-2 small"
                    onClick={() => {
                      setIsUserDropdownOpen(false)
                      const toast = TOAST_MESSAGES.SESSION_ENDED
                      onShowToastNotification?.(toast.message, toast.type, toast.icon)
                    }}
                  >
                    <span>🚪</span> Sair
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}