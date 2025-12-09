import { randomInt } from "../../utils";
import { formatInt } from "../helpers";

export function generateMultiTermIntegers(count: number, min: number, max: number) {
  const terms: number[] = [];

  for (let i = 0; i < count; i++) {
    const n = randomInt(min, max);
    terms.push(n);
  }

  const expression = terms
    .map((x, idx) =>
      idx === 0
        ? formatInt(x) 
        : `${x >= 0 ? "+ " + formatInt(x) : "- " + formatInt(Math.abs(x))}`
    )
    .join(" ");

  const result = terms.reduce((acc, val) => acc + val, 0);

  return { terms, expression, result };
}
