import { formatInt } from "../helpers";

export function buildStudentStepsDifference(a: number, b: number) {
  const steps = [];

  // Stap 1: overschrijven
  steps.push({
    prompt: "Schrijf de oefening correct over",
    expected: `${formatInt(a)} - ${formatInt(b)}`
  });

  // Stap 2: herschrijven naar optelling
  const rewritten = `${formatInt(a)} + ${formatInt(-b)}`;
  steps.push({
    prompt: "Herschrijf als optelling met het tegengestelde",
    expected: rewritten
  });

  // Beide termen in de herschreven vorm:
  const A = a;
  const B = -b;

  const sameSign = (A >= 0 && B >= 0) || (A < 0 && B < 0);
  const absA = Math.abs(A);
  const absB = Math.abs(B);

  if (sameSign) {
    // Stap 3: absolute waarden optellen
    steps.push({
      prompt: "Tel de absolute waarden op",
      expected: `${absA} + ${absB} = ${absA + absB}`
    });

    // Stap 4: toestandsteken behouden
    steps.push({
      prompt: "Voeg het juiste toestandsteken toe",
      expected: `${A + B}`
    });
  } else {
    // Stap 3: absolute waarden uitschrijven
    steps.push({
      prompt: "Schrijf de absolute waarden op",
      expected: `|${A}| = ${absA}, |${B}| = ${absB}`
    });

    const max = Math.max(absA, absB);
    const min = Math.min(absA, absB);
    const diff = max - min;

    // Stap 4: verschil van absolute waarden
    steps.push({
      prompt: "Neem het verschil van de absolute waarden",
      expected: `${max} - ${min} = ${diff}`
    });

    // Stap 5: toestandsteken bepalen
    const signSource = absA > absB ? A : B;

    steps.push({
      prompt: "Voeg het toestandsteken van de grootste absolute waarde toe",
      expected: `${signSource < 0 ? "-" : ""}${diff}`
    });
  }

  return steps;
}
