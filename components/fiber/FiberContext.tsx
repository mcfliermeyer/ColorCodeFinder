import React from "react";

export type FiberContextType = {
  fiber: number;
  setFiber: React.Dispatch<React.SetStateAction<number>>;
};
export const FiberContext = React.createContext<FiberContextType | null>(null);
