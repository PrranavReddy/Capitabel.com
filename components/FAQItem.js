"use client";

import { useState } from "react";

/**
 * Replaces the native <details>/<summary> accordion with a state-driven one
 * so the open/close can actually ease instead of snapping instantly — native
 * <details> has no animatable height. Uses the CSS grid-template-rows
 * 0fr -> 1fr trick (see .faq-panel in globals.css) so it eases to whatever
 * the content's natural height is, no JS measurement needed.
 */
export default function FAQItem({ q, a }) {
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
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 22, letterSpacing: "-0.01em", color: "var(--navy-900)" }}>{q}</span>
        <span className="plus" style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 28, color: "var(--orange-500)", flexShrink: 0 }}>
          +
        </span>
      </button>
      <div className="faq-panel">
        <div style={{ overflow: "hidden" }}>
          <p style={{ fontSize: 16, lineHeight: 1.55, color: "var(--navy-700)", margin: "14px 0 0", maxWidth: 680 }}>{a}</p>
        </div>
      </div>
    </div>
  );
}
