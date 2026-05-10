import { categories } from '../data/movies'

function CategoryTabs({ activeCategory, onSelect }) {
  return (
    <div className="no-scrollbar mb-5 flex gap-3 overflow-x-auto">
      {categories.map((category) => (
        <a
          key={category}
          href={category === 'All' ? '#/' : `#/category?name=${encodeURIComponent(category)}`}
          onClick={() => onSelect?.(category)}
          className={`shrink-0 rounded-lg px-4 py-2 text-sm font-semibold ${
            activeCategory === category
              ? 'bg-neutral-950 text-white'
              : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
          }`}
        >
          {category}
        </a>
      ))}
    </div>
  )
}

export default CategoryTabs
