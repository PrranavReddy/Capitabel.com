"use client";

import dynamic from "next/dynamic";

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

const COMPONENTS = {
  "emi-calculator": dynamic(() => import("./EMICalculator"), { ssr: false, loading: () => LOADING }),
  "income-eligibility": dynamic(() => import("./IncomeEligibilitySimulator"), { ssr: false, loading: () => LOADING }),
  "balance-transfer": dynamic(() => import("./BalanceTransferSimulator"), { ssr: false, loading: () => LOADING }),
  "max-savings": dynamic(() => import("./MaxSavingsCalculator"), { ssr: false, loading: () => LOADING }),
  "prepayment-simulator": dynamic(() => import("./PrepaymentSimulator"), { ssr: false, loading: () => LOADING }),
};

export default function CalculatorLoader({ slug }) {
  const Component = COMPONENTS[slug];
  if (!Component) return null;
  return <Component />;
}
