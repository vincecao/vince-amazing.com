import { useMemo } from 'react';

function shuffle<T>(array: T[]): T[] {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

/**
 * Shuffle an array each time it changed
 * @param array any type of list
 * @returns a new shuffled list for each given array
 */
export default function useShuffle<T = unknown>(array: T[]): T[] {
  return useMemo(() => shuffle(array), [array]);
}
