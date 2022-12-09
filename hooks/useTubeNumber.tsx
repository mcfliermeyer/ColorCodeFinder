import { FiberContextType } from "../components/fiber/ScrollableFiber";

const useTubeNumber = (fiberContext: FiberContextType | null) => {
  if (fiberContext) {
    const remainder = (fiberContext.fiber - 1) % 12;
    const base = (fiberContext.fiber - 1) - remainder
    console.log("returning tube from hook: ", (base/12) + 1)
    return (base / 12) + 1;
  } else return null;
};
export default useTubeNumber;
