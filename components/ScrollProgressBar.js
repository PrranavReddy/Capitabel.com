"use client";

import { useEffect, useRef } from "react";

/**
 * A thin fixed bar pinned to the very top of the viewport that fills left
 * to right as the page scrolls. Sits above the sticky Nav (z-index) so it's
 * visible on every page regardless of scroll position.
 */
export default function ScrollProgressBar() {
  const barRef = useRef(null);

  useEffect(() => {
    function update() {
      const bar = barRef.current;
      if (!bar) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      bar.style.width = `${pct}%`;
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: 3,
        width: "0%",
        background: "var(--orange-500)",
        zIndex: 60,
        transition: "width 0.1s linear",
      }}
    />
  );
}
