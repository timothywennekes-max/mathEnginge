// Canonicaliseer algemene expressies (voor tussenstappen)
export function canonicalExpression(raw: string): string {
  return String(raw)
    .trim()
    .replace(/\s+/g, "")        // alle spaties weg
    .replace(/\+\-/g, "+(-")    // + -3 → +(-3)
    .replace(/\-\-/g, "-(-")    // --3 → -(-3)
    .replace(/\(\s*/g, "(")     // ( -3 ) → (-3
    .replace(/\s*\)/g, ")");    // -3 ) → -3)
}

// Canonicaliseer een getal (voor eindantwoord)
export function canonicalNumber(raw: string): string {
  const t = canonicalExpression(raw);

  // Alleen gehele getallen: [+-]?\d+
  const m = t.match(/^([+-]?)(\d+)$/);
  if (!m) return t; // als het geen puur getal is: laat zo

  let sign = m[1] === "-" ? "-" : "";
  let digits = m[2].replace(/^0+/, ""); // 005 → 5

  if (digits === "") digits = "0";
  if (digits === "0") sign = ""; // geen -0

  return sign + digits;
}
