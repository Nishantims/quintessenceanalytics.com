import 'server-only'
import { cookies } from 'next/headers'

// A real, counted number of free games per browser — a plain httpOnly
// cookie, not tied to an account (checked before one even exists). A real,
// accepted limitation: clearing cookies resets it. That's the standard,
// well-known trade-off for a no-signup free trial and is intentionally not
// fought with device fingerprinting or similar — simple and honest beats
// invasive here.
const FREE_GAMES_COOKIE = 'chess2000_free_games_used'

export async function getFreeGamesUsed(): Promise<number> {
  const cookieStore = await cookies()
  const raw = cookieStore.get(FREE_GAMES_COOKIE)?.value
  const n = raw ? parseInt(raw, 10) : 0
  return Number.isFinite(n) && n > 0 ? n : 0
}

export async function incrementFreeGamesUsed(current: number): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(FREE_GAMES_COOKIE, String(current + 1), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    // 10 real years — this is a free-trial counter, not a session.
    maxAge: 60 * 60 * 24 * 365 * 10,
    path: '/',
  })
}
