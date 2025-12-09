import { formatInt } from "../helpers";

export function buildStudentStepsDifference(a: number, b: number) {
  const steps: { prompt: string; expected: string }[] = [];

  // Stap 1: overschrijven
  steps.push({
    prompt: "Schrijf de oefening correct over.",
    expected: `${formatInt(a)} - ${formatInt(b)}`
  });

  // Stap 2: herschrijven naar optelling
  const rewritten = `${formatInt(a)} + ${formatInt(-b)}`;
  steps.push({
    prompt: "Herschrijf als een optelling met het tegengestelde van het tweede getal.",
    expected: rewritten
  });

  const A = a;
  const B = -b;
  const absA = Math.abs(A);
  const absB = Math.abs(B);
  const sameSign =
    (A >= 0 && B >= 0) ||
    (A < 0 && B < 0);

  if (sameSign) {
    // bijvoorbeeld (-1) - 10 → (-1) + (-10)
    steps.push({
      prompt: "Tel de absolute waarden op.",
      expected: `${absA} + ${absB} = ${absA + absB}`
    });

    steps.push({
      prompt: "Voeg het juiste toestandsteken toe.",
      expected: `${A + B}`
    });
  } else {
    // bijvoorbeeld 4 - (-9) → 4 + 9
    steps.push({
      prompt: "Noteer de absolute waarden van beide getallen.",
      expected: `|${A}| = ${absA}, |${B}| = ${absB}`
    });

    const max = Math.max(absA, absB);
    const min = Math.min(absA, absB);
    const diff = max - min;
    const signSource = absA > absB ? A : B;
    const resultVal = (signSource < 0 ? -1 : 1) * diff;

    steps.push({
      prompt: "Trek de kleinste absolute waarde af van de grootste.",
      expected: `${max} - ${min} = ${diff}`
    });

    steps.push({
      prompt: "Geef het resultaat met het toestandsteken van de grootste absolute waarde.",
      expected: `${resultVal}`
    });
  }

  return steps;
}
