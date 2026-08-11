import { SimpleFooter } from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { contact, site } from "@/lib/data";

export const metadata = {
  title: "Contact",
  description:
    "Book a free 20-minute consultation call. WhatsApp, phone, or email — response within two hours during business days, Mon–Sat 9–7 IST.",
};

export default function ContactPage() {
  return (
    <div>
      <section className="container" style={{ paddingTop: 64, paddingBottom: 40 }}>
        <Eyebrow>Contact · Chennai · Mon–Sat · 9–7 IST</Eyebrow>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 104,
            lineHeight: 0.96,
            letterSpacing: "-0.035em",
            margin: "0 0 32px",
            maxWidth: 1200,
          }}
        >
          Let&rsquo;s talk about
          <br />
          <Serif>your file.</Serif>
        </h1>
        <p style={{ fontSize: 20, lineHeight: 1.45, color: "var(--navy-700)", maxWidth: 640, margin: 0, textWrap: "pretty" }}>
          A twenty-minute call with a lending specialist. Free, unhurried, and no commitment. Response within two hours during business days.
        </p>
      </section>

      <section className="container" style={{ paddingTop: 40, paddingBottom: 120 }}>
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24, alignItems: "start" }}>
          <ContactForm />

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ background: "var(--navy-900)", color: "#FFFFFF", borderRadius: 12, padding: "32px 28px" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,240,228,0.6)", marginBottom: 16 }}>
                Prefer to skip the form?
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <a
                  href={site.whatsappWithText}
                  className="btn btn-orange hover-fade"
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "var(--orange-500)", color: "#FFFFFF", borderRadius: 8, fontSize: 14, fontWeight: 500 }}
                >
                  <span>WhatsApp us</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>{site.phone}</span>
                </a>
                <a
                  href={site.phoneHref}
                  className="btn hover-fade"
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "rgba(245,240,228,0.08)", border: "1px solid rgba(245,240,228,0.2)", color: "#FFFFFF", borderRadius: 8, fontSize: 14 }}
                >
                  <span>Call directly</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(245,240,228,0.7)" }}>Mon–Sat · 9–7</span>
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="btn hover-fade"
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "rgba(245,240,228,0.08)", border: "1px solid rgba(245,240,228,0.2)", color: "#FFFFFF", borderRadius: 8, fontSize: 14 }}
                >
                  <span>Email</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(245,240,228,0.7)" }}>{site.email}</span>
                </a>
              </div>
            </div>

            <div style={{ background: "var(--cream-100)", border: "1px solid var(--navy-a08)", borderRadius: 12, padding: "32px 28px" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--navy-700)", marginBottom: 16 }}>
                Head office
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22, lineHeight: 1.2, letterSpacing: "-0.01em", color: "var(--navy-900)", marginBottom: 12 }}>
                Besantnagar, Chennai
              </div>
              <div style={{ fontSize: 14, color: "var(--navy-700)", lineHeight: 1.6 }}>
                {site.address.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Tiger+Varadachar+Road+Besantnagar+Chennai"
                target="_blank"
                rel="noreferrer"
                className="underline-link hover-fade"
                style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 16, fontSize: 13, color: "var(--navy-900)", fontWeight: 500 }}
              >
                Open in Google Maps →
              </a>
            </div>

            <div style={{ background: "var(--cream-300)", borderRadius: 12, padding: "32px 28px" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--navy-700)", marginBottom: 16 }}>
                Cluster contacts
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {contact.clusters.map((c) => (
                  <div key={c.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingBottom: 14, borderBottom: "1px solid var(--navy-a15)" }}>
                    <div>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15, color: "var(--navy-900)" }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: "var(--navy-700)" }}>{c.rm}</div>
                    </div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--navy-700)" }}>{c.tag}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section style={{ background: "var(--cream-300)" }}>
        <div className="container" style={{ paddingTop: 100, paddingBottom: 100 }}>
          <div style={{ marginBottom: 48 }}>
            <Eyebrow>What happens next</Eyebrow>
            <h2 style={{ ...h2Style, maxWidth: 900 }}>
              Three steps between here and a
              <br />
              <Serif>Capitabel Loan Offer.</Serif>
            </h2>
          </div>
          <div className="next-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {contact.next.map((n) => (
              <div key={n.n} style={{ background: "var(--cream-100)", border: "1px solid var(--navy-a08)", borderRadius: 12, padding: "32px 28px", minHeight: 220, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "auto" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 48, color: "var(--orange-500)", lineHeight: 1, letterSpacing: "-0.02em" }}>{n.n}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--navy-700)" }}>{n.when}</div>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22, lineHeight: 1.15, letterSpacing: "-0.015em", margin: "24px 0 10px", color: "var(--navy-900)" }}>
                  {n.title}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--navy-700)", margin: 0 }}>{n.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SimpleFooter
        links={[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
          { href: "/loans", label: "Loans" },
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

const h2Style = {
  fontFamily: "var(--font-display)",
  fontWeight: 600,
  fontSize: 56,
  lineHeight: 1,
  letterSpacing: "-0.025em",
  margin: 0,
  color: "var(--navy-900)",
};
