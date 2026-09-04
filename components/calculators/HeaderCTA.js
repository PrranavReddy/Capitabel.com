import Link from "next/link";

/**
 * Compact CTA sitting parallel to each calculator's own <h1>, top-right.
 * Shared across all 5 calculators rather than duplicated per file.
 */
export default function HeaderCTA() {
  return (
    <Link
      href="/contact"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 16px",
        background: "#E07A3F",
        color: "#FFFFFF",
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 700,
        whiteSpace: "nowrap",
        flexShrink: 0,
        textDecoration: "none",
      }}
    >
      Book a call
      <span aria-hidden>→</span>
    </Link>
  );
}
