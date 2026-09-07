"use client";

import dynamic from "next/dynamic";
import { CALCULATOR_IMPORTS } from "./preload";

/**
 * next/dynamic's ssr:false isn't allowed inside a Server Component, so the
 * [slug] page (which needs to stay a Server Component for generateMetadata
 * / generateStaticParams) hands off to this Client Component instead.
 *
 * ssr:false matters here specifically because these calculators use
 * recharts' ResponsiveContainer, which measures the DOM on mount — trying
 * to server-render it risks a 0-size chart flash / hydration mismatch.
 */
const LOADING = (
  <div style={{ padding: "100px 24px", textAlign: "center", color: "var(--navy-700)", fontSize: 14 }}>
    Loading calculator…
  </div>
);

const COMPONENTS = Object.fromEntries(
  Object.entries(CALCULATOR_IMPORTS).map(([slug, load]) => [slug, dynamic(load, { ssr: false, loading: () => LOADING })])
);

export default function CalculatorLoader({ slug }) {
  const Component = COMPONENTS[slug];
  if (!Component) return null;
  return <Component />;
}
