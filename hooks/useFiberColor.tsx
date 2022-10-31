import { fiberColorDictionary } from "../components/utilities/utilities";

const useFiberColor = (fiber: number) => {
  if (fiber < 12) return fiberColorDictionary[fiber];
  return fiberColorDictionary[fiber % 12];
};
export default useFiberColor;
