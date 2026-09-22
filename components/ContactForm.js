import MagneticButton from "@/components/MagneticButton";

const FORM_URL = "https://forms.cloud.microsoft/r/j0PQQpj14R";

export default function ContactForm() {
  return (
    <div style={{ background: "var(--cream-100)", border: "1px solid var(--navy-a08)", borderRadius: 16, padding: "48px 48px 40px" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--orange-500)", marginBottom: 16 }}>
        Takes 90 seconds
      </div>

      <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 32, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 12px", color: "var(--navy-900)" }}>
        Book a consultation call
      </h2>
      <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--navy-700)", margin: "0 0 28px", maxWidth: 440 }}>
        A short form, opens in a new tab. Tell us about your loan need and a lending specialist calls you back within two hours on business days.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
        {["Loan product and ticket size", "Your cluster and best time to call", "Anything we should know before we speak"].map((item) => (
          <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--navy-700)" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--orange-500)", flexShrink: 0 }} />
            {item}
          </div>
        ))}
      </div>

      <MagneticButton
        href={FORM_URL}
        target="_blank"
        rel="noreferrer"
        className="btn btn-orange hover-fade"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "16px 28px",
          background: "var(--orange-500)",
          color: "#FFFFFF",
          borderRadius: 6,
          fontSize: 15,
          fontWeight: 500,
        }}
      >
        Open the form <span aria-hidden>↗</span>
      </MagneticButton>

      <p style={{ fontSize: 12, color: "var(--navy-700)", marginTop: 20, marginBottom: 0, maxWidth: 400 }}>
        Your details go directly to a lending specialist, never to a marketing list.
      </p>
    </div>
  );
}
