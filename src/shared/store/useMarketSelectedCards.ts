import { create } from 'zustand';

interface SelectedCardsState {
  selectedIds: number[];
  toggleSelect: (id: number) => void;
  removeItem: (id: number) => void;
  clearAll: () => void;
}

export const useMarketSelectedCards = create<SelectedCardsState>((set) => ({
  selectedIds: [],
  toggleSelect: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds.filter((sid) => sid !== id)
        : [...state.selectedIds, id],
    })),
  removeItem: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.filter((sid) => sid !== id),
    })),
  clearAll: () => set({ selectedIds: [] }),
}));
