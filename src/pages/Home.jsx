import CategoryTabs from '../components/CategoryTabs'
import VideoCard from '../components/VideoCard'

function Home({ apiError, categories, isLoading, movies }) {
  return (
    <>
      <CategoryTabs activeCategory="All" categories={categories} />
      {isLoading ? (
        <p className="rounded-lg bg-neutral-100 p-4 font-semibold text-neutral-700">Loading movies from TMDB...</p>
      ) : movies.length ? (
        <section className="grid gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {movies.map((movie) => (
            <VideoCard key={movie.id} movie={movie} />
          ))}
        </section>
      ) : (
        <p className="rounded-lg bg-red-50 p-4 font-semibold text-red-700">{apiError || 'No movies found.'}</p>
      )}
    </>
  )
}

export default Home
