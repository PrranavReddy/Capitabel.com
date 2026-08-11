"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades + slides content up into view the first time it scrolls into the
 * viewport. Pure CSS transition under the hood (see .reveal in globals.css) —
 * this component only toggles the class via IntersectionObserver.
 *
 * Works fine wrapping server-rendered children: the children are already
 * resolved by the parent server component and just passed through.
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
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
