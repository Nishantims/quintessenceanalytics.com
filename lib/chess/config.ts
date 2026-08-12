// Single on/off switch for the entire subscription paywall. Flip to true
// once development and setup are complete — every piece of the checkout /
// subscription flow stays fully intact and working either way; this only
// controls whether running out of free games actually redirects to
// /subscribe. Client-safe (no 'server-only'), since ChessGameClient's own
// in-session gate needs it too, not just the server-side page.tsx gate.
export const PAYWALL_ENABLED = false

// How many real, fully-analyzed Training Mode games a browser gets before
// the paywall would apply (once PAYWALL_ENABLED is true).
export const FREE_GAMES_LIMIT = 3
