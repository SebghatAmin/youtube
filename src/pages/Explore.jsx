import VideoCard from '../components/VideoCard'

function Explore({ apiError, isLoading, movies }) {
  const trending = [...movies].sort((a, b) => Number(b.score) - Number(a.score))

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Explore</h1>
        <p className="mt-1 text-neutral-600">Popular movies, top ratings, genres, directors, and standout casts.</p>
      </div>
      {isLoading ? (
        <p className="rounded-lg bg-neutral-100 p-4 font-semibold text-neutral-700">Loading movies from TMDB...</p>
      ) : trending.length ? (
        <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {trending.map((movie) => (
            <VideoCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="rounded-lg bg-red-50 p-4 font-semibold text-red-700">{apiError || 'No movies found.'}</p>
      )}
    </section>
  )
}

export default Explore
