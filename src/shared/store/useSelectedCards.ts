import { create } from 'zustand';

interface SelectedCardsState {
  selectedIds: string[];
  toggleSelect: (id: string) => void;
  removeItem: (id: string) => void;
  clearAll: () => void;
}

export const useSelectedCards = create<SelectedCardsState>((set) => ({
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
