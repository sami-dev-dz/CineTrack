import { useRef } from "react";
import gsap from "gsap";
import { PLACEHOLDER_IMG } from "../utils/constants";

export default function Movie({ movie, onSelectMovie }) {
  const itemRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(itemRef.current, {
      scale: 1.02,
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(itemRef.current, {
      scale: 1,
      backgroundColor: "transparent",
      duration: 0.3,
    });
  };

  const posterSrc =
    movie.Poster && movie.Poster !== "N/A" ? movie.Poster : PLACEHOLDER_IMG;

  function handleImgError(e) {
    e.target.onerror = null;
    e.target.src = PLACEHOLDER_IMG;
  }

  return (
    <li
      onClick={() => onSelectMovie(movie.imdbID)}
      ref={itemRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={posterSrc}
        alt={`${movie.Title} poster`}
        onError={handleImgError}
      />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
