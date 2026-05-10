import { useEffect, useState } from 'react'
import VideoCard from '../components/VideoCard'
import { searchMovies } from '../data/movies'

function Search({ query, movies }) {
  const [remoteSearch, setRemoteSearch] = useState({ query: '', results: [] })
  const normalizedQuery = query.toLowerCase()
  const localResults = movies.filter((movie) =>
    [movie.title, movie.director, movie.category, movie.description, movie.actors].some((value) =>
      value.toLowerCase().includes(normalizedQuery),
    ),
  )
  const apiResults = remoteSearch.query === query ? remoteSearch.results : []
  const results = apiResults.length ? apiResults : localResults

  useEffect(() => {
    let isMounted = true

    if (!query.trim()) {
      return undefined
    }

    searchMovies(query).then((moviesFromApi) => {
      if (isMounted) {
        setRemoteSearch({ query, results: moviesFromApi })
      }
    })

    return () => {
      isMounted = false
    }
  }, [query])

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Search results</h1>
        <p className="mt-1 text-neutral-600">
          {query ? `Showing movies for "${query}"` : 'Type a movie, actor, director, or genre in the search bar.'}
        </p>
      </div>
      <div className="space-y-5">
        {(results.length ? results : movies).map((movie) => (
          <VideoCard key={movie.id} movie={movie} horizontal />
        ))}
      </div>
    </section>
  )
}

export default Search
