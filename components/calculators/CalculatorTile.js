"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTileTransition } from "./TileTransitionOverlay";

/**
 * A calculator card that, on click, grows from its own on-screen position
 * to fill the viewport before the actual calculator page appears.
 *
 * The overlay that does the growing does NOT live in this component - it's
 * rendered by TileTransitionProvider (see
 * components/calculators/TileTransitionOverlay.js), one layer up in
 * app/calculators/layout.js, which stays mounted across the navigation from
 * the hub page to a calculator page. That's what lets the overlay survive
 * the page swap and fade out on the other side, instead of vanishing the
 * instant router.push() happens (a hard cut we shipped once and had to fix).
 *
 * This component only: measures its own rect, hands it off, and fades
 * itself out so the overlay reads as continuous with the tile underneath
 * it. Respects prefers-reduced-motion by skipping straight to navigation;
 * modifier/middle-clicks still open a new tab as normal.
 */
export default function CalculatorTile({ href, sample, tag, title, desc }) {
  const ref = useRef(null);
  const router = useRouter();
  const startTransition = useTileTransition();
  const [hover, setHover] = useState(false);
  const [expanding, setExpanding] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  }, []);

  function handleClick(e) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return; // let modifier/middle clicks behave normally
    e.preventDefault();
    if (expanding) return;
    if (reducedMotion.current || !ref.current || !startTransition) {
      router.push(href);
      return;
    }
    setExpanding(true);
    startTransition(ref.current.getBoundingClientRect(), href);
  }

  const cardStyle = {
    display: "block",
    position: "relative",
    background: "var(--cream-100)",
    border: `1px solid ${hover ? "var(--orange-500)" : "var(--navy-a08)"}`,
    borderRadius: 12,
    padding: 36,
    minHeight: 220,
    cursor: "pointer",
    boxShadow: hover && !reducedMotion.current ? "0 16px 32px -12px rgba(22,38,77,0.18)" : "0 0 0 rgba(0,0,0,0)",
    transform: hover && !reducedMotion.current ? "translateY(-3px)" : "translateY(0)",
    transition: "border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease",
    opacity: expanding ? 0 : 1,
  };

  return (
    <a
      ref={ref}
      href={href}
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={cardStyle}
    >
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--orange-500)", marginBottom: 16 }}>
        {tag}
      </div>
      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 26, lineHeight: 1.15, letterSpacing: "-0.015em", margin: "0 0 12px", color: "var(--navy-900)" }}>
        {title}
      </h3>
      <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--navy-700)", margin: "0 0 20px", maxWidth: 460 }}>{desc}</p>

      {sample && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "#FFFFFF",
            border: "1px solid var(--navy-a12)",
            borderRadius: 8,
            padding: "10px 14px",
            marginBottom: 20,
          }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--navy-700)", flexShrink: 0 }}>
            e.g.
          </span>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17, color: "var(--navy-900)", fontVariantNumeric: "tabular-nums", flexShrink: 0 }}>
            {sample}
          </span>
          <div style={{ flex: 1, height: 4, borderRadius: 2, background: "var(--navy-a12)", position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "38%", background: "var(--orange-500)", borderRadius: 2 }} />
            <div
              style={{
                position: "absolute",
                left: "38%",
                top: "50%",
                transform: "translate(-50%,-50%)",
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "var(--orange-500)",
                border: "2px solid #FFFFFF",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
            />
          </div>
        </div>
      )}

      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontSize: 14,
          fontWeight: 500,
          color: "var(--navy-900)",
          transform: hover && !reducedMotion.current ? "translateX(4px)" : "translateX(0)",
          transition: "transform 180ms ease",
        }}
      >
        Open calculator <span aria-hidden>→</span>
      </span>
    </a>
  );
}
