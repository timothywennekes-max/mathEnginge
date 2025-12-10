export function canonicalNumber(input: string): string {
  if (!input) return "";
  let t = input.trim().replace(/\s+/g, "");
  if (t === "+0" || t === "-0") t = "0";
  return t;
}

export function canonicalExpression(input: string): string {
  if (!input) return "";
  let t = input.trim().replace(/\s+/g, "");
  t = t.replace(/\+\-/g, "-").replace(/\-\-/g, "+");
  return t;
}
