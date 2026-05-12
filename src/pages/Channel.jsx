import VideoCard from '../components/VideoCard'

function Channel({ apiError, director, isLoading, movies }) {
  if (!movies.length) {
    return (
      <p className="rounded-lg bg-neutral-100 p-4 font-semibold text-neutral-700">
        {isLoading ? 'Loading movies from TMDB...' : apiError || 'No movies found.'}
      </p>
    )
  }

  const directorName = director || movies[0].director
  const directorMovies = movies.filter((movie) => movie.director === directorName)
  const fallbackMovies = directorMovies.length ? directorMovies : movies.slice(0, 4)

  return (
    <section>
      <div className="mb-8 border-b border-neutral-200 pb-6">
        <div className="h-36 rounded-xl bg-gradient-to-r from-neutral-900 via-red-700 to-neutral-200" />
        <div className="mt-5 flex items-center gap-4">
          <span className="grid h-20 w-20 place-items-center rounded-full bg-neutral-900 text-xl font-bold text-white">
            {directorName
              .split(' ')
              .map((word) => word[0])
              .join('')
              .slice(0, 2)}
          </span>
          <div>
            <h1 className="text-3xl font-bold">{directorName}</h1>
            <p className="mt-1 text-neutral-600">
              @{directorName.toLowerCase().replaceAll(' ', '')} - {fallbackMovies.length} movies
            </p>
          </div>
        </div>
      </div>
      <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {fallbackMovies.map((movie) => (
          <VideoCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}

export default Channel
