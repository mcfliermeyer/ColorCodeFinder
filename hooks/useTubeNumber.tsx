import { FiberContextType } from "../components/fiber/ScrollableFiber";

const useTubeNumber = (fiberContext: FiberContextType | null) => {
  if (fiberContext) {
    const remainder = (fiberContext.fiber - 1) % 12;
    const base = (fiberContext.fiber - 1) - remainder
    return base / 12;
  } else return null;
};
export default useTubeNumber;
