"use client";

import { usePathname } from "next/navigation";

/**
 * Keying on pathname forces React to remount this wrapper on every route
 * change, which re-triggers the CSS "enter" animation (see .page-fade in
 * globals.css) — a lightweight cross-fade/slide between pages with no
 * extra dependency.
 */
export default function PageTransition({ children }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-fade">
      {children}
    </div>
  );
}
