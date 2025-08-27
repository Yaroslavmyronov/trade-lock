import { create } from 'zustand';

interface BuyModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useBuyModalStore = create<BuyModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
