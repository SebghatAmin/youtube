import { useEffect, useMemo, useState } from 'react'
import CategoryTabs from '../components/CategoryTabs'
import VideoCard from '../components/VideoCard'
import { fetchMoviesByGenre } from '../services/tmdb'

function getAverageScore(movies) {
  const scores = movies.map((movie) => Number(movie.score)).filter((score) => !Number.isNaN(score))

  if (!scores.length) {
    return 'N/A'
  }

  return (scores.reduce((total, score) => total + score, 0) / scores.length).toFixed(1)
}

function getTopLanguages(movies) {
  return [...new Set(movies.map((movie) => movie.language).filter(Boolean))]
    .slice(0, 3)
    .join(', ')
}

function getRatings(movies) {
  return [...new Set(movies.map((movie) => movie.rating).filter(Boolean))]
    .slice(0, 4)
    .join(', ')
}

function Category({ apiError, categories, isLoading, name, movies }) {
  const selectedCategory = name || 'All'
  const selectedGenre = useMemo(
    () => categories.find((category) => category.name === selectedCategory),
    [categories, selectedCategory],
  )
  const [genreState, setGenreState] = useState({
    error: '',
    genreId: '',
    isLoading: false,
    movies: [],
  })
  const shouldLoadGenre = selectedCategory !== 'All' && selectedGenre?.id

  useEffect(() => {
    let isMounted = true

    if (!shouldLoadGenre) {
      return undefined
    }

    async function loadGenreMovies() {
      try {
        setGenreState((state) => ({ ...state, error: '', genreId: selectedGenre.id, isLoading: true }))
        const tmdbMovies = await fetchMoviesByGenre(selectedGenre.id)

        if (isMounted) {
          setGenreState({ error: '', genreId: selectedGenre.id, isLoading: false, movies: tmdbMovies })
        }
      } catch (error) {
        if (isMounted) {
          setGenreState({ error: error.message, genreId: selectedGenre.id, isLoading: false, movies: [] })
        }
      }
    }

    loadGenreMovies()

    return () => {
      isMounted = false
    }
  }, [selectedGenre?.id, shouldLoadGenre])

  const isActiveGenreState = shouldLoadGenre && genreState.genreId === selectedGenre.id
  const categoryMovies = isActiveGenreState ? genreState.movies : movies
  const visibleMovies = categoryMovies.length ? categoryMovies : movies
  const isCategoryLoading = isLoading || (isActiveGenreState && genreState.isLoading)
  const categoryError = (isActiveGenreState && genreState.error) || apiError
  const averageScore = getAverageScore(visibleMovies)
  const languages = getTopLanguages(visibleMovies)
  const ratings = getRatings(visibleMovies)

  return (
    <section>
      <CategoryTabs activeCategory={selectedCategory} categories={categories} />
      <div className="mb-6 rounded-xl bg-neutral-950 p-5 text-white">
        <p className="text-sm font-semibold uppercase tracking-wide text-red-300">Genre</p>
        <h1 className="mt-1 text-3xl font-bold">{selectedCategory}</h1>
        <p className="mt-2 max-w-3xl text-neutral-300">
          {visibleMovies.length
            ? `${visibleMovies.length} TMDB movies with posters, release dates, languages, scores, and ratings.`
            : 'TMDB movies will appear here after the API request finishes.'}
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-white/10 p-3">
            <p className="text-xs uppercase text-neutral-400">Average Score</p>
            <p className="mt-1 text-xl font-bold">{averageScore}</p>
          </div>
          <div className="rounded-lg bg-white/10 p-3">
            <p className="text-xs uppercase text-neutral-400">Languages</p>
            <p className="mt-1 text-sm font-semibold">{languages || 'Coming soon'}</p>
          </div>
          <div className="rounded-lg bg-white/10 p-3">
            <p className="text-xs uppercase text-neutral-400">Ratings</p>
            <p className="mt-1 text-sm font-semibold">{ratings || 'Coming soon'}</p>
          </div>
        </div>
      </div>
      {isCategoryLoading ? (
        <p className="rounded-lg bg-neutral-100 p-4 font-semibold text-neutral-700">Loading movies from TMDB...</p>
      ) : visibleMovies.length ? (
        <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {visibleMovies.map((movie) => (
            <VideoCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="rounded-lg bg-red-50 p-4 font-semibold text-red-700">{categoryError || 'No movies found.'}</p>
      )}
    </section>
  )
}

export default Category
