import Link from "next/link";
import { SimpleFooter } from "@/components/Footer";

/**
 * Shared shell for Privacy / Terms / Disclosures — long-form legal reading,
 * not marketing copy, so it deliberately skips the site's big display
 * typography in favour of a plain, readable layout.
 *
 * Every one of these pages currently renders a "draft, pending legal
 * review" notice (see lib/data.js's `legal` export). Do NOT remove that
 * banner until the content has actually been reviewed by counsel.
 */
export default function LegalPage({ title, draftDate, sections }) {
  return (
    <div>
      <section className="container" style={{ paddingTop: 64, paddingBottom: 16 }}>
        <Link
          href="/"
          className="underline-link hover-fade"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--navy-900)", fontWeight: 500 }}
        >
          <span aria-hidden>←</span> Back to home
        </Link>
      </section>

      <section className="container" style={{ paddingBottom: 32 }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 48,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: "0 0 12px",
            color: "var(--navy-900)",
          }}
        >
          {title}
        </h1>
        <p style={{ fontSize: 13, color: "var(--navy-700)", margin: 0 }}>Draft prepared {draftDate}</p>

        <div
          style={{
            marginTop: 24,
            maxWidth: 760,
            padding: "18px 22px",
            background: "rgba(245,130,32,0.1)",
            border: "1px solid rgba(245,130,32,0.35)",
            borderRadius: 10,
            fontSize: 14,
            lineHeight: 1.6,
            color: "var(--navy-900)",
          }}
        >
          <strong>Draft — pending legal review.</strong> This page has not yet been reviewed by legal
          counsel and should not be treated as Capitabel&rsquo;s final, binding {title.toLowerCase()}.
          Do not rely on it until it has been approved.
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 100 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 36, maxWidth: 760 }}>
          {sections.map((s) => (
            <div key={s.heading}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 20,
                  letterSpacing: "-0.01em",
                  margin: "0 0 12px",
                  color: "var(--navy-900)",
                }}
              >
                {s.heading}
              </h2>
              {s.body.map((p, i) => (
                <p key={i} style={{ fontSize: 15, lineHeight: 1.65, color: "var(--navy-700)", margin: i === 0 ? 0 : "12px 0 0" }}>
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      <SimpleFooter
        background="var(--cream-300)"
        links={[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
          { href: "/contact", label: "Contact" },
        ]}
      />
    </div>
  );
}
