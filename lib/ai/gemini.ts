import { GoogleGenerativeAI } from '@google/generative-ai'

// gemini-2.5-flash — gemini-1.5-flash has been retired by Google.
const MODEL = 'gemini-2.5-flash'

export function getGeminiModel(systemInstruction: string) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) return null
  const genAI = new GoogleGenerativeAI(apiKey)
  return genAI.getGenerativeModel({ model: MODEL, systemInstruction })
}
