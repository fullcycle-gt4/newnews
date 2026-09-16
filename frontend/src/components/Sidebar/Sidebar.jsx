import './Sidebar.css'

export default function Sidebar({ navigationItems = [], activeNavId, onSelectNavItem, bookmarkedArticlesCount = 0 }) {
  const mainNavItems = navigationItems.filter(
    (item) => item.id !== 'salvos' && item.id !== 'favoritos'
  )

  const bottomNavItems = [
    {
      id: 'salvos',
      label: 'Meus favoritos',
      icon: '🔖',
      badge: bookmarkedArticlesCount,
    },
    { id: 'perfil', label: 'Meu perfil', icon: '👤' },
    { id: 'configuracoes', label: 'Configurações', icon: '⚙️' },
  ]

  return (
    <aside id="sidebar-desktop" className="sidebar d-none d-md-flex flex-column border-end" style={{ width: 220 }}>
      <p className="text-uppercase text-secondary fw-semibold px-3 pt-3 pb-1 mb-0 flex-shrink-0" style={{ fontSize: '0.68rem', letterSpacing: '0.08em' }}>
        Menu Principal
      </p>

      {/* Internal scroll area strictly bounded by sidebar-nav-scroll */}
      <nav className="sidebar-nav-scroll px-2 pb-2">
        {mainNavItems.map((item) => (
          <button
            key={item.id}
            id={`nav-${item.id}`}
            onClick={() => onSelectNavItem?.(item.id)}
            className={`sidebar-item btn btn-link w-100 text-start d-flex align-items-center gap-2 rounded-3 px-3 py-2 mb-1 text-decoration-none fw-medium ${
              activeNavId === item.id ? 'active bg-primary text-white' : 'text-secondary'
            }`}
          >
            <span style={{ fontSize: '1rem', width: 20, textAlign: 'center' }}>{item.icon}</span>
            <span style={{ fontSize: '0.875rem' }}>{item.label}</span>
            {item.badge > 0 && (
              <span className={`badge ms-auto ${activeNavId === item.id ? 'text-bg-light' : 'text-bg-primary'}`} style={{ fontSize: '0.7rem' }}>
                {item.badge}
              </span>
            )}
            {activeNavId === item.id && !item.badge && <span className="ms-auto sidebar-indicator rounded-pill bg-white opacity-75" />}
          </button>
        ))}
      </nav>

      {/* Fixed bottom section */}
      <div className="sidebar-bottom-section px-2 mt-auto flex-shrink-0">
        <div className="sidebar-divider mx-2 my-2" />
        {bottomNavItems.map((item) => (
          <button
            key={item.id}
            id={`nav-${item.id}`}
            onClick={() => onSelectNavItem?.(item.id)}
            className={`sidebar-item btn btn-link w-100 text-start d-flex align-items-center gap-2 rounded-3 px-3 py-2 mb-1 text-decoration-none fw-medium ${
              activeNavId === item.id ? 'active bg-primary text-white' : 'text-secondary'
            }`}
          >
            <span style={{ fontSize: '1rem', width: 20, textAlign: 'center' }}>{item.icon}</span>
            <span style={{ fontSize: '0.875rem' }}>{item.label}</span>
            {item.badge > 0 && (
              <span className={`badge ms-auto ${activeNavId === item.id ? 'text-bg-light' : 'text-bg-primary'}`} style={{ fontSize: '0.7rem' }}>
                {item.badge}
              </span>
            )}
            {activeNavId === item.id && !item.badge && <span className="ms-auto sidebar-indicator rounded-pill bg-white opacity-75" />}
          </button>
        ))}
      </div>
    </aside>
  )
}

export function SidebarOffcanvas({ navigationItems = [], activeNavId, onSelectNavItem, bookmarkedArticlesCount = 0 }) {
  const mainNavItems = navigationItems.filter(
    (item) => item.id !== 'salvos' && item.id !== 'favoritos'
  )

  const bottomNavItems = [
    {
      id: 'salvos',
      label: 'Meus favoritos',
      icon: '🔖',
      badge: bookmarkedArticlesCount,
    },
    { id: 'perfil', label: 'Meu perfil', icon: '👤' },
    { id: 'configuracoes', label: 'Configurações', icon: '⚙️' },
  ]

  return (
    <div id="sidebarOffcanvas" className="offcanvas offcanvas-start" tabIndex={-1} aria-labelledby="sidebarOffcanvasLabel" style={{ width: 240 }}>
      <div className="offcanvas-header border-bottom py-2" style={{ backgroundColor: 'var(--nn-navbar-bg)' }}>
        <div className="d-flex align-items-center gap-2">
          <div className="d-flex align-items-center justify-content-center rounded-2 bg-primary" style={{ width: 28, height: 28 }}>
            <svg width="16" height="16" fill="white" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
              <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
            </svg>
          </div>
          <span id="sidebarOffcanvasLabel" className="fw-bold text-white" style={{ fontSize: '0.95rem', letterSpacing: '-0.3px' }}>
            NEW <span className="text-primary">NEWS</span>
          </span>
        </div>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Fechar" />
      </div>

      <div className="offcanvas-body p-2 d-flex flex-column h-100 overflow-hidden">
        <p className="text-uppercase text-secondary fw-semibold px-2 pt-1 pb-1 mb-1" style={{ fontSize: '0.68rem', letterSpacing: '0.08em' }}>
          Menu Principal
        </p>
        <nav className="sidebar-nav-scroll px-2 pb-2">
          {mainNavItems.map((item) => (
            <button
              key={item.id}
              data-bs-dismiss="offcanvas"
              onClick={() => onSelectNavItem?.(item.id)}
              className={`btn btn-link w-100 text-start d-flex align-items-center gap-2 rounded-3 px-3 py-2 mb-1 text-decoration-none fw-medium ${
                activeNavId === item.id ? 'bg-primary text-white' : 'text-secondary'
              }`}
            >
              <span style={{ fontSize: '1rem', width: 20, textAlign: 'center' }}>{item.icon}</span>
              <span style={{ fontSize: '0.875rem' }}>{item.label}</span>
              {item.badge > 0 && (
                <span className={`badge ms-auto ${activeNavId === item.id ? 'text-bg-light' : 'text-bg-primary'}`} style={{ fontSize: '0.7rem' }}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom-section flex-shrink-0">
          <div className="sidebar-divider mx-2 my-2" />
          {bottomNavItems.map((item) => (
            <button
              key={item.id}
              data-bs-dismiss="offcanvas"
              onClick={() => onSelectNavItem?.(item.id)}
              className={`btn btn-link w-100 text-start d-flex align-items-center gap-2 rounded-3 px-3 py-2 mb-1 text-decoration-none fw-medium ${
                activeNavId === item.id ? 'bg-primary text-white' : 'text-secondary'
              }`}
            >
              <span style={{ fontSize: '1rem', width: 20, textAlign: 'center' }}>{item.icon}</span>
              <span style={{ fontSize: '0.875rem' }}>{item.label}</span>
              {item.badge > 0 && (
                <span className={`badge ms-auto ${activeNavId === item.id ? 'text-bg-light' : 'text-bg-primary'}`} style={{ fontSize: '0.7rem' }}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}