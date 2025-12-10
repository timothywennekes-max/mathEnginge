import { explainIntegerSum } from "../gh05/sum.solution";
import { explainIntegerDifference } from "../gh05/diff.solution";

export function generateSteps(type: string, a: number, b: number): string[] {
  switch (type) {
    case "integer-sum":
      return explainIntegerSum(a, b);

    case "integer-difference":
      return explainIntegerDifference(a, b);

    default:
      return ["Geen stappen beschikbaar voor dit type."];
  }
}
