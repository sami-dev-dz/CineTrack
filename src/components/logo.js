import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function Logo() {
  const logoRef = useRef(null);

  useLayoutEffect(() => {
    gsap.fromTo(
      logoRef.current.children,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        delay: 0.8,
      }
    );
  }, []);

  return (
    <div className="logo" ref={logoRef}>
      <img src="/logo.png" alt="CineTrack Logo" className="app-icon" />
      <h1>CineTrack</h1>
    </div>
  );
}
