const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY
const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN
const TMDB_API_URL = 'https://api.themoviedb.org/3'
const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

const languageNames =
  typeof Intl.DisplayNames === 'function' ? new Intl.DisplayNames(['en'], { type: 'language' }) : null

export const defaultCategories = [{ id: 'all', name: 'All' }]

export function hasTmdbCredentials() {
  return Boolean(TMDB_API_KEY || TMDB_ACCESS_TOKEN)
}

function assertCredentials() {
  if (!hasTmdbCredentials()) {
    throw new Error('Add VITE_TMDB_API_KEY to your .env file to load movies from TMDB.')
  }
}

async function fetchFromTmdb(path, params = {}) {
  assertCredentials()

  const url = new URL(`${TMDB_API_URL}${path}`)
  url.searchParams.set('language', 'en-US')

  if (TMDB_API_KEY) {
    url.searchParams.set('api_key', TMDB_API_KEY)
  }

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value)
    }
  })

  const response = await fetch(url, {
    headers: TMDB_ACCESS_TOKEN ? { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` } : undefined,
  })
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.status_message || 'Could not load movies from TMDB.')
  }

  return data
}

function formatDate(value) {
  if (!value) {
    return 'Release date unavailable'
  }

  const date = new Date(`${value}T00:00:00`)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return dateFormatter.format(date)
}

function formatRuntime(minutes) {
  const runtime = Number(minutes)

  if (!runtime) {
    return 'Runtime unavailable'
  }

  const hours = Math.floor(runtime / 60)
  const remainder = runtime % 60
  return hours ? `${hours}h ${remainder}m` : `${remainder}m`
}

function formatScore(value) {
  const score = Number(value)

  if (!score) {
    return 'N/A'
  }

  return score.toFixed(1)
}

function formatLanguage(code) {
  if (!code) {
    return 'Language unavailable'
  }

  try {
    return languageNames?.of(code) || code.toUpperCase()
  } catch {
    return code.toUpperCase()
  }
}

function getCrewMember(movie, job) {
  return movie.credits?.crew?.find((member) => member.job === job)?.name
}

function getCertification(movie) {
  const countries = movie.release_dates?.results || []
  const preferredCountry = countries.find(
    (country) => country.iso_3166_1 === 'US' && country.release_dates?.some((release) => release.certification),
  )
  const countryWithRating =
    preferredCountry || countries.find((country) => country.release_dates?.some((release) => release.certification))
  const certification = countryWithRating?.release_dates?.find((release) => release.certification)?.certification

  return certification || 'Not rated'
}

function getPosterUrl(path, size = 'w500') {
  return path ? `${TMDB_IMAGE_URL}/${size}${path}` : ''
}

function normalizeMovie(movie) {
  const genres = movie.genres?.map((genre) => genre.name).filter(Boolean) || []
  const director = getCrewMember(movie, 'Director') || 'TMDB'
  const cast = movie.credits?.cast?.slice(0, 3).map((actor) => actor.name).filter(Boolean) || []
  const score = formatScore(movie.vote_average)
  const releaseDate = formatDate(movie.release_date)

  return {
    id: String(movie.id),
    tmdbId: movie.id,
    imdbId: movie.external_ids?.imdb_id || movie.imdb_id || '',
    title: movie.title || movie.original_title || 'Untitled movie',
    category: genres[0] || 'Movie',
    genres: genres.join(', ') || 'Movie',
    year: movie.release_date ? movie.release_date.slice(0, 4) : 'Unknown year',
    releaseDate,
    originalReleaseDate: movie.release_date || '',
    language: formatLanguage(movie.original_language),
    languageCode: movie.original_language || '',
    rating: getCertification(movie),
    score,
    imdbRating: score,
    voteCount: movie.vote_count || 0,
    duration: formatRuntime(movie.runtime),
    runtime: formatRuntime(movie.runtime),
    director,
    actors: cast.join(', ') || 'Cast unavailable',
    poster: getPosterUrl(movie.poster_path),
    backdrop: getPosterUrl(movie.backdrop_path, 'w1280'),
    description: movie.overview || 'No plot summary is available yet.',
    avatar: getInitials(director),
  }
}

async function hydrateMovie(movie) {
  try {
    return await fetchMovieById(movie.id)
  } catch (error) {
    console.warn(error)
    return normalizeMovie(movie)
  }
}

async function hydrateMovies(results, limit = 20) {
  return Promise.all(results.slice(0, limit).map(hydrateMovie))
}

export async function fetchMovieGenres() {
  const data = await fetchFromTmdb('/genre/movie/list')
  const genres = (data.genres || []).map((genre) => ({ id: String(genre.id), name: genre.name }))

  return [...defaultCategories, ...genres]
}

export async function fetchFeaturedMovies() {
  const data = await fetchFromTmdb('/movie/popular', {
    page: 1,
    region: 'US',
  })

  return hydrateMovies(data.results || [])
}

export async function fetchMoviesByGenre(genreId) {
  if (!genreId || genreId === 'all') {
    return fetchFeaturedMovies()
  }

  const data = await fetchFromTmdb('/discover/movie', {
    include_adult: 'false',
    page: 1,
    region: 'US',
    sort_by: 'popularity.desc',
    with_genres: genreId,
  })

  return hydrateMovies(data.results || [])
}

export async function searchMovies(query) {
  const trimmedQuery = query.trim()

  if (!trimmedQuery) {
    return []
  }

  const data = await fetchFromTmdb('/search/movie', {
    include_adult: 'false',
    query: trimmedQuery,
    page: 1,
    region: 'US',
  })

  return hydrateMovies(data.results || [], 12)
}

export async function fetchMovieById(id) {
  const movie = await fetchFromTmdb(`/movie/${id}`, {
    append_to_response: 'credits,external_ids,release_dates',
  })

  return normalizeMovie(movie)
}

export function getInitials(value = '') {
  return value
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function getPoster(movie) {
  return movie.poster || getPosterPlaceholder(movie.title)
}

export function getPosterFallback(movie) {
  return movie.backdrop || getPosterPlaceholder(movie.title)
}

export function getPosterPlaceholder(title = 'Movie') {
  const safeTitle = title
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 445">
      <rect width="300" height="445" fill="#171717"/>
      <rect x="22" y="22" width="256" height="401" rx="18" fill="#262626" stroke="#525252"/>
      <text x="150" y="205" fill="#f5f5f5" font-family="Arial, sans-serif" font-size="28" font-weight="700" text-anchor="middle">Movie</text>
      <text x="150" y="250" fill="#d4d4d4" font-family="Arial, sans-serif" font-size="18" text-anchor="middle">${safeTitle}</text>
    </svg>
  `)}`
}

export function findMovie(id, movieList = []) {
  if (!id) {
    return movieList[0] || null
  }

  return movieList.find((movie) => String(movie.id) === String(id)) || null
}
