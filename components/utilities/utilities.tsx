import { FiberContextType } from "../fiber/FiberContext";

export const fiberColorDictionary = [
  "#00FFFF",
  "#0000FF",
  "#FFA500",
  "#007c02",
  "#964B00",
  "#C0C2C9",
  "#FAF9F6",
  "#FF0000",
  "#131313",
  "#FFFF00",
  "#8F00FF",
  "#FF007F",
] as const;

export const copperTipColorDictionary = [
  "#FAF9F6",
  "#FF0000",
  "#131313",
  "#FFFF00",
  "#8F00FF",
] as const;
export const copperRingColorDictionary = [
  "#C0C2C9",
  "#0000FF",
  "#FFA500",
  "#007c02",
  "#964B00",
] as const;

export const fiberBase = (fiberContext: FiberContextType | null) => {
  if (fiberContext === null) return 100;
  if (fiberContext.fiber < 12) return fiberContext.fiber;
  return (fiberContext.fiber % 12) + 1;
};
