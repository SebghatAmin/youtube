import VideoCard from '../components/VideoCard'

function Explore({ movies }) {
  const trending = [...movies].sort((a, b) => Number(b.imdbRating) - Number(a.imdbRating))

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Explore</h1>
        <p className="mt-1 text-neutral-600">Popular movies, top ratings, genres, directors, and standout casts.</p>
      </div>
      <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {trending.map((movie) => (
          <VideoCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}

export default Explore
