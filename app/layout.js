import { Space_Grotesk, Instrument_Serif, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://capitabel.com"),
  title: {
    default: "Capitabel Solutions — Building Bharat through credit access.",
    template: "%s · Capitabel Solutions",
  },
  description:
    "One advisor. The right lender. 48 hours. Capitabel Solutions matches MSMEs, construction developers, and homebuyers across Tier 2/3 South India with the right lender — fast.",
  keywords: [
    "Capitabel",
    "MSME loans",
    "Loan Against Property",
    "Home Loan Chennai",
    "South India lending",
    "Capitabel Solutions",
  ],
  openGraph: {
    title: "Capitabel Solutions — Building Bharat through credit access.",
    description: "One advisor. The right lender. 48 hours.",
    url: "https://capitabel.com",
    siteName: "Capitabel Solutions",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${instrumentSerif.variable} ${dmSans.variable} ${jetBrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
