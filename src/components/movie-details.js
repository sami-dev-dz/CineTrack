import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import StarRating from "./star-rating";
import Loader from "./loader";
import { useKey } from "../hooks/use-key";
import { API_BASE, PLACEHOLDER_IMG } from "../utils/constants";

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const [error, setError] = useState("");

  const detailsRef = useRef(null);
  const headerRef = useRef(null);
  const countRef = useRef(0);

  useEffect(
    function () {
      if (userRating) countRef.current++;
    },
    [userRating]
  );

  useLayoutEffect(() => {
    if (!isLoading && movie.Title) {
      const tl = gsap.timeline();
      tl.fromTo(
        detailsRef.current,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.8, ease: "power4.out" }
      ).fromTo(
        headerRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        "-=0.4"
      );
    }
  }, [isLoading, movie.Title]);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const posterSrc =
    poster && poster !== "N/A" ? poster : PLACEHOLDER_IMG;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster: posterSrc,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useKey("Escape", onCloseMovie);

  useEffect(
    function () {
      const controller = new AbortController();

      async function getMovieDetails() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(`${API_BASE}&i=${selectedId}`, {
            signal: controller.signal,
          });

          if (!res.ok)
            throw new Error(
              "Something went wrong with fetching movie details"
            );

          const data = await res.json();
          if (data.Response === "False")
            throw new Error(data.Error || "Movie details not found");

          setMovie(data);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      getMovieDetails();

      return function () {
        controller.abort();
      };
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "CineTrack";
      };
    },
    [title]
  );

  function handleImgError(e) {
    e.target.onerror = null;
    e.target.src = PLACEHOLDER_IMG;
  }

  return (
    <div className="details" ref={detailsRef}>
      {isLoading && <Loader />}
      {!isLoading && error && (
        <div className="error">
          <span>⛔️</span> {error}
        </div>
      )}
      {!isLoading && !error && movie.Title && (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img
              src={posterSrc}
              alt={`Poster of ${title} movie`}
              onError={handleImgError}
            />
            <div className="details-overview" ref={headerRef}>
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated with movie {watchedUserRating} <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
