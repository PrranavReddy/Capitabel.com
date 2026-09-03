import Link from "next/link";
import { notFound } from "next/navigation";
import { SimpleFooter } from "@/components/Footer";
import MagneticButton from "@/components/MagneticButton";
import JournalArticle from "@/components/JournalArticle";
import { journal } from "@/lib/data";

export function generateStaticParams() {
  return journal.posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = journal.posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function JournalPostPage({ params }) {
  const { slug } = await params;
  const post = journal.posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div>
      <section className="container" style={{ paddingTop: 40, paddingBottom: 16 }}>
        <Link
          href="/journal"
          className="underline-link hover-fade"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--navy-900)", fontWeight: 500 }}
        >
          <span aria-hidden>←</span> All journal posts
        </Link>
      </section>

      <section className="container" style={{ paddingBottom: 48 }}>
        <div style={{ display: "flex", gap: 14, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--navy-700)", marginBottom: 20 }}>
          <span>{post.cat}</span>
          <span>·</span>
          <span>{post.read}</span>
          <span>·</span>
          <span>{post.date}</span>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 48,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: "0 0 20px",
            maxWidth: 820,
            color: "var(--navy-900)",
          }}
        >
          {post.title}
        </h1>
        <p style={{ fontSize: 19, lineHeight: 1.5, color: "var(--navy-700)", margin: 0, maxWidth: 680, textWrap: "pretty" }}>{post.excerpt}</p>
      </section>

      <section className="container" style={{ paddingBottom: 80 }}>
        <JournalArticle post={post} />
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
              Have a question this post didn&rsquo;t answer?
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.5, color: "rgba(245,240,228,0.75)", margin: 0, maxWidth: 440 }}>
              A 10-minute call with our team usually clears it up faster than an email chain.
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
          { href: "/calculators", label: "Calculators" },
          { href: "/contact", label: "Contact" },
        ]}
      />
    </div>
  );
}
