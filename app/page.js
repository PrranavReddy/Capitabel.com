import Link from "next/link";
import Nav from "@/components/Nav";
import { LandingFooter } from "@/components/Footer";
import { landing, site } from "@/lib/data";

export default function LandingPage() {
  return (
    <div>
      <Nav />

      {/* HERO */}
      <section className="container" style={{ paddingTop: 72, paddingBottom: 48 }}>
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 64, alignItems: "end" }}>
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "6px 14px",
                border: "1px solid var(--navy-a20)",
                borderRadius: 999,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--navy-700)",
                marginBottom: 44,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--orange-500)" }} />
              Borrowing made Simple
            </div>

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
                  fontSize: 70,
                  marginTop: 8,
                }}
              >
                with Capitabel.
              </span>
            </h1>
            <p style={{ fontSize: 20, lineHeight: 1.45, color: "var(--navy-700)", maxWidth: 560, margin: "0 0 40px", textWrap: "pretty" }}>
              One advisor. The right lender. 48 hours.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link
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
              </Link>
              <a
                href="#loans"
                className="btn btn-ghost hover-fade"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "16px 26px",
                  background: "transparent",
                  border: "1px solid var(--navy-a25)",
                  color: "var(--navy-900)",
                  borderRadius: 6,
                  fontSize: 15,
                  fontWeight: 500,
                }}
              >
                Explore loan products
              </a>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                position: "relative",
                aspectRatio: "4/5",
                background: "repeating-linear-gradient(135deg,#EFE7D5,#EFE7D5 12px,#D8CCB4 12px,#D8CCB4 24px)",
                borderRadius: 8,
                overflow: "hidden",
                display: "flex",
                alignItems: "flex-end",
                padding: 20,
                width: "100%",
                maxWidth: 400,
                height: 462,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--navy-700)",
                  background: "rgba(255,255,255,0.92)",
                  padding: "6px 10px",
                  borderRadius: 4,
                }}
              >
                img · advisor with borrower, Chennai site
              </span>
            </div>
            <div style={{ background: "var(--navy-900)", color: "#FFFFFF", borderRadius: 8, padding: 22 }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 44, lineHeight: 1, letterSpacing: "-0.02em" }}>
                48 hrs
              </div>
              <div style={{ fontSize: 12, color: "rgba(245,240,228,0.7)", marginTop: 8 }}>To a Capitabel Loan Offer</div>
            </div>
          </div>
        </div>
      </section>

      {/* LENDER MARQUEE */}
      <section className="container" style={{ paddingTop: 40, paddingBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 32, marginBottom: 24 }}>
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
        </div>
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

      {/* LOAN PRODUCTS */}
      <section id="loans" className="container" style={{ paddingTop: 120, paddingBottom: 120 }}>
        <div className="split-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 80, alignItems: "end", marginBottom: 56 }}>
          <div>
            <Eyebrow>01 · What we finance</Eyebrow>
            <h2 style={h2Style}>
              Three products.
              <br />
              <Serif>One relationship.</Serif>
            </h2>
          </div>
          <p style={leadStyle}>
            Home Loans, Loan Against Property, and MSME finance — from a single advisor with visibility across our full lender panel. Higher
            lifetime value for the borrower, better outcomes for the file.
          </p>
        </div>

        <div className="products-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {landing.products.map((p) => (
            <Link
              key={p.code}
              href="/loans"
              className="card-hover"
              style={{
                background: "var(--cream-100)",
                border: "1px solid var(--navy-a08)",
                borderRadius: 12,
                padding: "36px 32px 32px",
                display: "flex",
                flexDirection: "column",
                minHeight: 480,
                position: "relative",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--navy-700)" }}>
                  {p.code}
                </div>
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
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 32, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 12px", color: "var(--navy-900)" }}>
                {p.name}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.5, color: "var(--navy-700)", margin: "0 0 24px", maxWidth: 340 }}>{p.desc}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: "auto" }}>
                {p.bullets.map((b) => (
                  <div key={b} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, color: "var(--navy-900)" }}>
                    <span style={{ color: "var(--orange-500)", fontWeight: 600, marginTop: 1 }}>◆</span>
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
                  borderTop: "1px solid var(--navy-a12)",
                }}
              >
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--navy-700)", marginBottom: 4 }}>
                    Ticket range
                  </div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22, color: "var(--navy-900)" }}>{p.ticket}</div>
                </div>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "var(--navy-900)",
                    color: "#FFFFFF",
                    fontSize: 16,
                  }}
                  aria-hidden
                >
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* THE PROMISE / 48H */}
      <section style={{ background: "var(--navy-900)", color: "#FFFFFF" }}>
        <div className="container" style={{ paddingTop: 120, paddingBottom: 120 }}>
          <div className="split-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, marginBottom: 80, alignItems: "end" }}>
            <div>
              <Eyebrow dark>02 · The Capitabel promise</Eyebrow>
              <h2 style={{ ...h2Style, fontSize: 72, lineHeight: 0.98, color: "#FFFFFF" }}>
                A Loan Offer in
                <br />
                <span style={{ color: "var(--orange-500)" }}>48 hours,</span> not
                <br />
                a wait for a lender.
              </h2>
            </div>
            <p style={{ ...leadStyle, color: "rgba(245,240,228,0.75)", maxWidth: 480 }}>
              National fintechs make you wait on a lender&rsquo;s decision. Traditional DSAs make you chase paperwork through a black box. We
              issue our own in-principle offer — indicative rate, fees, tenure, KFS terms — within 48 hours of a complete file.
            </p>
          </div>

          <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {landing.steps.map((s) => (
              <div key={s.n} style={{ borderTop: "1px solid rgba(245,240,228,0.2)", paddingTop: 32 }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 56 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 56, lineHeight: 1, color: "var(--orange-500)", letterSpacing: "-0.02em" }}>
                    {s.n}
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,240,228,0.5)" }}>
                    {s.dur}
                  </div>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 26, lineHeight: 1.15, letterSpacing: "-0.01em", margin: "0 0 14px" }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.55, color: "rgba(245,240,228,0.7)", margin: 0 }}>{s.body}</p>
              </div>
            ))}
          </div>

          <div
            className="grid-collapse"
            style={{
              marginTop: 80,
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
                85% of Capitabel Loan Offers convert to lender sanctions on materially equivalent terms.
              </div>
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 96, color: "var(--orange-500)", letterSpacing: "-0.03em" }}>85%</div>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="container" style={{ paddingTop: 120, paddingBottom: 120 }}>
        <div style={{ marginBottom: 56 }}>
          <Eyebrow>03 · Who we serve</Eyebrow>
          <h2 style={{ ...h2Style, maxWidth: 900 }}>
            Built for the Bharat that the
            <br />
            <Serif>balance-sheet fintechs</Serif> can&rsquo;t reach.
          </h2>
        </div>

        <div className="segments-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {landing.segments.map((seg) => (
            <div
              key={seg.n}
              style={{
                background: seg.bg,
                color: seg.fg,
                borderRadius: 12,
                padding: "40px 36px",
                minHeight: 440,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: seg.label }}>
                  Segment · {seg.n}
                </div>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: seg.dot,
                    color: seg.dotFg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 18,
                  }}
                >
                  {seg.initial}
                </div>
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 36, lineHeight: 1.05, letterSpacing: "-0.02em", margin: "auto 0 16px" }}>
                {seg.title}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.55, margin: "0 0 28px", color: seg.body, maxWidth: 340 }}>{seg.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {seg.tags.map((t) => (
                  <span key={t} style={{ padding: "6px 12px", background: seg.chipBg, borderRadius: 999, fontSize: 12, color: seg.chipFg }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MATCHING ENGINE */}
      <section className="container" style={{ paddingBottom: 120 }}>
        <div
          className="engine-grid"
          style={{
            background: "var(--cream-100)",
            border: "1px solid var(--navy-a08)",
            borderRadius: 16,
            padding: "80px 64px",
            display: "grid",
            gridTemplateColumns: "1.15fr 1fr",
            gap: 80,
            alignItems: "start",
          }}
        >
          <div>
            <Eyebrow>04 · Under the hood</Eyebrow>
            <h2 style={{ ...h2Style, fontSize: 60, marginBottom: 24 }}>
              A matching engine
              <br />
              <Serif>built on ground truth.</Serif>
            </h2>
            <p style={{ ...leadStyle, fontSize: 18, marginBottom: 32, maxWidth: 520 }}>
              Twenty-five years of South India real estate operations from Manor Group. Eighteen years of banking technology from ING
              Netherlands. Codified into a matching engine that routes borrowers by fit — not by what pays us best.
            </p>

            <div className="grid-collapse" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
              {landing.engineFacts.map((f) => (
                <div key={f.label} style={{ padding: 20, background: "#FFFFFF", borderRadius: 8 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 28, lineHeight: 1, color: "var(--navy-900)", letterSpacing: "-0.015em" }}>
                    {f.val}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--navy-700)", marginTop: 8 }}>{f.label}</div>
                </div>
              ))}
            </div>
            <Link href="/about" className="underline-link hover-fade" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--navy-900)", fontWeight: 500 }}>
              Read the story behind Capitabel →
            </Link>
          </div>

          <div style={{ background: "var(--navy-900)", color: "#FFFFFF", borderRadius: 12, padding: 36, fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 1.8 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingBottom: 16,
                marginBottom: 16,
                borderBottom: "1px solid rgba(245,240,228,0.15)",
                color: "rgba(245,240,228,0.6)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontSize: 10,
              }}
            >
              <span>matching-engine.log</span>
              <span style={{ color: "var(--orange-500)" }}>● LIVE</span>
            </div>
            <div style={{ color: "rgba(245,240,228,0.55)" }}>
              [10:24:11] Ingesting file <span style={{ color: "var(--orange-500)" }}>#CP-2841</span>
            </div>
            <div style={{ color: "rgba(255,255,255,0.9)" }}>→ Profile: MSME · Chennai · ₹1.4 Cr · GST-linked</div>
            <div style={{ color: "rgba(245,240,228,0.55)" }}>[10:24:13] Scoring core lenders...</div>
            <div style={{ color: "rgba(255,255,255,0.9)" }}>
              → <span style={{ color: "var(--orange-500)" }}>KVB</span> · 4.6 · direct · TAT 8d · rate 12.8%
            </div>
            <div style={{ color: "rgba(255,255,255,0.9)" }}>
              → <span style={{ color: "var(--orange-500)" }}>ICICI</span> · 4.2 · direct · TAT 10d · rate 13.1%
            </div>
            <div style={{ color: "rgba(255,255,255,0.9)" }}>
              → <span style={{ color: "var(--orange-500)" }}>Central Bank</span> · 3.9 · direct · TAT 12d
            </div>
            <div style={{ color: "rgba(245,240,228,0.55)" }}>[10:24:14] Ranking by borrower fit (Rule 1)</div>
            <div style={{ color: "rgba(245,240,228,0.55)" }}>[10:24:14] Direct route preferred (Rule 2)</div>
            <div style={{ color: "rgba(245,240,228,0.55)" }}>[10:24:15] No channel premium flagged</div>
            <div style={{ color: "var(--orange-500)", marginTop: 12 }}>✓ Recommendation: KVB</div>
            <div style={{ color: "rgba(255,255,255,0.9)" }}>→ Capitabel Loan Offer draft ready · 47:52 remaining</div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container" style={{ paddingBottom: 120 }}>
        <div style={{ marginBottom: 56 }}>
          <Eyebrow>05 · Client voices</Eyebrow>
          <h2 style={{ ...h2Style, maxWidth: 900 }}>
            Fifty-two files.
            <br />
            <Serif>Fifty-two conversations</Serif> that started with trust.
          </h2>
        </div>

        <div className="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 20 }}>
          {landing.testimonials.map((t) => (
            <figure
              key={t.name}
              style={{
                background: "var(--cream-100)",
                border: "1px solid var(--navy-a08)",
                borderRadius: 12,
                padding: 36,
                display: "flex",
                flexDirection: "column",
                margin: 0,
                minHeight: 340,
              }}
            >
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 80, lineHeight: 0.5, color: "var(--orange-500)", marginBottom: 18 }}>&ldquo;</div>
              <blockquote style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 22, lineHeight: 1.3, letterSpacing: "-0.01em", color: "var(--navy-900)", margin: "0 auto 0 0" }}>
                {t.quote}
              </blockquote>
              <figcaption style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--navy-a12)" }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "var(--navy-900)",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                  }}
                >
                  {t.initial}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "var(--navy-900)" }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "var(--navy-700)" }}>{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="container" style={{ paddingBottom: 120 }}>
        <div className="split-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "end", marginBottom: 48 }}>
          <div>
            <Eyebrow>06 · Where we operate</Eyebrow>
            <h2 style={h2Style}>
              Feet on the ground,
              <br />
              <Serif>in five clusters.</Serif>
            </h2>
          </div>
          <p style={{ ...leadStyle, maxWidth: 480 }}>
            Tamil Nadu and Andhra Pradesh, from Chennai&rsquo;s urban core to South Andhra&rsquo;s Tier 2 towns and North Chennai&rsquo;s
            SIPCOT industrial estates. Local RMs, local languages, local relationships.
          </p>
        </div>

        <div className="clusters-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16 }}>
          {landing.clusters.map((c) => (
            <div key={c.name} style={{ background: "var(--cream-100)", border: "1px solid var(--navy-a08)", borderRadius: 12, padding: "28px 24px", minHeight: 220, display: "flex", flexDirection: "column" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--navy-700)", marginBottom: 12 }}>
                {c.tag}
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22, lineHeight: 1.1, letterSpacing: "-0.01em", margin: "0 auto 0 0", color: "var(--navy-900)" }}>
                {c.name}
              </h3>
              <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid var(--navy-a10)" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 28, lineHeight: 1, color: "var(--orange-500)", letterSpacing: "-0.02em" }}>
                  {c.target}
                </div>
                <div style={{ fontSize: 11, color: "var(--navy-700)", marginTop: 4 }}>FY 2026–27 target</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container" style={{ paddingTop: 120, paddingBottom: 120 }}>
        <div className="faq-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }}>
          <div className="faq-sticky" style={{ position: "sticky", top: 120 }}>
            <Eyebrow>07 · FAQ</Eyebrow>
            <h2 style={{ ...h2Style, fontSize: 56, marginBottom: 24 }}>
              Questions we
              <br />
              <Serif>hear most often.</Serif>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.5, color: "var(--navy-700)", margin: "0 0 20px", maxWidth: 340 }}>
              A 20-minute call answers most things faster than an email chain.
            </p>
            <Link
              href="/contact"
              className="btn btn-dark hover-fade"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 22px", background: "var(--navy-900)", color: "#FFFFFF", borderRadius: 6, fontSize: 14, fontWeight: 500 }}
            >
              Book a call →
            </Link>
          </div>
          <div>
            {landing.faqs.map((f) => (
              <details key={f.q} style={{ borderTop: "1px solid var(--navy-a15)", padding: "26px 0" }}>
                <summary style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 22, letterSpacing: "-0.01em", color: "var(--navy-900)" }}>{f.q}</span>
                  <span className="plus" style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 28, color: "var(--orange-500)", flexShrink: 0 }}>
                    +
                  </span>
                </summary>
                <p className="faq-answer" style={{ fontSize: 16, lineHeight: 1.55, color: "var(--navy-700)", margin: "14px 0 0", maxWidth: 680 }}>
                  {f.a}
                </p>
              </details>
            ))}
            <div style={{ borderTop: "1px solid var(--navy-a15)" }} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container" style={{ paddingBottom: 120 }}>
        <div
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
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,240,228,0.6)", marginBottom: 24 }}>
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
              A free 20-minute consultation with a lending specialist who understands what you&rsquo;re building — and what a good rate looks
              like this quarter.
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
            <a
              href={site.phoneHref}
              className="btn hover-fade"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 26px", background: "transparent", border: "1px solid rgba(245,240,228,0.25)", color: "#FFFFFF", borderRadius: 8, fontSize: 16 }}
            >
              Call directly
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "rgba(245,240,228,0.7)" }}>Mon–Sat · 9–7</span>
            </a>
          </div>
        </div>
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
        fontSize: 11,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: dark ? "rgba(245,240,228,0.6)" : "var(--navy-700)",
        marginBottom: 20,
      }}
    >
      {children}
    </div>
  );
}

function Serif({ children }) {
  return (
    <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--orange-500)" }}>{children}</span>
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
