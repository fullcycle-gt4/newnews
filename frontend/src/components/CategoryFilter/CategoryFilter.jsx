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
            className={`btn btn-sm rounded-pill fw-medium ${isActive ? 'btn-primary' : 'btn-outline-secondary'}`}
            aria-pressed={isActive}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
