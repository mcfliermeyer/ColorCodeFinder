import { copperTipColorDictionary } from "../components/utilities/utilities";

const useTipColor = (pairNumber: number) => {
  let pair = pairNumber
  if (pairNumber > 25) {
    if (pairNumber % 25 === 0) return copperTipColorDictionary[4]
    pair = (pairNumber) % 25
  }
  const remainder = (pair - 1) % 5;
  const base = (pair - 1) - remainder;
  const tipNumber = base / 5;
  return copperTipColorDictionary[tipNumber];
};
export default useTipColor;
