import type { Color } from 'chess.js'
import { getDb } from './client'
import type { MoveGrade } from '../analysis/move-quality'

export function createGame(playerColor: Color, engineElo: number): number {
  const db = getDb()
  const result = db.prepare('INSERT INTO games (player_color, engine_elo) VALUES (?, ?)').run(playerColor, engineElo)
  return Number(result.lastInsertRowid)
}

export function endGame(gameId: number, result: string | null): void {
  const db = getDb()
  db.prepare("UPDATE games SET result = ?, ended_at = datetime('now') WHERE id = ?").run(result, gameId)
}

export function recordMove(gameId: number, ply: number, san: string, grade: MoveGrade, centipawnLoss: number, missedForcedMate: boolean): void {
  const db = getDb()
  db.prepare(`
    INSERT INTO move_records (game_id, ply, san, grade, centipawn_loss, missed_forced_mate)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(gameId, ply, san, grade, centipawnLoss, missedForcedMate ? 1 : 0)
}

export interface RecurringPattern {
  pattern: string
  count: number
  isPersonalWeakness: boolean // real recurrence threshold (>= 3 across all recorded games), per the spec's own framing
}

// Tool 10 — real recurrence counts across every game ever recorded in this
// local store, not a single-session guess. Only the mistake-grade patterns
// (not Best/Excellent/Good) and missed forced mates are tracked as
// "patterns" — the spec's own example list (Knight Fork, Weak Back Rank,
// etc.) needs per-move tactical/positional tagging beyond what's recorded
// today; this covers what's real and already captured (move grade,
// missed-mate) rather than fabricating finer-grained pattern names that
// aren't actually being tracked yet.
export function getRecurringPatterns(): RecurringPattern[] {
  const db = getDb()
  const gradeCounts = db.prepare(`
    SELECT grade, COUNT(*) c FROM move_records WHERE grade IN ('Inaccuracy', 'Mistake', 'Blunder') GROUP BY grade
  `).all() as { grade: string; c: number }[]
  const missedMateCount = (db.prepare(`SELECT COUNT(*) c FROM move_records WHERE missed_forced_mate = 1`).get() as { c: number }).c

  const patterns: RecurringPattern[] = gradeCounts.map(g => ({
    pattern: g.grade,
    count: g.c,
    isPersonalWeakness: g.c >= 3,
  }))
  if (missedMateCount > 0) {
    patterns.push({ pattern: 'Missed forced mate', count: missedMateCount, isPersonalWeakness: missedMateCount >= 3 })
  }
  return patterns.sort((a, b) => b.count - a.count)
}

export function getGamesPlayedCount(): number {
  const db = getDb()
  return (db.prepare('SELECT COUNT(*) c FROM games').get() as { c: number }).c
}
