import { FiberContextType } from "../components/fiber/ScrollableFiber";

const useTubeNumber = (fiberContext: FiberContextType | null) => {
  if (fiberContext) {
<<<<<<< Updated upstream
    const remainder = (fiberContext.fiber - 1) % 12;
    const base = (fiberContext.fiber - 1) - remainder
    console.log("returning tube from hook: ", (base/12) + 1)
    return (base / 12) + 1;
=======
    const remainder = (fiberContext - 1) % 12;
    const base = fiberContext - 1 - remainder;
    return base / 12 + 1;
>>>>>>> Stashed changes
  } else return null;
};
export default useTubeNumber;
