import { colorDictionary } from "../components/utilities/utilities";

const useFiberColor = (fiber: number) => {
  if (fiber < 12) return colorDictionary[fiber];
  return colorDictionary[fiber % 12];
};
export default useFiberColor;
