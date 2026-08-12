'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Chess, type Color, type Square } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import { GameSetup } from '@/components/GameSetup'
import { FREE_GAMES_LIMIT } from '@/lib/chess/config'

// Deliberately the lightest real thing this app offers: a real board, a
// real Stockfish opponent (via the same /api/chess-2000/engine-move route
// Training Mode uses), and nothing else — no /api/analyze, no move-quality
// grading, no position-summary narration. That's what makes this genuinely
// free and unlimited rather than a limited trial: none of the per-move
// coaching calls that the subscription price is actually paying for.

const BOARD_LIGHT = '#FFFFFF'
const BOARD_DARK = '#00CC66'
const START_FEN = new Chess().fen()

interface MoveEntry { ply: number; color: Color; san: string }

export default function CasualPlayClient() {
  const [gameStarted, setGameStarted] = useState(false)
  const [playerColor, setPlayerColor] = useState<Color>('w')
  const [engineElo, setEngineElo] = useState(1500)
  const [fen, setFen] = useState(START_FEN)
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null)
  const [moveList, setMoveList] = useState<MoveEntry[]>([])
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null)
  const [engineThinking, setEngineThinking] = useState(false)

  const game = useMemo(() => new Chess(fen), [fen])
  const sideToMove = game.turn()
  const gameOver = game.isGameOver()
  const gameStatus = game.isCheckmate() ? 'Checkmate' : game.isStalemate() ? 'Stalemate' : game.isDraw() ? 'Draw' : game.isCheck() ? 'Check' : null

  const legalTargets = useMemo(() => {
    if (!selectedSquare || sideToMove !== playerColor) return []
    return game.moves({ square: selectedSquare, verbose: true }).map(m => m.to)
  }, [game, selectedSquare, sideToMove, playerColor])

  function plyFromFen(fenBeforeMove: string): number {
    const [, , , , , fullmove] = fenBeforeMove.split(' ')
    const turn = fenBeforeMove.split(' ')[1]
    return (Number(fullmove) - 1) * 2 + (turn === 'w' ? 1 : 2)
  }

  function handlePlayerMove(sourceSquare: string, targetSquare: string): boolean {
    if (sideToMove !== playerColor) return false
    const g = new Chess(fen)
    let move
    try {
      move = g.move({ from: sourceSquare, to: targetSquare, promotion: 'q' })
    } catch {
      return false
    }
    if (!move) return false
    const ply = plyFromFen(fen)
    setFen(g.fen())
    setLastMove({ from: move.from, to: move.to })
    setMoveList(prev => [...prev, { ply, color: move.color, san: move.san }])
    return true
  }

  useEffect(() => {
    if (!gameStarted || gameOver || sideToMove === playerColor) return
    let cancelled = false
    setEngineThinking(true)
    const fenBeforeEngineMove = fen
    fetch('/api/chess-2000/engine-move', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fen: fenBeforeEngineMove, elo: engineElo }),
    })
      .then(r => r.json())
      .then((result: { move: string | null }) => {
        if (cancelled || !result.move) return
        const g = new Chess(fenBeforeEngineMove)
        const move = g.move({ from: result.move.slice(0, 2), to: result.move.slice(2, 4), promotion: result.move[4] })
        if (!move) return
        const ply = plyFromFen(fenBeforeEngineMove)
        setFen(g.fen())
        setLastMove({ from: move.from, to: move.to })
        setMoveList(prev => [...prev, { ply, color: move.color, san: move.san }])
      })
      .catch(err => console.error('[casual engine-move] failed', err))
      .finally(() => { if (!cancelled) setEngineThinking(false) })
    return () => { cancelled = true }
  }, [fen, gameStarted, gameOver, sideToMove, playerColor, engineElo])

  function newGame() {
    setGameStarted(false)
    setFen(START_FEN)
    setLastMove(null)
    setMoveList([])
    setSelectedSquare(null)
  }

  if (!gameStarted) {
    return (
      <div data-theme="dark" data-board-theme="green" className="min-h-screen bg-[var(--background)] text-ink flex flex-col">
        <div className="max-w-md mx-auto w-full px-6 pt-6">
          <Link href="/Chess-2000" className="text-[12px] font-bold text-ink-faint hover:text-ink">← Chess-2000</Link>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full">
            <div className="mx-auto max-w-md w-full px-6 -mt-8">
              <div className="text-[11px] font-bold uppercase tracking-wide text-accent mb-1">Casual Play — free, unlimited</div>
            </div>
            <GameSetup onStart={(color, elo) => { setPlayerColor(color); setEngineElo(elo); setGameStarted(true) }} />
            <div className="mx-auto max-w-md w-full px-6 mt-4 text-center">
              <p className="text-[12px] text-ink-faint">
                Want move grading and full coaching instead? Try <Link href="/Chess-2000/play" className="text-accent font-semibold">Training Mode</Link> ({FREE_GAMES_LIMIT} free games), or sharpen tactics with <Link href="/Chess-2000/puzzles" className="text-accent font-semibold">Puzzles</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div data-theme="dark" data-board-theme="green" className="min-h-screen bg-[var(--background)] text-ink flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-[480px] flex items-center justify-between mb-4">
        <Link href="/Chess-2000" className="text-[12px] font-bold text-ink-faint hover:text-ink">← Chess-2000</Link>
        <div className="text-[11px] font-bold uppercase tracking-wide text-accent">Casual Play</div>
        <button onClick={newGame} className="text-[12px] font-bold bg-panel px-3 py-1.5">New Game</button>
      </div>

      <div className="w-full max-w-[480px]" style={{ border: '1px solid var(--panel-line)', borderRadius: 'var(--radius-card)', overflow: 'hidden' }}>
        <Chessboard
          options={{
            position: fen,
            boardOrientation: playerColor === 'w' ? 'white' : 'black',
            canDragPiece: ({ piece }) => piece.pieceType[0].toLowerCase() === playerColor && sideToMove === playerColor,
            onPieceDrop: ({ sourceSquare, targetSquare }) => {
              setSelectedSquare(null)
              return targetSquare ? handlePlayerMove(sourceSquare, targetSquare) : false
            },
            onSquareClick: ({ piece, square }) => {
              if (selectedSquare && legalTargets.includes(square as Square)) {
                handlePlayerMove(selectedSquare, square)
                setSelectedSquare(null)
                return
              }
              if (piece && piece.pieceType[0].toLowerCase() === playerColor && sideToMove === playerColor) {
                setSelectedSquare(prev => prev === square ? null : (square as Square))
              } else {
                setSelectedSquare(null)
              }
            },
            squareStyles: {
              ...(lastMove ? {
                [lastMove.from]: { backgroundColor: 'rgba(255, 214, 51, 0.35)' },
                [lastMove.to]: { backgroundColor: 'rgba(255, 214, 51, 0.35)' },
              } : {}),
              ...(selectedSquare ? { [selectedSquare]: { backgroundColor: 'rgba(255, 214, 51, 0.5)' } } : {}),
              ...Object.fromEntries(legalTargets.map(sq => [sq, { boxShadow: 'inset 0 0 0 4px rgba(0,0,0,0.25)' }])),
            },
            lightSquareStyle: { backgroundColor: BOARD_LIGHT },
            darkSquareStyle: { backgroundColor: BOARD_DARK },
          }}
        />
      </div>

      <div className="w-full max-w-[480px] mt-4 flex items-center justify-between text-[12px]">
        <span className="text-ink-faint">
          {gameOver ? gameStatus : engineThinking ? 'Engine thinking…' : sideToMove === playerColor ? 'Your move' : 'Waiting for engine…'}
        </span>
        <span className="text-ink-faint">Engine: {engineElo} ELO</span>
      </div>

      {moveList.length > 0 && (
        <div className="w-full max-w-[480px] mt-4 bg-panel p-3 max-h-[160px] overflow-y-auto">
          <div className="grid grid-cols-[24px_1fr_1fr] gap-x-2 gap-y-1 text-[12px]">
            {Array.from({ length: Math.ceil(moveList.length / 2) }, (_, i) => {
              const white = moveList[i * 2]
              const black = moveList[i * 2 + 1]
              return (
                <div key={i} className="contents">
                  <span className="text-ink-faint">{i + 1}.</span>
                  <span>{white?.san ?? ''}</span>
                  <span>{black?.san ?? ''}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {gameOver && (
        <div className="w-full max-w-[480px] mt-4 text-center">
          <div className="font-heading text-lg font-extrabold mb-2">{gameStatus}</div>
          <button onClick={newGame} className="text-[13px] font-bold bg-ink text-[var(--background)] px-6 py-2.5">Play again</button>
        </div>
      )}
    </div>
  )
}
