import Link from "next/link";
import { LandingFooter } from "@/components/Footer";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import TiltCard from "@/components/TiltCard";
import MagneticButton from "@/components/MagneticButton";
import FAQItem from "@/components/FAQItem";
import { landing, site } from "@/lib/data";

export default function LandingPage() {
  return (
    <div>
      {/* HERO */}
      <section className="container" style={{ paddingTop: 72, paddingBottom: 48 }}>
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 104,
                lineHeight: 0.96,
                letterSpacing: "-0.035em",
                margin: "0 0 32px",
                color: "var(--navy-900)",
              }}
            >
              BORROW
              <br />
              <span style={{ color: "var(--orange-500)" }}>BETTER</span>
              <br />
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  display: "inline-block",
                  fontSize: "clamp(28px, 8vw, 70px)",
                  marginTop: 8,
                }}
              >
                with Capitabel.
              </span>
            </h1>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 40 }}>
              <MagneticButton
                as={Link}
                href="/contact"
                className="btn btn-orange hover-fade"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "16px 26px",
                  background: "var(--orange-500)",
                  color: "#FFFFFF",
                  borderRadius: 6,
                  fontSize: 15,
                  fontWeight: 500,
                }}
              >
                Book a consultation call <span aria-hidden>→</span>
              </MagneticButton>
            </div>
          </div>

          <div className="hero-tagline" style={{ textAlign: "right" }}>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(32px, 9vw, 72px)",
                lineHeight: 1,
                letterSpacing: "-0.015em",
                color: "var(--navy-900)",
                margin: 0,
              }}
            >
              Growth capital
              <br />
              <span style={{ color: "var(--orange-500)" }}>advisory and fulfilment.</span>
            </p>
          </div>
        </div>
      </section>

      {/* LENDER MARQUEE */}
      <section className="container" style={{ paddingTop: 40, paddingBottom: 20 }}>
        <Reveal as="div" style={{ display: "flex", alignItems: "center", gap: 32, marginBottom: 24 }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--navy-700)",
              whiteSpace: "nowrap",
            }}
          >
            40+ lenders in our network
          </div>
          <div style={{ flex: 1, height: 1, background: "var(--navy-a15)" }} />
        </Reveal>
        <div className="marquee-track">
          <div className="marquee-inner">
            {landing.lendersLoop.map((lender, i) => (
              <div
                key={`${lender}-${i}`}
                style={{
                  padding: "26px 44px",
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: 19,
                  color: "var(--navy-700)",
                  whiteSpace: "nowrap",
                  borderRight: "1px solid var(--navy-a08)",
                  letterSpacing: "-0.01em",
                }}
              >
                {lender}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE PROMISE / 48H */}
      <section style={{ background: "var(--navy-900)", color: "#FFFFFF" }}>
        <div className="container" style={{ paddingTop: 72, paddingBottom: 72 }}>
          <Reveal as="div" style={{ marginBottom: 40 }}>
            <Eyebrow dark>01 · How we work</Eyebrow>
            <h2 style={{ ...h2Style, color: "#FFFFFF" }}>
              The Capitabel <Serif style={{ letterSpacing: "0em" }}>Experience.</Serif>
            </h2>
          </Reveal>

          <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {landing.steps.map((s) => (
              <div key={s.n} style={{ background: "var(--cream-100)", borderRadius: 12, padding: 40 }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 44, lineHeight: 1, color: "var(--orange-500)", letterSpacing: "-0.02em", marginBottom: 20 }}>
                  {s.n}
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 24, lineHeight: 1.2, letterSpacing: "-0.01em", margin: "0 0 10px", color: "var(--navy-900)" }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 16, lineHeight: 1.5, color: "var(--navy-700)", margin: 0 }}>{s.body}</p>
              </div>
            ))}
          </div>

          <Reveal
            as="div"
            className="grid-collapse"
            style={{
              marginTop: 40,
              padding: "40px 48px",
              background: "rgba(245,130,32,0.12)",
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
                Offer Honour Rate
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 32, lineHeight: 1.2, letterSpacing: "-0.015em" }}>
                91% of Capitabel Loan Offers convert to lender sanctions on materially similar terms.
              </div>
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(48px, 12vw, 96px)", color: "var(--orange-500)", letterSpacing: "-0.03em" }}>
              <CountUp value="91%" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* LOAN PRODUCTS */}
      <section id="loans" className="container" style={{ paddingTop: 120, paddingBottom: 120 }}>
        <Reveal as="div" className="split-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 80, alignItems: "end", marginBottom: 56 }}>
          <div>
            <Eyebrow>02 · What we finance</Eyebrow>
            <h2 style={h2Style}>
              Three products.
              <br />
              <Serif>One relationship.</Serif>
            </h2>
          </div>
        </Reveal>

        <Reveal as="div" className="products-grid" delay={100} style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {landing.products.map((p) => (
            <TiltCard
              key={p.code}
              as={Link}
              href="/loans"
              className="card-hover"
              style={{
                background: "var(--navy-900)",
                border: "1px solid transparent",
                borderRadius: 12,
                padding: "36px 32px 32px",
                display: "flex",
                flexDirection: "column",
                minHeight: 480,
                position: "relative",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginBottom: 20 }}>
                <div
                  style={{
                    padding: "4px 10px",
                    background: p.tagBg,
                    color: p.tagFg,
                    borderRadius: 999,
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {p.tag}
                </div>
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 40, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 16px", color: "#FFFFFF" }}>
                {p.name}
              </h3>
              {p.desc && (
                <p style={{ fontSize: 17, lineHeight: 1.5, color: "rgba(245,240,228,0.75)", margin: "0 0 24px", maxWidth: 340 }}>{p.desc}</p>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: "auto" }}>
                {p.bullets.map((b) => (
                  <div key={b} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 16, color: "#FFFFFF" }}>
                    <span style={{ color: "var(--orange-500)", fontWeight: 600, marginTop: 2 }}>◆</span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  marginTop: 32,
                  paddingTop: 20,
                  borderTop: "1px solid rgba(245,240,228,0.15)",
                }}
              >
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,240,228,0.6)", marginBottom: 6 }}>
                    Ticket size
                  </div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 30, color: "#FFFFFF" }}>{p.ticket}</div>
                </div>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "var(--orange-500)",
                    color: "#FFFFFF",
                    fontSize: 18,
                  }}
                  aria-hidden
                >
                  →
                </span>
              </div>
            </TiltCard>
          ))}
        </Reveal>
      </section>

      {/* MATCHING ENGINE */}
      <section className="container" style={{ paddingBottom: 56 }}>
        <Reveal
          as="div"
          style={{
            background: "var(--cream-100)",
            border: "1px solid var(--navy-a08)",
            borderRadius: 16,
            padding: "80px 64px",
          }}
        >
          <Eyebrow>03 · Under the hood</Eyebrow>
          <h2 style={{ ...h2Style, fontSize: 60, marginBottom: 24, maxWidth: 700 }}>
            A matching engine
            <br />
            <Serif>built on ground truth.</Serif>
          </h2>
          <p style={{ ...leadStyle, fontSize: 18, marginBottom: 32, maxWidth: 560 }}>
            2 decades of Real Estate &amp; Banking expertise, codified into a matching engine — offering you the best credit fit for your needs.
          </p>

          <div className="grid-collapse" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 32 }}>
            {landing.engineFacts.map((f) => (
              <div key={f.label} style={{ padding: 24, background: "#FFFFFF", borderRadius: 8 }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 34, lineHeight: 1, color: "var(--navy-900)", letterSpacing: "-0.015em" }}>
                  <CountUp value={f.val} />
                </div>
                <div style={{ fontSize: 14, color: "var(--navy-700)", marginTop: 10 }}>{f.label}</div>
              </div>
            ))}
          </div>
          <Link href="/about" className="underline-link hover-fade" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--navy-900)", fontWeight: 500 }}>
            Read the story behind Capitabel →
          </Link>
        </Reveal>
      </section>

      {/* PEOPLE WHO BORROWED BETTER */}
      <section style={{ background: "var(--navy-900)", color: "#FFFFFF", paddingBottom: 72 }}>
        <div className="container" style={{ paddingTop: 72, paddingBottom: 40 }}>
          <Reveal as="div" style={{ marginBottom: 40 }}>
            <Eyebrow dark>04 · Client stories</Eyebrow>
            <h2 style={{ ...h2Style, color: "#FFFFFF" }}>
              People who <Serif>Borrowed Better.</Serif>
            </h2>
          </Reveal>
        </div>

        <div className="wall-track">
          <div className="wall-inner">
            {[...landing.borrowedBetter, ...landing.borrowedBetter].map((c, i) => (
              <TiltCard
                key={`${c.name}-${i}`}
                maxTilt={4}
                style={{
                  flexShrink: 0,
                  width: 380,
                  background: "var(--cream-100)",
                  border: "1px solid var(--navy-a08)",
                  borderRadius: 16,
                  padding: 32,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: "var(--navy-900)",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: 16,
                      flexShrink: 0,
                    }}
                  >
                    {c.initial}
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--navy-900)" }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: "var(--navy-700)" }}>{c.role}</div>
                  </div>
                </div>

                <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--navy-700)", margin: "0 0 20px" }}>{c.quote}</p>

                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    letterSpacing: "0.02em",
                    color: "var(--navy-700)",
                    padding: "12px 16px",
                    background: "#FFFFFF",
                    border: "1px solid var(--navy-a08)",
                    borderRadius: 8,
                    marginBottom: 16,
                  }}
                >
                  {c.product} · {c.ticket}
                </div>

                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "8px 14px",
                    background: "rgba(245,130,32,0.12)",
                    border: "1px solid rgba(245,130,32,0.3)",
                    borderRadius: 999,
                  }}
                >
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13, color: "var(--orange-500)" }}>{c.outcome}</span>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container" style={{ paddingTop: 48, paddingBottom: 120 }}>
        <div className="faq-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }}>
          <div className="faq-sticky" style={{ position: "sticky", top: 120 }}>
            <Eyebrow>05 · FAQ</Eyebrow>
            <h2 style={{ ...h2Style, fontSize: 56, marginBottom: 24 }}>
              Questions we
              <br />
              <Serif>hear most often.</Serif>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.5, color: "var(--navy-700)", margin: "0 0 20px", maxWidth: 340 }}>
              A 10-minute call to answer all your queries.
            </p>
            <Link
              href="/contact"
              className="btn btn-dark hover-fade"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 22px", background: "var(--navy-900)", color: "#FFFFFF", borderRadius: 6, fontSize: 14, fontWeight: 500 }}
            >
              Book a call →
            </Link>
          </div>
          <Reveal as="div">
            {landing.faqs.map((f, i) => (
              <FAQItem key={f.q} n={String(i + 1).padStart(2, "0")} q={f.q} a={f.a} />
            ))}
            <div style={{ borderTop: "1px solid var(--navy-a15)" }} />
          </Reveal>
        </div>
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
            padding: "88px 64px",
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr",
            gap: 64,
            alignItems: "end",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", top: -100, right: -80, width: 340, height: 340, background: "var(--orange-500)", opacity: 0.35, filter: "blur(10px)", borderRadius: "50%" }} />
          <div style={{ position: "relative" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--orange-500)", marginBottom: 24 }}>
              A real person, on your side
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 80, lineHeight: 0.98, letterSpacing: "-0.03em", margin: "0 0 20px" }}>
              Start with a
              <br />
              <Serif>conversation,</Serif>
              <br />
              not a commitment.
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.5, color: "rgba(245,240,228,0.72)", margin: 0, maxWidth: 520 }}>
              A free 10-minute consultation with loan experts who understand what you&rsquo;re building.
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
              className="btn btn-white hover-fade"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 26px", background: "#FFFFFF", color: "var(--navy-900)", borderRadius: 8, fontSize: 16, fontWeight: 500 }}
            >
              WhatsApp us
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}>{site.phone}</span>
            </a>
            <a
              href={site.phoneHref}
              className="btn hover-fade"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 26px", background: "transparent", border: "1px solid rgba(245,240,228,0.25)", color: "#FFFFFF", borderRadius: 8, fontSize: 16 }}
            >
              Call directly
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "rgba(245,240,228,0.7)" }}>Mon–Sat · 10–6</span>
            </a>
          </div>
        </Reveal>
      </section>

      <LandingFooter />
    </div>
  );
}

function Eyebrow({ children, dark = false }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: dark ? "var(--orange-500)" : "var(--navy-900)",
        marginBottom: 20,
      }}
    >
      {children}
    </div>
  );
}

function Serif({ children, style = {} }) {
  return (
    <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--orange-500)", ...style }}>{children}</span>
  );
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
