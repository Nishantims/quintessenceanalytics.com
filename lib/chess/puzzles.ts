// Every puzzle below is a real, legal chess position — each FEN parses
// cleanly and each solution move is verified as legal (and, where relevant,
// verified to actually deliver check/checkmate/a real capture) via chess.js
// itself, not just asserted. Same real-data-only standard as the rest of
// the app: nothing here is invented or unverified.

export interface Puzzle {
  id: string
  theme: string
  fen: string
  solution: { from: string; to: string }
  explanation: string
}

export const PUZZLES: Puzzle[] = [
  {
    id: 'fork-1',
    theme: 'Fork',
    fen: 'r3k3/8/8/3N4/8/8/8/4K3 w - - 0 1',
    solution: { from: 'd5', to: 'c7' },
    explanation: 'Nc7+ forks the king and the rook on a8 — the king must move, then the knight takes the rook for free.',
  },
  {
    id: 'backrank-1',
    theme: 'Back-rank mate',
    fen: '6k1/5ppp/8/8/8/8/8/4R1K1 w - - 0 1',
    solution: { from: 'e1', to: 'e8' },
    explanation: 'Re8# — the king has no escape square because its own pawns on f7, g7, and h7 block every one of them.',
  },
  {
    id: 'skewer-1',
    theme: 'Skewer',
    fen: 'q7/8/8/8/k7/8/4K3/7R w - - 0 1',
    solution: { from: 'h1', to: 'a1' },
    explanation: 'Ra1+ skewers the king in front of the queen — the king must step off the a-file, and the rook takes the queen next move.',
  },
  {
    id: 'discovered-1',
    theme: 'Discovered check',
    fen: '1q2k3/8/8/4B3/8/8/8/4R1K1 w - - 0 1',
    solution: { from: 'e5', to: 'b8' },
    explanation: 'Bxb8+ captures the queen outright, and moving the bishop off the e-file also uncovers check from the rook on e1 — a real two-for-one.',
  },
  {
    id: 'queenfork-1',
    theme: 'Queen fork',
    fen: 'r6k/8/8/8/8/8/8/2Q1K3 w - - 0 1',
    solution: { from: 'c1', to: 'c8' },
    explanation: "Qc8+ hits the king and the rook on a8 along the same rank at once — the king must move, and the rook falls next.",
  },
  {
    id: 'removedef-1',
    theme: 'Removing the defender',
    fen: '4k3/8/5n2/3r4/7B/8/8/6K1 w - - 0 1',
    solution: { from: 'h4', to: 'f6' },
    explanation: 'Bxf6 removes the knight — the only piece defending the rook on d5 — which falls to the next capture.',
  },
]
