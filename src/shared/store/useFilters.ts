import { create } from 'zustand';

interface FiltersState {
  opened: 'market' | 'user' | null;
  open: (panel: 'market' | 'user') => void;
  close: (panel: 'market' | 'user') => void;
}

export const useFilters = create<FiltersState>((set, get) => ({
  opened: 'market',
  open: (panel) => set({ opened: panel }),
  close: (panel) => {
    if (get().opened === panel) {
      set({ opened: null });
    }
  },
}));
