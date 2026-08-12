import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

// A simple, geometric mark rather than a literal chess-piece illustration:
// three ascending bars (a level-up / rating-climb motif, tying directly
// into "reach 2000 ELO") in the site's own pink/blue/green accent trio,
// on a rounded dark badge — reads clearly at 16-32px, unlike a detailed
// piece silhouette would.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: 3,
          background: '#0a0a0f',
          borderRadius: 7,
          padding: '6px 6px 5px',
        }}
      >
        <div style={{ width: 5, height: 8, background: '#3b82f6', borderRadius: 1.5 }} />
        <div style={{ width: 5, height: 14, background: '#22c55e', borderRadius: 1.5 }} />
        <div style={{ width: 5, height: 20, background: '#ec4899', borderRadius: 1.5 }} />
      </div>
    ),
    size
  )
}
