/* eslint-disable react/no-unescaped-entities -- long-form prose content below; escaping every apostrophe/quote would make it unreadable to edit */
import Link from 'next/link'
import type { Metadata } from 'next'
import { FREE_GAMES_LIMIT } from '@/lib/chess/config'
import { Chess2000Logo } from '@/components/chess/Chess2000Logo'

export const metadata: Metadata = {
  title: 'Chess-2000 — Real Stockfish Coaching, Move by Move',
  description: `Real Stockfish analysis, real move grading, and a real, repeatable method for reaching 2000 ELO through regular practice. Free puzzles, free casual play, and ${FREE_GAMES_LIMIT} free training games — then ₹299/month or ₹999/year.`,
}

const FEATURES: { name: string; text: string }[] = [
  { name: 'Real Stockfish engine', text: 'Every move — yours and the engine\'s — is evaluated by a real Stockfish engine at depth 18, the same engine strength setting (UCI_Elo) chess.com and Lichess use, not a simulated handicap.' },
  { name: 'Real move grading', text: 'Every move you play is graded Best, Excellent, Good, Inaccuracy, Mistake, or Blunder — using the same real win%-drop method Lichess publishes, with a second real centipawn-loss check so a decisive material blunder can\'t hide behind a small eval swing.' },
  { name: 'Tactical Scoring', text: 'Ten real, pure-logic measurements of the position — Development, King Safety, Center Control, Piece Activity, Pawn Structure, Coordination, Rook Activity, Material, Weak Squares, Advanced Pieces — computed for both sides, side by side, for every phase of the game.' },
  { name: 'Positional Analysis', text: 'A real, dynamic coaching panel that writes out the position the way a coach would: whatever matters most right now leads, followed by phase-specific priorities, a real SAFE/ATTACK/IMPROVE read on the position, what your opponent is really trying to do, and a reminder to review the move you just played.' },
  { name: 'Eight real board tools', text: 'Undefended Pieces, Overloaded Pieces, Weak Squares, Piece Strength, Imbalance, Exchange Alert, Tactics Alert, and Checkmate Alert — each one highlights a real, specific thing on the board, verified against the actual position rather than guessed.' },
  { name: 'The CCTAP method', text: 'Checks, Captures, Threats, Analysis, Plan — a real, structured way to think through every move, walked through explicitly in a guided mode until it becomes automatic.' },
  { name: 'Live rating estimate', text: 'A real Current ELO estimate and Accuracy % for the game in progress, built from your real average centipawn loss — not a vanity number, and explicitly labeled provisional until there\'s enough real data.' },
  { name: 'Adjustable opponent strength', text: 'Play the real engine anywhere from 1320 to 3190 UCI_Elo, so you can set a genuinely competitive opponent instead of one that\'s trivially easy or hopelessly strong.' },
]

const FREE_ITEMS: { name: string; text: string; href: string; cta: string; badge: string; accent: string }[] = [
  { name: 'Puzzles', text: 'Real tactical positions — pins, forks, skewers, mating nets — pulled live from a real puzzle database, five difficulty levels from easiest to hardest.', href: '/Chess-2000/puzzles', cta: 'Solve puzzles', badge: 'Free forever', accent: 'var(--status-purple)' },
  { name: 'Casual Play', text: 'Play the real engine with no coaching overlay — just a board and a real opponent, like any other online chess game.', href: '/Chess-2000/casual', cta: 'Play casually', badge: 'Free forever', accent: 'var(--status-blue)' },
  { name: 'Training Mode', text: 'Full engine analysis, full move grading, every board tool, CCTAP Mode — the complete coaching experience. No account needed to start.', href: '/Chess-2000/play', cta: 'Play a training game', badge: `${FREE_GAMES_LIMIT} free games`, accent: 'var(--status-alt2)' },
]

export default function HomePage() {
  return (
    <div data-theme="dark" className="min-h-screen bg-[var(--background)] text-ink">
      {/* Hero */}
      <div className="border-b border-panel-line">
        <div className="max-w-[900px] mx-auto px-6 pt-14 pb-12">
          <div className="mb-5">
            <Chess2000Logo size={30} />
          </div>
          <h1 className="font-heading text-[32px] sm:text-[40px] font-extrabold leading-[1.1] max-w-[680px]">
            Real Stockfish coaching, move by move — not a fortune teller.
          </h1>
          <p className="text-[15px] text-ink-soft mt-5 max-w-[600px] leading-relaxed">
            Chess-2000 explains what's actually happening on the board after every move, what the engine actually thinks is best, and why — using a real chess engine and real, documented formulas. Nothing here is generated to sound plausible; every number traces back to something the app actually computed.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/Chess-2000/play" className="text-[13px] font-bold text-white px-6 py-3 rounded-lg" style={{ background: 'var(--status-alt2)' }}>Play a training game ({FREE_GAMES_LIMIT} free)</Link>
            <Link href="/Chess-2000/puzzles" className="text-[13px] font-bold text-white px-6 py-3 rounded-lg" style={{ background: 'var(--status-purple)' }}>Solve puzzles — free</Link>
            <Link href="/Chess-2000/casual" className="text-[13px] font-bold text-white px-6 py-3 rounded-lg" style={{ background: 'var(--status-blue)' }}>Play casually — free</Link>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <a href="#pricing" className="text-[12px] font-bold text-ink-faint hover:text-ink">See pricing</a>
            <Link href="/Chess-2000/how-it-works" className="text-[12px] font-bold text-ink-faint hover:text-ink">How it works →</Link>
          </div>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 py-14">

        {/* What this is */}
        <section className="mb-16">
          <h2 className="font-heading text-2xl font-extrabold mb-4">What this actually is</h2>
          <div className="space-y-4 text-[14px] leading-[1.75] text-ink-soft max-w-[720px]">
            <p>Chess-2000 is a training board built around one real idea: most players stall out well before 2000 ELO not because they lack calculation talent, but because they hang pieces and miss real threats they were never taught to systematically check for. This app plays a real, honest game against a real Stockfish engine, and after every move — yours and the engine's — explains what actually changed, what actually matters right now, and what the engine would actually play instead.</p>
            <p>Every number on this site describes something the app genuinely computed: real legal moves (validated by chess.js), a real engine evaluation (Stockfish, depth 18), and real, published or standard formulas for everything derived from that (win %, accuracy, move grading, rating estimate). No AI model narrates or invents any of it. That's a deliberate choice — a training tool that quietly makes up plausible-sounding feedback is worse than no feedback at all, because you can never tell which parts to actually trust.</p>
          </div>
        </section>

        {/* Free things */}
        <section className="mb-16">
          <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: 'var(--status-purple)' }}>Free, right now</span>
          <h2 className="font-heading text-2xl font-extrabold mt-1 mb-2">No account needed to start</h2>
          <p className="text-[13px] text-ink-faint mb-6 max-w-[640px]">Two of these are free forever. Training Mode is free for your first {FREE_GAMES_LIMIT} games — clearly marked below so there's never a surprise.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {FREE_ITEMS.map(item => (
              <div key={item.name} className="bg-panel p-5 flex flex-col" style={{ borderTop: `3px solid ${item.accent}` }}>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="font-heading text-[14px] font-extrabold">{item.name}</div>
                  <span className="text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full whitespace-nowrap" style={{ background: item.accent, color: '#fff' }}>{item.badge}</span>
                </div>
                <p className="text-[12.5px] text-ink-soft leading-relaxed flex-1">{item.text}</p>
                <Link href={item.href} className="inline-block mt-4 text-[12px] font-bold" style={{ color: item.accent }}>{item.cta} →</Link>
              </div>
            ))}
          </div>
        </section>

        {/* How it helps reach 2000 ELO */}
        <section className="mb-16">
          <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: 'var(--status-blue)' }}>The method</span>
          <h2 className="font-heading text-2xl font-extrabold mt-1 mb-4">How this helps you reach 2000 ELO through regular practice</h2>
          <div className="space-y-4 text-[14px] leading-[1.75] text-ink-soft max-w-[720px]">
            <p>At club level, the single biggest real gap between a 1000-rated player and a 2000-rated player isn't calculation depth or opening theory — it's consistency. A 2000 player is, in a real sense, a 1000 player who has trained themselves out of hanging pieces and out of missing the opponent's real threats. That gap closes through repetition of one real habit, not through a single insight: checking checks, captures, and threats before every move, every single game.</p>
            <p>Chess-2000 is built around making that habit trainable. Play a real game; every move gets a real grade. When the grade says Mistake or Blunder, the app tells you why — the real "stronger was" line, not just that you were wrong. CCTAP Mode walks the five-step process explicitly until it's automatic. Tactical Scoring and Positional Analysis surface real weaknesses (a consistently low King Safety score by move 10, a repeated pattern of hanging pieces after trades) that are easy to miss in the moment but obvious across several real games. Puzzles reinforce the same pattern-recognition in isolation, and Casual Play gives you somewhere to just play without every move being graded.</p>
            <p>None of this replaces playing real games and reviewing them honestly — there is no shortcut around that. What this app removes is the guesswork about <em>what</em> to review: every real weakness in a position is already named and quantified, move by move, so regular practice actually compounds into real improvement instead of repeating the same unnoticed mistakes.</p>
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: 'var(--status-alt2)' }}>Training Mode</span>
          <h2 className="font-heading text-2xl font-extrabold mt-1 mb-2">What's actually in Training Mode</h2>
          <p className="text-[13px] text-ink-faint mb-6 max-w-[640px]">Every item below is a real, working feature — see <Link href="/Chess-2000/how-it-works" className="text-accent font-semibold">How It Works</Link> for the full, exact detail on how each one is calculated.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map(f => (
              <div key={f.name} className="bg-panel p-5">
                <div className="font-heading text-[14px] font-extrabold mb-1.5">{f.name}</div>
                <p className="text-[12.5px] text-ink-soft leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mb-16 scroll-mt-8">
          <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: 'var(--status-gold)' }}>Pricing</span>
          <h2 className="font-heading text-2xl font-extrabold mt-1 mb-2">Subscription</h2>
          <p className="text-[13px] text-ink-faint mb-6 max-w-[640px]">Puzzles and Casual Play are always free. A subscription is only for unlimited real Training Mode games past your first {FREE_GAMES_LIMIT} — full engine analysis, every feature, at either plan. Cancel any time — see <Link href="/Chess-2000/terms" className="text-accent font-semibold">Terms</Link> for the full real refund and renewal policy.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[560px]">
            <div className="bg-panel p-5">
              <div className="text-[10px] font-bold uppercase tracking-wide text-ink-faint">Monthly</div>
              <div className="font-heading text-3xl font-extrabold mt-1">₹299 <span className="text-[13px] font-semibold text-ink-faint">/ month</span></div>
            </div>
            <div className="bg-panel p-5">
              <div className="text-[10px] font-bold uppercase tracking-wide text-ink-faint">Yearly</div>
              <div className="font-heading text-3xl font-extrabold mt-1">₹999 <span className="text-[13px] font-semibold text-ink-faint">/ year</span></div>
              <div className="text-[11px] text-status-green font-bold mt-1">Under ₹84/month</div>
            </div>
          </div>
          <p className="text-[12.5px] text-ink-faint mt-4 max-w-[640px]">Card, UPI (with QR code), netbanking, and wallets are all accepted via Razorpay's real checkout.</p>
          <Link href="/Chess-2000/subscribe" className="inline-block mt-5 text-[13px] font-bold bg-ink text-[var(--background)] px-6 py-3">Subscribe</Link>
        </section>

        {/* About us */}
        <section className="mb-16">
          <h2 className="font-heading text-2xl font-extrabold mb-4">About</h2>
          <div className="space-y-4 text-[14px] leading-[1.75] text-ink-soft max-w-[720px]">
            <p>Chess-2000 is an independently built training tool, made because most chess-improvement content is either raw engine output with no explanation, or plausible-sounding advice with no real data behind it. This app tries to sit honestly in between: a real engine doing the real analysis, explained in plain English, with every claim traceable back to an actual computation rather than a guess.</p>
            <p>It's a genuinely small, independent product — not a large platform — and the tradeoff that comes with that is real, direct contact rather than a support ticket queue.</p>
          </div>
        </section>

        {/* Chess article */}
        <section className="mb-16">
          <h2 className="font-heading text-2xl font-extrabold mb-4">Article: Why most players plateau before 2000 — and the one habit that fixes it</h2>
          <div className="space-y-4 text-[14px] leading-[1.75] text-ink-soft max-w-[720px]">
            <p>Ask a 1400-rated player why they lost a game, and the answer is almost always about the position: "I got a bad structure," "my opponent's attack was too strong," "I didn't know the opening." Ask a 2000-rated player the same question, and the answer is far more often mechanical: "I hung my knight on move 23," or "I missed a fork two moves before it happened." This isn't a coincidence — it's the actual, measurable shape of the gap between those two ratings.</p>
            <p>Below roughly 1400-1600, games are still frequently decided by outright blunders — a piece left undefended, a mate in one walked into. Above that, players have generally trained themselves out of the most obvious errors, and the games that used to be lost to a single bad move start being lost to something quieter: a slow accumulation of small inaccuracies, a King Safety score allowed to drift down for ten moves in a row, a rook left passive on its own back rank the whole game. The mistakes get smaller, but they're still mistakes — and they're still fixable the same way the bigger ones were.</p>
            <p>The actual fix, at every rating band, is the same habit performed more rigorously: before playing a move, check what it hangs, check what the opponent threatens, check whether a forcing move (a check, a capture, a real threat) is available before considering a quiet one. This is the whole content of the CCTAP method — Checks, Captures, Threats, Analysis, Plan — and it is not a secret. It's taught to beginners. What separates a 1000 player from a 2000 player is not knowing this method; it's actually running it, on every move, for hundreds of real games, until it stops being a conscious checklist and becomes how you see the board.</p>
            <p>That's also why a single lesson, a single book, or a single "aha" moment rarely moves a rating by itself. Consistency is a habit built through repetition with real feedback — playing a real move, finding out concretely whether it was actually sound, and understanding exactly why when it wasn't. Engine-backed practice is valuable here specifically because it removes the ambiguity: there's no arguing with a real, verified line about whether a move actually hung a piece. Puzzles train the same recognition faster, in isolation, without a full game around them. The player who reviews that feedback honestly, game after game, is the one who closes the gap — not the player who calculates the deepest, but the player who stops handing games away to the same recurring, nameable mistake.</p>
          </div>
        </section>

        {/* Chess resources / news */}
        <section className="mb-16">
          <h2 className="font-heading text-2xl font-extrabold mb-4">Chess resources</h2>
          <p className="text-[13px] text-ink-faint mb-4 max-w-[640px]">Real, well-established external resources — not curated or run by Chess-2000, just genuinely useful places to follow chess news, play, and study.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="https://www.chess.com" target="_blank" rel="noopener noreferrer" className="bg-panel p-5 block hover:opacity-80">
              <div className="font-heading text-[14px] font-extrabold mb-1">Chess.com</div>
              <p className="text-[12.5px] text-ink-soft leading-relaxed">News, live events, and the largest real player base for online games.</p>
            </a>
            <a href="https://lichess.org" target="_blank" rel="noopener noreferrer" className="bg-panel p-5 block hover:opacity-80">
              <div className="font-heading text-[14px] font-extrabold mb-1">Lichess</div>
              <p className="text-[12.5px] text-ink-soft leading-relaxed">A free, open-source real engine analysis board and a large, active puzzle database.</p>
            </a>
            <a href="https://www.fide.com" target="_blank" rel="noopener noreferrer" className="bg-panel p-5 block hover:opacity-80">
              <div className="font-heading text-[14px] font-extrabold mb-1">FIDE</div>
              <p className="text-[12.5px] text-ink-soft leading-relaxed">The official real world rating list and the governing body for over-the-board chess.</p>
            </a>
            <a href="https://www.chessbase.com" target="_blank" rel="noopener noreferrer" className="bg-panel p-5 block hover:opacity-80">
              <div className="font-heading text-[14px] font-extrabold mb-1">ChessBase News</div>
              <p className="text-[12.5px] text-ink-soft leading-relaxed">Real tournament coverage and analysis from top-level real games.</p>
            </a>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-8">
          <h2 className="font-heading text-2xl font-extrabold mb-4">Contact</h2>
          <div className="space-y-2 text-[14px] leading-relaxed text-ink-soft max-w-[720px]">
            <p>Questions, payment issues, or feedback — reach out directly: <a href="mailto:nishant@market-reports.com" className="text-accent font-semibold">nishant@market-reports.com</a>.</p>
          </div>
        </section>

        <div className="pt-8 border-t border-panel-line flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-ink-faint">
          <Link href="/Chess-2000/play" className="hover:text-ink">Training Mode</Link>
          <Link href="/Chess-2000/casual" className="hover:text-ink">Casual Play</Link>
          <Link href="/Chess-2000/puzzles" className="hover:text-ink">Puzzles</Link>
          <Link href="/Chess-2000/how-it-works" className="hover:text-ink">How It Works</Link>
          <Link href="/Chess-2000/subscribe" className="hover:text-ink">Subscription</Link>
          <Link href="/Chess-2000/privacy" className="hover:text-ink">Privacy Policy</Link>
          <Link href="/Chess-2000/terms" className="hover:text-ink">Terms of Service</Link>
        </div>
      </div>
    </div>
  )
}
