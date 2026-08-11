"use client";

import { useEffect, useRef } from "react";

/**
 * Drop-in wrapper for a button/link that gently pulls toward the cursor
 * once it comes within `radius` px, easing back to rest on mouseleave.
 * Listens on window (not just its own bounds) so the pull kicks in slightly
 * before the cursor actually reaches the element.
 *
 * Skipped entirely under prefers-reduced-motion.
 */
export default function MagneticButton({ as: Component = "a", strength = 0.3, radius = 80, style, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    function handleMove(e) {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < radius) {
        el.style.transform = `translate(${(dx * strength).toFixed(1)}px, ${(dy * strength).toFixed(1)}px)`;
      } else {
        el.style.transform = "translate(0px, 0px)";
      }
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [strength, radius]);

  return (
    <Component
      ref={ref}
      style={{ transition: "transform 0.15s ease-out", ...style }}
      {...props}
    />
  );
}
