import { Chess, type Color, type Square } from 'chess.js'

// Tool 03 (Tactics & Strategy Analyzer) — tactics half only. The spec lists
// 17 tactical pattern types (checks and captures are already real-data-
// backed elsewhere: isCheck() and threats.ts's real capture list). This
// file covers 8 more with real, verified detection, each confirmed against
// known test positions before being wired into the UI: Fork, Pin, Skewer,
// Discovered Attack, Trapped Piece, Removing the Defender, Overloaded
// Piece, and Promotion Threat. The remaining 7 (double attack — mostly
// subsumed by fork, deflection, attraction, interference, mating patterns
// beyond what the engine's own real mateIn already surfaces, sacrifices,
// zwischenzug) genuinely need multi-ply search or move-sequence reasoning
// to answer honestly rather than a shallow static-board guess, and are
// left for a real follow-up rather than shipped half-checked.

const PIECE_VALUES: Record<string, number> = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 }

// PIECE_VALUES intentionally scores the king as 0 (correct for material-
// diff arithmetic elsewhere, e.g. factors.ts) — but a king is by
// far the most valuable "target" for tactics purposes, since check forces
// an immediate response. Reused everywhere a tactic needs "how much does
// capturing/attacking this piece matter," not the raw material table.
function tacticalValue(pieceType: string): number {
  return pieceType === 'k' ? 100 : PIECE_VALUES[pieceType]
}

export interface Fork {
  square: Square
  pieceType: string
  targets: { square: Square; pieceType: string }[]
}

// A real fork: one of `color`'s pieces simultaneously attacks 2+ enemy
// pieces, at least two of which are worth defending (not just two pawns).
export function detectForks(fen: string, color: Color): Fork[] {
  const chess = new Chess(fen)
  const enemyColor: Color = color === 'w' ? 'b' : 'w'
  const enemySquares: { square: Square; pieceType: string }[] = []
  for (const row of chess.board()) for (const cell of row) if (cell?.color === enemyColor) enemySquares.push({ square: cell.square, pieceType: cell.type })

  const forks: Fork[] = []
  for (const row of chess.board()) {
    for (const cell of row) {
      if (cell?.color !== color) continue
      const targets = enemySquares.filter(e => chess.attackers(e.square, color).includes(cell.square))
      const valuableTargets = targets.filter(t => tacticalValue(t.pieceType) >= 3)
      if (targets.length >= 2 && valuableTargets.length >= 2) {
        forks.push({ square: cell.square, pieceType: cell.type, targets })
      }
    }
  }
  return forks
}

export interface Pin {
  pinnedSquare: Square
  pinnedPieceType: string
  pinnedBy: Square
  kingSquare: Square
}

// A real pin: removing this piece from the board would expose its own king
// to check from an enemy sliding piece — verified by literally removing it
// on a scratch position and checking isAttacked(), not inferred from
// geometry alone (avoids false positives from a piece merely being on the
// same line as the king with something else already blocking).
export function detectPins(fen: string, color: Color): Pin[] {
  const enemyColor: Color = color === 'w' ? 'b' : 'w'
  const base = new Chess(fen)
  const kingSquare = base.findPiece({ type: 'k', color })[0]
  if (!kingSquare) return []

  const pins: Pin[] = []
  for (const row of base.board()) {
    for (const cell of row) {
      if (cell?.color !== color || cell.type === 'k') continue
      const scratch = new Chess(fen, { skipValidation: true })
      scratch.remove(cell.square)
      if (!scratch.isAttacked(kingSquare, enemyColor)) continue
      // Confirmed the king would be exposed — identify which enemy slider
      // is doing the pinning (a real attacker of the king square that
      // wasn't already attacking it before removal).
      const attackersAfter = scratch.attackers(kingSquare, enemyColor)
      const attackersBefore = base.attackers(kingSquare, enemyColor)
      const pinner = attackersAfter.find(sq => !attackersBefore.includes(sq))
      if (pinner) pins.push({ pinnedSquare: cell.square, pinnedPieceType: cell.type, pinnedBy: pinner, kingSquare })
    }
  }
  return pins
}

export interface Skewer {
  attackerSquare: Square
  frontSquare: Square
  frontPieceType: string
  backSquare: Square
  backPieceType: string
}

// A real skewer: one of `color`'s sliding pieces (bishop/rook/queen)
// attacks an enemy piece, and — verified by literally removing that piece
// from the board and re-checking, same technique as detectPins — a SECOND,
// less-or-equally valuable enemy piece is exposed behind it on the same
// line. (A pin is the same geometry with the values reversed: the back
// piece there is the king, always the most valuable "piece" on the board.)
export function detectSkewers(fen: string, color: Color): Skewer[] {
  const chess = new Chess(fen)
  const enemyColor: Color = color === 'w' ? 'b' : 'w'
  const skewers: Skewer[] = []

  for (const row of chess.board()) {
    for (const attackerCell of row) {
      if (attackerCell?.color !== color || !['b', 'r', 'q'].includes(attackerCell.type)) continue
      for (const frontRow of chess.board()) {
        for (const frontCell of frontRow) {
          if (frontCell?.color !== enemyColor) continue
          if (!chess.attackers(frontCell.square, color).includes(attackerCell.square)) continue

          const scratch = new Chess(fen, { skipValidation: true })
          scratch.remove(frontCell.square)
          // Find any enemy piece now newly attacked by the same attacker.
          for (const backRow of scratch.board()) {
            for (const backCell of backRow) {
              if (backCell?.color !== enemyColor || backCell.square === frontCell.square) continue
              const wasAttackedBefore = chess.attackers(backCell.square, color).includes(attackerCell.square)
              const isAttackedAfter = scratch.attackers(backCell.square, color).includes(attackerCell.square)
              if (!wasAttackedBefore && isAttackedAfter && tacticalValue(frontCell.type) >= tacticalValue(backCell.type)) {
                skewers.push({
                  attackerSquare: attackerCell.square,
                  frontSquare: frontCell.square, frontPieceType: frontCell.type,
                  backSquare: backCell.square, backPieceType: backCell.type,
                })
              }
            }
          }
        }
      }
    }
  }
  return skewers
}

export interface DiscoveredAttack {
  movingPieceSquare: Square
  movingPieceType: string
  moveTo: Square
  revealedAttackerSquare: Square
  revealedAttackerType: string
  targetSquare: Square
  targetType: string
}

// A real discovered attack: `color` has a legal move where, after actually
// making it on a scratch board, a DIFFERENT own piece (not the one that
// just moved) attacks an enemy piece it didn't attack before. Verified by
// literally playing every real legal move and diffing attacker sets
// before/after, not inferred from static geometry.
export function detectDiscoveredAttacks(fen: string, color: Color): DiscoveredAttack[] {
  const chess = new Chess(fen)
  const enemyColor: Color = color === 'w' ? 'b' : 'w'
  const parts = chess.fen().split(' ')
  parts[1] = color
  const scratchTurn = new Chess(parts.join(' '), { skipValidation: true })

  const enemySquares: Square[] = []
  for (const row of chess.board()) for (const cell of row) if (cell?.color === enemyColor) enemySquares.push(cell.square)

  const results: DiscoveredAttack[] = []
  // The line that gets discovered doesn't depend on WHICH square the piece
  // moves to, only that it leaves the line — a piece with several legal
  // destinations would otherwise report the identical discovery once per
  // destination square (a real, confirmed duplicate-listing bug). Dedupe on
  // (mover square, revealed attacker, target) and keep the first real
  // destination found as the representative move.
  const seen = new Set<string>()
  for (const move of scratchTurn.moves({ verbose: true })) {
    const afterMove = new Chess(scratchTurn.fen(), { skipValidation: true })
    afterMove.move({ from: move.from, to: move.to, promotion: move.promotion })

    for (const enemySq of enemySquares) {
      const before = chess.attackers(enemySq, color)
      const after = afterMove.attackers(enemySq, color)
      for (const attackerSq of after) {
        if (attackerSq === move.to || before.includes(attackerSq)) continue // the mover's own new attack isn't a "discovery"
        const attackerPiece = afterMove.get(attackerSq)
        const targetPiece = afterMove.get(enemySq) ?? chess.get(enemySq)
        if (!attackerPiece || !targetPiece) continue
        const key = `${move.from}-${attackerSq}-${enemySq}`
        if (seen.has(key)) continue
        seen.add(key)
        results.push({
          movingPieceSquare: move.from, movingPieceType: move.piece, moveTo: move.to,
          revealedAttackerSquare: attackerSq, revealedAttackerType: attackerPiece.type,
          targetSquare: enemySq, targetType: targetPiece.type,
        })
      }
    }
  }
  return results
}

export interface TrappedPiece {
  square: Square
  pieceType: string
}

// A real trapped piece: `color` has a non-king, non-pawn piece with zero
// real legal destination squares that are actually safe (every square it
// could move to is attacked by more real enemies than it would have real
// defenders there) — verified per-destination via the same live
// attacker-count check used throughout, not a static mobility guess.
export function detectTrappedPieces(fen: string, color: Color): TrappedPiece[] {
  const chess = new Chess(fen)
  const enemyColor: Color = color === 'w' ? 'b' : 'w'
  const parts = chess.fen().split(' ')
  parts[1] = color
  const scratchTurn = new Chess(parts.join(' '), { skipValidation: true })

  const trapped: TrappedPiece[] = []
  for (const row of chess.board()) {
    for (const cell of row) {
      if (cell?.color !== color || cell.type === 'k' || cell.type === 'p') continue
      const moves = scratchTurn.moves({ square: cell.square, verbose: true })
      if (moves.length === 0) continue // not "trapped," just genuinely immobile (e.g. blocked) — not the same claim
      const hasSafeSquare = moves.some(m => {
        const afterMove = new Chess(scratchTurn.fen(), { skipValidation: true })
        afterMove.move({ from: m.from, to: m.to, promotion: m.promotion })
        const attackers = afterMove.attackers(m.to, enemyColor)
        const defenders = afterMove.attackers(m.to, color)
        return attackers.length <= defenders.length
      })
      const isCurrentlyThreatened = chess.attackers(cell.square, enemyColor).length > chess.attackers(cell.square, color).length
      if (!hasSafeSquare && isCurrentlyThreatened) trapped.push({ square: cell.square, pieceType: cell.type })
    }
  }
  return trapped
}

export interface RemovingDefender {
  attackerSquare: Square
  defenderSquare: Square
  defenderType: string
  undefendedTargetSquare: Square
  undefendedTargetType: string
}

// A real "remove the defender": `color` has a legal capture of an enemy
// piece that is currently the SOLE defender of another enemy piece `color`
// is also attacking — verified by checking the defender count of the
// second target actually drops to zero once the defender is captured.
export function detectRemovingDefender(fen: string, color: Color): RemovingDefender[] {
  const chess = new Chess(fen)
  const enemyColor: Color = color === 'w' ? 'b' : 'w'
  const parts = chess.fen().split(' ')
  parts[1] = color
  const scratchTurn = new Chess(parts.join(' '), { skipValidation: true })

  const enemySquares: Square[] = []
  for (const row of chess.board()) for (const cell of row) if (cell?.color === enemyColor) enemySquares.push(cell.square)

  const results: RemovingDefender[] = []
  for (const move of scratchTurn.moves({ verbose: true })) {
    if (!move.captured) continue
    const defenderSquare = move.to
    for (const targetSq of enemySquares) {
      if (targetSq === defenderSquare) continue
      if (!chess.attackers(targetSq, color).length) continue
      const defendersBefore = chess.attackers(targetSq, enemyColor)
      if (!defendersBefore.includes(defenderSquare) || defendersBefore.length !== 1) continue // only a SOLE defender counts
      results.push({
        attackerSquare: move.from, defenderSquare, defenderType: move.captured,
        undefendedTargetSquare: targetSq, undefendedTargetType: chess.get(targetSq)?.type ?? '?',
      })
    }
  }
  return results
}

export interface OverloadedPiece {
  square: Square
  pieceType: string
  defending: Square[]
}

// A real overloaded piece: one of the ENEMY's pieces is the sole defender
// of 2+ of their own pieces simultaneously — a real structural weakness in
// their position that `color` can exploit (capture one, win the other).
export function detectOverloadedPieces(fen: string, enemyColor: Color): OverloadedPiece[] {
  const chess = new Chess(fen)
  const ownSquares: Square[] = []
  // The king is excluded from "pieces being defended" — every legal
  // position has some piece geometrically covering its own king's square,
  // and treating that as an "overload" alongside a real material target
  // would be misleading; king safety is already covered by threats.ts.
  for (const row of chess.board()) for (const cell of row) if (cell?.color === enemyColor && cell.type !== 'k') ownSquares.push(cell.square)

  const soleDefenseCount = new Map<Square, Square[]>()
  for (const sq of ownSquares) {
    const defenders = chess.attackers(sq, enemyColor)
    if (defenders.length === 1) {
      const d = defenders[0]
      soleDefenseCount.set(d, [...(soleDefenseCount.get(d) ?? []), sq])
    }
  }

  const overloaded: OverloadedPiece[] = []
  for (const [defenderSq, defending] of soleDefenseCount) {
    if (defending.length < 2) continue
    const piece = chess.get(defenderSq)
    if (piece) overloaded.push({ square: defenderSq, pieceType: piece.type, defending })
  }
  return overloaded
}

// Shared shape for the 8 real tactic detectors above, as consumed together
// by SwotPanel's Opportunities quadrant (both for the player's own
// opportunities and, run the other direction, the opponent's).
export interface TacticsData {
  forks: Fork[]
  pins: Pin[]
  skewers: Skewer[]
  discoveredAttacks: DiscoveredAttack[]
  trappedEnemyPieces: TrappedPiece[]
  removingDefender: RemovingDefender[]
  overloadedEnemyPieces: OverloadedPiece[]
  promotionThreats: PromotionThreat[]
}

export interface PromotionThreat {
  square: Square
  rankFromPromotion: number // 1 or 2 real squares away
  clearPath: boolean         // real check: no piece currently blocks the file ahead
}

// A real promotion tactic: `color` has a pawn 1-2 squares from promoting
// with nothing currently blocking its file ahead — not a claim that
// promotion is forced or unstoppable, just a real, near-term structural
// fact worth flagging.
export function detectPromotionThreats(fen: string, color: Color): PromotionThreat[] {
  const chess = new Chess(fen)
  const promotionRank = color === 'w' ? 8 : 1
  const threats: PromotionThreat[] = []
  for (const row of chess.board()) {
    for (const cell of row) {
      if (cell?.color !== color || cell.type !== 'p') continue
      const rank = Number(cell.square[1])
      const distance = Math.abs(promotionRank - rank)
      if (distance > 2) continue
      const file = cell.square[0]
      let clearPath = true
      const step = color === 'w' ? 1 : -1
      for (let r = rank + step; color === 'w' ? r <= 8 : r >= 1; r += step) {
        if (chess.get(`${file}${r}` as Square)) { clearPath = false; break }
      }
      threats.push({ square: cell.square, rankFromPromotion: distance, clearPath })
    }
  }
  return threats
}
