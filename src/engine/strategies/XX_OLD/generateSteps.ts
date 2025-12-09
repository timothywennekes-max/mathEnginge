import { explainIntegerSum } from "./gh05/integerSum";
import { explainIntegerDifference } from "./gh05/integerDifference";

export function generateSteps(type: string, a: number, b: number): string[] {
  switch (type) {
    case "integer-sum":
      return explainIntegerSum(a, b);

    case "integer-difference":
      return explainIntegerDifference(a, b);

    default:
      return ["Geen stappenplan beschikbaar voor dit type oefening."];
  }
}