/* eslint-disable react/no-unescaped-entities -- long-form prose content below; escaping every apostrophe/quote would make it unreadable to edit */
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How Chess-IQ Works',
  description: 'How to use Chess-IQ, how to train toward 2000 ELO with it, the CCTAP method explained with examples, 50 real chess principles, the ten Tactical Scoring metrics, and a full glossary.',
}

const PRINCIPLES: { name: string; text: string }[] = [
  {
    name: 'Development',
    text: 'Development measures how many of your minor pieces and your queen have actually left their starting squares. In the real opening, every piece stuck at home is a piece that cannot defend, attack, or contest the center. A player behind in development is playing with fewer real pieces than their opponent for as long as the gap lasts — which is exactly why fast, efficient development is the first real principle taught to every improving player.',
  },
  {
    name: 'King Safety',
    text: "King Safety combines two real signals: whether your pawn shield in front of the king is still intact, and how many enemy pieces are attacking a square next to your king right now. A king with a broken shield and enemy pieces bearing down on it is a real, concrete liability, regardless of how the rest of the board looks — one tactical shot can end the game outright. Castling early and keeping the shield pawns unmoved is the standard real defense.",
  },
  {
    name: 'Center Control',
    text: 'Center Control counts who really attacks the four central squares — d4, d5, e4, and e5 — right now. The center is the most valuable real estate on the board because pieces posted or aimed there reach the most squares in the fewest moves. A player who controls the center dictates where the game is played; a player who cedes it is fighting on their opponent’s terms, cramped into their own half of the board.',
  },
  {
    name: 'Piece Activity',
    text: "Piece Activity is a real count of how many legal moves your pieces have available right now, normalized against a typical middlegame ceiling. A piece with many real destinations is doing real work; a piece boxed in behind its own pawns is a spectator. This is the same real logic chess players use informally — 'how many squares does this piece actually cover' — just counted exactly instead of estimated.",
  },
  {
    name: 'Pawn Structure',
    text: 'Pawn Structure checks for two real, concrete weaknesses: doubled pawns (two of your own pawns stacked on the same file, unable to defend each other) and isolated pawns (a pawn with no friendly pawn on either neighboring file, permanently short of pawn support). Both are real, long-term liabilities — pawns cannot move backward, so a structural weakness created on move 10 can still be a real target on move 40.',
  },
  {
    name: 'Coordination',
    text: 'Coordination is the real fraction of your non-pawn, non-king pieces that are currently defended by at least one other one of your own pieces. Pieces that support each other can trade favorably, recapture safely, and combine for real tactics; pieces that stand alone are each one unnoticed attack away from being lost for nothing. A well-coordinated position is a real, physical web of mutual defense, not just a pile of pieces.',
  },
  {
    name: 'Rook Activity',
    text: "Rook Activity counts how many of your rooks are on a real open file (no pawns of either color on it) or semi-open file (no pawn of your own on it), out of however many rooks you still have. Rooks are long-range pieces that need open lines to matter; a rook stuck behind its own unmoved pawns is worth a fraction of a rook on an open file bearing down on the enemy's position.",
  },
  {
    name: 'Material',
    text: "Material is simply the real point total of the pieces you have on the board right now (pawn = 1, knight/bishop = 3, rook = 5, queen = 9), scored against a full army's real starting total. It is the most basic and most decisive of all ten principles — the other nine describe how well you're using what you have, but a large enough real material deficit outweighs almost everything else.",
  },
  {
    name: 'Weak Squares',
    text: "Weak Squares counts real holes in your position — central and near-central squares that none of your current pawns can ever advance to guard, because doing so isn't physically possible from where they stand. A weak square is a permanent real invitation for an enemy knight or bishop to plant itself there, safe from a pawn challenge for the rest of the game. Fewer real weak squares is always better.",
  },
  {
    name: 'Advanced Pieces',
    text: "Advanced Pieces is a real count of how many of your pieces (pawns included) are physically standing in your opponent's half of the board right now. It is a direct, literal measure of space and initiative — an army advanced into enemy territory is applying real pressure and restricting the opponent's own options, while an army still on its own half is playing a purely defensive, reactive game.",
  },
]

// 50 real, standard chess principles — the classic, well-established
// pieces of chess wisdom every improving player is taught (not the app's
// own ten computed Tactical Scoring metrics below, which measure a
// position; these are the general rules that explain WHY those metrics
// matter). Grouped by the phase they mainly apply to, matching how a
// player actually encounters them across a real game.
const FIFTY_PRINCIPLES: { category: string; items: { name: string; text: string }[] }[] = [
  {
    category: 'Opening',
    items: [
      { name: 'Control the Center', text: 'Occupy or attack d4, d5, e4, and e5 early. Central pieces reach more of the board and restrict the opponent, which is why the center is fought over before anything else.' },
      { name: 'Develop Knights Before Bishops', text: "A knight's best square (c3/f3, c6/f6) is usually clear from move one, while a bishop's best diagonal often depends on how the pawn structure resolves — so develop knights first." },
      { name: "Don't Move the Same Piece Twice", text: 'Every extra tempo spent replaying a piece is a tempo the opponent gets to develop for free. Only re-move a piece in the opening if there is a concrete tactical reason.' },
      { name: 'Castle Early', text: "Get the king to safety and connect the rooks before starting sharp action. An uncastled king sitting in the center is a long-term liability waiting to be opened up." },
      { name: "Don't Bring the Queen Out Too Early", text: 'An early queen sortie invites the opponent to develop a minor piece with tempo by attacking it — effectively developing their army at your expense.' },
      { name: 'Develop With a Purpose', text: 'Every developing move should also fight for the center or prepare castling. Aimless development gives up the real tempo advantage the opening is fought over.' },
      { name: 'Connect the Rooks', text: 'A fully developed position has both rooks defending each other along the back rank, free to swing to whichever file opens once the position clarifies.' },
      { name: "Don't Grab Pawns in the Opening", text: 'Winning a marginal, undefended pawn while leaving pieces undeveloped almost always costs more in lost tempo than the pawn itself is worth.' },
      { name: 'Play the Center Before the Flank', text: 'Wing expansion (pawn storms, flank fianchettos) is premature before the center is either resolved or firmly under control — the center decides who the flank play favors.' },
      { name: 'One or Two Pawn Moves, Not More', text: "Excess pawn moves in the opening don't develop pieces and often create early weaknesses the opponent can target for the rest of the game." },
      { name: 'Fight for Tempo', text: 'Prefer moves that develop a piece and make a real threat — attacking a pawn, pinning a piece — over quiet moves that accomplish only one of those jobs.' },
      { name: "Know Your Opening's Plan, Not Just Its Moves", text: "Memorized moves run out eventually. Understanding the resulting pawn structure and its typical plans is what actually carries you past move ten." },
      { name: 'Check Every Move for Early Tactics', text: 'Many openings contain a real trap within the first six to eight moves — check every move for a hanging piece or a tactic before playing it automatically.' },
    ],
  },
  {
    category: 'Middlegame',
    items: [
      { name: 'Knight on the Rim Is Dim', text: 'A knight on the edge of the board covers far fewer real squares than one centralized. Keep knights toward the center whenever the position allows it.' },
      { name: 'The Bishop Pair Is a Real Asset', text: 'Two bishops together cover both color complexes and tend to outperform a bishop-and-knight, or two knights, especially once the position opens up.' },
      { name: 'Rooks Belong on Open Files', text: 'A rook on a file with no pawns (or none of its own) has full scope. Doubling rooks on a real open file multiplies that advantage further.' },
      { name: 'Trade Your Bad Piece, Not Your Good One', text: 'If one of your pieces is clearly doing less work than its counterpart, look to trade it off — never trade away your best piece just because a trade is available.' },
      { name: "Don't Weaken Your King's Shelter Without a Reason", text: 'Pawn moves in front of a castled king create permanent real holes that can never be undone. Only make them when there is a concrete, calculated gain.' },
      { name: 'Look for Pawn Breaks', text: 'A well-timed pawn break opens lines for your pieces and can permanently change the character of the position in your favor — always be looking for the right moment.' },
      { name: 'Trade When Ahead in Material', text: 'Simplifying the position reduces the opponent\'s real practical chances to complicate matters, and makes an existing material edge easier to convert cleanly.' },
      { name: 'Avoid Trades When Behind', text: 'Keeping more pieces on the board while material-down preserves your real practical chances for a tactic, a trap, or a real attack later in the game.' },
      { name: 'Improve Your Worst-Placed Piece', text: 'Before committing to a plan, ask which of your pieces is doing the least right now, and spend a move finding it a genuinely better square.' },
      { name: "Restrict the Opponent's Pieces", text: "A move that limits where an enemy piece can usefully go is often exactly as valuable as a move that improves one of your own." },
      { name: "Don't Trade a Fianchettoed Bishop for a Knight Too Early", text: 'A fianchettoed bishop controlling a long diagonal is often a real long-term structural asset — worth more alive than most trades for it.' },
      { name: "Play on the Side Where You're Stronger", text: "If your real position is better on the kingside, direct your plan there rather than opening lines on the side where the opponent is actually stronger." },
      { name: 'Calculate Forcing Moves First', text: "Checks, captures, and threats change the position immediately and can't be safely ignored — always check these before considering quieter alternatives." },
      { name: 'Watch for Overprotection', text: 'A piece defended more times than it strictly needs to be is a real, ready resource — one of its extra defenders is often free to do something else useful.' },
    ],
  },
  {
    category: 'Endgame',
    items: [
      { name: 'Activate Your King', text: "In the endgame the king is a real fighting piece. Centralizing it early, once it's actually safe to do so, is often the single most important plan available." },
      { name: 'Passed Pawns Must Be Pushed', text: 'A pawn with no opposing pawn able to stop it is a real, growing threat. Push it forward with support rather than leaving it sitting still.' },
      { name: 'Rook Belongs Behind the Passed Pawn', text: "Whether it's your passed pawn or the opponent's, a rook stationed behind it — not in front — sits on its single most active real square." },
      { name: 'The Principle of Two Weaknesses', text: 'A single weakness can often be defended forever. Create a genuine second one on the other side of the board and the defense typically collapses.' },
      { name: 'Opposition Decides King-and-Pawn Endings', text: 'Knowing whether you hold the real opposition — kings facing off with an odd number of squares between them — often decides who promotes first.' },
      { name: "Don't Rush", text: 'Many winning or drawn endgames are lost by moving too fast. Take the time to improve your position fully before committing to a forcing line.' },
      { name: 'Keep Rooks Active, Even a Pawn Down', text: 'A rook endgame down a single pawn but with the more active rook is very often a real, holdable draw — passivity, not the missing pawn, is the real danger.' },
      { name: 'Outside Passed Pawns Are Especially Strong', text: "A passed pawn far from the action can single-handedly draw the opposing king away, winning real material on the opposite flank while it's gone." },
      { name: 'Active Bishop Endings Favor the Active Side', text: 'A same-colored-bishop endgame is decided far more by real piece activity and pawn structure than by material count alone.' },
      { name: 'Opposite-Colored Bishops Favor the Defender', text: 'With bishops on opposite colors, even a two-pawn deficit is often a real, holdable draw, since the defending bishop can permanently blockade squares of its own color.' },
      { name: 'Know the Key Squares', text: 'In pawn endings, certain squares determine whether a pawn can actually be stopped or promoted. Knowing them lets you calculate exactly instead of guessing.' },
      { name: 'Zugzwang Is a Real Weapon', text: 'In simplified positions, forcing the opponent to move when every legal move worsens their position is often the single decisive resource on the board.' },
    ],
  },
  {
    category: 'General & Tactical',
    items: [
      { name: 'If You See a Good Move, Look for a Better One', text: "The first move that looks good is rarely automatically the best available. A real habit of double-checking is what finds the genuine improvement." },
      { name: 'A Piece Attacked Must Be Defended, Moved, or Traded', text: 'Every real threat against one of your pieces demands one of these three responses. Ignoring it in favor of an unrelated plan simply loses material.' },
      { name: 'Safety Before Ambition', text: 'Before starting an attack or a combination, confirm your own king and pieces are actually safe first — an unsound attack often loses outright to a real counterattack.' },
      { name: 'Look for Checks, Captures, and Threats Every Move', text: 'This is the real backbone of tactical awareness (see the CCTAP method above). Most missed tactics were never actually looked for, not miscalculated.' },
      { name: 'Undefended Pieces Are Real Targets', text: "A hanging piece doesn't need a clever combination to lose — just an opponent who notices. Always account for every one of your pieces' real defenders." },
      { name: 'Pin the Piece That Actually Matters', text: 'A pin is only useful when the pinned piece was genuinely needed for defense. Pinning an irrelevant piece accomplishes very little on its own.' },
      { name: 'Removing the Defender Wins Material', text: 'If a piece is defended exactly once, a real trade or deflection of that single defender can win whatever it was protecting.' },
      { name: 'Calculate Forcing Sequences to the End', text: "A combination is only sound once you've calculated all the way to a resulting position you're genuinely confident about — not just the first few moves of it." },
      { name: "Don't Waste Time Calculating What Logic Already Rules Out", text: 'Skip lines that clearly lose material or fail to an obvious response. Spend your real calculation time on the candidate moves that actually matter.' },
      { name: 'Material Is a Means, Not Always the Goal', text: "Giving up real material for a decisive attack or a forced mate is sometimes correct — judge the concrete result of a line, not just its point total." },
      { name: 'Every Move Changes the Position', text: 'Even a quiet, seemingly safe move can create a new weakness or hang a piece. Give every move real attention, not just the obviously risky ones.' },
    ],
  },
]

const GLOSSARY: { term: string; meaning: string; calculation: string }[] = [
  { term: 'Evaluation (eval)', meaning: 'Who the real Stockfish engine thinks is better right now, and by how much.', calculation: 'Real Stockfish search output, in centipawns (100 = one pawn), converted to a White-relative number so positive always favors White.' },
  { term: 'Win %', meaning: 'The real probability of winning implied by the evaluation.', calculation: "Lichess's own published formula: 50 + 50 × (2 / (1 + e^(−0.00368208 × eval)) − 1)." },
  { term: '7-stage status (Winning / Much Better / Better / Equal / Worse / Much Worse / Losing)', meaning: 'A plain-English label for the real evaluation, calibrated so it matches how decisive a swing actually feels.', calculation: 'The same real Win % above, bucketed against hand-calibrated thresholds (85/68/55/42/28/20).' },
  { term: 'Accuracy %', meaning: 'How closely your moves have matched the real engine-optimal line so far this game.', calculation: "The real, published Lichess accuracy formula applied to each move's win%-before vs. win%-after, then averaged." },
  { term: 'Current ELO (estimate)', meaning: 'A live, rough estimate of your playing strength this game — not an official rating.', calculation: "Real average centipawn loss (ACPL) mapped to a rating band, shrunk toward the real configured opponent strength for the first 10 moves so a couple of good moves can't produce an implausible number." },
  { term: 'Centipawn Loss', meaning: 'How much worse (in engine terms) your played move was than the real best move.', calculation: 'Real engine evaluation before your move minus real engine evaluation after it, from your own side\'s perspective, capped at 1000.' },
  { term: 'Move grade (Best / Excellent / Good / Inaccuracy / Mistake / Blunder)', meaning: 'A category for how good your move really was.', calculation: "The worse of two real, independent checks: the real win%-drop your move caused (Lichess's own published bands), and the real raw centipawn loss (a floor that catches decisive material blunders the win%-drop can understate in already-lopsided positions)." },
  { term: 'Material differential', meaning: "Who's ahead on material right now, and by how many points.", calculation: 'Real sum of piece values (pawn=1, knight/bishop=3, rook=5, queen=9) for each side, subtracted.' },
  { term: 'Imbalance', meaning: 'A square where the real attacking side outweighs the real defending side in material value.', calculation: 'Real attacker and defender lists per square (pins excluded, since a pinned piece cannot legally take part), each summed by piece value; flagged when attackers outweigh defenders.' },
  { term: 'Undefended Pieces', meaning: 'A piece that is both under real attack and has no real defender.', calculation: "Real attacker/defender counts per square, filtered through Static Exchange Evaluation (SEE) so only capture sequences that are actually profitable for the attacker count." },
  { term: 'Overloaded Pieces', meaning: 'A piece defending more than one of its own real pieces, where losing it would drop both.', calculation: 'Real count of pieces for which a given piece is the sole real defender, flagged once that count reaches two or more.' },
  { term: 'Weak Squares (board highlight)', meaning: 'A square no current pawn of that color can ever be moved to guard.', calculation: 'Real check, per central/near-central square, of whether any pawn on an adjacent file is still behind that rank and could ever advance to defend it.' },
  { term: 'Tactics Alert', meaning: 'A real fork, pin, skewer, discovered attack, or profitable exchange available to you right now.', calculation: 'Real geometric detection for each pattern (verified by literally testing the position on a scratch board), combined with the same real SEE-filtered captures used for Undefended Pieces.' },
  { term: 'Checkmate Alert', meaning: 'A real forced mate, for either side, found by the engine.', calculation: "The real Stockfish search's own mate-in-N output, read directly — never estimated or guessed." },
  { term: 'Hint', meaning: "The engine's real single best move for the current position.", calculation: 'Real Stockfish top line at depth 18, shown only on your own turn.' },
  { term: 'Piece Strength', meaning: 'How well-placed each of your pieces is right now.', calculation: 'A real weighted blend of mobility (real legal move count), safety (real attacker/defender balance), and coordination (whether another own piece defends it).' },
  { term: 'Static Exchange Evaluation (SEE)', meaning: 'The real net material result if every capture on a square were played out to the end.', calculation: 'A standard, well-established chess-programming technique: simulate the full real capture sequence on one square, cheapest attacker first, and return the real net gain or loss.' },
  { term: 'Game Phase (Opening / Middlegame / Endgame)', meaning: 'Which real stage of the game this position is in.', calculation: 'Real move count and real non-pawn material remaining: Opening while ≤10 full moves and ≥80% of starting material remains; Endgame once queens are off or very little material remains; Middlegame otherwise.' },
]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="font-heading text-xl font-extrabold mb-3">{title}</h2>
      <div className="space-y-4 text-[14px] leading-[1.75] text-ink-soft max-w-[720px]">{children}</div>
    </section>
  )
}

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-ink">
      <div className="max-w-[900px] mx-auto px-6 py-10">
        <div className="flex items-start justify-between mb-8 gap-6 flex-wrap">
          <div>
            <div className="font-heading text-2xl font-extrabold">How Chess-IQ Works</div>
            <p className="text-[13.5px] italic text-ink-soft mt-2.5 leading-relaxed max-w-[640px]">
              &ldquo;A 2000 ELO player is not a tactical wizard. A 2000 player is simply a 1000 player who stops hanging pieces and stops missing their opponent&apos;s threats. You need to win a piece to end the game — the most simplified way to win a game.&rdquo;
            </p>
            <p className="text-[13px] text-ink-faint mt-2">Every number on this page describes something the app actually computes — nothing here is aspirational.</p>
          </div>
          <Link href="/Chess-2000" className="text-[12px] font-bold bg-panel px-3 py-2 whitespace-nowrap">← Back to game</Link>
        </div>

        <Section title="How to use this website">
          <p>Chess-IQ is a training board, not just a game against a computer. Start a game from the setup screen by choosing your color and the engine's real Stockfish strength (its UCI_Elo is actually set to that number — the engine really does play weaker at low settings, not a simulated handicap). From there, every move you or the engine makes is real: moves are validated by chess.js, evaluated by a real Stockfish engine at depth 18, and graded against that same real engine's own best line.</p>
          <p>The board itself supports both drag-and-drop and click-to-move: click a piece to see its real legal destinations marked with dots (a plain dot for a quiet move, a ring for a real capture), then click a destination, or just drag the piece there directly. The seven-button toolbar above the board — Undefended Pieces, Overloaded Pieces, Weak Squares, Piece Strength, Imbalance, Tactics Alert, and Checkmate Alert — each highlight one real, specific thing on the board and explain it in the Situation Summary box on the right. Click a tool to see it; click it again to go back to the general position summary. Two buttons flank the board itself: Hint on the left (the engine's real best move for your own turn only) and Back on the right (undoes your last move and the engine's reply to it).</p>
          <p>The metrics row at the top shows your live, real Current ELO estimate and Accuracy for this game, the real move number and game phase, and the real strength of the engine you're facing. Below the toolbar, Tactical Scoring shows ten real, pure-logic measurements of the position — computed for both you and the computer, side by side, so you can see exactly where the real gap between your position and your opponent's actually is. The Moves History button opens a full real move log with color-coded grades for every move played so far.</p>
          <p>Nothing on this page is generated by an AI model unless explicitly noted — every number, highlight, and alert is the direct output of a real chess engine or a real, documented formula over the actual board state. That is a deliberate design choice: a training tool that quietly invents plausible-sounding feedback is worse than no feedback at all, because you can't tell which parts to trust.</p>
          <p>A few smaller controls round out the interface. The theme toggle in the header switches between a light and dark palette — purely visual, it changes nothing about how a position is analyzed. Full Screen uses your browser's real fullscreen mode so the board and every panel fill the whole physical screen, useful on a laptop where browser chrome eats real vertical space. Share Game copies the position's real FEN string to your clipboard, so you can paste it into any other real chess tool to continue analyzing it elsewhere. New Game resets everything and takes you back to the setup screen without recording the in-progress game as finished.</p>
          <p>The Situation Summary box in the bottom-right corner is worth understanding on its own: with no toolbar button selected, it shows a real, always-available written summary of the position — status, your strongest and weakest real Tactical Scoring metric, real tactical counts, the engine's real top move, and your real running accuracy — composed from the same real numbers shown elsewhere on the page, just written out in plain sentences. The moment you select any toolbar tool, that same box switches to explaining exactly what that tool found, then switches back to the summary the moment you deselect it. It is designed to always be showing you something real and specific, never a placeholder.</p>
        </Section>

        <Section title="How to train toward 2000 ELO with this method">
          <p>2000 ELO is not a tactical-wizard rating. At club level, the single biggest gap between a 1000-rated player and a 2000-rated player is not calculation depth or opening theory — it is consistency. A 2000 player is, in a very real sense, a 1000 player who has trained themselves out of hanging pieces and out of missing the opponent's real threats. Chess-IQ is built around exactly that gap, using the CCTAP method (explained in full below) as the real, repeatable habit that closes it.</p>
          <p>The training loop is simple and is meant to be repeated every single move, not just when something looks dangerous: before you move, run through Checks, Captures, Threats, and Analysis using the real toolbar data, then commit to a Plan. Early on, use CCTAP Mode (the header button) to walk through the five steps explicitly, one at a time, with the real board highlights showing you exactly what each step actually means for the position in front of you. As the habit becomes automatic, you'll find yourself doing it without the guided mode — which is the actual goal; CCTAP Mode is training wheels, not a permanent crutch.</p>
          <p>After every move, look at your real grade in the Last Move card, not just the eval bar. A single Blunder is a data point; a pattern of Blunders on a particular kind of move (missed forks, hanging a piece after a trade, overlooking a pin) is a real, fixable habit. The Moves History panel keeps the full real record for the game so you can review it afterward, not just react to the move you just made.</p>
          <p>Play against a real engine strength close to your own current level — Tactical Scoring's side-by-side player-vs-computer comparison is most useful when the game is genuinely competitive, since a huge mismatch in either direction stops teaching you anything new. As your real Accuracy and Current ELO estimate climb over many games, raise the engine's strength to match. There is no shortcut around playing real games and reviewing them honestly; what this app removes is the guesswork about WHAT to review — every real weakness is already named and quantified for you.</p>
          <p>Concretely: play a game. When Tactics Alert or Checkmate Alert lights up green, stop and work out why before moving on. When your Last Move grade says Mistake or Blunder, read the real "stronger was" line and understand the real reason the alternative was better — not just that it was. Do this consistently, for real games, over enough repetitions, and the habit of checking checks, captures, threats, and analysis before committing to a move becomes automatic. That habit, not raw calculation talent, is what a 2000-rated player actually has that a 1000-rated player doesn't.</p>
          <p>Watch for real patterns across games, not just within one. If your Moves History repeatedly shows Blunders on moves where a piece was left undefended after a trade, that is a real, specific, fixable habit — make a point of checking Undefended Pieces immediately after every capture, yours or the opponent's, until it stops happening. If your Tactical Scoring's Development or King Safety numbers are consistently low by move 10 across several games, that's a real sign you're moving too many pieces more than once in the opening, or delaying castling without a concrete reason to. The point of tracking real numbers instead of just a final result is that a single loss tells you very little, but a real pattern across ten losses tells you exactly what to fix next.</p>
          <p>Resist the temptation to treat the engine's real evaluation as the only thing that matters. A position can be genuinely equal by evaluation while being far easier for one side to play in practice — more real space, a simpler real plan, fewer real weaknesses to defend. Tactical Scoring's ten real metrics exist precisely to surface that practical picture alongside the raw evaluation, since "the engine says 0.00" and "this position is easy for me to play" are two different, both real, questions.</p>
        </Section>

        <Section title="The CCTAP method, explained with examples">
          <p>CCTAP stands for Checks, Captures, Threats, Analysis, Plan — a real, well-established way of structuring your thinking on every move, without needing an engine running in your head. Each letter is a real question to ask about the CURRENT position, in order, before you commit to a move.</p>
          <p><strong className="text-ink">Checks.</strong> Can you give check right now, and does it lead anywhere? Example: your rook is on the e-file, the enemy king is on e8 with nothing blocking the file — Re1+ is a real check worth calculating fully, even if it turns out not to be immediately winning, because forcing moves narrow the opponent's real options and can reveal follow-up tactics. In Chess-IQ, the Checkmate Alert tool answers this directly: it shows a real forced mate if one exists, in either direction, so you always know if this step actually matters right now.</p>
          <p><strong className="text-ink">Captures.</strong> List every real capture on the board — yours and the opponent's. Example: your knight attacks an undefended pawn on d5; separately, the opponent's bishop attacks your undefended knight on c6. Both are real captures worth weighing, in both directions. Undefended Pieces and Overloaded Pieces surface exactly this, for both sides, with two distinct colors so you can immediately see whose piece is actually hanging.</p>
          <p><strong className="text-ink">Threats.</strong> If you do nothing this move, what does the opponent actually threaten to do next? Example: the opponent's queen and bishop both point at your f7 pawn, which is defended only once — if you play an unrelated move, a real threat against f7 remains live. Imbalance answers this with real material-weighted attacker-versus-defender comparisons (pinned pieces excluded, since a pinned piece can't really defend anything), and Tactics Alert flags any real fork, pin, skewer, or discovered attack sitting on the board.</p>
          <p><strong className="text-ink">Analysis.</strong> Compare the two real pawn structures and the real weak squares in each camp. Example: you have a real hole on d5 that no pawn of yours can ever guard, but the opponent has a matching hole on d4 — whoever gets a real piece to their outpost first often gets the better position. Weak Squares and Tactical Scoring's Pawn Structure/Weak Squares numbers give you the real comparison directly, for both sides.</p>
          <p><strong className="text-ink">Plan.</strong> Having actually gone through Checks, Captures, Threats, and Analysis, form a real, concrete plan — then check it against Hint, the engine's real best move for the position. If your own plan and the engine's real top choice line up, you've reasoned your way to a strong move honestly. If they don't match, that's real, useful information: work out what the real difference in thinking was, rather than just copying the engine's move blindly.</p>
          <p>CCTAP Mode in the app walks through exactly these five steps for the CURRENT real position, each with the matching real tool's live data and one concrete "what to do with this" instruction — a real, guided version of the same process described above, meant to be trained until it becomes automatic without the guide.</p>
          <p><strong className="text-ink">A worked example, start to finish.</strong> Imagine it's the middlegame, you're White, and it's your move. Checks: no real check is available for either side right now — move on. Captures: Undefended Pieces shows nothing hanging for you, but flags the opponent's knight on c6 as undefended and capturable. Threats: before capturing, Imbalance shows your own bishop on b5 is itself outweighed — two enemy pawns and a knight cover it against only your one real defender. Analysis: Weak Squares shows d5 as a real hole in the opponent's camp your knight could occupy safely. Plan: given all of that, the real, reasoned plan is not simply "win the knight on c6" — it's to first address the threat to your bishop, since losing tempo to save it would hand back the real material advantage of taking on c6. Checking Hint confirms the engine's real top move addresses exactly that. This is what CCTAP produces in practice: not a single flashy tactic, but a real, ordered way of not missing anything before you commit.</p>
        </Section>

        <Section title="50 real chess principles">
          <p>These are the classic, well-established rules every improving player is taught — not the app's own ten computed Tactical Scoring metrics below (which measure a specific position), but the general chess wisdom that explains why those metrics matter in the first place.</p>
          <div className="space-y-8 mt-2">
            {FIFTY_PRINCIPLES.map(group => (
              <div key={group.category}>
                <div className="font-heading text-[16px] font-extrabold mb-3 text-accent">{group.category}</div>
                <div className="space-y-3">
                  {group.items.map(item => (
                    <div key={item.name}>
                      <span className="font-bold text-ink">{item.name}.</span>{' '}
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="The ten Tactical Scoring principles">
          <div className="space-y-5">
            {PRINCIPLES.map(p => (
              <div key={p.name}>
                <div className="font-heading text-[15px] font-extrabold mb-1">{p.name}</div>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Glossary">
          <p>Every real term used across Chess-IQ, what it actually means, and exactly how it's calculated — no black boxes.</p>
          <div className="overflow-x-auto -mx-1">
            {/* Fixed table-layout with explicit column widths, not
                whitespace-nowrap on Term — nowrap let the longest term
                name ("7-stage status (Winning / Much Better / ...)")
                stretch that column to its full unwrapped width and
                squeeze the other two into narrow, oddly tall columns.
                Percentage widths + normal wrapping keep all three columns
                proportioned to the real page width instead. */}
            <table className="w-full text-[12.5px] border-collapse min-w-[640px]" style={{ tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: '22%' }} />
                <col style={{ width: '34%' }} />
                <col style={{ width: '44%' }} />
              </colgroup>
              <thead>
                <tr className="text-left border-b-2 border-panel-line">
                  <th className="py-2 pr-3 font-bold">Term</th>
                  <th className="py-2 pr-3 font-bold">What it means</th>
                  <th className="py-2 font-bold">How it's calculated</th>
                </tr>
              </thead>
              <tbody>
                {GLOSSARY.map(g => (
                  <tr key={g.term} className="border-b border-panel-line align-top">
                    <td className="py-2.5 pr-3 font-bold break-words">{g.term}</td>
                    <td className="py-2.5 pr-3 text-ink-soft break-words">{g.meaning}</td>
                    <td className="py-2.5 text-ink-soft break-words">{g.calculation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <div className="mt-10 pt-6 border-t border-panel-line">
          <Link href="/Chess-2000" className="text-[12px] font-bold bg-ink text-[var(--background)] px-4 py-2 inline-block">← Back to game</Link>
        </div>
      </div>
    </div>
  )
}
