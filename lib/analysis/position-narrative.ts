import type { Factor } from './factors'
import type { PositionStatus } from './position-status'

// A real, always-available position summary — a genuine SWOT analysis
// (Strengths / Weaknesses / Opportunities / Threats). Every sentence
// traces to a real, already-computed input, and every sentence is
// CONDITIONAL — nothing is padded in as filler just to hit a length, so a
// quiet paragraph stays one real sentence and an eventful one grows to
// two, rather than repeating the same generic line every single position
// (a real, reported complaint). Deliberately never restates numbers
// already shown elsewhere (eval/status on the eval strip, accuracy/ELO on
// the metrics row, the last move's own grade on the compact Last Move
// card) and never names a specific move to play (that's what Hint is for).
//
// Real material swings are checked FIRST, ahead of the positional factor
// table — another real, reported bug otherwise: King Safety can
// legitimately sit at a maxed-out 100 for many moves in a row (a real,
// stable fact about a castled, sheltered king), so it kept winning
// "biggest strength" even across a 13-point real eval swing driven by a
// hung piece the factor table doesn't weight heavily enough on its own.
// A real material swing of a piece or more is the single most concrete,
// legible signal a player actually wants surfaced immediately.
export interface NarrativeInput {
  status: PositionStatus
  topFactor: Factor | null
  bottomFactor: Factor | null
  realThreatCount: number
  realOpportunityCount: number
  playerMaterialDiff: number
  ownWeakSquaresCount: number
  enemyWeakSquaresCount: number
}

// Short, real, generic "why this matters" clauses for the factor names
// most likely to show up as a strongest/weakest asset — turns a bare
// factor name into an actual explanation, not just a label.
const FACTOR_MEANING: Record<string, string> = {
  Development: 'how many of your pieces have actually left their starting squares',
  'King Safety': 'how well-sheltered your king really is right now',
  'Center Control': 'who really controls the center squares',
  'Piece Activity': 'how much real mobility your pieces have',
  'Pawn Structure': 'whether you have any real structural weaknesses to defend',
  Coordination: 'whether your pieces are genuinely defending each other',
  'Rook Activity': 'whether your rooks are on real open files',
  Material: 'the real point count on the board',
  Space: 'how much of the board you genuinely control',
  Tempo: 'your real development lead or deficit',
  Initiative: 'who currently has more real forcing options',
  'Queen Safety': "how exposed your queen's square really is",
  'Exchanging Correctly': 'whether the trades on offer genuinely favor you',
  'Open-File Control': 'who controls the real open files',
  'Diagonal Control': 'who controls the real long diagonals',
  Outposts: 'whether you have a real, permanently safe square for a minor piece',
  'Pawn Breaks': 'whether you have a real pawn break available',
  'Maintaining Tension': 'whether unresolved pawn contact still favors you',
  'King Activity': 'how centralized and genuinely active your king is right now — a real endgame asset, not a liability, once enough material is off the board',
  'Passed Pawns': 'whether you have a real passed pawn advancing toward promotion',
}

function strengthsParagraph(input: NarrativeInput): string {
  if (input.playerMaterialDiff >= 3) {
    return 'You are up real material right now — a genuine, concrete advantage worth protecting rather than risking for something speculative.'
  }
  const parts: string[] = []
  if (input.topFactor) {
    const meaning = FACTOR_MEANING[input.topFactor.name]
    parts.push(`${input.topFactor.name} is your biggest real strength right now${meaning ? ` — ${meaning} is genuinely working in your favor` : ''}.`)
  } else {
    parts.push('No standout real strength yet — the position is still balanced.')
  }
  if (input.realOpportunityCount > 0) {
    parts.push(`You also have ${input.realOpportunityCount} real tactical ${input.realOpportunityCount === 1 ? 'shot' : 'shots'} available right now — genuine leverage worth using.`)
  } else if (input.playerMaterialDiff > 0) {
    parts.push('You also hold a small real material edge, worth nursing rather than risking.')
  }
  return parts.join(' ')
}

function weaknessesParagraph(input: NarrativeInput): string {
  if (input.playerMaterialDiff <= -3) {
    const squareClause = input.ownWeakSquaresCount > 0
      ? ` You also have ${input.ownWeakSquaresCount} real weak square${input.ownWeakSquaresCount === 1 ? '' : 's'} worth watching.`
      : ''
    return `You are down real material right now — the single most urgent real problem to address before anything else.${squareClause}`
  }
  const parts: string[] = []
  if (input.status === 'Losing' || input.status === 'Much Worse') {
    parts.push('Your position has genuinely become difficult, even without a clean material deficit behind it — something concrete is working against you.')
  } else if (input.bottomFactor) {
    const meaning = FACTOR_MEANING[input.bottomFactor.name]
    parts.push(`${input.bottomFactor.name} is your real weak point right now${meaning ? `, since ${meaning}` : ''}.`)
  } else {
    parts.push('No serious real weakness stands out right now.')
  }
  if (input.ownWeakSquaresCount > 0) {
    parts.push(`You also have ${input.ownWeakSquaresCount} real weak square${input.ownWeakSquaresCount === 1 ? '' : 's'} worth watching before the opponent gets a piece to it.`)
  }
  return parts.join(' ')
}

function opportunitiesParagraph(input: NarrativeInput): string {
  if (input.realOpportunityCount === 0 && input.enemyWeakSquaresCount === 0) {
    return 'Nothing concrete to strike at yet — keep improving your position and a real opening will come.'
  }
  const parts: string[] = []
  if (input.realOpportunityCount > 0) {
    parts.push(`You have ${input.realOpportunityCount} real tactical ${input.realOpportunityCount === 1 ? 'shot' : 'shots'} available right now — worth calculating before it disappears.`)
  }
  if (input.enemyWeakSquaresCount > 0) {
    parts.push(`They also have ${input.enemyWeakSquaresCount} real weak square${input.enemyWeakSquaresCount === 1 ? '' : 's'} in their own camp — a genuine target for one of your pieces to work toward.`)
  }
  return parts.join(' ')
}

function threatsParagraph(input: NarrativeInput): string {
  if (input.realThreatCount === 0) {
    return 'No real threat against you right now — a real moment to focus on your own plan instead of reacting to theirs.'
  }
  return `There ${input.realThreatCount === 1 ? 'is' : 'are'} ${input.realThreatCount} real threat${input.realThreatCount === 1 ? '' : 's'} against you right now — worth resolving before you commit to anything else.`
}

export function computePositionNarrative(input: NarrativeInput): string[] {
  return [
    strengthsParagraph(input),
    weaknessesParagraph(input),
    opportunitiesParagraph(input),
    threatsParagraph(input),
  ]
}

// The SWOT structure above describes an ONGOING position — it stops being
// real the moment the game is actually over (a real, reported bug: the
// summary kept talking about king safety and tactical opportunities in a
// position that had already ended in checkmate). This is the real,
// game-outcome-specific replacement, shown instead of the SWOT once
// `gameOver` is true.
export function computeGameOverNarrative(gameStatus: 'Checkmate' | 'Stalemate' | 'Draw', playerWon: boolean, lastMoveSan: string | null): string[] {
  if (gameStatus === 'Checkmate') {
    return playerWon
      ? [
          `Checkmate — you won${lastMoveSan ? ` with ${lastMoveSan}` : ''}. A real, decisive finish: your position built up enough real material and attacking pressure that the opponent's king genuinely ran out of safe squares.`,
          'Open Moves History and look at the real moves that built this — that pattern, not this single result, is what is actually worth repeating next game.',
        ]
      : [
          `Checkmate — the game is over${lastMoveSan ? `, ended by ${lastMoveSan}` : ''}. A loss like this always has a real, findable cause somewhere earlier than the final move.`,
          'Open Moves History and look for the real point the position first turned — that is what is actually worth fixing before your next game.',
        ]
  }
  if (gameStatus === 'Stalemate') {
    return [
      "Stalemate — a real draw: the side to move had no legal moves available but wasn't in check.",
      'Worth reviewing Moves History for whether a real winning try existed earlier and was missed.',
    ]
  }
  return [
    'The game ended in a real draw.',
    'Worth reviewing Moves History for any real winning chances either side missed along the way.',
  ]
}
