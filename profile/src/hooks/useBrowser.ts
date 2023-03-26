import { useMemo } from "react";

export default function useBrowser(name: string) {
  const isName = useMemo(() => navigator.userAgent.includes(name), []);
  return isName;
}