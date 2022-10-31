import { fiberColorDictionary } from "../components/utilities/utilities";

const useTubeColor = (fiber: number) => {
  const remainder = fiber % 12;
  const base = fiber - remainder;
  const tubeColor = base / 12;
  return fiberColorDictionary[tubeColor];
};
export default useTubeColor;
