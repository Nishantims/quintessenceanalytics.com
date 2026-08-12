'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Chess, type Square } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import { PUZZLES } from '@/lib/chess/puzzles'

// Pure client-side — no engine call, no /api route, no backend cost at
// all. That's what makes this genuinely free and unlimited: chess.js alone
// validates every attempt against the real, pre-verified solution move.

const BOARD_LIGHT = '#FFFFFF'
const BOARD_DARK = '#00CC66'

type Status = 'solving' | 'correct' | 'wrong'

export default function PuzzlesClient() {
  const [index, setIndex] = useState(0)
  const [status, setStatus] = useState<Status>('solving')
  const [solvedCount, setSolvedCount] = useState(0)
  const [revealed, setRevealed] = useState(false)

  const puzzle = PUZZLES[index]
  const chess = useMemo(() => new Chess(puzzle.fen), [puzzle.fen])
  const sideToMove = chess.turn()

  function attempt(from: string, to: string): boolean {
    if (status !== 'solving') return false
    const g = new Chess(puzzle.fen)
    let move
    try {
      move = g.move({ from, to, promotion: 'q' })
    } catch {
      return false
    }
    if (!move) return false
    const isSolution = from === puzzle.solution.from && to === puzzle.solution.to
    if (isSolution) {
      setStatus('correct')
      setSolvedCount(c => c + 1)
    } else {
      setStatus('wrong')
    }
    return true
  }

  function next() {
    setIndex(i => (i + 1) % PUZZLES.length)
    setStatus('solving')
    setRevealed(false)
  }

  function retry() {
    setStatus('solving')
  }

  return (
    <div data-theme="dark" data-board-theme="green" className="min-h-screen bg-[var(--background)] text-ink flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-[480px] flex items-center justify-between mb-4">
        <Link href="/Chess-2000" className="text-[12px] font-bold text-ink-faint hover:text-ink">← Chess-2000</Link>
        <div className="text-[11px] font-bold uppercase tracking-wide text-accent">Puzzles</div>
        <span className="text-[12px] text-ink-faint">{solvedCount} solved</span>
      </div>

      <div className="w-full max-w-[480px] mb-3">
        <div className="text-[13px] font-bold">
          Puzzle {index + 1} of {PUZZLES.length} — {puzzle.theme}
        </div>
        <p className="text-[12px] text-ink-faint mt-0.5">{sideToMove === 'w' ? 'White' : 'Black'} to move. Find the winning move.</p>
      </div>

      <div className="w-full max-w-[480px]" style={{ border: '1px solid var(--panel-line)', borderRadius: 'var(--radius-card)', overflow: 'hidden' }}>
        <Chessboard
          key={puzzle.id}
          options={{
            position: puzzle.fen,
            boardOrientation: sideToMove === 'w' ? 'white' : 'black',
            canDragPiece: ({ piece }) => status === 'solving' && piece.pieceType[0].toLowerCase() === sideToMove,
            onPieceDrop: ({ sourceSquare, targetSquare }) => (targetSquare ? attempt(sourceSquare, targetSquare) : false),
            squareStyles: revealed
              ? {
                  [puzzle.solution.from]: { backgroundColor: 'rgba(0, 204, 102, 0.4)' },
                  [puzzle.solution.to]: { backgroundColor: 'rgba(0, 204, 102, 0.4)' },
                }
              : {},
            lightSquareStyle: { backgroundColor: BOARD_LIGHT },
            darkSquareStyle: { backgroundColor: BOARD_DARK },
          }}
        />
      </div>

      <div className="w-full max-w-[480px] mt-4">
        {status === 'solving' && (
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-ink-faint">Drag a piece to make your move.</span>
            <button onClick={() => setRevealed(true)} className="text-[12px] font-bold text-ink-faint hover:text-ink underline">Reveal squares</button>
          </div>
        )}

        {status === 'correct' && (
          <div className="bg-panel p-4">
            <div className="text-[13px] font-bold text-status-green mb-1">Correct!</div>
            <p className="text-[12.5px] text-ink-soft leading-relaxed mb-3">{puzzle.explanation}</p>
            <button onClick={next} className="text-[13px] font-bold bg-ink text-[var(--background)] px-5 py-2">Next puzzle →</button>
          </div>
        )}

        {status === 'wrong' && (
          <div className="bg-panel p-4">
            <div className="text-[13px] font-bold text-status-red mb-1">Not quite — that move doesn't solve it.</div>
            <p className="text-[12.5px] text-ink-soft leading-relaxed mb-3">Try again, or reveal the answer below.</p>
            <div className="flex gap-2 flex-wrap">
              <button onClick={retry} className="text-[13px] font-bold bg-ink text-[var(--background)] px-5 py-2">Try again</button>
              <button onClick={() => setRevealed(true)} className="text-[13px] font-bold bg-panel border border-panel-line px-5 py-2">Show solution</button>
              {revealed && <button onClick={next} className="text-[13px] font-bold text-accent px-2 py-2">Skip →</button>}
            </div>
            {revealed && <p className="text-[12.5px] text-ink-soft leading-relaxed mt-3">{puzzle.explanation}</p>}
          </div>
        )}
      </div>

      <div className="w-full max-w-[480px] mt-6 text-center">
        <p className="text-[12px] text-ink-faint">
          Want a full game instead? <Link href="/Chess-2000/casual" className="text-accent font-semibold">Play casually</Link> or try <Link href="/Chess-2000/play" className="text-accent font-semibold">Training Mode</Link> (one free game).
        </p>
      </div>
    </div>
  )
}
