import { formatInt } from "../helpers";

export function explainIntegerDifference(a: number, b: number): string[] {
  const steps: string[] = [];

  steps.push(`Schrijf de oefening netjes over: ${formatInt(a)} - ${formatInt(b)}.`);
  steps.push(`Herschrijf dit als een optelling met het tegengestelde van het tweede getal:`);

  const rewritten = `${formatInt(a)} + ${formatInt(-b)}`;
  steps.push(`${formatInt(a)} - ${formatInt(b)} = ${rewritten}.`);

  const A = a;
  const B = -b;
  const absA = Math.abs(A);
  const absB = Math.abs(B);
  const sameSign =
    (A >= 0 && B >= 0) ||
    (A < 0 && B < 0);

  if (sameSign) {
    steps.push(`Beide termen in de herschreven som hebben hetzelfde toestandsteken.`);
    const absSum = absA + absB;
    steps.push(`Tel de absolute waarden op: ${absA} + ${absB} = ${absSum}.`);
    steps.push(`Het resultaat krijgt hetzelfde toestandsteken.`);
  } else {
    steps.push(`De termen in de herschreven som hebben een verschillend toestandsteken.`);
    steps.push(`Absolute waarden: |${A}| = ${absA}, |${B}| = ${absB}.`);

    const max = Math.max(absA, absB);
    const min = Math.min(absA, absB);
    const diff = max - min;
    const signSource = absA > absB ? A : B;

    steps.push(
      `Neem het verschil van de absolute waarden: de kleinste absolute waarde trek je af van de grootste: ${max} - ${min} = ${diff}.`
    );
    steps.push(
      `Het resultaat krijgt het toestandsteken van het getal met de grootste absolute waarde: ${formatInt(signSource)}.`
    );
  }

  steps.push(`Eindresultaat: ${A + B}.`);

  return steps;
}
