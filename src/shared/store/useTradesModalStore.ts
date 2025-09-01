import { create } from 'zustand';

type Tab = 'Incoming' | 'Sent';

interface TradesModalState {
  isOpen: boolean;
  activeTab: Tab;
  open: (tab?: Tab) => void;
  close: () => void;
  setActiveTab: (tab: Tab) => void;
}

export const useTradesModalStore = create<TradesModalState>((set) => ({
  isOpen: false,
  activeTab: 'Incoming',
  open: (tab) =>
    set((state) => ({
      isOpen: true,
      activeTab: tab ?? state.activeTab,
    })),
  close: () => set({ isOpen: false }),
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
