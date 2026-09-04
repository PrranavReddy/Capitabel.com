"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

const MS = 380;
const EASE = "cubic-bezier(0.4,0,0.2,1)";

/**
 * A calculator card that, on click, grows from its own on-screen position
 * to fill the viewport before the actual navigation happens (a two-step
 * "tile covers the page, then the calculator opens" sequence, not a
 * cross-page shared-element morph — that would need the destination page's
 * DOM to be ready before the browser captures it, which Next.js App
 * Router's async navigation doesn't guarantee).
 *
 * Two things had to be true for this to actually be smooth, not one:
 *
 * 1. Animate `transform` only, never top/left/width/height — those are
 *    layout properties and animating them forces a full layout recompute
 *    every frame.
 * 2. The fixed overlay must be portaled to document.body, NOT rendered as
 *    a normal descendant. This grid sits inside <Reveal>, which applies a
 *    CSS `transform` (translateY) for its scroll-in animation — and per
 *    the CSS spec, ANY ancestor with an active transform (even an identity
 *    translateY(0)) creates a new containing block for position:fixed
 *    descendants. Without the portal, "fixed, full-viewport" was actually
 *    being measured against the grid container's own box, not the real
 *    viewport — which is what made the first "fix" still look broken.
 *
 * No new animation library — respects prefers-reduced-motion by skipping
 * straight to navigation, and modifier/middle-clicks still open a new tab.
 */
export default function CalculatorTile({ href, sample, tag, title, desc }) {
  const ref = useRef(null);
  const router = useRouter();
  const [hover, setHover] = useState(false);
  const [expand, setExpand] = useState(null); // null | { start, grown }
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  }, []);

  function handleClick(e) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return; // let modifier/middle clicks behave normally
    e.preventDefault();
    if (expand) return;
    if (reducedMotion.current || !ref.current) {
      router.push(href);
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const scaleX = rect.width / vw;
    const scaleY = rect.height / vh;
    // The overlay is always sized to the full viewport; this transform makes
    // it visually appear at the tile's own position and size until it's
    // released to scale(1) — a standard FLIP-technique offset.
    const translateX = rect.left - (vw - rect.width) / 2;
    const translateY = rect.top - (vh - rect.height) / 2;

    setExpand({ start: `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`, grown: false });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setExpand((s) => (s ? { ...s, grown: true } : s));
      });
    });
    // A little longer than the CSS transition so the overlay has visibly
    // finished covering the screen before the page actually swaps.
    setTimeout(() => router.push(href), MS + 60);
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
    opacity: expand ? 0 : 1,
  };

  return (
    <>
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

      {expand &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            aria-hidden
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              background: "var(--cream-100)",
              borderRadius: 12,
              willChange: "transform",
              transform: expand.grown ? "none" : expand.start,
              transition: `transform ${MS}ms ${EASE}`,
            }}
          />,
          document.body
        )}
    </>
  );
}
