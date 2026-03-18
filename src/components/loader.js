import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function Loader() {
  const textRef = useRef(null);

  useLayoutEffect(() => {
    gsap.to(textRef.current, {
      opacity: 0.5,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <p className="loader" ref={textRef}>
      Loading...
    </p>
  );
}
