import { formatInt } from "../helpers";

export function buildStudentStepsSum(a: number, b: number) {
  const sameSign = (a >= 0 && b >= 0) || (a < 0 && b < 0);

  const steps = [];

  // Stap 1: oefening correct overschrijven
  steps.push({
    prompt: "Schrijf de oefening correct over",
    expected: `${formatInt(a)} + ${formatInt(b)}`
  });

  if (sameSign) {
    // Stap 2: absolute waarden optellen
    steps.push({
      prompt: "Bereken de som van de absolute waarden",
      expected: `${Math.abs(a)} + ${Math.abs(b)} = ${Math.abs(a) + Math.abs(b)}`
    });

    // Stap 3: toestandsteken overnemen
    steps.push({
      prompt: "Voeg het juiste toestandsteken toe",
      expected: `${a + b}`
    });

  } else {
    // Stap 2: absolute waarden uitschrijven
    steps.push({
      prompt: "Schrijf de absolute waarden op",
      expected: `|${a}| = ${Math.abs(a)}, |${b}| = ${Math.abs(b)}`
    });

    const max = Math.max(Math.abs(a), Math.abs(b));
    const min = Math.min(Math.abs(a), Math.abs(b));
    const diff = max - min;

    // Stap 3: absolute waarden aftrekken
    steps.push({
      prompt: "Neem het verschil van de absolute waarden",
      expected: `${max} - ${min} = ${diff}`
    });

    // Stap 4: toestandsteken bepalen
    const signSource = Math.abs(a) > Math.abs(b) ? a : b;

    steps.push({
      prompt: "Voeg het toestandsteken van de grootste absolute waarde toe",
      expected: `${signSource < 0 ? "-" : ""}${diff}`
    });
  }

  return steps;
}
