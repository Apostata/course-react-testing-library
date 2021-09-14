import { pricePerItem } from "../constants";
export function subtotalCalc(optionType, optionCounts) {
  let optionCount = 0;
  if (optionCounts[optionType]?.size > 0) {
    for (const [, value] of optionCounts[optionType]) {
      optionCount += value ? parseInt(value) : 0;
    }
  }

  return optionCount * pricePerItem[optionType];
}
