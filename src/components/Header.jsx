import { useState } from 'react'

function Header() {
  const [search, setSearch] = useState('')

  const submitSearch = (event) => {
    event.preventDefault()
    const query = search.trim()

    if (query) {
      window.location.hash = `/search?q=${encodeURIComponent(query)}`
    }
  }

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        <a href="#/" className="flex items-center gap-1.5 font-bold tracking-tight">
          <span className="relative h-5 w-7 rounded-[6px] bg-red-600">
            <span className="absolute left-1/2 top-1/2 h-0 w-0 -translate-x-[35%] -translate-y-1/2 border-y-[5px] border-l-[8px] border-y-transparent border-l-white" />
          </span>
          <span className="text-lg leading-none">YouTube</span>
        </a>

        <form onSubmit={submitSearch} className="mx-auto hidden w-full max-w-2xl items-center sm:flex">
          <input
            name="q"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-10 min-w-0 flex-1 rounded-l-full border border-neutral-300 px-5 outline-none focus:border-blue-500"
            placeholder="Search"
            autoComplete="off"
          />
          <button className="h-10 rounded-r-full border border-l-0 border-neutral-300 bg-neutral-50 px-6 font-medium hover:bg-neutral-100">
            Search
          </button>
        </form>

        <a
          href="#/subscriptions"
          className="rounded-full bg-neutral-950 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800"
        >
          Sign in
        </a>
      </div>

      <form onSubmit={submitSearch} className="flex gap-2 border-t border-neutral-100 px-4 py-3 sm:hidden">
        <input
          name="q"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="h-10 min-w-0 flex-1 rounded-full border border-neutral-300 px-4 outline-none focus:border-blue-500"
          placeholder="Search"
          autoComplete="off"
        />
        <button className="rounded-full bg-neutral-950 px-4 text-sm font-semibold text-white">Go</button>
      </form>
    </header>
  )
}

export default Header
