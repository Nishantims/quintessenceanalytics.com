-- Chess-2000 local data store — records real games and real per-move grades
-- so Tool 10 (Pattern & Learning Tracker) can surface genuinely recurring
-- mistakes across games, not a single-session guess.

CREATE TABLE IF NOT EXISTS games (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  player_color TEXT NOT NULL CHECK (player_color IN ('w', 'b')),
  engine_elo INTEGER NOT NULL,
  result TEXT,                 -- 'checkmate' | 'stalemate' | 'draw' | null (in progress/abandoned)
  started_at TEXT NOT NULL DEFAULT (datetime('now')),
  ended_at TEXT
);

-- One row per real graded player move (never the engine's own moves —
-- those aren't the player's decisions to learn from).
CREATE TABLE IF NOT EXISTS move_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  game_id INTEGER NOT NULL REFERENCES games(id),
  ply INTEGER NOT NULL,
  san TEXT NOT NULL,
  grade TEXT NOT NULL,          -- real MoveGrade from move-quality.ts
  centipawn_loss REAL NOT NULL,
  missed_forced_mate INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_move_records_game ON move_records(game_id);
CREATE INDEX IF NOT EXISTS idx_move_records_grade ON move_records(grade);
