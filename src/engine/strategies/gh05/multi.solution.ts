import { formatInt } from "../helpers";

export function explainMultiTermSum(terms: number[]): string[] {
  const steps: string[] = [];

  steps.push(`Schrijf de oefening correct over.`);

  steps.push(
    "Noteer alle termen met hun correct toestandsteken."
  );

  steps.push(
    "Groeperen: zet positieve en negatieve termen eventueel samen per soort."
  );

  const positives = terms.filter((t) => t >= 0);
  const negatives = terms.filter((t) => t < 0);

  if (positives.length > 0)
    steps.push(`Som van positieve termen: ${positives.join(" + ")} = ${positives.reduce((a,b)=>a+b,0)}`);

  if (negatives.length > 0)
    steps.push(`Som van negatieve termen: ${negatives.join(" + ")} = ${negatives.reduce((a,b)=>a+b,0)}`);

  const result = terms.reduce((a, b) => a + b, 0);

  steps.push(
    `Combineer beide resultaten: ${positives.reduce((a,b)=>a+b,0)} + (${negatives.reduce((a,b)=>a+b,0)}) = ${result}`
  );

  steps.push(`Eindresultaat: ${result}`);

  return steps;
}
