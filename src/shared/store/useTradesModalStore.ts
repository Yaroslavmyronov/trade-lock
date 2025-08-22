import { create } from 'zustand';

interface TradesModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useTradesModalStore = create<TradesModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
