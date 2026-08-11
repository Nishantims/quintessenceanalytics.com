import 'server-only'
import { cookies } from 'next/headers'

// One real free game per browser — a plain httpOnly cookie, not tied to an
// account (checked before one even exists). A real, accepted limitation:
// clearing cookies resets it. That's the standard, well-known trade-off
// for a no-signup free trial and is intentionally not fought with device
// fingerprinting or similar — simple and honest beats invasive here.
const FREE_GAME_COOKIE = 'chess2000_free_game_used'

export async function hasUsedFreeGame(): Promise<boolean> {
  const cookieStore = await cookies()
  return cookieStore.get(FREE_GAME_COOKIE)?.value === '1'
}

export async function markFreeGameUsed(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(FREE_GAME_COOKIE, '1', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    // 10 real years — this is a one-time free trial marker, not a session.
    maxAge: 60 * 60 * 24 * 365 * 10,
    path: '/',
  })
}
