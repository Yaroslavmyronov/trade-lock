import { create } from 'zustand';

interface DelistModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useDelistModalStore = create<DelistModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
