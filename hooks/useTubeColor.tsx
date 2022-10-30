import { colorDictionary } from "../components/utilities/utilities";

const useTubeColor = (fiber: number) => {
  const remainder = fiber % 12;
  const base = fiber - remainder;
  const tubeColor = base / 12;
  return colorDictionary[tubeColor];
};
export default useTubeColor;
