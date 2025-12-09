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

  steps.push(`Absolute waarden bepalen: |${a}| = ${Math.abs(a)}, |${b}| = ${Math.abs(b)}`);

  if (sameSign) {
    steps.push(
      `Tel de absolute waarden op: ${Math.abs(a)} + ${Math.abs(b)} = ${Math.abs(a) + Math.abs(b)}`
    );
    steps.push(
      `Het resultaat krijgt hetzelfde toestandsteken (${a >= 0 ? "+" : "-"}) omdat beide termen hetzelfde toestandsteken hebben.`
    );
  } else {
    const max = Math.max(Math.abs(a), Math.abs(b));
    const min = Math.min(Math.abs(a), Math.abs(b));
    const signSource = Math.abs(a) > Math.abs(b) ? a : b;

    steps.push(
      `Bij verschillend toestandsteken neem je het verschil van de absolute waarden: ${max} - ${min} = ${max - min}.`
    );
    steps.push(
      `Het resultaat krijgt het toestandsteken van het getal met de grootste absolute waarde: ${formatInt(signSource)}.`
    );
  }

  steps.push(`Eindresultaat: ${a + b}`);

  return steps;
}
