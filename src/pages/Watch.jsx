import VideoCard from '../components/VideoCard'
import { findMovie, getInitials, getPoster, getPosterFallback, getPosterPlaceholder } from '../data/movies'

function Watch({ movieId, movies }) {
  const movie = findMovie(movieId, movies)
  const related = movies.filter((item) => item.id !== movie.id)

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
      <div>
        <div className="grid gap-6 rounded-xl bg-neutral-950 p-4 text-white sm:grid-cols-[minmax(220px,300px)_1fr]">
          <img
            src={getPoster(movie)}
            alt={movie.title}
            onError={(event) => {
              const image = event.currentTarget

              if (image.dataset.fallback !== 'poster') {
                image.dataset.fallback = 'poster'
                image.src = getPosterFallback(movie)
                return
              }

              image.onerror = null
              image.src = getPosterPlaceholder(movie.title)
            }}
            className="aspect-[2/3] w-full rounded-lg object-cover"
          />
          <div className="flex min-w-0 flex-col justify-end py-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-red-300">{movie.category}</p>
            <h1 className="mt-2 text-3xl font-bold sm:text-5xl">{movie.title}</h1>
            <p className="mt-3 text-neutral-300">
              {movie.year} - {movie.rated} - {movie.runtime}
            </p>
            <p className="mt-4 max-w-3xl text-neutral-200">{movie.description}</p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <a href={`#/channel?name=${encodeURIComponent(movie.director)}`} className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-neutral-900 text-sm font-bold text-white">
              {movie.avatar || getInitials(movie.director)}
            </span>
            <span>
              <span className="block font-semibold">{movie.director}</span>
              <span className="text-sm text-neutral-600">Director</span>
            </span>
          </a>
          <div className="flex gap-2">
            <button className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold hover:bg-neutral-200">
              Watchlist
            </button>
            <button className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold hover:bg-neutral-200">
              Share
            </button>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-neutral-100 p-4">
          <p className="font-semibold">IMDb {movie.imdbRating} / 10</p>
          <p className="mt-2 text-neutral-700">Cast: {movie.actors}</p>
        </div>
      </div>

      <aside className="space-y-4">
        <h2 className="text-lg font-bold">Related movies</h2>
        {related.map((item) => (
          <VideoCard key={item.id} movie={item} horizontal />
        ))}
      </aside>
    </section>
  )
}

export default Watch
