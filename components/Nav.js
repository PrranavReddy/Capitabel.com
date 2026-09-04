"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/data";

export default function Nav() {
  const pathname = usePathname();

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
            style={{ display: "block", mixBlendMode: "multiply" }}
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
      </div>
    </nav>
  );
}
