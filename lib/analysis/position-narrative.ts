import type { Factor } from './factors'
import type { PositionStatus } from './position-status'
import type { MoveGrade } from './move-quality'
import type { GamePhase } from './game-phase'

// A real, always-available Positional Analysis — written the way a coach
// actually talks through a position with a student: the single most
// important thing right now, then what else is worth watching, then what
// the opponent is genuinely trying to do, then a real reminder to learn
// from the move just played. Every sentence traces to a real,
// already-computed input; nothing is padded in as filler just to hit a
// length, and nothing here restates numbers already shown elsewhere
// (eval/status on the eval strip, accuracy/ELO on the metrics row, the
// last move's own grade on the compact Last Move card).
//
// Deliberately NOT a fixed Strength/Weakness/Opportunity/Threat grid in
// the same order every time — a real, reported complaint about the
// earlier version. What actually matters most changes from move to move
// (a real forced mate one move, a hung piece the next, nothing urgent at
// all a move after that), so every real signal below carries its own
// real priority, and whichever one is genuinely most important THIS move
// leads the explanation — not whichever slot a fixed template put first.
// A factor that isn't actually relevant right now (an unthreatened king,
// for instance) is left out entirely rather than mentioned out of habit.
export interface NarrativeInput {
  status: PositionStatus
  gamePhase: GamePhase
  topFactor: Factor | null
  bottomFactor: Factor | null
  kingSafetyScore: number | null // the real King Safety factor score (0-100) — lets this decide for itself whether the king is worth a mention right now, independent of whether it happens to be the single best/worst factor
  isPlayerInCheck: boolean
  playerMaterialDiff: number
  realThreats: string[] // real descriptions of what the opponent can do to you right now (threats.ts)
  realOpportunities: string[] // real descriptions of what you can do to them right now (tactics.ts + threats.ts)
  ownWeakSquaresCount: number
  enemyWeakSquaresCount: number
  forcedMate: { forPlayer: boolean; in: number } | null
  lastMove: { san: string; grade: MoveGrade; note: string | null } | null
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

interface Point {
  priority: number
  text: string
}

// Real King Safety danger threshold — below this, the score itself is
// evidence something concrete is wrong, not just "the lowest of several
// fine numbers." Above it, the king is left out of the explanation
// entirely, per an explicit request: no king talk when there's no real
// king threat.
const KING_DANGER_THRESHOLD = 50

function buildPoints(input: NarrativeInput): Point[] {
  const points: Point[] = []

  if (input.forcedMate) {
    points.push(input.forcedMate.forPlayer
      ? { priority: 1000, text: `A forced mate in ${input.forcedMate.in} is on the board for you right now — that overrides everything else here. Stop and calculate it in full; Checkmate Alert has the exact line.` }
      : { priority: 1000, text: `The opponent has a forced mate in ${input.forcedMate.in} against you right now — the single most urgent thing on the board. Open Checkmate Alert and look for the only real defense, if one exists.` })
  } else if (input.isPlayerInCheck) {
    points.push({ priority: 900, text: 'Your king is in check right now — nothing else on the board matters until you resolve it.' })
  } else if (input.kingSafetyScore !== null && input.kingSafetyScore < KING_DANGER_THRESHOLD) {
    points.push({ priority: 800, text: "Your king's shelter has real cracks in it right now — treat everything else here as secondary until it's genuinely safe again." })
  }

  if (input.playerMaterialDiff <= -3) {
    points.push({ priority: 750, text: "You're down real material right now — the single most concrete problem on the board. No positional idea is worth more right now than winning it back, or building real, matching compensation for it." })
  } else if (input.playerMaterialDiff >= 3) {
    points.push({ priority: 600, text: "You're up real material right now — a genuine, concrete edge. The simplest real winning plan from here is usually to trade pieces (not pawns) whenever you get the chance, simplifying toward an endgame where the extra material decides the game on its own." })
  }

  if (input.realThreats.length > 0) {
    points.push({ priority: 700 + Math.min(input.realThreats.length, 3), text: `The opponent has ${input.realThreats.length === 1 ? 'a real threat' : `${input.realThreats.length} real threats`} against you right now that genuinely needs answering before you do anything else.` })
  }

  if (input.realOpportunities.length > 0) {
    points.push({ priority: 550, text: `You have a real tactical chance on the board right now — worth calculating in full before it disappears. A won tempo now can be a won piece in two moves.` })
  }

  if (input.bottomFactor && !(input.bottomFactor.name === 'King Safety' && (input.kingSafetyScore ?? 100) >= KING_DANGER_THRESHOLD)) {
    const meaning = FACTOR_MEANING[input.bottomFactor.name]
    points.push({ priority: 420, text: `${input.bottomFactor.name} is genuinely working against you right now${meaning ? `, since ${meaning}` : ''} — worth a real plan to fix before it becomes a bigger problem.` })
  }

  if (input.ownWeakSquaresCount > 0) {
    points.push({ priority: 350, text: `You also have ${input.ownWeakSquaresCount} real weak square${input.ownWeakSquaresCount === 1 ? '' : 's'} in your own camp — a permanent invitation for one of their pieces to plant itself there safely.` })
  }

  if (input.topFactor && input.topFactor.name !== 'King Safety') {
    const meaning = FACTOR_MEANING[input.topFactor.name]
    points.push({ priority: 300, text: `${input.topFactor.name} is genuinely working in your favor right now${meaning ? `, since ${meaning}` : ''} — keep leaning on it.` })
  }

  if (input.enemyWeakSquaresCount > 0) {
    points.push({ priority: 250, text: `They also have ${input.enemyWeakSquaresCount} real weak square${input.enemyWeakSquaresCount === 1 ? '' : 's'} in their own camp — a real long-term target for one of your pieces to work toward.` })
  }

  return points.sort((a, b) => b.priority - a.priority)
}

function opponentPlanParagraph(input: NarrativeInput): string {
  if (input.realThreats.length === 0) {
    return "Right now the opponent has no real, immediate threat against you — a genuine moment to set the agenda yourself instead of just reacting to theirs."
  }
  const shown = input.realThreats.slice(0, 2)
  const more = input.realThreats.length > shown.length
  return `What the opponent is really trying to do right now: ${shown.join(' ')}${more ? ' There is more than that worth watching for too.' : ''}`
}

const GOOD_GRADES: MoveGrade[] = ['Best', 'Excellent', 'Good']

function lastMoveParagraph(lastMove: NonNullable<NarrativeInput['lastMove']>): string {
  if (GOOD_GRADES.includes(lastMove.grade)) {
    return `Before you move on: ${lastMove.san} was a genuinely sound choice (graded ${lastMove.grade}) — take a real second to notice what made it work. Repeating that real habit on purpose, not luck, is what actually builds a 2000-level game.`
  }
  return `Before you move on: ${lastMove.san} was graded ${lastMove.grade}${lastMove.note ? ` — ${lastMove.note}` : ''}. Take a real second to understand why before playing your next move; that habit of reviewing the move you just made is exactly what closes the gap to 2000.`
}

// One real, short (~20-word) takeaway, dynamically picked from the same
// real signals as everything above — never the same lesson every move.
// Checked in the same real urgency order as buildPoints, but phrased as
// a general, transferable habit rather than a restatement of the
// position itself (that's what the paragraphs above already cover).
function learningParagraph(input: NarrativeInput): string {
  if (input.forcedMate) {
    return input.forcedMate.forPlayer
      ? 'Lesson: when a forced mate exists, calculate it completely before playing anything else — a guaranteed win is never worth risking.'
      : 'Lesson: once the opponent has a forced mate, search only for the one move that survives — everything else loses immediately.'
  }
  if (input.isPlayerInCheck) {
    return 'Lesson: always resolve check first — block, capture, or move the king — before considering any other idea on the board.'
  }
  if (input.lastMove && !GOOD_GRADES.includes(input.lastMove.grade)) {
    return 'Lesson: review every move you play for what it hangs or allows — that habit, done consistently, is what builds real strength.'
  }
  if (input.playerMaterialDiff <= -3) {
    return "Lesson: when you're down material, check every move for whether it wins material back or creates real, concrete compensation instead."
  }
  if (input.realThreats.length > 0) {
    return "Lesson: always ask what your opponent's last move threatens before making your own plan — a missed threat is how games are lost."
  }
  if (input.realOpportunities.length > 0) {
    return 'Lesson: calculate forcing moves — checks, captures, and threats — before quiet ones; a real tactic missed now may not return.'
  }
  if (input.lastMove) {
    return 'Lesson: notice why your last move actually worked, and look to repeat that same real habit on purpose — that is how ratings climb.'
  }
  return 'Lesson: in quiet positions, keep developing with real purpose and contest the center — small, principled gains compound into a genuine advantage.'
}

// Real, phase-specific priorities — the same real checklist a coach
// would run through depending on whether the board is still mostly at
// home, in the real middle of the fight, or down to a real endgame.
// Picked from `gamePhase`, itself computed from real, live board state
// (piece count/development), not a move-number guess.
function phaseChecklistParagraph(gamePhase: GamePhase): string {
  if (gamePhase === 'Opening') {
    return 'Opening priorities right now: finish developing every piece, reinforce what is already out, keep your king genuinely safe, and improve your worst piece.'
  }
  if (gamePhase === 'Middlegame') {
    return 'Middlegame priorities right now: analyze real threats, look to create your own, keep developing and reinforcing, and start building toward a genuine attack.'
  }
  return 'Endgame priorities right now: centralize your king — a real fighting piece now that material has thinned out — and look for a genuine king attack.'
}

type DecisionMode = 'SAFE' | 'ATTACK' | 'IMPROVE'

// Same real urgency signals buildPoints already uses, collapsed into one
// of three real modes — which one you're actually in changes what's
// worth calculating right now, same real logic a strong player runs
// without naming it explicitly.
function decisionMode(input: NarrativeInput): DecisionMode {
  const realDanger = (input.forcedMate !== null && !input.forcedMate.forPlayer) || input.isPlayerInCheck
    || (input.kingSafetyScore !== null && input.kingSafetyScore < KING_DANGER_THRESHOLD)
    || input.playerMaterialDiff <= -3 || input.realThreats.length > 0
  if (realDanger) return 'SAFE'
  if (input.realOpportunities.length > 0 || input.playerMaterialDiff >= 3) return 'ATTACK'
  return 'IMPROVE'
}

function decisionFrameworkParagraph(input: NarrativeInput): string {
  const mode = decisionMode(input)
  if (mode === 'SAFE') {
    return 'Play it SAFE this move: check for checks, real captures, and threats — yours and theirs — before committing to anything else.'
  }
  if (mode === 'ATTACK') {
    return 'You can ATTACK from here: check for checks, real captures, and real threats that build genuine pressure — look to create the next one.'
  }
  return 'Nothing forcing right now, so IMPROVE: find your worst-placed piece, recheck king safety, fight for the center, then target their real weakness.'
}

function planAndCompareParagraph(): string {
  return 'Before you commit, PLAN: what do you actually want this move to achieve? Then COMPARE — does it still hold up after their real best reply?'
}

export function computePositionNarrative(input: NarrativeInput): string[] {
  const points = buildPoints(input)
  const paragraphs: string[] = []

  if (points.length === 0) {
    paragraphs.push('The position is still genuinely balanced — nothing concrete favors either side yet. Stick to real principles from here: finish developing, contest the center, and keep your king safe, and a real plan will present itself.')
  } else {
    paragraphs.push(points[0].text)
    const rest = points.slice(1, 3).map(p => p.text)
    if (rest.length > 0) paragraphs.push(rest.join(' '))
  }

  paragraphs.push(phaseChecklistParagraph(input.gamePhase))
  paragraphs.push(decisionFrameworkParagraph(input))
  paragraphs.push(opponentPlanParagraph(input))
  paragraphs.push(planAndCompareParagraph())
  if (input.lastMove) paragraphs.push(lastMoveParagraph(input.lastMove))
  paragraphs.push(learningParagraph(input))

  return paragraphs
}

// The point-by-point structure above describes an ONGOING position — it
// stops being real the moment the game is actually over (a real,
// reported bug: the summary kept talking about king safety and tactical
// opportunities in a position that had already ended in checkmate). This
// is the real, game-outcome-specific replacement, shown instead once
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
