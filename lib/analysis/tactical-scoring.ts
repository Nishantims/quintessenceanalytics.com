import { Chess, type Color } from 'chess.js'
import {
  computeDevelopment, computeKingShelter, computeKingExposure, computeCenterControl,
  computePieceActivity, computePawnStructure, computePieceCoordination, computeRookActivity,
  computeAdvancedPieces, computeMaterial, computeSpace, computeTempo, computeInitiative,
  computeKingActivity, computePassedPawns,
} from './heuristics'
import { computeWeakSquares } from './weak-squares'

// "Tactical Scoring" — fifteen real, pure-logic metrics (real counts and
// board-state measurements, never an invented "feel"), the SAME fifteen
// shown regardless of game phase so the numbers stay comparable across a
// whole game, computed for BOTH the player and the computer side by side
// so a real comparison is possible at a glance. Definitions/explanations
// live on the /how-it-works Glossary page, not here — this panel is
// numbers only. The last 5 (Space through Passed Pawns) reuse heuristics
// already computed elsewhere in this codebase (factors.ts's own
// King Activity/Passed Pawns factors, the narrative's Space references)
// rather than inventing new scoring logic for this table specifically.

export interface ScoreEntry {
  name: string
  player: number
  computer: number
}

const STARTING_MATERIAL = 39 // 8 pawns + 2N + 2B + 2R + Q, real starting point total for one side

function pawnStructureScore(chess: Chess, color: Color): number {
  const issues = computePawnStructure(chess, color)
  return Math.max(0, 100 - issues.doubled * 15 - issues.isolated * 15)
}

function kingSafetyScore(chess: Chess, color: Color): number {
  return (computeKingShelter(chess, color) + computeKingExposure(chess, color)) / 2
}

function materialScore(chess: Chess, color: Color): number {
  const material = computeMaterial(chess)
  const raw = color === 'w' ? material.white : material.black
  return Math.min(100, Math.round((raw / STARTING_MATERIAL) * 100))
}

// Fewer real weak squares is better — inverted the same way every other
// "fewer is better" real count here is (each weak square costs a fixed
// amount, floor at 0 rather than going negative).
function weakSquaresScore(fen: string, color: Color): number {
  const count = computeWeakSquares(fen, color).length
  return Math.max(0, 100 - count * 15)
}

// computeSpace returns a raw square count (0-16, the real max: 4 files x
// 4 ranks of the opponent's half) — scaled to the same 0-100 range as
// every other metric here, proportionally rather than an arbitrary cap.
function spaceScore(chess: Chess, color: Color): number {
  return Math.round((computeSpace(chess, color) / 16) * 100)
}

function round(n: number): number {
  return Math.round(Math.max(0, Math.min(100, n)))
}

export function computeTacticalScoring(fen: string, playerColor: Color): ScoreEntry[] {
  const chess = new Chess(fen)
  const enemyColor: Color = playerColor === 'w' ? 'b' : 'w'

  const metrics: [string, (color: Color) => number][] = [
    ['Development', c => computeDevelopment(chess, c) * 100],
    ['King Safety', c => kingSafetyScore(chess, c)],
    ['Center Control', c => computeCenterControl(chess, c) * 100],
    ['Piece Activity', c => computePieceActivity(chess, c)],
    ['Pawn Structure', c => pawnStructureScore(chess, c)],
    ['Coordination', c => computePieceCoordination(chess, c)],
    ['Rook Activity', c => computeRookActivity(chess, c)],
    ['Material', c => materialScore(chess, c)],
    ['Weak Squares', c => weakSquaresScore(fen, c)],
    ['Advanced Pieces', c => computeAdvancedPieces(chess, c)],
    ['Space', c => spaceScore(chess, c)],
    ['Tempo', c => computeTempo(chess, c)],
    ['Initiative', c => computeInitiative(chess, c)],
    ['King Activity', c => computeKingActivity(chess, c)],
    ['Passed Pawns', c => computePassedPawns(chess, c)],
  ]

  return metrics.map(([name, compute]) => ({
    name,
    player: round(compute(playerColor)),
    computer: round(compute(enemyColor)),
  }))
}
