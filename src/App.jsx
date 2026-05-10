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
import { fetchFeaturedMovies, movies as fallbackMovies } from './data/movies'

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
  const [movies, setMovies] = useState(fallbackMovies)
  const params = useMemo(() => new URLSearchParams(route.split('?')[1] || ''), [route])
  const path = route.split('?')[0]

  useEffect(() => {
    let isMounted = true

    fetchFeaturedMovies().then((apiMovies) => {
      if (isMounted) {
        setMovies(apiMovies)
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  const renderPage = () => {
    if (path === '/watch') {
      return <Watch movieId={params.get('v')} movies={movies} />
    }

    if (path === '/channel') {
      return <Channel director={params.get('name')} movies={movies} />
    }

    if (path === '/search') {
      return <Search query={params.get('q') || ''} movies={movies} />
    }

    if (path === '/category') {
      return <Category name={params.get('name') || 'All'} movies={movies} />
    }

    if (path === '/explore') {
      return <Explore movies={movies} />
    }

    if (path === '/subscriptions') {
      return <Subscriptions movies={movies} />
    }

    if (path === '/library') {
      return <Library movies={movies} />
    }

    return <Home movies={movies} />
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
