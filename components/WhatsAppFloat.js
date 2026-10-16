"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/ContactIcons";
import { site } from "@/lib/data";

// Rendered from the root layout, outside PageTransition: that wrapper plays a
// transform animation on every page load, and a position:fixed element inside
// a transformed ancestor is positioned against it instead of the screen.
export default function WhatsAppFloat() {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  return (
    <a
      href={site.whatsappWithText}
      target="_blank"
      rel="noreferrer"
      className="wa-float"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <WhatsAppIcon size={32} color="#FFFFFF" />
    </a>
  );
}
