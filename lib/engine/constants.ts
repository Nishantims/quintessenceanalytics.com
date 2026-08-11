// Real Stockfish range, confirmed live from the engine's own `uci` option
// listing (`option name UCI_Elo type spin default 1320 min 1320 max 3190`)
// — not an assumed or invented range. Split into its own file with zero
// dependencies so client components (e.g. GameSetup) can import just these
// two numbers without pulling in stockfish.ts's server-only
// @se-oss/stockfish dependency (which needs Node's child_process and
// breaks the browser bundle if imported client-side).
export const ENGINE_MIN_ELO = 1320
export const ENGINE_MAX_ELO = 3190
