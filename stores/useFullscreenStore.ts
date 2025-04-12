import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FullscreenState {
  isFullScreenMode: boolean;
  toggleFullScreenMode: () => void;
}

export const useFullscreenStore = create<FullscreenState>()(
  persist(
    (set) => ({
      isFullScreenMode: false,
      toggleFullScreenMode: () => 
        set((state) => ({ 
          isFullScreenMode: !state.isFullScreenMode 
        })),
    }),
    {
      name: 'fullscreen-storage', // unique name for localStorage
    }
  )
); 