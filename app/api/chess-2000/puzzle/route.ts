import { NextResponse } from 'next/server'
import { Chess } from 'chess.js'

// Real puzzles, unlimited — proxies Lichess's own public puzzle API
// (lichess.org/api#tag/Puzzles) rather than inventing positions. No API
// key needed for the anonymous "next puzzle" endpoint. The FEN isn't
// returned directly by Lichess — it's derived by replaying the real game
// PGN up through initialPly + 1 real moves (verified against Lichess's own
// documented convention: this lands on the position with the solver's
// side to move, and puzzle.solution[0] is a real legal move from there).
const VALID_DIFFICULTIES = ['easiest', 'easier', 'normal', 'harder', 'hardest'] as const
type Difficulty = (typeof VALID_DIFFICULTIES)[number]

interface LichessPuzzleResponse {
  game: { pgn: string }
  puzzle: { id: string; rating: number; solution: string[]; themes: string[]; initialPly: number }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const difficultyParam = searchParams.get('difficulty') ?? 'normal'
  const difficulty: Difficulty = (VALID_DIFFICULTIES as readonly string[]).includes(difficultyParam)
    ? (difficultyParam as Difficulty)
    : 'normal'

  try {
    const res = await fetch(`https://lichess.org/api/puzzle/next?angle=mix&difficulty=${difficulty}`, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    })
    if (!res.ok) throw new Error(`Lichess API returned ${res.status}`)
    const data = (await res.json()) as LichessPuzzleResponse

    const moves = data.game.pgn.trim().split(/\s+/)
    const chess = new Chess()
    const playCount = data.puzzle.initialPly + 1
    for (let i = 0; i < playCount && i < moves.length; i++) {
      const played = chess.move(moves[i])
      if (!played) throw new Error(`Could not replay move ${i}: ${moves[i]}`)
    }

    return NextResponse.json({
      id: data.puzzle.id,
      fen: chess.fen(),
      solution: data.puzzle.solution,
      rating: data.puzzle.rating,
      themes: data.puzzle.themes,
      difficulty,
    })
  } catch (err) {
    console.error('[api/chess-2000/puzzle] failed:', err)
    return NextResponse.json({ error: 'puzzle fetch failed' }, { status: 502 })
  }
}
