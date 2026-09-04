import Link from "next/link";
import { SimpleFooter } from "@/components/Footer";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import CalculatorTile from "@/components/calculators/CalculatorTile";
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
            <CalculatorTile key={c.slug} href={`/calculators/${c.slug}`} tag={c.tag} title={c.title} desc={c.desc} sample={c.sample} />
          ))}
        </Reveal>
      </section>

      {/* CTA */}
      <section className="container" style={{ paddingBottom: 120 }}>
        <div
          className="cta-grid"
          style={{
            background: "var(--navy-900)",
            color: "#FFFFFF",
            borderRadius: 20,
            padding: "64px 56px",
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr",
            gap: 48,
            alignItems: "center",
          }}
        >
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 34, lineHeight: 1.15, letterSpacing: "-0.02em", margin: "0 0 12px" }}>
              This is how much you could be overpaying.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.5, color: "rgba(245,240,228,0.75)", margin: 0, maxWidth: 460 }}>
              Run your numbers above, then let us help you actually save it.
            </p>
          </div>
          <MagneticButton
            as={Link}
            href="/contact"
            className="btn btn-orange hover-fade"
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", background: "var(--orange-500)", color: "#FFFFFF", borderRadius: 8, fontSize: 15, fontWeight: 500 }}
          >
            Book a consultation call
            <span aria-hidden>→</span>
          </MagneticButton>
        </div>
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
