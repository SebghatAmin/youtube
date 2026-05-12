import { defaultCategories } from '../services/tmdb'

function CategoryTabs({ activeCategory, categories = defaultCategories, onSelect }) {
  const visibleCategories = categories.length ? categories : defaultCategories

  return (
    <div className="no-scrollbar mb-5 flex gap-3 overflow-x-auto">
      {visibleCategories.map((category) => (
        <a
          key={category.id}
          href={category.name === 'All' ? '#/' : `#/category?name=${encodeURIComponent(category.name)}`}
          onClick={() => onSelect?.(category)}
          className={`shrink-0 rounded-lg px-4 py-2 text-sm font-semibold ${
            activeCategory === category.name
              ? 'bg-neutral-950 text-white'
              : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
          }`}
        >
          {category.name}
        </a>
      ))}
    </div>
  )
}

export default CategoryTabs
