'use client';

import { create } from 'zustand';
import BACKDROP_IMAGE_IDS from '../consts/backdrop-image-ids.json';

type BackgroundState = {
  background: string | null;
  availableUrls: string[];
  isLoading: boolean;
  actions: {
    setRandomBackground: () => void;
    setLoading: (isLoading: boolean) => void;
    setBackground: (url: string | null) => void;
  };
};

const useBackgroundStore = create<BackgroundState>((set, get) => ({
  background: null,
  /** @todo: fetch from updated API */
  availableUrls: BACKDROP_IMAGE_IDS.map((id) => `https://live.staticflickr.com/${id}.jpg`),
  isLoading: false,
  actions: {
    setRandomBackground: async () => {
      const { availableUrls } = get();
      if (availableUrls.length === 0) return;

      const bgUrl = availableUrls[Math.floor(Math.random() * availableUrls.length)];
      set({ background: bgUrl });
    },
    setBackground: async (url: string | null) => set({ background: url }),
    setLoading: (isLoading) => set({ isLoading }),
  },
}));

// Export hooks
export const useBackground = () => useBackgroundStore((state) => state.background);
export const useBackgroundLoading = () => useBackgroundStore((state) => state.isLoading);
export const useBackgroundActions = () => useBackgroundStore((state) => state.actions);
