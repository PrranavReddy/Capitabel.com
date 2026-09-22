export default function ContactForm() {
  return (
    <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--navy-a08)" }}>
      <iframe
        title="Book a consultation call"
        src="https://forms.cloud.microsoft/r/j0PQQpj14R?embed=true"
        style={{ width: "100%", height: 2600, border: "none", display: "block" }}
        allowFullScreen
      />
    </div>
  );
}
