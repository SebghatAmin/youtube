import VideoCard from '../components/VideoCard'

function Subscriptions({ movies }) {
  const subscribed = movies.filter((movie) => ['Action', 'Drama', 'Sci-Fi'].includes(movie.category))

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Subscriptions</h1>
        <p className="mt-1 text-neutral-600">Fresh picks from genres and directors you follow.</p>
      </div>
      <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {subscribed.map((movie) => (
          <VideoCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}

export default Subscriptions
