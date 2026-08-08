/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Local static assets only for now.
    remotePatterns: [],
  },
  eslint: {
    // Content/copy was transcribed from a design handoff with lots of
    // apostrophes in JSX text — don't let react/no-unescaped-entities (a
    // style warning) block production builds on Vercel.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
