import { getGeminiModel } from './gemini'
import type { PositionStatus } from '../analysis/position-status'
import type { Factor } from '../analysis/factors'

const SYSTEM_INSTRUCTION = `You are a chess coach summarizing the CURRENT position for Chess-IQ, using only the real, already-computed data given to you.

Hard rules:
- About 100 words (90-110), plain prose, no markdown, no headers, no bullet points.
- Only reference the real status, factors, threats, and tactics given to you. Never invent a plan, a piece location, or a threat not present in the data.
- Lead with the real status (Winning/Better/Equal/Worse/Losing etc.) and explain WHY using the 2-3 most extreme real factors (the highest and lowest scores) plus any real threats or tactical opportunities given.
- Write for an improving player: name concrete ideas (a square, a piece, a plan), not vague encouragement.`

export interface PositionSummaryInput {
  status: PositionStatus
  evalDescription: string // e.g. "+1.4" or "Mate in 3"
  topFactors: Factor[]    // the 2-3 strongest real factors
  bottomFactors: Factor[] // the 2-3 weakest real factors
  realThreatCount: number
  realTacticCount: number
}

export async function narratePosition(input: PositionSummaryInput): Promise<string | null> {
  const model = getGeminiModel(SYSTEM_INSTRUCTION)
  if (!model) return null

  try {
    const result = await model.generateContent(`Data:\n${JSON.stringify(input, null, 2)}`)
    return result.response.text().trim()
  } catch (err) {
    console.error('[narratePosition] Gemini call failed:', err)
    return null
  }
}
