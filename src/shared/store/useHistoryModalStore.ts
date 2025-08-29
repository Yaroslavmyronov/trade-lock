import { create } from 'zustand';

interface HistoryModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useHistoryModalStore = create<HistoryModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
