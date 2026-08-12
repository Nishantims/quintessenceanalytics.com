'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Chess, type Square } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import { PUZZLES } from '@/lib/chess/puzzles'

// Real, unlimited puzzles via /api/chess-2000/puzzle, which itself proxies
// Lichess's own public puzzle database — never invented positions. Falls
// back to the small local hand-verified set (lib/chess/puzzles.ts) only if
// that fetch fails, so puzzles never just stop working.

const BOARD_LIGHT = '#FFFFFF'
const BOARD_DARK = '#00CC66'

type Status = 'loading' | 'solving' | 'correct' | 'wrong'
type Difficulty = 'easiest' | 'easier' | 'normal' | 'harder' | 'hardest'

const DIFFICULTIES: { value: Difficulty; label: string; accent: string }[] = [
  { value: 'easiest', label: 'Easiest', accent: 'var(--status-green)' },
  { value: 'easier', label: 'Easier', accent: 'var(--status-teal)' },
  { value: 'normal', label: 'Normal', accent: 'var(--status-blue)' },
  { value: 'harder', label: 'Harder', accent: 'var(--status-gold)' },
  { value: 'hardest', label: 'Hardest', accent: 'var(--status-red)' },
]

interface PuzzleData {
  id: string
  fen: string
  solution: string[]
  rating: number | null
  themes: string[]
  source: 'api' | 'local'
}

function uciToMove(uci: string) {
  return { from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] }
}

export default function PuzzlesClient() {
  const [difficulty, setDifficulty] = useState<Difficulty>('normal')
  const [puzzle, setPuzzle] = useState<PuzzleData | null>(null)
  const [status, setStatus] = useState<Status>('loading')
  const [fen, setFen] = useState<string | null>(null)
  const [solutionIndex, setSolutionIndex] = useState(0)
  const [solvedCount, setSolvedCount] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null)
  const [apiError, setApiError] = useState(false)

  async function fetchPuzzle(d: Difficulty) {
    setStatus('loading')
    setRevealed(false)
    setSelectedSquare(null)
    try {
      const res = await fetch(`/api/chess-2000/puzzle?difficulty=${d}`)
      if (!res.ok) throw new Error('fetch failed')
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setPuzzle({ id: data.id, fen: data.fen, solution: data.solution, rating: data.rating, themes: data.themes, source: 'api' })
      setFen(data.fen)
      setSolutionIndex(0)
      setApiError(false)
      setStatus('solving')
    } catch {
      const local = PUZZLES[Math.floor(Math.random() * PUZZLES.length)]
      setPuzzle({ id: local.id, fen: local.fen, solution: [`${local.solution.from}${local.solution.to}`], rating: null, themes: [local.theme], source: 'local' })
      setFen(local.fen)
      setSolutionIndex(0)
      setApiError(true)
      setStatus('solving')
    }
  }

  useEffect(() => { fetchPuzzle(difficulty) /* eslint-disable-line react-hooks/exhaustive-deps */ }, [])

  const chess = useMemo(() => (fen ? new Chess(fen) : null), [fen])
  const sideToMove = chess?.turn() ?? 'w'

  const legalTargets = useMemo(() => {
    if (!chess || !selectedSquare || status !== 'solving') return []
    return chess.moves({ square: selectedSquare, verbose: true }).map(m => m.to)
  }, [chess, selectedSquare, status])

  function attempt(from: string, to: string): boolean {
    if (!chess || !puzzle || status !== 'solving') return false
    const g = new Chess(fen!)
    let move
    try {
      move = g.move({ from, to, promotion: 'q' })
    } catch {
      return false
    }
    if (!move) return false

    const expected = uciToMove(puzzle.solution[solutionIndex])
    const isSolution = move.from === expected.from && move.to === expected.to

    if (!isSolution) {
      setStatus('wrong')
      return false
    }

    setFen(g.fen())

    const nextIndex = solutionIndex + 1
    if (nextIndex >= puzzle.solution.length) {
      setStatus('correct')
      setSolvedCount(c => c + 1)
      setSolutionIndex(nextIndex)
      return true
    }

    // A forced reply follows (multi-move puzzle) — auto-play it, then it's
    // the solver's turn again for the move after that.
    setTimeout(() => {
      const g2 = new Chess(g.fen())
      const reply = uciToMove(puzzle.solution[nextIndex])
      const replyMove = g2.move({ from: reply.from, to: reply.to, promotion: reply.promotion === 'q' || reply.promotion === 'r' || reply.promotion === 'b' || reply.promotion === 'n' ? reply.promotion : 'q' })
      if (!replyMove) return
      setFen(g2.fen())
      const afterReply = nextIndex + 1
      setSolutionIndex(afterReply)
      if (afterReply >= puzzle.solution.length) {
        setStatus('correct')
        setSolvedCount(c => c + 1)
      }
    }, 500)

    return true
  }

  function next() {
    fetchPuzzle(difficulty)
  }

  function retry() {
    setStatus('solving')
  }

  function changeDifficulty(d: Difficulty) {
    setDifficulty(d)
    fetchPuzzle(d)
  }

  if (status === 'loading' || !puzzle || !fen) {
    return (
      <div data-theme="dark" data-board-theme="green" className="min-h-screen bg-[var(--background)] text-ink flex items-center justify-center">
        <p className="text-[13px] text-ink-faint">Loading a real puzzle…</p>
      </div>
    )
  }

  return (
    <div data-theme="dark" data-board-theme="green" className="min-h-screen bg-[var(--background)] text-ink flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-[480px] flex items-center justify-between mb-4">
        <Link href="/Chess-2000" className="text-[12px] font-bold text-ink-faint hover:text-ink">← Chess-2000</Link>
        <div className="text-[11px] font-bold uppercase tracking-wide" style={{ color: 'var(--status-purple)' }}>Puzzles</div>
        <span className="text-[12px] text-ink-faint">{solvedCount} solved</span>
      </div>

      <div className="w-full max-w-[480px] mb-3 flex flex-wrap gap-1.5">
        {DIFFICULTIES.map(d => (
          <button
            key={d.value}
            onClick={() => changeDifficulty(d.value)}
            className="text-[11px] font-bold px-2.5 py-1 rounded-full border transition-colors"
            style={
              difficulty === d.value
                ? { background: d.accent, borderColor: d.accent, color: '#fff' }
                : { borderColor: 'var(--panel-line)', color: 'var(--ink-faint)' }
            }
          >
            {d.label}
          </button>
        ))}
      </div>

      <div className="w-full max-w-[480px] mb-3">
        <div className="text-[13px] font-bold">
          {puzzle.source === 'local' ? 'Puzzle' : `Puzzle #${puzzle.id}`}
          {puzzle.rating ? <span className="text-ink-faint font-semibold"> · rated {puzzle.rating}</span> : null}
        </div>
        <p className="text-[12px] text-ink-faint mt-0.5">{sideToMove === 'w' ? 'White' : 'Black'} to move. Find the winning move.</p>
        {apiError && <p className="text-[11px] mt-1" style={{ color: 'var(--status-orange)' }}>Live puzzle service unreachable right now — showing a puzzle from the local backup set instead.</p>}
      </div>

      <div className="w-full max-w-[480px]" style={{ border: '1px solid var(--panel-line)', borderRadius: 'var(--radius-card)', overflow: 'hidden' }}>
        <Chessboard
          key={puzzle.id}
          options={{
            position: fen,
            boardOrientation: sideToMove === 'w' ? 'white' : 'black',
            canDragPiece: ({ piece }) => status === 'solving' && piece.pieceType[0].toLowerCase() === sideToMove,
            onPieceDrop: ({ sourceSquare, targetSquare }) => {
              setSelectedSquare(null)
              return targetSquare ? attempt(sourceSquare, targetSquare) : false
            },
            onSquareClick: ({ piece, square }) => {
              if (status !== 'solving') return
              if (selectedSquare && legalTargets.includes(square as Square)) {
                attempt(selectedSquare, square)
                setSelectedSquare(null)
                return
              }
              if (piece && piece.pieceType[0].toLowerCase() === sideToMove) {
                setSelectedSquare(prev => (prev === square ? null : (square as Square)))
              } else {
                setSelectedSquare(null)
              }
            },
            squareStyles: {
              ...(selectedSquare ? { [selectedSquare]: { backgroundColor: 'rgba(255, 214, 51, 0.5)' } } : {}),
              ...Object.fromEntries(legalTargets.map(sq => [sq, { boxShadow: 'inset 0 0 0 4px rgba(0,0,0,0.25)' }])),
              ...(revealed
                ? (() => {
                    const m = uciToMove(puzzle.solution[solutionIndex])
                    return {
                      [m.from]: { backgroundColor: 'rgba(0, 204, 102, 0.4)' },
                      [m.to]: { backgroundColor: 'rgba(0, 204, 102, 0.4)' },
                    }
                  })()
                : {}),
            },
            lightSquareStyle: { backgroundColor: BOARD_LIGHT },
            darkSquareStyle: { backgroundColor: BOARD_DARK },
          }}
        />
      </div>

      <div className="w-full max-w-[480px] mt-4">
        {status === 'solving' && (
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-ink-faint">Drag or click a piece to make your move.</span>
            <button onClick={() => setRevealed(true)} className="text-[12px] font-bold text-ink-faint hover:text-ink underline">Reveal squares</button>
          </div>
        )}

        {status === 'correct' && (
          <div className="bg-panel p-4">
            <div className="text-[13px] font-bold mb-1" style={{ color: 'var(--status-green)' }}>Correct!</div>
            <p className="text-[12.5px] text-ink-soft leading-relaxed mb-3">
              {puzzle.source === 'local' ? PUZZLES.find(p => p.id === puzzle.id)?.explanation : `Solved in ${puzzle.solution.length} ${puzzle.solution.length === 1 ? 'move' : 'plies'}.`}
            </p>
            <button onClick={next} className="text-[13px] font-bold text-white px-5 py-2 rounded-lg" style={{ background: 'var(--status-purple)' }}>Next puzzle →</button>
          </div>
        )}

        {status === 'wrong' && (
          <div className="bg-panel p-4">
            <div className="text-[13px] font-bold mb-1" style={{ color: 'var(--status-red)' }}>Not quite — that move doesn&apos;t solve it.</div>
            <p className="text-[12.5px] text-ink-soft leading-relaxed mb-3">Try again, or reveal the answer below.</p>
            <div className="flex gap-2 flex-wrap">
              <button onClick={retry} className="text-[13px] font-bold bg-ink text-[var(--background)] px-5 py-2">Try again</button>
              <button onClick={() => setRevealed(true)} className="text-[13px] font-bold bg-panel border border-panel-line px-5 py-2">Show solution</button>
              {revealed && <button onClick={next} className="text-[13px] font-bold px-2 py-2" style={{ color: 'var(--status-purple)' }}>Skip →</button>}
            </div>
          </div>
        )}
      </div>

      <div className="w-full max-w-[480px] mt-6 text-center">
        <p className="text-[12px] text-ink-faint">
          Want a full game instead? <Link href="/Chess-2000/casual" className="font-semibold" style={{ color: 'var(--status-blue)' }}>Play casually</Link> or try <Link href="/Chess-2000/play" className="font-semibold" style={{ color: 'var(--status-alt2)' }}>Training Mode</Link>.
        </p>
      </div>
    </div>
  )
}
