'use client';

import { useLayoutEffect, useState } from 'react';
import { createWithEqualityFn as create } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';

type Appearance = 'light' | 'dark';
interface AppearanceStore {
  appearance: Appearance;
  toggleAppearance: () => void;
  resetAppearance: () => void;
}

// Create store with initial state
const initialState = {
  appearance: 'light' as const,
  toggleAppearance: () => {},
  resetAppearance: () => {},
};

const useAppearanceStore = create<AppearanceStore>((set) => ({
  ...initialState,
  toggleAppearance: () =>
    set(({ appearance: previous }: AppearanceStore) => {
      const appearance = previous === 'dark' ? 'light' : 'dark';
      if (typeof window !== 'undefined') {
        localStorage.setItem('@@appearance@@', appearance);
      }
      return { appearance };
    }),
  resetAppearance: () =>
    set(() => {
      const appearance = window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('@@appearance@@', appearance);
      }
      return { appearance };
    }),
}));

/**
 * A Hook allows you to read os appearance and update website class preference.
 * 
 * This hook uses [Window.matchMedia() API](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) to detect
 * and modify user appearance preference setting for the project. 
 * 
 * A `light` and `dark` class will be added into the document html tag
 * once user appearance preference changes. A localstorage `@@appearance@@` key will be stored for user appearance preference, which overrides the appearance for next time this user visit.
 * @returns \{
 *  appearance: 'light' | 'dark';
 *  toggleAppearance: () => void;
 *  resetAppearance: () => void;
  \}
 */
export default function useAppearance() {
  const [mounted, setMounted] = useState(false);
  const [appearance, toggleAppearance, resetAppearance] = useAppearanceStore(
    (s: AppearanceStore) => [s.appearance, s.toggleAppearance, s.resetAppearance],
    shallow
  );

  // Handle hydration mismatch
  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (appearance === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, [appearance]);

  // Return default values during SSR
  if (!mounted) {
    return initialState;
  }

  return { appearance, toggleAppearance, resetAppearance };
}
