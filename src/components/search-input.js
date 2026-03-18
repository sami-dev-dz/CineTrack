import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { useKey } from "../hooks/use-key";

export default function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  useLayoutEffect(() => {
    gsap.fromTo(
      inputEl.current,
      { width: "0%", opacity: 0 },
      { width: "100%", opacity: 1, duration: 1, ease: "power4.out", delay: 1 }
    );
  }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
