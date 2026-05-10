const API_KEY = import.meta.env.VITE_OMDB_API_KEY
const API_URL = 'https://www.omdbapi.com/'

export const featuredImdbIds = [
  'tt0111161',
  'tt0068646',
  'tt0468569',
  'tt1375666',
  'tt0133093',
  'tt0816692',
  'tt0109830',
  'tt0120737',
  'tt0110912',
  'tt6751668',
  'tt4154796',
  'tt7286456',
]

export const movies = [
  {
    id: 'tt0111161',
    title: 'The Shawshank Redemption',
    category: 'Drama',
    year: '1994',
    rated: 'R',
    duration: '2h 22m',
    runtime: '142 min',
    imdbRating: '9.3',
    director: 'Frank Darabont',
    actors: 'Tim Robbins, Morgan Freeman, Bob Gunton',
    poster: 'https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg',
    description:
      'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
  },
  {
    id: 'tt0068646',
    title: 'The Godfather',
    category: 'Crime',
    year: '1972',
    rated: 'R',
    duration: '2h 55m',
    runtime: '175 min',
    imdbRating: '9.2',
    director: 'Francis Ford Coppola',
    actors: 'Marlon Brando, Al Pacino, James Caan',
    poster: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
    description:
      'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
  },
  {
    id: 'tt0468569',
    title: 'The Dark Knight',
    category: 'Action',
    year: '2008',
    rated: 'PG-13',
    duration: '2h 32m',
    runtime: '152 min',
    imdbRating: '9.0',
    director: 'Christopher Nolan',
    actors: 'Christian Bale, Heath Ledger, Aaron Eckhart',
    poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    description:
      'Batman faces the Joker, a criminal mastermind who pushes Gotham City and its hero toward chaos.',
  },
  {
    id: 'tt1375666',
    title: 'Inception',
    category: 'Sci-Fi',
    year: '2010',
    rated: 'PG-13',
    duration: '2h 28m',
    runtime: '148 min',
    imdbRating: '8.8',
    director: 'Christopher Nolan',
    actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page',
    poster: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
    description:
      'A thief who steals corporate secrets through dream-sharing technology is offered a chance to erase his criminal past.',
  },
  {
    id: 'tt0133093',
    title: 'The Matrix',
    category: 'Sci-Fi',
    year: '1999',
    rated: 'R',
    duration: '2h 16m',
    runtime: '136 min',
    imdbRating: '8.7',
    director: 'Lana Wachowski, Lilly Wachowski',
    actors: 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss',
    poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    description:
      'A computer hacker learns that the world he knows is a simulated reality controlled by intelligent machines.',
  },
  {
    id: 'tt0816692',
    title: 'Interstellar',
    category: 'Adventure',
    year: '2014',
    rated: 'PG-13',
    duration: '2h 49m',
    runtime: '169 min',
    imdbRating: '8.7',
    director: 'Christopher Nolan',
    actors: 'Matthew McConaughey, Anne Hathaway, Jessica Chastain',
    poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    description:
      'A team of explorers travels through a wormhole in space in an attempt to ensure humanity’s survival.',
  },
  {
    id: 'tt0109830',
    title: 'Forrest Gump',
    category: 'Drama',
    year: '1994',
    rated: 'PG-13',
    duration: '2h 22m',
    runtime: '142 min',
    imdbRating: '8.8',
    director: 'Robert Zemeckis',
    actors: 'Tom Hanks, Robin Wright, Gary Sinise',
    poster: 'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
    description:
      'The life journey of a kind-hearted Alabama man intersects with decades of American history.',
  },
  {
    id: 'tt6751668',
    title: 'Parasite',
    category: 'Thriller',
    year: '2019',
    rated: 'R',
    duration: '2h 12m',
    runtime: '132 min',
    imdbRating: '8.5',
    director: 'Bong Joon Ho',
    actors: 'Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong',
    poster: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
    description:
      'Greed and class discrimination threaten the newly formed relationship between a wealthy family and a poor family.',
  },
  {
    id: 'tt0137523',
    title: 'Fight Club',
    category: 'Drama',
    genres: 'Drama',
    year: '1999',
    rated: 'R',
    duration: '2h 19m',
    runtime: '139 min',
    imdbRating: '8.8',
    director: 'David Fincher',
    actors: 'Brad Pitt, Edward Norton, Helena Bonham Carter',
    poster: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    description:
      'An insomniac office worker and a soap maker form an underground fight club that grows into something far more dangerous.',
  },
  {
    id: 'tt0167260',
    title: 'The Lord of the Rings: The Return of the King',
    category: 'Fantasy',
    genres: 'Adventure, Drama, Fantasy',
    year: '2003',
    rated: 'PG-13',
    duration: '3h 21m',
    runtime: '201 min',
    imdbRating: '9.0',
    director: 'Peter Jackson',
    actors: 'Elijah Wood, Viggo Mortensen, Ian McKellen',
    poster: 'https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg',
    description:
      'Gondor prepares for its final stand as Frodo and Sam approach Mount Doom with the One Ring.',
  },
  {
    id: 'tt0120737',
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    category: 'Fantasy',
    genres: 'Adventure, Drama, Fantasy',
    year: '2001',
    rated: 'PG-13',
    duration: '2h 58m',
    runtime: '178 min',
    imdbRating: '8.9',
    director: 'Peter Jackson',
    actors: 'Elijah Wood, Ian McKellen, Orlando Bloom',
    poster: 'https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg',
    description:
      'A meek Hobbit begins a perilous journey to destroy a powerful ring before darkness overtakes Middle-earth.',
  },
  {
    id: 'tt0241527',
    title: "Harry Potter and the Sorcerer's Stone",
    category: 'Fantasy',
    genres: 'Adventure, Family, Fantasy',
    year: '2001',
    rated: 'PG',
    duration: '2h 32m',
    runtime: '152 min',
    imdbRating: '7.6',
    director: 'Chris Columbus',
    actors: 'Daniel Radcliffe, Rupert Grint, Emma Watson',
    poster: 'https://image.tmdb.org/t/p/w500/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg',
    description:
      'An orphan discovers he is a wizard and begins his first year at a hidden school of magic.',
  },
  {
    id: 'tt0088763',
    title: 'Back to the Future',
    category: 'Comedy',
    genres: 'Adventure, Comedy, Sci-Fi',
    year: '1985',
    rated: 'PG',
    duration: '1h 56m',
    runtime: '116 min',
    imdbRating: '8.5',
    director: 'Robert Zemeckis',
    actors: 'Michael J. Fox, Christopher Lloyd, Lea Thompson',
    poster: 'https://image.tmdb.org/t/p/w500/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg',
    description:
      'A teenager is accidentally sent back to 1955 and must make sure his parents fall in love.',
  },
  {
    id: 'tt2278388',
    title: 'The Grand Budapest Hotel',
    category: 'Comedy',
    genres: 'Adventure, Comedy, Crime',
    year: '2014',
    rated: 'R',
    duration: '1h 39m',
    runtime: '99 min',
    imdbRating: '8.1',
    director: 'Wes Anderson',
    actors: 'Ralph Fiennes, F. Murray Abraham, Mathieu Amalric',
    poster: 'https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg',
    description:
      'A hotel concierge and his lobby boy become tangled in theft, inheritance, and a changing Europe.',
  },
  {
    id: 'tt0110912',
    title: 'Pulp Fiction',
    category: 'Crime',
    genres: 'Crime, Drama',
    year: '1994',
    rated: 'R',
    duration: '2h 34m',
    runtime: '154 min',
    imdbRating: '8.9',
    director: 'Quentin Tarantino',
    actors: 'John Travolta, Uma Thurman, Samuel L. Jackson',
    poster: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
    description:
      'The lives of hitmen, a boxer, gangsters, and a mysterious briefcase collide in Los Angeles.',
  },
  {
    id: 'tt0114369',
    title: 'Se7en',
    category: 'Crime',
    genres: 'Crime, Drama, Mystery',
    year: '1995',
    rated: 'R',
    duration: '2h 7m',
    runtime: '127 min',
    imdbRating: '8.6',
    director: 'David Fincher',
    actors: 'Morgan Freeman, Brad Pitt, Kevin Spacey',
    poster: 'https://image.tmdb.org/t/p/w500/69Sns8WoET6CfaYlIkHbla4l7nC.jpg',
    description:
      'Two detectives hunt a serial killer whose crimes are staged around the seven deadly sins.',
  },
  {
    id: 'tt0081505',
    title: 'The Shining',
    category: 'Thriller',
    genres: 'Drama, Horror, Thriller',
    year: '1980',
    rated: 'R',
    duration: '2h 26m',
    runtime: '146 min',
    imdbRating: '8.4',
    director: 'Stanley Kubrick',
    actors: 'Jack Nicholson, Shelley Duvall, Danny Lloyd',
    poster: 'https://image.tmdb.org/t/p/w500/xazWoLealQwEgqZ89MLZklLZD3k.jpg',
    description:
      'A family becomes isolated in a remote hotel where a sinister presence pushes the father toward violence.',
  },
  {
    id: 'tt2267998',
    title: 'Gone Girl',
    category: 'Thriller',
    genres: 'Drama, Mystery, Thriller',
    year: '2014',
    rated: 'R',
    duration: '2h 29m',
    runtime: '149 min',
    imdbRating: '8.1',
    director: 'David Fincher',
    actors: 'Ben Affleck, Rosamund Pike, Neil Patrick Harris',
    poster: 'https://image.tmdb.org/t/p/w500/lv5xShBIDPe7m4ufdlV0IAc7Avk.jpg',
    description:
      'A husband becomes the center of a media storm when his wife disappears on their fifth wedding anniversary.',
  },
  {
    id: 'tt1392190',
    title: 'Mad Max: Fury Road',
    category: 'Action',
    genres: 'Action, Adventure, Sci-Fi',
    year: '2015',
    rated: 'R',
    duration: '2h',
    runtime: '120 min',
    imdbRating: '8.1',
    director: 'George Miller',
    actors: 'Tom Hardy, Charlize Theron, Nicholas Hoult',
    poster: 'https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg',
    description:
      'In a desert wasteland, a drifter and a rebel warrior flee a tyrant in a roaring convoy.',
  },
  {
    id: 'tt0172495',
    title: 'Gladiator',
    category: 'Action',
    genres: 'Action, Adventure, Drama',
    year: '2000',
    rated: 'R',
    duration: '2h 35m',
    runtime: '155 min',
    imdbRating: '8.5',
    director: 'Ridley Scott',
    actors: 'Russell Crowe, Joaquin Phoenix, Connie Nielsen',
    poster: 'https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg',
    description:
      'A betrayed Roman general rises as a gladiator and seeks revenge against the emperor who murdered his family.',
  },
  {
    id: 'tt6710474',
    title: 'Everything Everywhere All at Once',
    category: 'Action',
    genres: 'Action, Adventure, Comedy',
    year: '2022',
    rated: 'R',
    duration: '2h 19m',
    runtime: '139 min',
    imdbRating: '7.8',
    director: 'Daniel Kwan, Daniel Scheinert',
    actors: 'Michelle Yeoh, Stephanie Hsu, Ke Huy Quan',
    poster: 'https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg',
    description:
      'A laundromat owner is pulled into a multiverse crisis where her choices ripple across countless lives.',
  },
  {
    id: 'tt0910970',
    title: 'WALL-E',
    category: 'Adventure',
    genres: 'Adventure, Animation, Family',
    year: '2008',
    rated: 'G',
    duration: '1h 38m',
    runtime: '98 min',
    imdbRating: '8.4',
    director: 'Andrew Stanton',
    actors: 'Ben Burtt, Elissa Knight, Jeff Garlin',
    poster: 'https://image.tmdb.org/t/p/w500/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg',
    description:
      'A lonely trash-compacting robot discovers a new purpose when he meets a sleek probe from the stars.',
  },
  {
    id: 'tt2380307',
    title: 'Coco',
    category: 'Adventure',
    genres: 'Adventure, Animation, Family',
    year: '2017',
    rated: 'PG',
    duration: '1h 45m',
    runtime: '105 min',
    imdbRating: '8.4',
    director: 'Lee Unkrich, Adrian Molina',
    actors: 'Anthony Gonzalez, Gael Garcia Bernal, Benjamin Bratt',
    poster: 'https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg',
    description:
      'A young musician enters the Land of the Dead to uncover his family history and follow his dream.',
  },
]

export const categories = ['All', 'Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 'Sci-Fi', 'Thriller', 'Fantasy']

export function getInitials(value) {
  return value
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function minutesToDuration(runtime) {
  const minutes = Number.parseInt(runtime, 10)

  if (Number.isNaN(minutes)) {
    return runtime || 'Movie'
  }

  const hours = Math.floor(minutes / 60)
  const remainder = minutes % 60
  return hours ? `${hours}h ${remainder}m` : `${remainder}m`
}

function valueOrFallback(value, fallback) {
  return value && value !== 'N/A' ? value : fallback
}

export function normalizeMovie(movie) {
  const genre = valueOrFallback(movie.Genre, 'Movie')
  const director = valueOrFallback(movie.Director, 'IMDb')

  return {
    id: movie.imdbID,
    title: valueOrFallback(movie.Title, 'Untitled movie'),
    category: genre.split(',')[0].trim(),
    genres: genre,
    year: valueOrFallback(movie.Year, 'Unknown year'),
    rated: valueOrFallback(movie.Rated, 'Not rated'),
    duration: minutesToDuration(movie.Runtime),
    runtime: valueOrFallback(movie.Runtime, 'Runtime unavailable'),
    imdbRating: valueOrFallback(movie.imdbRating, 'N/A'),
    director,
    actors: valueOrFallback(movie.Actors, 'Cast unavailable'),
    poster: valueOrFallback(movie.Poster, ''),
    description: valueOrFallback(movie.Plot, 'No plot summary is available yet.'),
    avatar: getInitials(director),
  }
}

async function fetchJson(params) {
  const response = await fetch(`${API_URL}?apikey=${API_KEY}&${params}`)
  const data = await response.json()

  if (!response.ok || data.Response === 'False') {
    throw new Error(data.Error || 'Could not load movies')
  }

  return data
}

export async function fetchFeaturedMovies() {
  if (!API_KEY) {
    return movies
  }

  try {
    const results = await Promise.all(
      featuredImdbIds.map((id) => fetchJson(`i=${encodeURIComponent(id)}&plot=short`)),
    )
    return results.map(normalizeMovie)
  } catch (error) {
    console.warn(error)
    return movies
  }
}

export async function searchMovies(query) {
  const trimmedQuery = query.trim()

  if (!API_KEY || !trimmedQuery) {
    return []
  }

  try {
    const results = await fetchJson(`s=${encodeURIComponent(trimmedQuery)}&type=movie`)
    const details = await Promise.all(
      results.Search.slice(0, 12).map((movie) => fetchJson(`i=${encodeURIComponent(movie.imdbID)}&plot=short`)),
    )
    return details.map(normalizeMovie)
  } catch (error) {
    console.warn(error)
    return []
  }
}

export function getPoster(movie) {
  if (movie.poster) {
    return movie.poster
  }

  if (API_KEY && movie.id) {
    return `https://img.omdbapi.com/?apikey=${API_KEY}&i=${encodeURIComponent(movie.id)}&h=600`
  }

  return movie.poster || getPosterPlaceholder(movie.title)
}

export function getPosterFallback(movie) {
  return movie.poster || getPosterPlaceholder(movie.title)
}

export function getPosterPlaceholder(title) {
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

export function findMovie(id, movieList = movies) {
  return movieList.find((movie) => movie.id === id) || movieList[0] || movies[0]
}
