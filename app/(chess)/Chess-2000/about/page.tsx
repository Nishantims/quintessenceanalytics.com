import { redirect } from 'next/navigation'

// This content moved to /Chess-2000 itself (the homepage now carries the
// full marketing page). Keep this route alive as a redirect in case
// anything external still links to /Chess-2000/about.
export default function AboutPage() {
  redirect('/Chess-2000')
}
