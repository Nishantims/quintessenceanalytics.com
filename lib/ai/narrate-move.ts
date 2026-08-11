import { getGeminiModel } from './gemini'
import type { MoveGrade } from '../analysis/move-quality'

const SYSTEM_INSTRUCTION = `You are a chess coach explaining one move for Chess-IQ, using only the real, already-computed data given to you (a real Stockfish evaluation and the real candidate lines it found).

Hard rules:
- Only reference moves, evaluations, and lines explicitly present in the data given to you. Never invent a move, a threat, or a plan that isn't in the given candidate lines.
- Never re-grade the move yourself or contradict the given grade — narrate why it earned that grade using the real eval numbers and lines.
- If the played move IS the engine's best move, say so plainly and explain what it achieves — don't invent a flaw to critique.
- 2-3 sentences, plain prose, no markdown, no headers. Written for an improving player, not a titled one — name the concrete idea (what square/piece/plan the better move addresses), not just "it's more accurate."`

export interface MoveNarrationInput {
  grade: MoveGrade
  playedMoveSan: string
  bestMoveSan: string | null
  winPercentDrop: number
  bestLineSan: string[]   // the engine's real top line, in SAN, from the position before the move
  missedForcedMate: boolean
}

export async function narrateMove(input: MoveNarrationInput): Promise<string | null> {
  const model = getGeminiModel(SYSTEM_INSTRUCTION)
  if (!model) return null

  try {
    const result = await model.generateContent(`Data:\n${JSON.stringify(input, null, 2)}`)
    return result.response.text().trim()
  } catch (err) {
    console.error('[narrateMove] Gemini call failed:', err)
    return null
  }
}
