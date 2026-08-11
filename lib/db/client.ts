import Database from 'better-sqlite3'
import fs from 'node:fs'
import path from 'node:path'

const DB_PATH = path.join(process.cwd(), 'data', 'chess-iq.db')

let db: Database.Database | null = null

declare global {
  var __chessIqDb: Database.Database | undefined
}

export function getDb(): Database.Database {
  if (global.__chessIqDb) return global.__chessIqDb
  if (db) return db

  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true })
  db = new Database(DB_PATH)
  db.pragma('journal_mode = WAL')
  db.pragma('foreign_keys = ON')

  const schema = fs.readFileSync(path.join(process.cwd(), 'lib', 'db', 'schema.sql'), 'utf-8')
  db.exec(schema)

  global.__chessIqDb = db
  return db
}
