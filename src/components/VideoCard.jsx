import {
  getInitials,
  getPoster,
  getPosterFallback,
  getPosterPlaceholder,
} from "../data/movies";

function VideoCard({ movie, horizontal = false }) {
  return (
    <article
      className={`group ${horizontal ? "grid grid-cols-[60px_1fr] items-start gap-3 sm:grid-cols-[60px_1fr]" : ""}`}
    >
      <a
        href={`#/watch?v=${movie.id}`}
        className="relative block aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100"
      >
        <img
          src={getPoster(movie)}
          alt={movie.title}
          onError={(event) => {
            const image = event.currentTarget;

            if (image.dataset.fallback !== "poster") {
              image.dataset.fallback = "poster";
              image.src = getPosterFallback(movie);
              return;
            }

            image.onerror = null;
            image.src = getPosterPlaceholder(movie.title);
          }}
          className="h-full w-full object-cover transition duration-200 group-hover:scale-105"
        />
        <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-semibold text-white">
          {movie.duration}
        </span>
      </a>

      <div className={`mt-3 flex gap-3 ${horizontal ? "mt-0" : ""}`}>
        {!horizontal && (
          <a
            href={`#/channel?name=${encodeURIComponent(movie.director)}`}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-neutral-900 text-xs font-bold text-white"
          >
            {movie.avatar || getInitials(movie.director)}
          </a>
        )}
        <div className="min-w-0">
          <a href={`#/watch?v=${movie.id}`} className="block">
            <h3 className="line-clamp-2 text-sm font-bold leading-5 text-neutral-950">
              {movie.title}
            </h3>
          </a>
          <a
            href={`#/channel?name=${encodeURIComponent(movie.director)}`}
            className="mt-1 block truncate text-sm text-neutral-600 hover:text-neutral-950"
          >
            {movie.director}
          </a>
          <p className="text-sm text-neutral-600">
            IMDb {movie.imdbRating} / 10 - {movie.year}
          </p>
        </div>
      </div>
    </article>
  );
}

export default VideoCard;
