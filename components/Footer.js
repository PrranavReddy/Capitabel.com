import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/data";

export function LandingFooter() {
  return (
    <footer style={{ background: "var(--cream-300)", borderTop: "1px solid var(--navy-a08)" }}>
      <div className="container" style={{ paddingTop: 72, paddingBottom: 32 }}>
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
            gap: 56,
            marginBottom: 56,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <Image
                src="/images/capitabel-logo.png"
                alt="Capitabel"
                width={198}
                height={36}
                style={{ display: "block" }}
              />
            </div>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: 28,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--navy-900)",
                margin: "0 0 32px",
                maxWidth: 400,
              }}
            >
              Building Bharat through
              <br />
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--orange-500)" }}>
                credit access.
              </span>
            </p>
            <div style={{ fontSize: 13, color: "var(--navy-700)", lineHeight: 1.6, maxWidth: 340 }}>
              {site.address.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--navy-700)",
                marginBottom: 20,
              }}
            >
              Explore
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 14, color: "var(--navy-900)" }}>
              <Link className="hover-fade" href="/">Home</Link>
              <Link className="hover-fade" href="/about">About us</Link>
              <Link className="hover-fade" href="/loans">Loan products</Link>
              <Link className="hover-fade" href="/journal">Journal</Link>
              <Link className="hover-fade" href="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--navy-700)",
                marginBottom: 20,
              }}
            >
              Reach us
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 14, color: "var(--navy-900)" }}>
              <a className="hover-fade" href={site.phoneHref}>{site.phone}</a>
              <a className="hover-fade" href={`mailto:${site.email}`}>{site.email}</a>
              <a className="hover-fade" href={site.whatsapp}>WhatsApp us →</a>
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--navy-700)",
                marginBottom: 20,
              }}
            >
              Elsewhere
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 14, color: "var(--navy-900)" }}>
              <a className="hover-fade" href="#">LinkedIn ↗</a>
              <a className="hover-fade" href="#">Instagram ↗</a>
              <a className="hover-fade" href="#">Facebook ↗</a>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid var(--navy-a15)",
            paddingTop: 28,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 24,
            flexWrap: "wrap",
            fontSize: 12,
            color: "var(--navy-700)",
          }}
        >
          <div>© 2026 Capitabel Solutions Pvt Ltd. All rights reserved.</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em" }}>
            CHENNAI · EST. 2023 · MANOR GROUP
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            <a className="hover-fade" href="#">Privacy</a>
            <a className="hover-fade" href="#">Terms</a>
            <a className="hover-fade" href="#">Disclosures</a>
          </div>
        </div>

        <div
          className="footer-wordmark"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(80px,17vw,240px)",
            lineHeight: 0.9,
            color: "var(--navy-900)",
            opacity: 0.08,
            letterSpacing: "-0.04em",
            marginTop: 32,
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          CAPITABEL
        </div>
      </div>
    </footer>
  );
}

export function SimpleFooter({ links, background = "#FFFFFF" }) {
  return (
    <footer style={{ background, borderTop: "1px solid var(--navy-a08)" }}>
      <div
        className="container"
        style={{
          paddingTop: 56,
          paddingBottom: 28,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
          flexWrap: "wrap",
          gap: 32,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <Image
              src="/images/capitabel-logo.png"
              alt="Capitabel"
              width={132}
              height={24}
              style={{ display: "block" }}
            />
          </div>
          <div style={{ fontSize: 12, color: "var(--navy-700)" }}>© 2026 Capitabel Solutions Pvt Ltd · Chennai</div>
        </div>
        <div style={{ display: "flex", gap: 32, fontSize: 14 }}>
          {links.map((link) => (
            <Link key={link.href} className="hover-fade" href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
