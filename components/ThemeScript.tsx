// Runs before paint so the stored theme choice applies with zero flash —
// same data-theme attribute contract app/globals.css's tokens key off of.
const SCRIPT = `
try {
  var stored = localStorage.getItem('qa-theme');
  if (stored === 'light' || stored === 'dark') {
    document.documentElement.setAttribute('data-theme', stored);
  }
} catch (e) {}
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
