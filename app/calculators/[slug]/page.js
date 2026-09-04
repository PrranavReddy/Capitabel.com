import Link from "next/link";
import { notFound } from "next/navigation";
import { SimpleFooter } from "@/components/Footer";
import MagneticButton from "@/components/MagneticButton";
import CalculatorLoader from "@/components/calculators/CalculatorLoader";
import { calculators } from "@/lib/data";

export function generateStaticParams() {
  return calculators.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = calculators.find((x) => x.slug === slug);
  if (!c) return {};
  return {
    title: c.title,
    description: c.desc,
  };
}

export default async function CalculatorDetailPage({ params }) {
  const { slug } = await params;
  const c = calculators.find((x) => x.slug === slug);
  if (!c) notFound();

  return (
    <div>
      <section className="container" style={{ paddingTop: 32, paddingBottom: 16 }}>
        <Link
          href="/calculators"
          className="underline-link hover-fade"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--navy-900)", fontWeight: 500 }}
        >
          <span aria-hidden>←</span> All calculators
        </Link>
      </section>

      <section className="container" style={{ paddingBottom: 80 }}>
        <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--navy-a08)" }}>
          <CalculatorLoader slug={slug} />
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
            padding: "64px 56px",
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr",
            gap: 48,
            alignItems: "center",
          }}
        >
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 34, lineHeight: 1.15, letterSpacing: "-0.02em", margin: "0 0 12px" }}>
              This is how much you could be overpaying.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.5, color: "rgba(245,240,228,0.75)", margin: 0, maxWidth: 460 }}>
              Let us help you save more of it.
            </p>
          </div>
          <MagneticButton
            as={Link}
            href="/contact"
            className="btn btn-orange hover-fade"
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", background: "var(--orange-500)", color: "#FFFFFF", borderRadius: 8, fontSize: 15, fontWeight: 500 }}
          >
            Book a consultation call
            <span aria-hidden>→</span>
          </MagneticButton>
        </div>
      </section>

      <SimpleFooter
        background="var(--cream-300)"
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
