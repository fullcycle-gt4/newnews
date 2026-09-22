export default function CategoryFilter({ categories = ['Todos'], activeCategory, onSelectCategory }) {
  return (
    <div id="category-filter" className="d-flex flex-wrap gap-2 mb-4" role="group" aria-label="Filtrar por categoria">
      {categories.map((category) => {
        const isActive = activeCategory === category
        return (
          <button
            key={category}
            id={`category-${category.toLowerCase()}`}
            onClick={() => onSelectCategory?.(category)}
            className={`btn btn-sm rounded-pill fw-medium px-3 py-2 d-inline-flex align-items-center justify-content-center ${
              isActive ? 'btn-primary shadow-sm' : 'btn-outline-secondary'
            }`}
            style={{ minHeight: 40 }}
            aria-pressed={isActive}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
