import Link from "next/link";
import Image from "next/image";
import { SimpleFooter } from "@/components/Footer";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import TiltCard from "@/components/TiltCard";
import MagneticButton from "@/components/MagneticButton";
import { about, site } from "@/lib/data";

export const metadata = {
  title: "About",
  description:
    "Founded 2023 in Chennai. Twenty-five years of South India real estate ground truth, codified into a matching engine for MSMEs, developers, and homebuyers.",
};

export default function AboutPage() {
  return (
    <div>
      {/* STORY */}
      <section className="container" style={{ paddingTop: 72, paddingBottom: 40 }}>
        <Eyebrow>About Capitabel</Eyebrow>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 112,
            lineHeight: 0.96,
            letterSpacing: "-0.035em",
            margin: "0 0 40px",
            maxWidth: 1200,
          }}
        >
          20+ years of
          <br />
          South Indian ground roots.
          <br />
          <Serif>Codified into a lender.</Serif>
        </h1>
        <div className="split-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, marginTop: 48 }}>
          <p style={{ fontSize: 19, lineHeight: 1.5, color: "var(--navy-700)", margin: 0, textWrap: "pretty" }}>
            The founding insight: millions of creditworthy borrowers in Urban, Peri-Urban and Tier 2 South India are underserved - not because
            lenders won&rsquo;t lend to them, but because the matching infrastructure between borrower and lender does not exist. Built on Manor
            Group&rsquo;s 20+ years of ground truths, we&rsquo;re now codifying that ground-level knowledge into technology.
          </p>
          <p style={{ fontSize: 19, lineHeight: 1.5, color: "var(--navy-700)", margin: 0, textWrap: "pretty" }}>
            Capitabel Solutions was founded in 2023 by Chidambaram Kattuputur and Harish Bode - two operators with deeply complementary expertise:
            15+ years in South India real estate development, and 18+ years in banking technology built across Europe.
          </p>
        </div>
      </section>

      {/* BY THE NUMBERS */}
      <section style={{ background: "var(--navy-900)", color: "#FFFFFF" }}>
        <div className="container" style={{ paddingTop: 120, paddingBottom: 120 }}>
          <Reveal as="div">
            <Eyebrow dark>By the numbers · Since 2023</Eyebrow>
            <h2 style={{ ...h2Style, fontSize: 72, lineHeight: 0.98, color: "#FFFFFF", marginBottom: 64 }}>
              Two years in.
              <br />
              <Serif>Measured honestly.</Serif>
            </h2>
          </Reveal>
          <Reveal as="div" className="stats-grid" delay={100} style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {about.stats.map((s) => (
              <div key={s.tag} style={{ borderTop: "1px solid rgba(245,240,228,0.2)", paddingTop: 28 }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 72, lineHeight: 1, letterSpacing: "-0.03em", color: "#FFFFFF" }}>
                  <CountUp value={s.val} />
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--orange-500)", marginTop: 16 }}>
                  {s.tag}
                </div>
                <div style={{ fontSize: 14, color: "rgba(245,240,228,0.7)", marginTop: 8, maxWidth: 220 }}>{s.label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* FOUNDING TEAM */}
      <section className="container" style={{ paddingTop: 120, paddingBottom: 120 }}>
        <Reveal as="div" className="split-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 80, alignItems: "end", marginBottom: 56 }}>
          <div>
            <Eyebrow>Founding team</Eyebrow>
            <h2 style={h2Style}>
              A team you
              <br />
              <Serif>actually talk to.</Serif>
            </h2>
          </div>
          <p style={leadStyle}>
            Real estate operations, European banking technology, and India&rsquo;s leading MSME NBFC — three career paths that met in a
            Besantnagar office and stayed.
          </p>
        </Reveal>

        <Reveal as="div" className="team-grid" delay={100} style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24 }}>
          {about.team.map((m) => (
            <TiltCard key={m.name} maxTilt={5} style={{ background: "var(--cream-100)", border: "1px solid var(--navy-a08)", borderRadius: 12, padding: 32, display: "grid", gridTemplateColumns: "auto 1fr", gap: 28 }}>
              <div style={{ width: 140, aspectRatio: "4/5", background: "var(--cream-200)", borderRadius: 8, overflow: "hidden", position: "relative" }}>
                {m.img ? (
                  <Image src={m.img} alt={m.name} fill sizes="140px" style={{ objectFit: "cover" }} />
                ) : (
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "var(--navy-700)",
                      textAlign: "center",
                      padding: 8,
                    }}
                  >
                    img · portrait pending
                  </div>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--orange-500)", marginBottom: 8 }}>
                  {m.role}
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 24, lineHeight: 1.1, letterSpacing: "-0.015em", margin: "0 0 12px", color: "var(--navy-900)" }}>
                  {m.name}
                </h3>
                <p style={{ fontSize: 13, lineHeight: 1.55, color: "var(--navy-700)", margin: "0 0 16px" }}>{m.bio}</p>
                <div style={{ marginTop: "auto", paddingTop: 16, borderTop: "1px solid var(--navy-a12)", display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--navy-700)" }}>
                  <span>{m.langs}</span>
                  <span>{m.base}</span>
                </div>
              </div>
            </TiltCard>
          ))}
        </Reveal>

        {/* OPERATING TEAM */}
        <Reveal as="div" style={{ marginTop: 48, background: "var(--navy-900)", color: "#FFFFFF", borderRadius: 12, padding: "44px 48px" }}>
          <Eyebrow dark>Current operating team</Eyebrow>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 36, letterSpacing: "-0.02em", margin: "0 0 32px" }}>
            On the ground, in seven roles.
          </h3>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {about.opsTeam.map((p) => (
              <div
                key={p.name}
                className="opsrow-grid"
                style={{ display: "grid", gridTemplateColumns: "1.4fr 1.5fr 1fr 2fr", gap: 24, padding: "20px 0", borderTop: "1px solid rgba(245,240,228,0.15)", alignItems: "baseline" }}
              >
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 18, color: "#FFFFFF" }}>{p.name}</div>
                <div style={{ fontSize: 14, color: "rgba(245,240,228,0.75)" }}>{p.role}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--orange-500)" }}>{p.loc}</div>
                <div style={{ fontSize: 13, color: "rgba(245,240,228,0.7)" }}>{p.focus}</div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(245,240,228,0.15)" }} />
          </div>
        </Reveal>
      </section>

      {/* BELIEFS */}
      <section className="container" style={{ paddingTop: 120, paddingBottom: 120 }}>
        <Reveal as="div" style={{ marginBottom: 56 }}>
          <Eyebrow>What we believe</Eyebrow>
          <h2 style={{ ...h2Style, maxWidth: 1000 }}>
            Four ideas we <Serif>refuse to bend on.</Serif>
          </h2>
        </Reveal>
        <Reveal as="div" className="beliefs-grid" delay={100} style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
          {about.beliefs.map((b) => (
            <div key={b.n} style={{ background: "var(--cream-100)", border: "1px solid var(--navy-a08)", borderRadius: 12, padding: "44px 40px", minHeight: 260, display: "flex", flexDirection: "column" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 44, color: "var(--orange-500)", lineHeight: 1, letterSpacing: "-0.02em", marginBottom: "auto" }}>
                {b.n}
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 28, lineHeight: 1.15, letterSpacing: "-0.02em", margin: "36px 0 12px", color: "var(--navy-900)" }}>
                {b.title}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--navy-700)", margin: 0, maxWidth: 480 }}>{b.body}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* TESTIMONIALS */}
      <section className="container" style={{ paddingBottom: 120 }}>
        <Reveal as="div" style={{ marginBottom: 56 }}>
          <Eyebrow>Client voices</Eyebrow>
          <h2 style={{ ...h2Style, maxWidth: 900 }}>
            Fifty-two files.
            <br />
            <Serif>Fifty-two conversations</Serif> that started with trust.
          </h2>
        </Reveal>

        <Reveal as="div" className="testimonials-grid" delay={100} style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 20 }}>
          {about.testimonials.map((t) => (
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
        </Reveal>
      </section>

      {/* CTA */}
      <section className="container" style={{ paddingBottom: 120 }}>
        <Reveal
          as="div"
          className="cta-grid glass-tile"
          style={{
            background: "linear-gradient(160deg, rgba(247,146,52,0.92), rgba(224,110,10,0.92))",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.35)",
            boxShadow: "0 24px 60px -16px rgba(199,92,0,0.5), inset 0 1px 0 rgba(255,255,255,0.3)",
            color: "#FFFFFF",
            borderRadius: 16,
            padding: "80px 64px",
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 48,
            alignItems: "end",
          }}
        >
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 60, lineHeight: 1, letterSpacing: "-0.03em", margin: "0 0 20px" }}>
              Talk to a founder,
              <br />
              not a form.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.5, color: "rgba(255,255,255,0.9)", margin: 0, maxWidth: 480 }}>
              Every consultation call in Q1 goes to Harish, Chidu, or Devesh directly. No routing menus.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <MagneticButton
              as={Link}
              href="/contact"
              className="btn hover-fade"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "22px 26px",
                background: "rgba(22,38,77,0.92)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#FFFFFF",
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 500,
              }}
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
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 26px", background: "transparent", border: "1px solid rgba(255,255,255,0.35)", color: "#FFFFFF", borderRadius: 8, fontSize: 16 }}
            >
              Call directly
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "rgba(255,255,255,0.8)" }}>Mon–Sat · 10–6</span>
            </a>
          </div>
        </Reveal>
      </section>

      <SimpleFooter
        links={[
          { href: "/", label: "Home" },
          { href: "/loans", label: "Loans" },
          { href: "/contact", label: "Contact" },
        ]}
      />
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
