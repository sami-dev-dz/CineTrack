import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Movie from "./movie-item";

export default function MovieList({ movies, onSelectMovie }) {
  const listRef = useRef(null);

  useLayoutEffect(() => {
    if (movies?.length > 0) {
      gsap.fromTo(
        listRef.current.children,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
        }
      );
    }
  }, [movies]);

  return (
    <ul className="list list-movies" ref={listRef}>
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}
