import Link from "next/link";
import { SimpleFooter } from "@/components/Footer";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import MagneticButton from "@/components/MagneticButton";
import { loans, site } from "@/lib/data";
import { WhatsAppIcon, PhoneIcon } from "@/components/ContactIcons";

export const metadata = {
  title: "Loan products",
  description:
    "Home Loans, Loan Against Property, and MSME Business Loans — ticket sizes, rates, tenures, lender partners, and published TATs from enquiry to disbursement.",
};

export default function LoansPage() {
  return (
    <div>
      <section className="container" style={{ paddingTop: 72, paddingBottom: 60 }}>
        <Eyebrow>Loan products · Home Loan · LAP · MSME</Eyebrow>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 112,
            lineHeight: 0.96,
            letterSpacing: "-0.035em",
            margin: 0,
            maxWidth: 1200,
          }}
        >
          Three products.
          <br />
          <Serif>One relationship.</Serif>
        </h1>
      </section>

      {/* SUMMARY */}
      <section className="container" style={{ paddingBottom: 40 }}>
        <Reveal
          as="div"
          className="grid-collapse"
          style={{
            padding: "40px 48px",
            background: "rgba(245,130,32,0.1)",
            border: "1px solid rgba(245,130,32,0.35)",
            borderRadius: 12,
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 32,
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--orange-500)", marginBottom: 12 }}>
              {loans.honour.label}
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 32, lineHeight: 1.2, letterSpacing: "-0.015em", color: "var(--navy-900)" }}>
              {loans.honour.text}
            </div>
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(48px, 12vw, 96px)", color: "var(--orange-500)", letterSpacing: "-0.03em" }}>
            <CountUp value={loans.honour.value} />
          </div>
        </Reveal>
      </section>

      {/* PRODUCTS DEEP DIVE */}
      <section className="container" style={{ paddingTop: 80, paddingBottom: 80 }}>
        {loans.products.map((p) => (
          <div key={p.slug} id={p.slug} style={{ padding: "80px 0", borderTop: "1px solid var(--navy-a15)" }}>
            <div className="product-detail-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 80, alignItems: "start" }}>
              <div className="loans-sticky" style={{ position: "sticky", top: 120 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 8,
                      background: p.accentBg,
                      color: p.accentFg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: 22,
                    }}
                  >
                    {p.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--navy-700)" }}>{p.code}</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--orange-500)" }}>{p.tag}</div>
                  </div>
                </div>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 60, lineHeight: 0.98, letterSpacing: "-0.03em", margin: "0 0 28px", color: "var(--navy-900)" }}>
                  {p.name}
                </h2>
                <Link
                  href="/contact"
                  className="btn btn-dark hover-fade"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 22px", background: "var(--navy-900)", color: "#FFFFFF", borderRadius: 6, fontSize: 14, fontWeight: 500 }}
                >
                  Discuss a file →
                </Link>
              </div>

              <Reveal as="div">
                <div style={{ background: "var(--cream-100)", border: "1px solid var(--navy-a08)", borderRadius: 12, padding: 36 }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--navy-900)", marginBottom: 20 }}>
                    Snapshot
                  </div>
                  <div className="grid-collapse" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
                    <Snapshot value={p.rate} label="Interest rate" />
                    <Snapshot value={p.tenure} label="Tenure" />
                    <Snapshot value={p.ticket} label="Starting from" />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        ))}
      </section>

      {/* PROCESS */}
      <section style={{ background: "var(--cream-300)" }}>
        <div className="container" style={{ paddingTop: 120, paddingBottom: 120 }}>
          <Reveal as="div" className="split-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, marginBottom: 56, alignItems: "end" }}>
            <div>
              <Eyebrow>Process · Every file, every product</Eyebrow>
              <h2 style={h2Style}>
                From enquiry to
                <br />
                <Serif>disbursement.</Serif>
              </h2>
            </div>
            <p style={{ ...leadStyle, fontSize: 18, maxWidth: 480 }}>
              Our published TATs from the FY 2026–27 operating plan. Every step is timestamped in Zoho CRM and reviewed weekly.
            </p>
          </Reveal>
          <Reveal as="div" delay={100} style={{ background: "var(--cream-100)", border: "1px solid var(--navy-a08)", borderRadius: 12, overflow: "hidden" }}>
            <div
              className="process-head"
              style={{
                display: "grid",
                gridTemplateColumns: "60px 2fr 1fr 1.4fr",
                gap: 24,
                padding: "20px 32px",
                background: "var(--navy-900)",
                color: "#FFFFFF",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              <div>Step</div>
              <div>Process</div>
              <div>Target TAT</div>
              <div>Owner &amp; system</div>
            </div>
            {loans.process.map((s) => (
              <div
                key={s.n}
                className="process-row"
                style={{ display: "grid", gridTemplateColumns: "60px 2fr 1fr 1.4fr", gap: 24, padding: "22px 32px", borderTop: "1px solid var(--navy-a10)", alignItems: "center" }}
              >
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 20, color: "var(--orange-500)" }}>{s.n}</div>
                <div style={{ fontSize: 15, color: "var(--navy-900)", fontWeight: 500 }}>{s.name}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--navy-900)", fontWeight: 500 }}>{s.tat}</div>
                <div style={{ fontSize: 13, color: "var(--navy-700)" }}>{s.owner}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="container" style={{ paddingTop: 120, paddingBottom: 120 }}>
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
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 72, lineHeight: 0.98, letterSpacing: "-0.03em", margin: "0 0 20px" }}>
              Not sure which
              <br />
              <Serif>product fits?</Serif>
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.5, color: "rgba(245,240,228,0.75)", margin: 0, maxWidth: 520 }}>
              A 10-minute call tells you which of our three products fits your file — and roughly what rate you can expect, based on this
              quarter&rsquo;s lender panel.
            </p>
          </div>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 14 }}>
            <MagneticButton
              as={Link}
              href="/contact"
              className="btn btn-orange hover-fade"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 26px", background: "var(--orange-500)", color: "#FFFFFF", borderRadius: 8, fontSize: 16, fontWeight: 500 }}
            >
              Book a consultation call
              <span style={{ fontSize: 22 }} aria-hidden>→</span>
            </MagneticButton>
            <a
              href={site.whatsapp}
              aria-label="WhatsApp us"
              className="btn btn-white hover-fade"
              style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 14, minHeight: 77, padding: "22px 26px", background: "#FFFFFF", color: "var(--navy-900)", borderRadius: 8, fontSize: 16, fontWeight: 500 }}
            >
              <WhatsAppIcon size={26} color="#128C7E" />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 15 }}>{site.phone}</span>
            </a>
            <a
              href={site.phoneHref}
              aria-label="Call directly"
              className="btn hover-fade"
              style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 14, minHeight: 77, padding: "22px 26px", background: "transparent", border: "1px solid rgba(245,240,228,0.25)", color: "#FFFFFF", borderRadius: 8, fontSize: 16 }}
            >
              <PhoneIcon size={26} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 15, color: "rgba(245,240,228,0.7)" }}>Mon–Sat · 10–6</span>
            </a>
          </div>
        </Reveal>
      </section>

      <SimpleFooter
        background="var(--cream-300)"
        links={[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
          { href: "/calculators", label: "Check Eligibility" },
          { href: "/contact", label: "Contact" },
        ]}
      />
    </div>
  );
}

function Snapshot({ value, label }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 32, color: "var(--navy-900)", letterSpacing: "-0.02em", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, color: "var(--navy-700)", marginTop: 6 }}>{label}</div>
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

const h2Style = {
  fontFamily: "var(--font-display)",
  fontWeight: 600,
  fontSize: 64,
  lineHeight: 1,
  letterSpacing: "-0.025em",
  margin: 0,
  color: "var(--navy-900)",
};

const leadStyle = {
  fontSize: 19,
  lineHeight: 1.5,
  color: "var(--navy-700)",
  maxWidth: 520,
  margin: 0,
  textWrap: "pretty",
};
