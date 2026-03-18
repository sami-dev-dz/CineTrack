import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Logo from "./logo";

export default function NavBar({ children }) {
  const navRef = useRef(null);

  useLayoutEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.2 }
    );
  }, []);

  return (
    <nav className="nav-bar" ref={navRef}>
      <Logo />
      {children}
    </nav>
  );
}
