import { create } from "zustand";
import { useEffect } from "react";

export const useWindows = create<{
  innerWidth: number;
  innerHeight: number;
  updateInnerWidth: (innerWidth: number) => void;
  updateInnerHeight: (innerHeight: number) => void;
}>((set) => ({
  innerWidth: window.innerWidth,
  innerHeight: window.innerHeight,
  updateInnerWidth: (innerWidth) => set(() => ({ innerWidth })),
  updateInnerHeight: (innerHeight) => set(() => ({ innerHeight })),
}));

function listener() {
  useWindows.getState().updateInnerWidth(window.innerWidth);
  useWindows.getState().updateInnerHeight(window.innerHeight);
}

export function useWindowsDimensions() {
  useEffect(() => {
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);
}
