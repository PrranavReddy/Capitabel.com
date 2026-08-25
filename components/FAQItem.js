"use client";

import { useState } from "react";

/**
 * Replaces the native <details>/<summary> accordion with a state-driven one
 * so the open/close can actually ease instead of snapping instantly — native
 * <details> has no animatable height. Uses the CSS grid-template-rows
 * 0fr -> 1fr trick (see .faq-panel in globals.css) so it eases to whatever
 * the content's natural height is, no JS measurement needed.
 */

// A bullet is either a plain string, or { text, highlight } where `highlight`
// is a substring of `text` to render in orange.
function BulletText({ item }) {
  if (typeof item === "string") return item;
  const { text, highlight } = item;
  const idx = highlight ? text.indexOf(highlight) : -1;
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span style={{ color: "var(--orange-500)", fontWeight: 600 }}>{highlight}</span>
      {text.slice(idx + highlight.length)}
    </>
  );
}

export default function FAQItem({ n, q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`faq-item${open ? " is-open" : ""}`} style={{ borderTop: "1px solid var(--navy-a15)", padding: "26px 0" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          width: "100%",
          background: "none",
          border: "none",
          padding: 0,
          margin: 0,
          font: "inherit",
          textAlign: "left",
          color: "inherit",
          cursor: "pointer",
        }}
      >
        <span style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
          {n && (
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 14, letterSpacing: "0.05em", color: "var(--orange-500)", flexShrink: 0 }}>
              {n}
            </span>
          )}
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 22, letterSpacing: "-0.01em", color: "var(--navy-900)" }}>{q}</span>
        </span>
        <span className="plus" style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 28, color: "var(--orange-500)", flexShrink: 0 }}>
          +
        </span>
      </button>
      <div className="faq-panel">
        <div style={{ overflow: "hidden" }}>
          {Array.isArray(a) ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "14px 0 0", maxWidth: 680 }}>
              {a.map((line) => (
                <div key={typeof line === "string" ? line : line.text} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 16, lineHeight: 1.55, color: "var(--navy-700)" }}>
                  <span style={{ color: "var(--orange-500)", fontWeight: 600, marginTop: 2 }}>◆</span>
                  <span>
                    <BulletText item={line} />
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: 16, lineHeight: 1.55, color: "var(--navy-700)", margin: "14px 0 0", maxWidth: 680 }}>{a}</p>
          )}
        </div>
      </div>
    </div>
  );
}
