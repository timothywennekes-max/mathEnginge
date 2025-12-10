import { formatInt } from "../helpers";
import { StudentStep } from "@/engine/types";

export function buildStudentStepsMulti(terms: number[]): StudentStep[] {
  // herschrijf de oefening als één optelling
  const canonical = terms
    .map((t, i) => (i === 0 ? formatInt(t) : `+ ${formatInt(t)}`))
    .join(" ");

  const positives = terms.filter((t) => t >= 0);
  const negatives = terms.filter((t) => t < 0);

  const posSum = positives.reduce((a, b) => a + b, 0);
  const negSum = negatives.reduce((a, b) => a + b, 0);
  const result = posSum + negSum;

  const steps: StudentStep[] = [];

  // 1. Schrijf netjes over
  steps.push({
    prompt: "Schrijf de oefening correct over.",
    expected: canonical,
  });

  // 2. Herschik volgens commutativiteit
  const commutative = [
    ...(positives.map(formatInt)),
    ...(negatives.map((n) => `(${n})`)),
  ].join(" + ");

  steps.push({
    prompt:
      "Herschik de termen zodat eerst alle positieve termen staan en daarna alle negatieve (commutatieve eigenschap).",
    expected: commutative,
  });

  // 3. Deelresultaten invullen
  steps.push({
    prompt: "Vul de som van de positieve en de negatieve termen in.",
    expected: `(+ ${positives.map(formatInt).join(" + ") || "0"}) + (- ${negatives
      .map(formatInt)
      .join(" + ") || "0"})`,
  });

  // 4. Eindresultaat
  steps.push({
    prompt: "Bereken het eindresultaat.",
    expected: `${posSum} + (${negSum}) = ${result}`,
  });

  return steps;
}
