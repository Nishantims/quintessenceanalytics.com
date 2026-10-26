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
  outputFileTracingIncludes: {
    "/api/chess-2000/**": ["./node_modules/@se-oss/stockfish/dist/**/*"],
  },
  // One address for search engines: www.quintessenceanalytics.com (owner, 2026-10-26). The redirect from
  // quintessenceanalytics.com to www is set in Vercel's domain settings, not here - a redirect here the other way
  // round looped with it and took the site down.
};

export default nextConfig;
