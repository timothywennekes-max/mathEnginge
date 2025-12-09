import { formatInt } from "../helpers";

export function explainIntegerSum(a: number, b: number): string[] {
  const steps: string[] = [];
  const sameSign =
    (a >= 0 && b >= 0) ||
    (a < 0 && b < 0);

  steps.push(`Schrijf de oefening netjes over: ${formatInt(a)} + ${formatInt(b)}`);

  steps.push(
    sameSign
      ? `Beide getallen hebben hetzelfde toestandsteken (${a >= 0 ? "positief" : "negatief"}).`
      : `De getallen hebben een verschillend toestandsteken.`
  );

  steps.push(`Neem de absolute waarde van elk getal: |${a}| = ${Math.abs(a)}, |${b}| = ${Math.abs(b)}.`);

  if (sameSign) {
    const absSum = Math.abs(a) + Math.abs(b);
    steps.push(`Bij hetzelfde toestandsteken tel je de absolute waarden op: ${Math.abs(a)} + ${Math.abs(b)} = ${absSum}.`);
    steps.push(`Het resultaat krijgt hetzelfde toestandsteken als de termen.`);
  } else {
    const absA = Math.abs(a);
    const absB = Math.abs(b);
    const max = Math.max(absA, absB);
    const min = Math.min(absA, absB);
    const diff = max - min;
    const signSource = absA > absB ? a : b;

    steps.push(
      `Bij verschillend toestandsteken neem je het verschil van de absolute waarden: de kleinste absolute waarde trek je af van de grootste: ${max} - ${min} = ${diff}.`
    );
    steps.push(
      `Het resultaat krijgt het toestandsteken van het getal met de grootste absolute waarde: ${formatInt(signSource)}.`
    );
  }

  steps.push(`Eindresultaat: ${a + b}.`);

  return steps;
}
