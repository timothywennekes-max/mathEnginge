// ------------------------------------------------------
// IMPORTS
// ------------------------------------------------------

import { randomInt } from "./utils";
import { formatInt } from "./strategies/helpers";


// GH05 — strategies
import { explainIntegerSum } from "./strategies/gh05/sum.solution";
import { explainIntegerDifference } from "./strategies/gh05/diff.solution";
import { buildStudentStepsSum } from "./strategies/gh05/sum.student";
import { buildStudentStepsDifference } from "./strategies/gh05/diff.student";

import { generateMultiTermIntegers } from "./strategies/gh05/multi.generator";
import { explainMultiTermSum } from "./strategies/gh05/multi.solution";
import { buildStudentStepsMulti } from "./strategies/gh05/multi.student";


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
  | "rational-sum"
  | "integer-multi-sum"; // nieuw GH05 type

export type Skill = {
  id: string;
  module: string;
  type: SkillType;
  description: string;
  generator: any;
};

export type StudentStep = {
  prompt: string;
  expected: string;
};

export type Exercise = {
  type: "number" | "boolean" | "set" | "rational";
  description: string;
  expression: string;   // KaTeX of gewone string
  result: any;
  stepsSolution?: string[];
  stepsStudent?: StudentStep[];
};


// ------------------------------------------------------
// MAIN GENERATOR
// ------------------------------------------------------

export function generateExercise(skill: Skill, difficulty: number): Exercise {
  const gen = skill.generator;
  const diff = difficulty || 1;

  const scaledMin = gen.min !== undefined ? gen.min * diff : 1;
  const scaledMax = gen.max !== undefined ? gen.max * diff : 10;

  switch (skill.type) {

    // ----------------------------------------------------
    // GH05 – SOM VAN GEHELE GETALLEN
    // ----------------------------------------------------
    case "integer-sum": {
      const a = randomInt(scaledMin, scaledMax);
      const b = randomInt(scaledMin, scaledMax);

      return {
        type: "number",
        description: skill.description,
        expression: `${formatInt(a)} + ${formatInt(b)}`,
        result: a + b,
        stepsSolution: explainIntegerSum(a, b),
        stepsStudent: buildStudentStepsSum(a, b),
      };
    }

    // ----------------------------------------------------
    // GH05 – VERSCHIL VAN GEHELE GETALLEN
    // ----------------------------------------------------
    case "integer-difference": {
      const a = randomInt(scaledMin, scaledMax);
      const b = randomInt(scaledMin, scaledMax);

      return {
        type: "number",
        description: skill.description,
        expression: `${formatInt(a)} - ${formatInt(b)}`,
        result: a - b,
        stepsSolution: explainIntegerDifference(a, b),
        stepsStudent: buildStudentStepsDifference(a, b),
      };
    }

    // ----------------------------------------------------
    // GH05 – GEDURIGE SOMMEN
    // ----------------------------------------------------
    case "integer-multi-sum": {
      const count = gen.count ?? 4;

      const { terms, expression, result } = generateMultiTermIntegers(
        count,
        gen.min * diff,
        gen.max * diff
      );

      return {
        type: "number",
        description: skill.description,
        expression,
        result,
        stepsSolution: explainMultiTermSum(terms),
        stepsStudent: buildStudentStepsMulti(terms),
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
        result: a * b,
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
        result: b,
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
        result: union(A, B),
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
        result: intersection(A, B),
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
        result: n % 3 === 0,
      };
    }

    // ----------------------------------------------------
    // RATIONALE GETALLEN
    // ----------------------------------------------------
    case "rational-sum": {
      const p = randomInt(1, gen.max);
      const q = randomInt(1, gen.max);
      const r = randomInt(1, gen.max);
      const s = randomInt(1, gen.max);

      return {
        type: "rational",
        description: skill.description,
        expression: `\\frac{${p}}{${q}} + \\frac{${r}}{${s}}`,
        result: (p * s + q * r) / (q * s),
      };
    }

    // ----------------------------------------------------
    // FALLBACK
    // ----------------------------------------------------
    default:
      return {
        type: "number",
        description: "Onbekende oefening",
        expression: "?",
        result: 0,
      };
  }
}


// ------------------------------------------------------
// VERZAMELINGEN HELPERS
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
  return A.filter((x) => B.includes(x)).sort((a, b) => a - b);
}
