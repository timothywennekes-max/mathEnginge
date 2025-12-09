export function canonical(s: string): string {
  return s
    .trim()
    .replace(/\s+/g, "")       // alle spaties verwijderen
    .replace(/\+\-/g, "+(-")   // + -10 → +(-10)
    .replace(/\-\-/g, "-(-")   // --10 → -(-10)
    .replace(/\)\(/g, ")*(");  // kleine structurale fixes
}
