import { randomInt } from "./utils";

// ------------------------------------------------------
// TYPES
// ------------------------------------------------------

export type SkillType =
  | "integer-sum"
  | "integer-difference"
  | "integer-product"
  | "integer-quotient"
  | "set-union"
  | "set-intersection"
  | "divisibility-test"
  | "rational-sum";

export type Skill = {
  id: string;
  module: string;
  type: SkillType;
  description: string;
  generator: any;
};

export type Exercise = {
  type: "number" | "boolean" | "set" | "rational";
  description: string;
  expression: string;   // KaTeX string
  result: any;          // number | boolean | array
};

// ------------------------------------------------------
// MAIN GENERATOR
// ------------------------------------------------------

export function generateExercise(skill: Skill, difficulty: number): Exercise {
  const gen = skill.generator;

  // schaal parameters voor moeilijkheidsgraad
  const diff = difficulty || 1;
  const scaledMin = gen.min !== undefined ? gen.min * diff : 1;
  const scaledMax = gen.max !== undefined ? gen.max * diff : 10;

  switch (skill.type) {

    // ----------------------------------------------------
    // GEHELE GETALLEN: SOM
    // ----------------------------------------------------
    case "integer-sum": {
      const a = randomInt(scaledMin, scaledMax);
      const b = randomInt(scaledMin, scaledMax);
      return {
        type: "number",
        description: skill.description,
        expression: `${a} + ${b}`,
        result: a + b
      };
    }

    // ----------------------------------------------------
    // GEHELE GETALLEN: VERSCHIL
    // ----------------------------------------------------
    case "integer-difference": {
      const a = randomInt(scaledMin, scaledMax);
      const b = randomInt(scaledMin, scaledMax);
      return {
        type: "number",
        description: skill.description,
        expression: `${a} - ${b}`,
        result: a - b
      };
    }

    // ----------------------------------------------------
    // GEHELE GETALLEN: PRODUCT
    // ----------------------------------------------------
    case "integer-product": {
      const a = randomInt(-scaledMax, scaledMax);
      const b = randomInt(-scaledMax, scaledMax);
      return {
        type: "number",
        description: skill.description,
        expression: `${a} \\times ${b}`,
        result: a * b
      };
    }

    // ----------------------------------------------------
    // GEHELE GETALLEN: QUOTIENT
    // ----------------------------------------------------
    case "integer-quotient": {
      const a = randomInt(1, scaledMax);
      const b = randomInt(1, scaledMax);
      return {
        type: "number",
        description: skill.description,
        expression: `\\frac{${a * b}}{${a}}`,
        result: b
      };
    }

    // ----------------------------------------------------
    // VERZAMELINGEN: UNIE
    // ----------------------------------------------------
    case "set-union": {
      const A = makeSet(gen.size, gen.max * diff);
      const B = makeSet(gen.size, gen.max * diff);
      return {
        type: "set",
        description: skill.description,
        expression: `${formatSetLatex(A)} \\cup ${formatSetLatex(B)}`,
        result: union(A, B)
      };
    }

    // ----------------------------------------------------
    // VERZAMELINGEN: INTERSECTIE
    // ----------------------------------------------------
    case "set-intersection": {
      const A = makeSet(gen.size, gen.max * diff);
      const B = makeSet(gen.size, gen.max * diff);
      return {
        type: "set",
        description: skill.description,
        expression: `${formatSetLatex(A)} \\cap ${formatSetLatex(B)}`,
        result: intersection(A, B)
      };
    }

    // ----------------------------------------------------
    // DEELBAARHEID
    // ----------------------------------------------------
    case "divisibility-test": {
      const n = randomInt(gen.min, gen.max);
      return {
        type: "boolean",
        description: skill.description,
        expression: `\\text{Is } ${n} \\text{ deelbaar door 3?}`,
        result: n % 3 === 0
      };
    }

    // ----------------------------------------------------
    // RATIONALE GETALLEN: BREUKENSOM
    // ----------------------------------------------------
    case "rational-sum": {
      const p = randomInt(1, gen.max);
      const q = randomInt(1, gen.max);
      const r = randomInt(1, gen.max);
      const s = randomInt(1, gen.max);

      const result = (p * s + q * r) / (q * s);

      return {
        type: "rational",
        description: skill.description,
        expression: `\\frac{${p}}{${q}} + \\frac{${r}}{${s}}`,
        result
      };
    }

    // ----------------------------------------------------
    // ONBEKENDE SKILL
    // ----------------------------------------------------
    default:
      return {
        type: "number",
        description: "Onbekende oefening",
        expression: "?",
        result: 0
      };
  }
}

// ------------------------------------------------------
// HELPERS
// ------------------------------------------------------

export function makeSet(size: number, max: number) {
  const s = new Set<number>();
  while (s.size < size) s.add(randomInt(0, max));
  return Array.from(s).sort((a, b) => a - b);
}

export function formatSetLatex(arr: number[]) {
  return `\\{${arr.join(", ")}\\}`;
}

export function union(A: number[], B: number[]) {
  return Array.from(new Set([...A, ...B])).sort((a, b) => a - b);
}

export function intersection(A: number[], B: number[]) {
  return A.filter(x => B.includes(x)).sort((a, b) => a - b);
}
