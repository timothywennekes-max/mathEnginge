import { formatInt } from "../helpers";

export function explainIntegerDifference(a: number, b: number) {
  const steps = [];

  steps.push(`Schrijf de oefening netjes over: ${formatInt(a)} - ${formatInt(b)}`);
  steps.push(`Herschrijf dit als een optelling met het tegengestelde:`);

  const rewritten = `${formatInt(a)} + ${formatInt(-b)}`;
  steps.push(`${formatInt(a)} - ${formatInt(b)} = ${rewritten}`);

  const A = a;
  const B = -b;

  const absA = Math.abs(A);
  const absB = Math.abs(B);

  const sameSign = (A >= 0 && B >= 0) || (A < 0 && B < 0);

  if (sameSign) {
    steps.push(
      `Beide termen hebben hetzelfde toestandsteken (${A < 0 ? "negatief" : "positief"}).`
    );

    steps.push(
      `Tel de absolute waarden op: ${absA} + ${absB} = ${absA + absB}.`
    );

    steps.push(
      `Het resultaat krijgt hetzelfde toestandsteken: ${A + B}.`
    );
  } else {
    steps.push(`De termen hebben een verschillend toestandsteken.`);
    steps.push(`Absolute waarden: |${A}| = ${absA}, |${B}| = ${absB}`);

    const max = Math.max(absA, absB);
    const min = Math.min(absA, absB);
    const diff = max - min;

    steps.push(
      `Neem het verschil van de absolute waarden: ${max} - ${min} = ${diff}.`
    );

    const signSource = absA > absB ? A : B;
    steps.push(
      `Het resultaat krijgt het toestandsteken van de grootste absolute waarde: ${formatInt(signSource)}.`
    );
  }

  steps.push(`Eindresultaat: ${A + B}`);

  return steps;
}
