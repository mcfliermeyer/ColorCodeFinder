import { FiberContextType } from "../components/fiber/FiberContext";

const useTubeNumber = (fiberContext: FiberContextType | null) => {
  if (fiberContext) {
    const remainder = (fiberContext.fiber - 1) % 12;
    const base = (fiberContext.fiber - 1) - remainder
    return (base / 12) + 1;
  } else return null;
};
export default useTubeNumber;
