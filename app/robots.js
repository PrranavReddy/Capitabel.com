// Next.js App Router convention: generates /robots.txt at build time.
// Points crawlers at the sitemap (app/sitemap.js) so they discover every
// current page - the missing piece that's been leaving Google's index
// stuck on the pre-rebuild site.
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://capitabel.com/sitemap.xml",
  };
}
