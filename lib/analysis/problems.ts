import type { Color } from 'chess.js'
import { Chess } from 'chess.js'
import { computeThreats, computeWeaknesses } from './threats'
import { computeAllFactors } from './factors'
import type { GamePhase } from './game-phase'

// Tool 07 — Problem Identification & Solution. Synthesizes the real data
// already computed by threats.ts and the consolidated factors.ts (the same
// single source of truth the FactorsTable UI shows — using a separate,
// older scoring module here would silently reintroduce the exact
// Health-vs-Principles inconsistency a real user caught) into a ranked
// Critical -> Important -> Long-term list. Solution categories are the
// spec's own named set (Defend, Move the piece, Exchange the attacker,
// Create a counter-threat, Improve another piece, Change the pawn
// structure, Simplify) — assigned by real, rule-based applicability (e.g.
// a hanging piece can honestly be defended or moved; that doesn't mean
// this module claims to know which one is actually best — Tool 09's real
// engine-line comparison already answers "what's the best move," this
// only names which general kind of fix applies).

export type Urgency = 'Critical' | 'Important' | 'Long-term'
export type SolutionCategory = 'Defend' | 'Move the piece' | 'Exchange the attacker' | 'Create a counter-threat' | 'Improve another piece' | 'Change the pawn structure' | 'Simplify'

export interface Problem {
  urgency: Urgency
  description: string
  solutions: SolutionCategory[]
}

export function identifyProblems(fen: string, color: Color, phase: GamePhase): Problem[] {
  const chess = new Chess(fen)
  const threats = computeThreats(fen, color)
  const weaknesses = computeWeaknesses(fen, color)
  const factors = computeAllFactors(fen, color, phase)

  const problems: Problem[] = []

  if (chess.turn() === color && chess.isCheck()) {
    problems.push({ urgency: 'Critical', description: 'Your king is in check — this must be addressed immediately.', solutions: ['Move the piece', 'Defend', 'Exchange the attacker'] })
  }

  for (const t of threats) {
    if (t.pieceType === 'k') continue
    problems.push({ urgency: 'Critical', description: t.description, solutions: ['Defend', 'Move the piece', 'Exchange the attacker', 'Create a counter-threat'] })
  }

  for (const w of weaknesses) {
    problems.push({ urgency: 'Important', description: w.description, solutions: ['Defend', 'Improve another piece'] })
  }

  for (const f of factors) {
    if (f.score === null || f.status === 'Strong' || f.status === 'Stable') continue
    const urgency: Urgency = f.status === 'Critical' ? 'Important' : 'Long-term'
    const solutions: SolutionCategory[] = f.name === 'Pawn Structure' ? ['Change the pawn structure'] : ['Improve another piece', 'Simplify']
    problems.push({ urgency, description: `${f.name} is ${f.status.toLowerCase()} (${f.score}/100).`, solutions })
  }

  const order: Record<Urgency, number> = { Critical: 0, Important: 1, 'Long-term': 2 }
  return problems.sort((a, b) => order[a.urgency] - order[b.urgency])
}
