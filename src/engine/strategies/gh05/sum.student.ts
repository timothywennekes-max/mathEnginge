import { formatInt } from "../helpers";

export function buildStudentStepsSum(a: number, b: number) {
  const steps: { prompt: string; expected: string }[] = [];

  const sameSign =
    (a >= 0 && b >= 0) ||
    (a < 0 && b < 0);

  const absA = Math.abs(a);
  const absB = Math.abs(b);

  // Stap 1: overschrijven
  steps.push({
    prompt: "Schrijf de oefening correct over.",
    expected: `${formatInt(a)} + ${formatInt(b)}`
  });

  if (sameSign) {
    // Stap 2: absolute waarden optellen
    steps.push({
      prompt: "Tel de absolute waarden op.",
      expected: `${absA} + ${absB} = ${absA + absB}`
    });

    // Stap 3: toestandsteken toepassen
    steps.push({
      prompt: "Voeg het juiste toestandsteken toe.",
      expected: `${a + b}`
    });
  } else {
    const max = Math.max(absA, absB);
    const min = Math.min(absA, absB);
    const diff = max - min;
    const signSource = absA > absB ? a : b;
    const resultVal = (signSource < 0 ? -1 : 1) * diff;

    // Stap 2: absolute waarden noteren
    steps.push({
      prompt: "Noteer de absolute waarden van beide getallen. Gebruik hiervoor de volgende notatie: |a|=a,|-b|=b",
      expected: `|${a}| = ${absA}, |${b}| = ${absB}`
    });

    // Stap 3: verschil van absolute waarden
    steps.push({
      prompt: "Trek de kleinste absolute waarde af van de grootste.",
      expected: `${max} - ${min} = ${diff}`
    });

    // Stap 4: toestandsteken van grootste absolute waarde
    steps.push({
      prompt: "Geef het resultaat met het toestandsteken van de grootste absolute waarde.",
      expected: `${resultVal}`
    });
  }

  return steps;
}
