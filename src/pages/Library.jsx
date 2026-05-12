import VideoCard from '../components/VideoCard'

function Library({ apiError, isLoading, movies }) {
  return (
    <section>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Library</h1>
        <p className="mt-1 text-neutral-600">History, watchlist, and liked movies in one place.</p>
      </div>
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {['History', 'Watchlist', 'Liked movies'].map((item) => (
          <div key={item} className="rounded-xl border border-neutral-200 p-5">
            <p className="font-semibold">{item}</p>
            <p className="mt-1 text-sm text-neutral-600">{movies.length} movies</p>
          </div>
        ))}
      </div>
      {isLoading ? (
        <p className="rounded-lg bg-neutral-100 p-4 font-semibold text-neutral-700">Loading movies from TMDB...</p>
      ) : movies.length ? (
        <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {movies.slice(0, 4).map((movie) => (
            <VideoCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="rounded-lg bg-red-50 p-4 font-semibold text-red-700">{apiError || 'No movies found.'}</p>
      )}
    </section>
  )
}

export default Library
