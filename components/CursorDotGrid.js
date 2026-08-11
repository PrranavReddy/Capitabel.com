"use client";

import { useEffect, useRef } from "react";

/**
 * A fixed, viewport-pinned grid of dots that acts like a magnetic field —
 * dots near the cursor are physically pushed away along the line from the
 * cursor to the dot, and brighten as they're displaced. Rendered once in
 * the root layout, behind everything else — every section that has its own
 * solid/tile background simply paints over it, so it only shows through in
 * the plain page-background gaps between tiles.
 *
 * Doesn't scroll with the page (position: fixed) — content scrolls over a
 * constant ambient layer. Respects prefers-reduced-motion by drawing a
 * single static, undisplaced frame instead of animating.
 */
export default function CursorDotGrid({
  gap = 32,
  dotColor = "22,38,77",
  accentColor = "245,130,32",
  baseOpacity = 0.13,
  pushRadius = 130,
  pushDistance = 22,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -9999, y: -9999 };
    let width = 0;
    let height = 0;
    let raf;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function handleMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function handleLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (let x = gap / 2; x < width; x += gap) {
        for (let y = gap / 2; y < height; y += gap) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const d = Math.hypot(dx, dy);
          const push = Math.max(0, 1 - d / pushRadius);
          const ox = push > 0 ? x + (dx / d) * push * pushDistance : x;
          const oy = push > 0 ? y + (dy / d) * push * pushDistance : y;
          const radius = 1.2 + push * 2.4;
          ctx.beginPath();
          ctx.arc(ox, oy, radius, 0, Math.PI * 2);
          ctx.fillStyle =
            push > 0.04
              ? `rgba(${accentColor},${Math.min(1, baseOpacity + push * 0.85).toFixed(2)})`
              : `rgba(${dotColor},${baseOpacity})`;
          ctx.fill();
        }
      }
      if (!reduceMotion) raf = requestAnimationFrame(draw);
    }

    resize();
    draw();

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("resize", resize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [gap, dotColor, accentColor, baseOpacity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}
