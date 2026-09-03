import Link from "next/link";

/**
 * Renders one journal post's body. Each paragraph in a section's `body`
 * array is either a plain string, or an array of parts (string | { text,
 * href }) so inline internal (and occasionally external/source) links sit
 * naturally inside the sentence instead of being bolted on as a separate
 * "related links" list.
 */
function LinkPart({ text, href }) {
  const external = /^https?:\/\//.test(href);
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="underline-link hover-fade"
        style={{ color: "var(--navy-900)", fontWeight: 500 }}
      >
        {text}
      </a>
    );
  }
  return (
    <Link href={href} className="underline-link hover-fade" style={{ color: "var(--navy-900)", fontWeight: 500 }}>
      {text}
    </Link>
  );
}

function Paragraph({ content }) {
  if (typeof content === "string") {
    return <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--navy-700)", margin: "0 0 18px" }}>{content}</p>;
  }
  return (
    <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--navy-700)", margin: "0 0 18px" }}>
      {content.map((part, i) => (typeof part === "string" ? <span key={i}>{part}</span> : <LinkPart key={i} {...part} />))}
    </p>
  );
}

export default function JournalArticle({ post }) {
  return (
    <div style={{ maxWidth: 720 }}>
      {post.sections.map((s) => (
        <div key={s.heading} style={{ marginBottom: 36 }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 24,
              letterSpacing: "-0.015em",
              margin: "0 0 16px",
              color: "var(--navy-900)",
            }}
          >
            {s.heading}
          </h2>
          {s.body.map((p, i) => (
            <Paragraph key={i} content={p} />
          ))}
        </div>
      ))}
    </div>
  );
}
