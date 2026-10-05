"use client";

import { useEffect, useRef } from "react";

/**
 * Wraps a card element and gives it a subtle 3D tilt toward the cursor on
 * hover, easing back flat on mouseleave. Drop-in replacement for whatever
 * element the card already is — pass `as` to pick the tag (e.g. Link).
 *
 * Respects prefers-reduced-motion by not attaching the tilt listeners at
 * all (the card just behaves like a normal static element).
 */
export default function TiltCard({ as: Component = "div", maxTilt = 8, scale = 1.015, style, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    // will-change only while hovered: holding it permanently keeps every
    // card as its own GPU layer, which adds up fast on phones.
    let clearTimer;
    function handleEnter() {
      clearTimeout(clearTimer);
      el.style.willChange = "transform";
    }
    function handleMove(e) {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(800px) rotateY(${(px * maxTilt).toFixed(2)}deg) rotateX(${(-py * maxTilt).toFixed(2)}deg) scale(${scale})`;
    }
    function handleLeave() {
      el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
      clearTimer = setTimeout(() => {
        el.style.willChange = "auto";
      }, 250);
    }

    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      clearTimeout(clearTimer);
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [maxTilt, scale]);

  return (
    <Component
      ref={ref}
      style={{ transition: "transform 0.15s ease-out", ...style }}
      {...props}
    />
  );
}
