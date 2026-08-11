"use client";

import { useEffect, useRef } from "react";

/**
 * A grid of dots drawn on a full-bleed canvas that brighten and grow near
 * the cursor. Meant to sit as an absolutely-positioned background layer
 * inside a position:relative container — the parent element is what
 * receives the mousemove listener, so this works no matter where the
 * canvas sits in the stacking order.
 *
 * Respects prefers-reduced-motion by drawing a single static frame instead
 * of animating.
 */
export default function CursorDotGrid({
  gap = 30,
  dotColor = "22,38,77",
  accentColor = "245,130,32",
  baseOpacity = 0.16,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -9999, y: -9999 };
    let width = 0;
    let height = 0;
    let raf;

    function resize() {
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function handleMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function handleLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (let x = gap / 2; x < width; x += gap) {
        for (let y = gap / 2; y < height; y += gap) {
          const d = Math.hypot(x - mouse.x, y - mouse.y);
          const influence = Math.max(0, 1 - d / 150);
          const radius = 1.3 + influence * 3.2;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle =
            influence > 0.03
              ? `rgba(${accentColor},${Math.min(1, baseOpacity + influence * 0.8).toFixed(2)})`
              : `rgba(${dotColor},${baseOpacity})`;
          ctx.fill();
        }
      }
      if (!reduceMotion) raf = requestAnimationFrame(draw);
    }

    resize();
    draw();

    parent.addEventListener("mousemove", handleMove);
    parent.addEventListener("mouseleave", handleLeave);
    window.addEventListener("resize", resize);

    return () => {
      parent.removeEventListener("mousemove", handleMove);
      parent.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("resize", resize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [gap, dotColor, accentColor, baseOpacity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}
