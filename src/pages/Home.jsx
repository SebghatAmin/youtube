import CategoryTabs from '../components/CategoryTabs'
import VideoCard from '../components/VideoCard'

function Home({ movies }) {
  return (
    <>
      <CategoryTabs activeCategory="All" />
      <section className="grid gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {movies.map((movie) => (
          <VideoCard key={movie.id} movie={movie} />
        ))}
      </section>
    </>
  )
}

export default Home
