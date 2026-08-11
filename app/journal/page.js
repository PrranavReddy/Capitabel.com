import Link from "next/link";
import { SimpleFooter } from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { landing, site } from "@/lib/data";

export const metadata = {
  title: "Journal",
  description: "Field notes on borrowing well — rates, construction finance, and MSME lending, explained without the jargon.",
};

export default function JournalPage() {
  return (
    <div>
      <section className="container" style={{ paddingTop: 72, paddingBottom: 60 }}>
        <Eyebrow>Journal</Eyebrow>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 96,
            lineHeight: 0.98,
            letterSpacing: "-0.035em",
            margin: "0 0 32px",
            maxWidth: 1100,
            color: "var(--navy-900)",
          }}
        >
          Field notes on
          <br />
          <Serif>borrowing well.</Serif>
        </h1>
        <p style={{ fontSize: 20, lineHeight: 1.45, color: "var(--navy-700)", maxWidth: 640, margin: 0, textWrap: "pretty" }}>
          Rates, construction finance, and MSME lending — explained without the jargon, from the advisors who work the files.
        </p>
      </section>

      <section className="container" style={{ paddingBottom: 120 }}>
        <Reveal as="div" className="journal-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {landing.posts.map((p) => (
            <a key={p.title} href="#" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div
                style={{
                  aspectRatio: "5/4",
                  background: "repeating-linear-gradient(135deg,#D8CCB4,#D8CCB4 10px,#C7B899 10px,#C7B899 20px)",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "flex-end",
                  padding: 14,
                }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--navy-700)", background: "rgba(255,255,255,0.9)", padding: "4px 8px", borderRadius: 4 }}>
                  img · {p.tag}
                </span>
              </div>
              <div>
                <div style={{ display: "flex", gap: 14, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--navy-700)", marginBottom: 12 }}>
                  <span>{p.cat}</span>
                  <span>·</span>
                  <span>{p.read}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 24, lineHeight: 1.2, letterSpacing: "-0.015em", margin: 0, color: "var(--navy-900)" }}>
                  {p.title}
                </h3>
              </div>
            </a>
          ))}
        </Reveal>
      </section>

      {/* CTA */}
      <section className="container" style={{ paddingBottom: 120 }}>
        <Reveal
          as="div"
          className="cta-grid"
          style={{
            background: "var(--navy-900)",
            color: "#FFFFFF",
            borderRadius: 20,
            padding: "80px 64px",
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr",
            gap: 56,
            alignItems: "end",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, background: "var(--orange-500)", opacity: 0.3, filter: "blur(10px)", borderRadius: "50%" }} />
          <div style={{ position: "relative" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 60, lineHeight: 1, letterSpacing: "-0.03em", margin: "0 0 20px" }}>
              Have a question a<br />
              <Serif>post didn&rsquo;t answer?</Serif>
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.5, color: "rgba(245,240,228,0.75)", margin: 0, maxWidth: 480 }}>
              A 20-minute call with a lending specialist usually clears it up faster than an email chain.
            </p>
          </div>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 14 }}>
            <Link
              href="/contact"
              className="btn btn-orange hover-fade"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 26px", background: "var(--orange-500)", color: "#FFFFFF", borderRadius: 8, fontSize: 16, fontWeight: 500 }}
            >
              Book a consultation call
              <span style={{ fontSize: 22 }} aria-hidden>→</span>
            </Link>
            <a
              href={site.whatsapp}
              className="btn btn-white hover-fade"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 26px", background: "#FFFFFF", color: "var(--navy-900)", borderRadius: 8, fontSize: 16, fontWeight: 500 }}
            >
              WhatsApp us
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}>{site.phone}</span>
            </a>
          </div>
        </Reveal>
      </section>

      <SimpleFooter
        background="var(--cream-300)"
        links={[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
          { href: "/loans", label: "Loans" },
          { href: "/contact", label: "Contact" },
        ]}
      />
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--navy-700)", marginBottom: 20 }}>
      {children}
    </div>
  );
}

function Serif({ children }) {
  return <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--orange-500)" }}>{children}</span>;
}
