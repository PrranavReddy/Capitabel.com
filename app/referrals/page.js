import Link from "next/link";
import { SimpleFooter } from "@/components/Footer";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import { referrals } from "@/lib/data";

export const metadata = {
  title: "Referrals",
  description:
    "Refer an MSME, LAP, or home loan client to Capitabel and earn a fixed payout on every file that disburses.",
};

export default function ReferralsPage() {
  return (
    <div>
      <section className="container" style={{ paddingTop: 72, paddingBottom: 60 }}>
        <Eyebrow>Referral Program · Chennai · Tier 2/3 South India</Eyebrow>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 96,
            lineHeight: 0.98,
            letterSpacing: "-0.035em",
            margin: "0 0 32px",
            maxWidth: 1100,
          }}
        >
          Bring us the file.
          <br />
          <Serif>We&rsquo;ll handle the rest.</Serif>
        </h1>
        <p style={{ fontSize: 20, lineHeight: 1.45, color: "var(--navy-700)", maxWidth: 640, margin: 0, textWrap: "pretty" }}>
          Refer an MSME, LAP, or home loan client and earn a fixed payout on every case that disburses, across our 40+ lender network.
        </p>
      </section>

      {/* WHO REFERS TO US */}
      <section style={{ background: "var(--cream-200)" }}>
        <div className="container" style={{ paddingTop: 72, paddingBottom: 72 }}>
          <Reveal as="div" style={{ marginBottom: 36 }}>
            <Eyebrow>Who refers to us</Eyebrow>
          </Reveal>
          <Reveal as="div" className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {referrals.who.map((w) => (
              <div key={w.title} style={{ background: "var(--white)", border: "1px solid var(--navy-a08)", borderRadius: 12, padding: "26px 22px" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17, margin: "0 0 8px", color: "var(--navy-900)" }}>{w.title}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.5, color: "var(--navy-700)", margin: 0 }}>{w.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PAYOUT SLABS */}
      <section className="container" style={{ paddingTop: 96, paddingBottom: 40 }}>
        <Reveal as="div" style={{ marginBottom: 40 }}>
          <Eyebrow>What you earn</Eyebrow>
          <h2 style={h2Style}>
            Payout <Serif>slabs.</Serif>
          </h2>
        </Reveal>
        <Reveal as="div" delay={100} style={{ borderTop: "2px solid var(--navy-900)" }}>
          {referrals.slabs.map((s, i) => {
            const isLast = i === referrals.slabs.length - 1;
            return (
              <div
                key={s.range}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  padding: "22px 4px",
                  borderBottom: "1px solid var(--navy-a10)",
                }}
              >
                <div style={{ fontSize: 16, color: "var(--navy-700)" }}>{s.range}</div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: isLast ? 34 : 28,
                    letterSpacing: "-0.015em",
                    color: "var(--orange-500)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {s.amount}
                </div>
              </div>
            );
          })}
        </Reveal>
        <p style={{ marginTop: 16, fontSize: 12, color: "var(--navy-700)" }}>
          Payout is released once the referred loan disburses.
        </p>
        <div
          style={{
            marginTop: 24,
            padding: "18px 22px",
            background: "rgba(245,130,32,0.1)",
            border: "1px solid rgba(245,130,32,0.35)",
            borderRadius: 10,
            fontSize: 13,
            lineHeight: 1.6,
            color: "var(--navy-900)",
          }}
        >
          <strong>Disclaimer:</strong> {referrals.disclaimer}
        </div>
      </section>

      {/* PROCESS */}
      <section className="container" style={{ paddingTop: 80, paddingBottom: 120 }}>
        <Reveal as="div" style={{ marginBottom: 40 }}>
          <Eyebrow>How it works</Eyebrow>
          <h2 style={h2Style}>
            Three steps to a<br />
            <Serif>payout.</Serif>
          </h2>
        </Reveal>
        <Reveal as="div" className="next-grid" delay={100} style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {referrals.process.map((s) => (
            <div key={s.n} style={{ background: "var(--cream-100)", border: "1px solid var(--navy-a08)", borderRadius: 12, padding: "32px 28px", minHeight: 220, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "auto" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 48, color: "var(--orange-500)", lineHeight: 1, letterSpacing: "-0.02em" }}>{s.n}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--navy-700)" }}>{s.when}</div>
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22, lineHeight: 1.15, letterSpacing: "-0.015em", margin: "24px 0 10px", color: "var(--navy-900)" }}>
                {s.title}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--navy-700)", margin: 0 }}>{s.body}</p>
            </div>
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
            padding: "64px 56px",
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr",
            gap: 48,
            alignItems: "center",
          }}
        >
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 34, lineHeight: 1.15, letterSpacing: "-0.02em", margin: "0 0 12px" }}>
              Ready to start referring?
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.5, color: "rgba(245,240,228,0.75)", margin: 0, maxWidth: 460 }}>
              Message us on WhatsApp or fill the contact form. No fee, no exclusivity lock-in.
            </p>
          </div>
          <MagneticButton
            as={Link}
            href="/contact"
            className="btn btn-orange hover-fade"
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", background: "var(--orange-500)", color: "#FFFFFF", borderRadius: 8, fontSize: 15, fontWeight: 500 }}
          >
            Register as a referrer
            <span aria-hidden>→</span>
          </MagneticButton>
        </Reveal>
      </section>

      <SimpleFooter
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

const h2Style = {
  fontFamily: "var(--font-display)",
  fontWeight: 600,
  fontSize: 56,
  lineHeight: 1,
  letterSpacing: "-0.025em",
  margin: 0,
  color: "var(--navy-900)",
};
