import { useState, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const boxRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    gsap.fromTo(
      boxRef.current,
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  useLayoutEffect(() => {
    if (isOpen && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  return (
    <div className="box" ref={boxRef}>
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>

      {isOpen && <div ref={contentRef}>{children}</div>}
    </div>
  );
}
