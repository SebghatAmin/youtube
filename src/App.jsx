import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Subscriptions from './pages/Subscriptions'
import Watch from './pages/Watch'
import Channel from './pages/Channel'
import Search from './pages/Search'
import Library from './pages/Library'
import Category from './pages/Category'
import { defaultCategories, fetchFeaturedMovies, fetchMovieGenres } from './services/tmdb'

const getRoute = () => window.location.hash.replace('#', '') || '/'

function useHashRoute() {
  const [route, setRoute] = useState(getRoute())

  useEffect(() => {
    const onChange = () => setRoute(getRoute())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}

function App() {
  const route = useHashRoute()
  const [movies, setMovies] = useState([])
  const [categories, setCategories] = useState(defaultCategories)
  const [isLoadingMovies, setIsLoadingMovies] = useState(true)
  const [apiError, setApiError] = useState('')
  const params = useMemo(() => new URLSearchParams(route.split('?')[1] || ''), [route])
  const path = route.split('?')[0]

  useEffect(() => {
    let isMounted = true

    async function loadTmdbData() {
      try {
        setIsLoadingMovies(true)
        const [tmdbCategories, featuredMovies] = await Promise.all([fetchMovieGenres(), fetchFeaturedMovies()])

        if (isMounted) {
          setCategories(tmdbCategories)
          setMovies(featuredMovies)
          setApiError('')
        }
      } catch (error) {
        if (isMounted) {
          setApiError(error.message)
        }
      } finally {
        if (isMounted) {
          setIsLoadingMovies(false)
        }
      }
    }

    loadTmdbData()

    return () => {
      isMounted = false
    }
  }, [])

  const renderPage = () => {
    if (path === '/watch') {
      return <Watch apiError={apiError} isLoading={isLoadingMovies} movieId={params.get('v')} movies={movies} />
    }

    if (path === '/channel') {
      return <Channel apiError={apiError} director={params.get('name')} isLoading={isLoadingMovies} movies={movies} />
    }

    if (path === '/search') {
      return <Search apiError={apiError} query={params.get('q') || ''} movies={movies} />
    }

    if (path === '/category') {
      return (
        <Category
          apiError={apiError}
          categories={categories}
          isLoading={isLoadingMovies}
          name={params.get('name') || 'All'}
          movies={movies}
        />
      )
    }

    if (path === '/explore') {
      return <Explore apiError={apiError} isLoading={isLoadingMovies} movies={movies} />
    }

    if (path === '/subscriptions') {
      return <Subscriptions apiError={apiError} isLoading={isLoadingMovies} movies={movies} />
    }

    if (path === '/library') {
      return <Library apiError={apiError} isLoading={isLoadingMovies} movies={movies} />
    }

    return <Home apiError={apiError} categories={categories} isLoading={isLoadingMovies} movies={movies} />
  }

  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <Header />
      <div className="flex">
        <Sidebar currentPath={path} />
        <main className="min-w-0 flex-1 px-4 pb-12 pt-4 sm:px-6 lg:px-8">{renderPage()}</main>
      </div>
    </div>
  )
}

export default App
