import { useState, useRef, useEffect } from 'react'
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
} from '@tabler/icons-react'
import { useUser } from '../../context/UserContext.jsx'
import { useTheme } from '../../context/ThemeContext.jsx'
import { useNavigation } from '../../context/NavigationContext.jsx'
import { useToast } from '../../context/ToastContext.jsx'
import { TOAST_MESSAGES } from '../../utils/config.js'
import './Navbar.css'

export default function Navbar({ onToggleMobileSidebar }) {
  const { user, notifications } = useUser()
  const { isDarkMode, toggleDarkMode } = useTheme()
  const { searchQuery, setSearchQuery } = useNavigation()
  const { showToastNotification } = useToast()

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

  const handleToggleTheme = () => {
    const nextMode = !isDarkMode
    toggleDarkMode()
    const toastConfig = nextMode ? TOAST_MESSAGES.DARK_MODE_ON : TOAST_MESSAGES.DARK_MODE_OFF
    showToastNotification(toastConfig.message, toastConfig.type, toastConfig.icon)
  }

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
            <IconMenu2 size={20} />
          </button>

          <div className="navbar-brand d-flex align-items-center gap-2 m-0 fw-bold">
            <div
              className="d-flex align-items-center justify-content-center rounded-3 bg-primary text-white shadow-sm"
              style={{ width: 36, height: 36, flexShrink: 0 }}
            >
              <IconNews size={20} />
            </div>
            <span className="fs-5 tracking-tight">
              NEW <span className="text-primary">NEWS</span>
            </span>
          </div>
        </div>

        {/* Center Search Bar */}
        <div className="flex-grow-1 mx-3 d-none d-sm-block" style={{ maxWidth: 460 }}>
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
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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

        {/* Right Controls */}
        <div className="d-flex align-items-center gap-2">
          {/* Dark Mode Toggle */}
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm rounded-pill d-flex align-items-center gap-1 px-3 py-1.5"
            onClick={handleToggleTheme}
            aria-label={isDarkMode ? 'Alternar para modo claro' : 'Alternar para modo escuro'}
            title={isDarkMode ? 'Modo claro' : 'Modo escuro'}
          >
            {isDarkMode ? <IconSun size={16} /> : <IconMoon size={16} />}
            <span>{isDarkMode ? 'Light' : 'Dark'}</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="position-relative" ref={notificationContainerRef}>
            <button
              type="button"
              className="btn btn-light rounded-circle p-2 position-relative d-flex align-items-center justify-content-center"
              style={{ width: 38, height: 38 }}
              aria-label="Notificações"
              aria-expanded={isNotificationDropdownOpen}
              onClick={() => setIsNotificationDropdownOpen((prev) => !prev)}
            >
              <IconBell size={18} />
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
          <div className="position-relative navbar-user-dropdown-wrapper" ref={userContainerRef}>
            <button
              id="btn-user-dropdown"
              type="button"
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

              <IconChevronDown
                size={14}
                className="text-secondary ms-1"
                style={{
                  transition: 'transform 0.2s ease-in-out',
                  transform: isUserDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
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
                  <button
                    type="button"
                    className="dropdown-item d-flex align-items-center gap-2 py-2 small"
                    onClick={() => setIsUserDropdownOpen(false)}
                  >
                    <IconUser size={16} /> Meu Perfil
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="dropdown-item d-flex align-items-center gap-2 py-2 small"
                    onClick={() => setIsUserDropdownOpen(false)}
                  >
                    <IconSettings size={16} /> Configurações
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider my-1" />
                </li>

                <li>
                  <button
                    type="button"
                    className="dropdown-item text-danger d-flex align-items-center gap-2 py-2 small"
                    onClick={() => {
                      setIsUserDropdownOpen(false)
                      const toast = TOAST_MESSAGES.SESSION_ENDED
                      showToastNotification(toast.message, toast.type, toast.icon)
                    }}
                  >
                    <IconDoorExit size={16} /> Sair
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