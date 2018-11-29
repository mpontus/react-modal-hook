import { useMemo } from "react";

/**
 * React hook to generate unique id per component instance.
 */
export const useGlobalId = (() => {
  let counter = 0;

  return () => useMemo(() => `${++counter}`, []);
})();
