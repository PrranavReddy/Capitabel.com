import Link from "next/link";
import { SimpleFooter } from "@/components/Footer";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import { loans, site } from "@/lib/data";

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
            margin: "0 0 32px",
            maxWidth: 1200,
          }}
        >
          Three products.
          <br />
          <Serif>One relationship.</Serif>
        </h1>
        <p style={{ fontSize: 20, lineHeight: 1.45, color: "var(--navy-700)", maxWidth: 640, margin: 0, textWrap: "pretty" }}>
          A rationalised core lender panel, drawn from a wider network of 40+ banks and NBFCs. Every file is scored on borrower fit —
          approval probability, indicative rate, sanction TAT, KFS terms — before we recommend a lender.
        </p>
      </section>

      {/* SUMMARY */}
      <section className="container" style={{ paddingBottom: 40 }}>
        <Reveal
          as="div"
          className="summary-grid"
          style={{ background: "var(--navy-900)", color: "#FFFFFF", borderRadius: 16, padding: "56px 56px 40px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32 }}
        >
          {loans.summary.map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,240,228,0.6)", marginBottom: 14 }}>
                {s.label}
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 48, lineHeight: 1, color: "#FFFFFF", letterSpacing: "-0.02em" }}>
                <CountUp value={s.val} />
              </div>
              <div style={{ fontSize: 12, color: "rgba(245,240,228,0.55)", marginTop: 10 }}>{s.note}</div>
            </div>
          ))}
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
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 60, lineHeight: 0.98, letterSpacing: "-0.03em", margin: "0 0 20px", color: "var(--navy-900)" }}>
                  {p.name}
                </h2>
                <p style={{ fontSize: 17, lineHeight: 1.55, color: "var(--navy-700)", margin: "0 0 24px", maxWidth: 420 }}>{p.desc}</p>
                <Link
                  href="/contact"
                  className="btn btn-dark hover-fade"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 22px", background: "var(--navy-900)", color: "#FFFFFF", borderRadius: 6, fontSize: 14, fontWeight: 500 }}
                >
                  Discuss a file →
                </Link>
              </div>

              <Reveal as="div">
                <div style={{ background: "var(--cream-100)", border: "1px solid var(--navy-a08)", borderRadius: 12, padding: 36, marginBottom: 20 }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--navy-700)", marginBottom: 20 }}>
                    Snapshot
                  </div>
                  <div className="grid-collapse" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
                    <Snapshot value={p.rate} label="Indicative rate p.a." />
                    <Snapshot value={p.tenure} label="Tenure range" />
                    <Snapshot value={p.ticket} label="Typical ticket range" />
                  </div>
                </div>

                <div style={{ background: "var(--cream-100)", border: "1px solid var(--navy-a08)", borderRadius: 12, padding: 36, marginBottom: 20 }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--navy-700)", marginBottom: 20 }}>
                    Who this fits
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {p.fit.map((f) => (
                      <div key={f.title} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "baseline" }}>
                        <span style={{ color: "var(--orange-500)", fontWeight: 600 }}>◆</span>
                        <div>
                          <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17, color: "var(--navy-900)", marginBottom: 4 }}>{f.title}</div>
                          <div style={{ fontSize: 14, color: "var(--navy-700)" }}>{f.body}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background: "var(--cream-100)", border: "1px solid var(--navy-a08)", borderRadius: 12, padding: 36 }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--navy-700)", marginBottom: 20 }}>
                    Lender partners for this product
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {p.lenders.map((l) => (
                      <span
                        key={l}
                        style={{
                          padding: "8px 14px",
                          background: "rgba(22,38,77,0.06)",
                          border: "1px solid var(--navy-a12)",
                          borderRadius: 6,
                          fontFamily: "var(--font-display)",
                          fontSize: 13,
                          fontWeight: 500,
                          color: "var(--navy-900)",
                        }}
                      >
                        {l}
                      </span>
                    ))}
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
              A 20-minute call tells you which of our three products fits your file — and roughly what rate you can expect, based on this
              quarter&rsquo;s lender panel.
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
    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--navy-700)", marginBottom: 20 }}>
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
