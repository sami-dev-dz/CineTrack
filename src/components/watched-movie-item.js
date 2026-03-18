import { PLACEHOLDER_IMG } from "../utils/constants";

export default function WatchedMovie({ movie, onDeleteWatched }) {
  const posterSrc =
    movie.poster && movie.poster !== "N/A" ? movie.poster : PLACEHOLDER_IMG;

  function handleImgError(e) {
    e.target.onerror = null;
    e.target.src = PLACEHOLDER_IMG;
  }

  return (
    <li>
      <img
        src={posterSrc}
        alt={`${movie.title} poster`}
        onError={handleImgError}
      />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
