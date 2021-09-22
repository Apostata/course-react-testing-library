import { pricePerItem } from "../constants";
import { Counters } from "../types/interfaces";

export function subtotalCalc(optionType: string, optionCounts: Counters) {
  let optionCount = 0;
  if (
    (optionCounts as { [index: string]: Map<string, number> })[optionType]
      ?.size > 0
  ) {
    for (const [, value] of (
      optionCounts as { [index: string]: Map<string, number> }
    )[optionType]) {
      optionCount += value || 0;
    }
  }

  return optionCount * pricePerItem[optionType];
}
