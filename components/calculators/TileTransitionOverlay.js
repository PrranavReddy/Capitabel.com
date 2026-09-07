"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";

const GROW_MS = 300;
const FADE_MS = 200;
const EASE = "cubic-bezier(0.4,0,0.2,1)";

const Ctx = createContext(null);

/**
 * CalculatorTile calls this to kick off the "tile grows to cover the
 * screen, then the calculator opens" transition. Returns null outside a
 * TileTransitionProvider, which callers treat as "no transition available,
 * just navigate normally."
 */
export function useTileTransition() {
  return useContext(Ctx);
}

/**
 * Lives in app/calculators/layout.js, which stays mounted across the
 * /calculators -> /calculators/[slug] navigation (only the page segment
 * swaps). That's the point: the overlay itself is rendered here, not inside
 * CalculatorTile, so it survives the moment the hub page unmounts and the
 * calculator page mounts underneath it.
 *
 * Without this, the overlay had to live and die with the tile that created
 * it -> it necessarily vanished at the exact instant router.push() swapped
 * the page content, which read as a hard cut between "cream box covering
 * the screen" and "calculator page, fully rendered, no transition." Here,
 * the overlay instead keeps covering the screen through the swap and only
 * fades away once the new page has actually mounted underneath it (detected
 * via usePathname), turning that cut into a deliberate reveal.
 */
export function TileTransitionProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useState(null); // null | { start, phase: "grow"|"grown"|"fadeout" }
  const targetRef = useRef(null);

  const start = useCallback(
    (rect, href) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scaleX = rect.width / vw;
      const scaleY = rect.height / vh;
      const translateX = rect.left - (vw - rect.width) / 2;
      const translateY = rect.top - (vh - rect.height) / 2;

      targetRef.current = href;
      setState({ start: `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`, phase: "grow" });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setState((s) => (s ? { ...s, phase: "grown" } : s));
        });
      });
      setTimeout(() => router.push(href), GROW_MS + 20);
    },
    [router]
  );

  useEffect(() => {
    if (state?.phase === "grown" && targetRef.current && pathname === targetRef.current) {
      // The destination page has mounted underneath the (still opaque)
      // overlay. Give it a couple of frames to actually paint, then reveal
      // it by fading the overlay out, instead of yanking the overlay away
      // the instant the route swapped.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setState((s) => (s ? { ...s, phase: "fadeout" } : s));
        });
      });
      const t = setTimeout(() => {
        setState(null);
        targetRef.current = null;
      }, FADE_MS + 20);
      return () => clearTimeout(t);
    }
  }, [pathname, state?.phase]);

  return (
    <Ctx.Provider value={start}>
      {children}
      {state &&
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
              willChange: "transform, opacity",
              transform: state.phase === "grow" ? state.start : "none",
              opacity: state.phase === "fadeout" ? 0 : 1,
              transition: state.phase === "fadeout" ? `opacity ${FADE_MS}ms ease` : `transform ${GROW_MS}ms ${EASE}`,
              pointerEvents: "none",
            }}
          />,
          document.body
        )}
    </Ctx.Provider>
  );
}
