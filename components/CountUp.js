"use client";

import { useEffect, useRef, useState } from "react";

const EASE_OUT = (t) => 1 - Math.pow(1 - t, 3);

/**
 * Animates the numeric portion of a value (e.g. "96.3%", "₹8L", "40+",
 * "€60 Bn") counting up from 0 when it scrolls into view. Non-numeric
 * prefix/suffix characters are preserved as-is around the animated number.
 * Falls back to rendering the value statically if it has no parseable
 * number, or if the user prefers reduced motion.
 */
export default function CountUp({ value, duration = 1100, style }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(null);

  const match = typeof value === "string" ? value.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/) : null;

  useEffect(() => {
    const node = ref.current;
    if (!node || !match) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr.replace(/,/g, ""));
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;

    let raf;
    let started = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = EASE_OUT(progress);
            const current = (target * eased).toFixed(decimals);
            setDisplay(`${prefix}${current}${suffix}`);
            if (progress < 1) {
              raf = requestAnimationFrame(tick);
            } else {
              setDisplay(value);
            }
          };
          raf = requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!match) {
    return (
      <span ref={ref} style={style}>
        {value}
      </span>
    );
  }

  const [, prefix, numStr, suffix] = match;
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;

  return (
    <span ref={ref} style={style}>
      {display ?? `${prefix}${(0).toFixed(decimals)}${suffix}`}
    </span>
  );
}
