import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import WatchedMovie from "./watched-movie-item";

export default function WatchedMoviesList({ watched, onDeleteWatched }) {
  const listRef = useRef(null);

  useLayoutEffect(() => {
    if (watched?.length > 0) {
      gsap.fromTo(
        listRef.current.children,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.2)",
        }
      );
    }
  }, [watched]);

  return (
    <ul className="list" ref={listRef}>
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}
