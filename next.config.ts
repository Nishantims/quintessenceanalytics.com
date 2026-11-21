import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Real, documented fix for a real production bug: Chess-2000's engine
  // (@se-oss/stockfish) spawns a Node child process running a script file
  // located via a runtime-computed path (join(__dirname, ...)), not a
  // static import/require — Vercel's build-time file tracing (@vercel/nft)
  // only sees static import/require/fs calls, so it silently excluded the
  // Stockfish WASM engine's own .cjs/.wasm files from the deployed
  // function bundle. Locally this worked because the full node_modules
  // tree is on disk; in production the spawned process had nothing to
  // run, which is why every analysis request hung on "Analyzing…"
  // forever. This is the same documented pattern Next.js's own docs use
  // for native/runtime assets like aws-crt or sharp.
  // Site photos (public/images) cached for a week in browsers and at the edge, and optimised copies kept 30 days (owner, 2026-11-21: images load slowly). New photos get new file names, so a cached old copy is never shown in place of a new one.
  images: { minimumCacheTTL: 2592000 },
  async headers() {
    return [{ source: "/images/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }] }];
  },
  outputFileTracingIncludes: {
    "/api/chess-2000/**": ["./node_modules/@se-oss/stockfish/dist/**/*"],
  },
  // One address for search engines: www.quintessenceanalytics.com (owner, 2026-10-26). The redirect from
  // quintessenceanalytics.com to www is set in Vercel's domain settings, not here - a redirect here the other way
  // round looped with it and took the site down.
};

export default nextConfig;
