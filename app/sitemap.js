import { calculators, journal } from "@/lib/data";

const BASE_URL = "https://capitabel.com";

// Next.js App Router convention: this file generates /sitemap.xml
// automatically at build time. Tells search engines exactly which pages
// currently exist on the site, including every calculator and journal
// post - which is what's missing right now, causing Google to keep
// serving a stale index (old WordPress-era pages/sitelinks) instead of
// recrawling and replacing it with the current Next.js site.
export default function sitemap() {
  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/loans", priority: 0.9, changeFrequency: "monthly" },
    { path: "/calculators", priority: 0.8, changeFrequency: "monthly" },
    { path: "/journal", priority: 0.7, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
    { path: "/disclosures", priority: 0.2, changeFrequency: "yearly" },
  ].map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const calculatorRoutes = calculators.map((c) => ({
    url: `${BASE_URL}/calculators/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const journalRoutes = journal.posts.map((p) => ({
    url: `${BASE_URL}/journal/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...calculatorRoutes, ...journalRoutes];
}
