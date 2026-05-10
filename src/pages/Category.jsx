import CategoryTabs from '../components/CategoryTabs'
import VideoCard from '../components/VideoCard'

function getAverageRating(movies) {
  const ratings = movies.map((movie) => Number(movie.imdbRating)).filter((rating) => !Number.isNaN(rating))

  if (!ratings.length) {
    return 'N/A'
  }

  return (ratings.reduce((total, rating) => total + rating, 0) / ratings.length).toFixed(1)
}

function getTopDirectors(movies) {
  return [...new Set(movies.map((movie) => movie.director))]
    .slice(0, 3)
    .join(', ')
}

function getFeaturedCast(movies) {
  return [...new Set(movies.flatMap((movie) => movie.actors.split(', ').slice(0, 2)))]
    .slice(0, 5)
    .join(', ')
}

function Category({ name, movies }) {
  const selectedCategory = name || 'All'
  const categoryVideos =
    selectedCategory === 'All' ? movies : movies.filter((movie) => movie.category === selectedCategory)
  const visibleVideos = categoryVideos.length ? categoryVideos : movies.slice(0, 8)
  const averageRating = getAverageRating(visibleVideos)
  const topDirectors = getTopDirectors(visibleVideos)
  const featuredCast = getFeaturedCast(visibleVideos)

  return (
    <section>
      <CategoryTabs activeCategory={selectedCategory} />
      <div className="mb-6 rounded-xl bg-neutral-950 p-5 text-white">
        <p className="text-sm font-semibold uppercase tracking-wide text-red-300">Genre</p>
        <h1 className="mt-1 text-3xl font-bold">{selectedCategory}</h1>
        <p className="mt-2 max-w-3xl text-neutral-300">
          {categoryVideos.length
            ? `${categoryVideos.length} movies selected from the ${selectedCategory.toLowerCase()} section with posters, ratings, runtimes, cast, and plot details.`
            : 'Fresh picks from across the app while this section is filling up.'}
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-white/10 p-3">
            <p className="text-xs uppercase text-neutral-400">Average IMDb</p>
            <p className="mt-1 text-xl font-bold">{averageRating}</p>
          </div>
          <div className="rounded-lg bg-white/10 p-3">
            <p className="text-xs uppercase text-neutral-400">Directors</p>
            <p className="mt-1 text-sm font-semibold">{topDirectors || 'Coming soon'}</p>
          </div>
          <div className="rounded-lg bg-white/10 p-3">
            <p className="text-xs uppercase text-neutral-400">Featured Cast</p>
            <p className="mt-1 text-sm font-semibold">{featuredCast || 'Coming soon'}</p>
          </div>
        </div>
      </div>
      <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {visibleVideos.map((movie) => (
          <VideoCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}

export default Category
