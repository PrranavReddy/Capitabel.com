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
    let raf = 0;

    function update() {
      raf = 0;
      const bar = barRef.current;
      if (!bar) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0;
      bar.style.transform = `scaleX(${ratio})`;
    }

    // Scroll events can fire several times per frame; do the layout read and
    // the write once per frame instead.
    function schedule() {
      if (!raf) raf = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
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
        width: "100%",
        transform: "scaleX(0)",
        transformOrigin: "left",
        background: "var(--orange-500)",
        zIndex: 60,
        transition: "transform 0.1s linear",
      }}
    />
  );
}
