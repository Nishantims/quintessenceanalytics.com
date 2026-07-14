#!/usr/bin/env node
/**
 * Automated health check for quintessenceanalytics.com.
 *
 * Same purpose as market-reports-web/scripts/health-check.ts: run
 * unattended on a schedule (.github/workflows/health-check.yml) and fail
 * loudly the moment a page 500s, the contact form stops validating, or
 * a response gets too slow. A plain marketing site has no exports, search,
 * or auth-gated flows to test — this stays intentionally small.
 *
 * Usage:
 *   node scripts/health-check.mjs
 *   BASE_URL=http://localhost:3000 node scripts/health-check.mjs
 */

const BASE_URL = (process.env.BASE_URL ?? 'https://quintessenceanalytics.com').replace(/\/$/, '')

const results = []

function assert(cond, msg) {
  if (!cond) throw new Error(msg)
}

async function withTimeout(promise, ms, label) {
  let timer
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms)
  })
  try {
    return await Promise.race([promise, timeout])
  } finally {
    clearTimeout(timer)
  }
}

async function check(name, fn, { timeoutMs = 15_000, warnMs } = {}) {
  const start = Date.now()
  try {
    const note = await withTimeout(fn(), timeoutMs, name)
    const ms = Date.now() - start
    const warn = warnMs !== undefined && ms > warnMs
    results.push({ name, ok: true, ms, note: note ?? undefined, warn })
    console.log(`${warn ? '⚠️ ' : '✅'} ${name} (${ms}ms)${note ? ` — ${note}` : ''}`)
  } catch (err) {
    const ms = Date.now() - start
    results.push({ name, ok: false, ms, note: err.message })
    console.log(`❌ ${name} (${ms}ms) — ${err.message}`)
  }
}

async function get(path, init = {}) {
  return fetch(`${BASE_URL}${path}`, { redirect: 'manual', ...init })
}

function isRealErrorPage(body) {
  return /<html[^>]*\bid="__next_error__"/.test(body)
}

const PAGES = ['/', '/services', '/about', '/contact']

async function main() {
  console.log(`\nquintessenceanalytics.com health check — ${BASE_URL}\n`)

  for (const path of PAGES) {
    await check(`GET ${path}`, async () => {
      const res = await get(path)
      assert(res.status === 200, `expected 200, got ${res.status}`)
      const body = await res.text()
      assert(!isRealErrorPage(body), 'response is Next.js\'s rendered error boundary (id="__next_error__")')
      assert(body.length > 1000, `suspiciously small response (${body.length} bytes)`)
    }, { warnMs: 3000 })
  }

  await check('GET / has the twelve-services heading', async () => {
    const res = await get('/')
    const body = await res.text()
    assert(body.includes('Twelve core AI'), 'homepage services heading missing or stale')
  })

  await check('GET /services lists all twelve service slugs', async () => {
    const res = await get('/services')
    const body = await res.text()
    const slugs = [
      'predictive-analytics', 'decision-intelligence', 'market-intelligence',
      'customer-analytics', 'operational-analytics', 'financial-risk-analytics',
      'executive-dashboards', 'generative-ai-solutions', 'ai-process-automation',
      'custom-ai-consulting', 'marketing-growth-analytics', 'data-engineering-ai-infrastructure',
    ]
    const missing = slugs.filter((s) => !body.includes(s))
    assert(missing.length === 0, `missing service slugs: ${missing.join(', ')}`)
  })

  await check('GET /sitemap.xml', async () => {
    const res = await get('/sitemap.xml')
    if (res.status === 404) return 'no sitemap route (not fatal, informational)'
    assert(res.status === 200, `expected 200, got ${res.status}`)
  })

  await check('GET /robots.txt', async () => {
    const res = await get('/robots.txt')
    if (res.status === 404) return 'no robots route (not fatal, informational)'
    assert(res.status === 200, `expected 200, got ${res.status}`)
  })

  // Contact form: POST an empty body and expect a clean 400 (validation
  // working, route alive) — never sends a real email, since the route
  // validates required fields before calling Resend.
  await check('POST /api/contact (validation, no side effects)', async () => {
    const res = await get('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
    })
    assert(res.status === 400, `expected 400 validation error, got ${res.status} — route may be crashing instead of validating`)
  })

  const failed = results.filter((r) => !r.ok)
  const warned = results.filter((r) => r.ok && r.warn)
  console.log(`\n${results.length} checks — ${results.length - failed.length} passed, ${failed.length} failed, ${warned.length} slow\n`)

  const summaryPath = process.env.GITHUB_STEP_SUMMARY
  if (summaryPath) {
    const fs = await import('node:fs/promises')
    const rows = results
      .map((r) => `| ${r.ok ? (r.warn ? '⚠️' : '✅') : '❌'} | ${r.name} | ${r.ms}ms | ${r.note ?? ''} |`)
      .join('\n')
    const md = `## quintessenceanalytics.com health check\n\n**${BASE_URL}**\n\n| | Check | Time | Note |\n|---|---|---|---|\n${rows}\n`
    await fs.appendFile(summaryPath, md)
  }

  if (failed.length > 0) {
    console.error(`FAILED checks:\n${failed.map((r) => `  - ${r.name}: ${r.note}`).join('\n')}`)
    process.exit(1)
  }
}

main()
