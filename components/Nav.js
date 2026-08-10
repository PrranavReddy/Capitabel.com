"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navLinks, site } from "@/lib/data";

export default function Nav() {
  const pathname = usePathname();
  const isContact = pathname === "/contact";

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--navy-a08)",
      }}
    >
      <div
        className="container"
        style={{
          paddingTop: 18,
          paddingBottom: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <Image
            src="/images/capitabel-logo.png"
            alt="Capitabel"
            width={165}
            height={30}
            style={{ display: "block" }}
            priority
          />
        </Link>

        <div className="nav-links" style={{ fontSize: 14, color: "var(--navy-700)", fontWeight: 500 }}>
          {navLinks.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link hover-fade"
                style={{ color: active ? "var(--orange-500)" : "var(--navy-700)" }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <Link
          href={isContact ? site.whatsapp : "/contact"}
          className="btn btn-dark hover-fade"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "11px 20px",
            background: "var(--navy-900)",
            color: "#FFFFFF",
            borderRadius: 6,
            fontSize: 14,
            fontWeight: 500,
            flexShrink: 0,
          }}
        >
          <span className="nav-cta-label">{isContact ? "WhatsApp us" : "Talk to an expert"}</span>
          <span aria-hidden>→</span>
        </Link>
      </div>
    </nav>
  );
}
