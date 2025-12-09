import { formatInt } from "../helpers";

export function buildStudentStepsMulti(terms: number[]): StudentStep[] {
  // alles als optelling met haakjes
  const canonical = terms
    .map((t) => (t >= 0 ? `${t}` : `(${t})`))
    .join(" + ");

  const positives = terms.filter((t) => t >= 0);
  const negatives = terms.filter((t) => t < 0);

  const posSum = positives.reduce((a, b) => a + b, 0);
  const negSum = negatives.reduce((a, b) => a + b, 0);
  const total = posSum + negSum;

  return [
    {
      // STAP 1
      prompt:
        "Schrijf de oefening volledig als een optelling. Vervang elke aftrekking door het optellen van het tegengestelde getal. Gebruik haakjes voor negatieve getallen.",
      expected: canonical,
    },
    {
      // STAP 2
      prompt:
        "Herschik de termen zodat alle positieve termen samen staan en alle negatieve termen daarna. Dit is de commutatieve eigenschap van de optelling.",
      expected: [
        ...positives.map((t) => (t >= 0 ? `${t}` : `(${t})`)),
        ...negatives.map((t) => `(${t})`),
      ].join(" + "),
    },
    {
      // STAP 3 – som van de positieve termen (alleen getal)
      prompt:
        "Bereken de som van alle positieve termen. (Vul enkel het getal in.)",
      expected: `${posSum}`,
    },
    {
      // STAP 4 – som van de negatieve termen (alleen getal)
      prompt:
        "Bereken de som van alle negatieve termen. (Vul enkel het getal in, met toestandsteken.)",
      expected: `${negSum}`,
    },
    {
      // STAP 5 – eindresultaat
      prompt:
        "Schrijf de eindberekening en het resultaat, bijvoorbeeld: 8 + (-3) = 5.",
      expected: `${posSum} + (${negSum}) = ${total}`,
    },
  ];
}
