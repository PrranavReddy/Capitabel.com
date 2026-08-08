"use client";

import { useState } from "react";
import { contact, site } from "@/lib/data";

const initialState = {
  name: "",
  phone: "",
  email: "",
  product: contact.loanProducts[0],
  ticket: contact.ticketSizes[0],
  cluster: contact.clusterOptions[0],
  callTime: contact.callTimes[0],
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle"); // idle | error | sent

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      setStatus("error");
      return;
    }

    // TODO: wire to a real submission endpoint (Formspree / Zoho Forms / a
    // Next.js API route that posts into Zoho CRM) before launch. Until then,
    // this opens a pre-filled email to hello@capitabel.com so leads aren't lost.
    const subject = encodeURIComponent(`Consultation request — ${form.name}`);
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Mobile / WhatsApp: ${form.phone}`,
        `Email: ${form.email || "—"}`,
        `Loan product: ${form.product}`,
        `Ticket size: ${form.ticket}`,
        `Cluster: ${form.cluster}`,
        `Best time to call: ${form.callTime}`,
        "",
        "Notes:",
        form.message || "—",
      ].join("\n")
    );

    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  return (
    <div style={{ background: "var(--cream-100)", border: "1px solid var(--navy-a08)", borderRadius: 16, padding: "48px 48px 40px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 32, lineHeight: 1, letterSpacing: "-0.02em", margin: "0 0 8px", color: "var(--navy-900)" }}>
            Book a consultation call
          </h2>
          <p style={{ fontSize: 14, color: "var(--navy-700)", margin: 0 }}>Fill in what you can — the rest we&rsquo;ll cover on the call.</p>
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--navy-700)", textAlign: "right" }}>
          Step 1 / 1
          <br />
          <span style={{ color: "var(--orange-500)" }}>Takes 90 seconds</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="field-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div>
            <label htmlFor="name">Full name</label>
            <input id="name" type="text" placeholder="e.g. Rajesh Kumar" value={form.name} onChange={update("name")} required />
          </div>
          <div>
            <label htmlFor="phone">Mobile · WhatsApp</label>
            <input id="phone" type="tel" placeholder="+91 9XXXX XXXXX" value={form.phone} onChange={update("phone")} required />
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="you@company.com" value={form.email} onChange={update("email")} />
        </div>

        <div className="field-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div>
            <label htmlFor="product">Loan product</label>
            <select id="product" value={form.product} onChange={update("product")}>
              {contact.loanProducts.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="ticket">Ticket size · indicative</label>
            <select id="ticket" value={form.ticket} onChange={update("ticket")}>
              {contact.ticketSizes.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="field-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div>
            <label htmlFor="cluster">Cluster</label>
            <select id="cluster" value={form.cluster} onChange={update("cluster")}>
              {contact.clusterOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="callTime">Best time to call</label>
            <select id="callTime" value={form.callTime} onChange={update("callTime")}>
              {contact.callTimes.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <label htmlFor="message">Anything we should know before the call?</label>
          <textarea
            id="message"
            placeholder="e.g. 'Turned down by two banks — need MSME working capital of ₹80L against my Sriperumbudur unit.'"
            value={form.message}
            onChange={update("message")}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <div style={{ fontSize: 12, color: "var(--navy-700)", maxWidth: 340 }}>
            Your details go directly to a lending specialist — never to a marketing list. See our{" "}
            <a href="#" style={{ color: "var(--navy-900)", textDecoration: "underline" }}>
              privacy note
            </a>
            .
          </div>
          <button
            type="submit"
            className="btn btn-orange hover-fade"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 28px",
              background: "var(--orange-500)",
              color: "#FFFFFF",
              border: "none",
              borderRadius: 6,
              fontSize: 15,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Send &amp; schedule call <span aria-hidden>→</span>
          </button>
        </div>

        <div role="status" aria-live="polite">
          {status === "error" && (
            <p style={{ fontSize: 13, color: "#b3261e", marginTop: 16, marginBottom: 0 }}>
              Please add your name and mobile number so we can call you back.
            </p>
          )}
          {status === "sent" && (
            <p style={{ fontSize: 13, color: "var(--navy-900)", marginTop: 16, marginBottom: 0 }}>
              Thanks — we&rsquo;ve opened an email with your details. Prefer WhatsApp? Use the button on the right for a faster reply.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
