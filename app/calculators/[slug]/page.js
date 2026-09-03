import Link from "next/link";
import { notFound } from "next/navigation";
import { SimpleFooter } from "@/components/Footer";
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

      <section className="container" style={{ paddingBottom: 100 }}>
        <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--navy-a08)" }}>
          <CalculatorLoader slug={slug} />
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
