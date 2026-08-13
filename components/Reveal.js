"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades + slides content up into view the first time it scrolls into the
 * viewport. Pure CSS transition under the hood (see .reveal in globals.css) —
 * this component only toggles the class via IntersectionObserver.
 *
 * Works fine wrapping server-rendered children: the children are already
 * resolved by the parent server component and just passed through.
 *
 * Defensive by design: content must never get stuck invisible just because
 * an observer callback was slow, missed, or didn't fire (fast/flicked
 * scrolls, older mobile browsers, etc. — this has been observed to happen).
 * So on top of the observer, this (a) shows immediately if the element is
 * already in the viewport on mount, and (b) forces visible after a short
 * timeout no matter what the observer does.
 */
export default function Reveal({ children, as: Tag = "div", delay = 0, className = "", style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect reduced-motion users and skip straight to visible.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    // Already on/near screen at mount (e.g. above the fold, or the page
    // loaded already scrolled) — no need to wait on an observer at all.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }

    let done = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done) {
          done = true;
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(node);

    // Safety net: never let content stay invisible indefinitely if the
    // observer is late, misses the intersection, or never fires.
    const fallback = setTimeout(() => {
      if (!done) {
        done = true;
        setVisible(true);
        observer.disconnect();
      }
    }, 1500);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms", ...style }}
    >
      {children}
    </Tag>
  );
}
