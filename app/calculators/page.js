import Link from "next/link";
import { SimpleFooter } from "@/components/Footer";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { calculators } from "@/lib/data";

export const metadata = {
  title: "Calculators",
  description:
    "EMI, eligibility, balance transfer, and overdraft-linked loan simulators — work out the real numbers before you talk to us.",
};

export default function CalculatorsPage() {
  return (
    <div>
      <section className="container" style={{ paddingTop: 72, paddingBottom: 60 }}>
        <Eyebrow>Calculators</Eyebrow>
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
          Run the numbers
          <br />
          <Serif>before you call.</Serif>
        </h1>
        <p style={{ fontSize: 20, lineHeight: 1.45, color: "var(--navy-700)", maxWidth: 640, margin: 0, textWrap: "pretty" }}>
          Four interactive tools to model EMI, eligibility, refinancing, and overdraft-linked loans — the same math our advisors use on a file.
        </p>
      </section>

      <section className="container" style={{ paddingBottom: 120 }}>
        <Reveal as="div" className="grid-collapse" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24 }}>
          {calculators.map((c) => (
            <TiltCard
              key={c.slug}
              as={Link}
              href={`/calculators/${c.slug}`}
              maxTilt={4}
              style={{
                display: "block",
                background: "var(--cream-100)",
                border: "1px solid var(--navy-a08)",
                borderRadius: 12,
                padding: 36,
                minHeight: 220,
              }}
            >
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--orange-500)", marginBottom: 16 }}>
                {c.tag}
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 26, lineHeight: 1.15, letterSpacing: "-0.015em", margin: "0 0 12px", color: "var(--navy-900)" }}>
                {c.title}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--navy-700)", margin: "0 0 20px", maxWidth: 460 }}>{c.desc}</p>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 500, color: "var(--navy-900)" }}>
                Open calculator <span aria-hidden>→</span>
              </span>
            </TiltCard>
          ))}
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
    <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--navy-900)", marginBottom: 20 }}>
      {children}
    </div>
  );
}

function Serif({ children }) {
  return <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--orange-500)" }}>{children}</span>;
}
