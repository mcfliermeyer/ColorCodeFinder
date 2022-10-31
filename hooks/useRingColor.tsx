import { copperRingColorDictionary } from "../components/utilities/utilities";
const useRingColor = (pairNumber: number) => {
  const ringNumber = (pairNumber % 5);
  return copperRingColorDictionary[ringNumber]
};
export default useRingColor;
