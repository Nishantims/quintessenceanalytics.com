import data from './blur-data.json'

// A tiny blurred copy of each photo in public/images, shown while the full image loads (owner, 2026-11-21: images
// load slowly). Built by .scratch/blur_gen.mjs in market-reports-web; re-run it after adding photos.
const MAP = data as Record<string, string>

export function blurProps(src: string): { placeholder?: 'blur'; blurDataURL?: string } {
  const b = MAP[src]
  return b ? { placeholder: 'blur', blurDataURL: b } : {}
}
